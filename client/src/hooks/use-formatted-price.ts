import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function useFormattedPrice(priceInPLN: number): string {
  const { formatPrice } = useLanguage();
  const [formattedPrice, setFormattedPrice] = useState<string>('...');

  useEffect(() => {
    let cancelled = false;

    formatPrice(priceInPLN).then((formatted) => {
      if (!cancelled) {
        setFormattedPrice(formatted);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [priceInPLN, formatPrice]);

  return formattedPrice;
}
