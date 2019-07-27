let language = () => {
  navigator.language || navigator.userLanguage;
  if (language !== 'ja' && language !== 'en') {
    language = 'en';
  }
  return language;
};

export default language;
