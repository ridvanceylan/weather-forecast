import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import HomeContainer from './containers/HomeContainer';
import ForecastContainer from './containers/ForecastContainer';
import DetailsPage from './pages/DetailsPage';
import Header from './components/Header';
import { UnitProvider } from './contexts/UnitContext';

import en from './i18n/en.json';
import es from './i18n/es.json';
import './index.css';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const { language } = useLanguage();

  const messages = {
    en,
    es,
  };

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <UnitProvider> 
            <Router>
              <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomeContainer />} />
                    <Route path="/forecast" element={<ForecastContainer />} />
                    <Route path="/details/:lat/:lon/:dt" element={<DetailsPage />} />
                  </Routes>
                </main>
              </div>
            </Router>
          </UnitProvider> 
        </QueryClientProvider>
      </ThemeProvider>
    </IntlProvider>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
