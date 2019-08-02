// @flow
import React from 'react';
import { navigate } from 'gatsby';
import { Location } from '@reach/router';
import styles from './LanguageSwitcher.module.scss';
import { getLanguage } from '../../../utils/languageContext';

const LanguageSwitcher = () => {
  const otherLanguagePath = currentPath => {
    if (currentPath.includes('/page/')) {
      if (currentPath.includes('/ja')) {
        return '/';
      }
      return '/ja';
    }
    if (currentPath.includes('/ja')) {
      return currentPath.replace('/ja', '');
    }
    return currentPath + '/ja';
  };

  const languageOnClick = (clickedLang, displayedLanguage) => {
    if (clickedLang === displayedLanguage) {
      return;
    }
    navigate(otherLanguagePath(location.pathname));
  };

  return (
    <Location>
      {({ location }) => {
        const language = getLanguage(location.pathname);
        return (
          <div className={styles['language-switcher']}>
            <div
              className={styles['language-switcher__back']}
              style={{ left: language === 'en' ? 0 : '50%' }}
            />
            <div className={styles['language-switcher__languages']}>
              <span
                onClick={() => languageOnClick('en', language)}
                className={
                  language === 'en'
                    ? styles['language-switcher__languages-active']
                    : null
                }
              >
                EN
              </span>
              <span
                onClick={() => languageOnClick('ja', language)}
                className={
                  language === 'ja'
                    ? styles['language-switcher__languages-active']
                    : null
                }
              >
                JA
              </span>
            </div>
          </div>
        );
      }}
    </Location>
  );
};

export default LanguageSwitcher;
