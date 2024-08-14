import { useState, useCallback, useRef } from 'react';
import { useLoading } from '../context/LoadingContext';

const useTranslation = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const originalTexts = useRef<{ [key: string]: string }>({});
  const { setIsLoading } = useLoading();

  const translate = useCallback(async (text: string, key: string) => {
    if (language === 'en') {
      return originalTexts.current[key] || text;
    }

    try {
      setIsLoading(true);
      console.log('Translating:', text, 'to', language);
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
      console.log('Translation result:', data);

      if (!originalTexts.current[key]) {
        originalTexts.current[key] = text;
      }

      return data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    } finally {
      setIsLoading(false);
    }
  }, [language, setIsLoading]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  }, []);

  return { translate, toggleLanguage, language };
};

export default useTranslation;