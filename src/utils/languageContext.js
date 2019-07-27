import React from 'react';

export const getLanguage = () => {
  let language = navigator.language || navigator.userLanguage;
  if (language !== 'ja' && language !== 'en') {
    language = 'en';
  }
  return language;
};

export const LanguageContext = React.createContext({
  language: getLanguage(),
  setLanguage: () => {}
});
export const LanguageProvider = LanguageContext.Provider;
export const LanguageConsumer = LanguageContext.Consumer;
