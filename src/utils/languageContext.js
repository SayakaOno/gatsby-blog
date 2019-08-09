import React from 'react';

export const detectBrowserLanguage = () => {
  let language =
    globalThis.window.navigator.language ||
    globalThis.window.navigator.language;
  if (language !== 'ja' && language !== 'en') {
    language = 'en';
  }
  return language;
};

export const getLanguage = path => {
  return path.includes('/ja') ? 'ja' : 'en';
};

export const LanguageContext = React.createContext({
  language: detectBrowserLanguage(),
  setLanguage: () => {}
});
export const LanguageProvider = LanguageContext.Provider;
export const LanguageConsumer = LanguageContext.Consumer;
