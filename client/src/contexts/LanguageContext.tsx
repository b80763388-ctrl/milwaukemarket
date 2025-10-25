import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translate, Currency } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
  formatPrice: (priceInPLN: number) => Promise<string>;
  formatPriceSync: (priceInPLN: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

async function detectCountryFromIP(): Promise<{ country: string; currency: Currency }> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const countryCode = data.country_code || 'US';
    
    const { getCurrencyForCountry } = await import('@/lib/i18n');
    const currency = getCurrencyForCountry(countryCode);
    
    return { country: countryCode, currency };
  } catch (error) {
    console.error('Failed to detect country:', error);
    const { getCurrencyForCountry } = await import('@/lib/i18n');
    return { country: 'US', currency: getCurrencyForCountry('US') };
  }
}

function getDefaultLanguage(countryCode: string): Language {
  // Poland uses Polish, everyone else gets English
  return countryCode === 'PL' ? 'pl' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pl');
  const [currency, setCurrencyState] = useState<Currency>('PLN');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if language and currency are already stored
    const storedLanguage = localStorage.getItem('language') as Language | null;
    const storedCurrency = localStorage.getItem('currency') as Currency | null;
    
    if (storedLanguage && storedCurrency) {
      setLanguageState(storedLanguage);
      setCurrencyState(storedCurrency);
      setIsInitialized(true);
    } else {
      // Detect language and currency from IP
      detectCountryFromIP().then(({ country, currency: detectedCurrency }) => {
        const detectedLanguage = getDefaultLanguage(country);
        setLanguageState(detectedLanguage);
        setCurrencyState(detectedCurrency);
        localStorage.setItem('language', detectedLanguage);
        localStorage.setItem('currency', detectedCurrency);
        setIsInitialized(true);
      });
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('currency', curr);
  };

  const t = (key: string) => translate(key, language);

  const formatPrice = async (priceInPLN: number): Promise<string> => {
    const { convertPrice, formatCurrency } = await import('@/lib/i18n');
    const convertedPrice = await convertPrice(priceInPLN, currency);
    return formatCurrency(convertedPrice, currency);
  };

  const formatPriceSync = (priceInPLN: number): string => {
    // Synchronous version - will initially show PLN until exchange rates are loaded
    // This is OK for initial render, the async version can be used for more precision
    const { currencySymbols } = require('@/lib/i18n');
    
    if (currency === 'PLN') {
      return `${priceInPLN.toFixed(2)} ${currencySymbols.PLN}`;
    }
    
    // Use approximate rates for immediate display
    const approximateRates: Record<typeof currency, number> = {
      PLN: 1,
      EUR: 0.23,
      USD: 0.25,
      GBP: 0.20,
    };
    
    const converted = priceInPLN * approximateRates[currency];
    const symbol = currencySymbols[currency];
    
    if (currency === 'USD' || currency === 'GBP') {
      return `${symbol}${converted.toFixed(2)}`;
    } else {
      return `${symbol}${converted.toFixed(2)}`;
    }
  };

  // Don't render children until language is initialized to avoid flash of wrong language/currency
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, currency, setLanguage, setCurrency, t, formatPrice, formatPriceSync }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
