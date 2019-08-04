// @flow
import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { Location } from '@reach/router';
import styles from './LanguageSwitcher.module.scss';
import { getLanguage } from '../../../utils/languageContext';

const LanguageSwitcher = ({ link, language }) => {
  const [enLinkExist, setEnLinkExist] = useState(null);
  const [jaLinkExist, setJaLinkExist] = useState(null);

  useEffect(() => {
    if (link && !link.exist) {
      return;
    }
    if (language === 'en') {
      setJaLinkExist(true);
    } else {
      setEnLinkExist(true);
    }
  }, []);

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
    let path = '';
    if (link) {
      if (!link.exist) {
        return;
      }
      path = link.path;
    } else {
      path = otherLanguagePath(location.pathname);
    }
    navigate(path);
  };

  const pointerClassName = language => {
    if (language === 'en') {
      return enLinkExist
        ? styles['language-switcher__languages__pointer']
        : styles['language-switcher__languages__unavailable'];
    }
    return jaLinkExist
      ? styles['language-switcher__languages__pointer']
      : styles['language-switcher__languages__unavailable'];
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
                className={`${
                  language === 'en'
                    ? styles['language-switcher__languages-active']
                    : ''
                } ${pointerClassName('en')}`}
              >
                EN
              </span>
              <span
                onClick={() => languageOnClick('ja', language)}
                className={`${
                  language === 'ja'
                    ? styles['language-switcher__languages-active']
                    : ''
                } ${pointerClassName('ja')}`}
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
