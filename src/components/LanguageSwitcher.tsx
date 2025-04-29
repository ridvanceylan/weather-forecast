import React, { useCallback } from 'react';
import FlagsSelect from 'react-flags-select';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = React.memo(() => {
  const { language, setLanguage } = useLanguage();

  const changeLanguageHandler = useCallback((countryCode: string) => {
    const langCode = countryCode === 'US' ? 'en' : countryCode === 'ES' ? 'es' : 'tr';
    setLanguage(langCode);
  }, [setLanguage]);

  return (
    <div className="relative w-32">
      <FlagsSelect
        countries={['US', 'ES', 'TR']}
        customLabels={{ US: 'English', ES: 'Español', TR: 'Türkçe' }}
        selected={
          language === 'en' ? 'US' :
          language === 'es' ? 'ES' :
          'TR'
        }
        onSelect={changeLanguageHandler}
        className="w-full dark:bg-gray-700 dark:text-white rounded-lg"
      />
    </div>
  );
});

export default LanguageSwitcher;
