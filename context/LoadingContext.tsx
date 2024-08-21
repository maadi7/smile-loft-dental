import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface LoadingContextProps {
  isLoading: boolean;
  incrementLoading: () => void;
  decrementLoading: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  incrementLoading: () => {},
  decrementLoading: () => {},
  language: 'en',
  setLanguage: () => {},
});

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);
  const [language, setLanguageState] = useState<string>('en');

  // // Load language preference on client-side only
  // useEffect(() => {
  //   const storedLanguage = localStorage.getItem('language');
  //   if (storedLanguage) {
  //     setLanguageState(storedLanguage);
  //   }
  // }, []);

  const incrementLoading = useCallback(() => {
    setLoadingCount(prev => prev + 1);
  }, []);

  const decrementLoading = useCallback(() => {
    setLoadingCount(prev => Math.max(prev - 1, 0));
  }, []);

  const setLanguage = useCallback((lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading: loadingCount > 0,
        incrementLoading,
        decrementLoading,
        language,
        setLanguage,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
