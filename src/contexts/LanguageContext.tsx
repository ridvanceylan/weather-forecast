import React, { createContext, useContext, useState, useEffect } from 'react';

type SupportedLanguage = 'en' | 'es' | 'tr';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): SupportedLanguage => {
  const stored = localStorage.getItem('language');
  return stored === 'en' || stored === 'es' || stored === 'tr' ? stored : 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  useEffect(() => {
    const storedLanguage = getInitialLanguage();
    setLanguageState(storedLanguage);
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
