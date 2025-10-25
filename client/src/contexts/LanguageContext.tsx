import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translate } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

async function detectCountryFromIP(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code || 'US';
  } catch (error) {
    console.error('Failed to detect country:', error);
    return 'US';
  }
}

function getDefaultLanguage(countryCode: string): Language {
  // Poland uses Polish, everyone else gets English
  return countryCode === 'PL' ? 'pl' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pl');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if language is already stored
    const storedLanguage = localStorage.getItem('language') as Language | null;
    
    if (storedLanguage) {
      setLanguageState(storedLanguage);
      setIsInitialized(true);
    } else {
      // Detect language from IP
      detectCountryFromIP().then((countryCode) => {
        const detectedLanguage = getDefaultLanguage(countryCode);
        setLanguageState(detectedLanguage);
        localStorage.setItem('language', detectedLanguage);
        setIsInitialized(true);
      });
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => translate(key, language);

  // Don't render children until language is initialized to avoid flash of wrong language
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
