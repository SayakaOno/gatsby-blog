import React from 'react';

export const LanguageContext = React.createContext({
  language: '',
  setLanguage: () => {}
});
export const LanguageProvider = LanguageContext.Provider;
export const LanguageConsumer = LanguageContext.Consumer;

export const getLanguage = () => {
  let language = navigator.language || navigator.userLanguage;
  if (language !== 'ja' && language !== 'en') {
    language = 'en';
  }
  return language;
};
