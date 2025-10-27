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
    const countryCode = data.country_code || 'PL';
    
    console.log('[IP Detection] Detected country:', countryCode, 'from IP:', data.ip);
    
    const { getCurrencyForCountry } = await import('@/lib/i18n');
    const currency = getCurrencyForCountry(countryCode);
    
    console.log('[IP Detection] Using currency:', currency);
    
    return { country: countryCode, currency };
  } catch (error) {
    console.error('[IP Detection] Failed to detect country:', error);
    const { getCurrencyForCountry } = await import('@/lib/i18n');
    const fallbackCurrency = getCurrencyForCountry('PL');
    console.log('[IP Detection] Using fallback country: PL, currency:', fallbackCurrency);
    return { country: 'PL', currency: fallbackCurrency };
  }
}

function getDefaultLanguage(countryCode: string): Language {
  // Poland uses Polish, everyone else gets English
  return countryCode === 'PL' ? 'pl' : 'en';
}

function getCurrencyForLanguage(lang: Language): Currency {
  // PL → PLN, EN → EUR
  return lang === 'pl' ? 'PLN' : 'EUR';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pl');
  const [currency, setCurrencyState] = useState<Currency>('PLN');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check localStorage first, otherwise detect from IP
    const savedLanguage = localStorage.getItem('language') as Language | null;
    
    if (savedLanguage) {
      // Use saved preferences
      const savedCurrency = getCurrencyForLanguage(savedLanguage);
      setLanguageState(savedLanguage);
      setCurrencyState(savedCurrency);
      setIsInitialized(true);
      console.log('[Language Context] Using saved - Language:', savedLanguage, 'Currency:', savedCurrency);
    } else {
      // Detect language from IP
      detectCountryFromIP().then(({ country }) => {
        const detectedLanguage = getDefaultLanguage(country);
        const detectedCurrency = getCurrencyForLanguage(detectedLanguage);
        
        setLanguageState(detectedLanguage);
        setCurrencyState(detectedCurrency);
        localStorage.setItem('language', detectedLanguage);
        localStorage.setItem('currency', detectedCurrency);
        setIsInitialized(true);
        
        console.log('[Language Context] Detected - Language:', detectedLanguage, 'Currency:', detectedCurrency);
      });
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Automatically change currency when language changes
    const newCurrency = getCurrencyForLanguage(lang);
    setCurrencyState(newCurrency);
    localStorage.setItem('currency', newCurrency);
    
    console.log('[Language Change] Language:', lang, '→ Currency:', newCurrency);
    
    // Force reload to ensure all prices update
    window.location.reload();
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
    // Synchronous version - format prices properly for Polish locale
    const currencySymbols = {
      PLN: 'zł',
      EUR: '€',
      USD: '$',
      GBP: '£',
    };
    
    if (currency === 'PLN') {
      // Use Polish number format: comma as decimal separator
      const formatted = priceInPLN.toFixed(2).replace('.', ',');
      return `${formatted} ${currencySymbols.PLN}`;
    }
    
    // Use approximate rates for immediate display
    const approximateRates: Record<Currency, number> = {
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
      return `${converted.toFixed(2)} ${symbol}`;
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
