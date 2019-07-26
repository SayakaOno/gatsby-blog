let language = () => {
  navigator.language || navigator.userLanguage;
  if (language !== 'ja' && language !== 'en') {
    language = 'en';
  }
};

export default language;
