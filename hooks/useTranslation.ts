import { useCallback, useRef } from 'react';
import { useLoading } from '../context/LoadingContext';

const useTranslation = () => {
  const translationsCache = useRef<{ [key: string]: string }>({});
  const { incrementLoading, decrementLoading, language, setLanguage } = useLoading();

  const translate = useCallback(async (text: string) => {
    if (!language || !text) {
      return text;
    }
    // return text;

    const cacheKey = `${language}-${text}`;
    if (translationsCache.current[cacheKey]) {
      return translationsCache.current[cacheKey];
    }
  
    try {
      incrementLoading(); // Increase the loading counter

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, targetLang: language }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Translation request failed: ${errorData.error}. Details: ${errorData.details}`);
      }

      const data = await response.json();
      const translatedText = data.translatedText || text;

      // Cache the translation
      translationsCache.current[cacheKey] = translatedText;

      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    } finally {
      decrementLoading(); // Decrease the loading counter
    }
  }, [language, incrementLoading, decrementLoading]);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'es' : 'en');
  }, [language, setLanguage]);
  

  return { translate, toggleLanguage, language };
};

export default useTranslation;
