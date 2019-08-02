// @flow
import React from 'react';
import { navigate } from 'gatsby';
import { Location } from '@reach/router';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import { useSiteMetadata } from '../../hooks';
import { getLanguage } from '../../utils/languageContext';

type Props = {
  isIndex?: boolean
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();

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

  const languageOnClick = (clickedLang, displayedlang) => {
    if (clickedLang === displayedlang) {
      return;
    }
    navigate(otherLanguagePath(location.pathname));
  };

  const renderLanguageSwitcher = () => {
    return (
      <Location>
        {({ location }) => {
          const language = getLanguage(location.pathname);
          return (
            <div className={styles['sidebar__inner__language-switcher']}>
              <div
                className={styles['sidebar__inner__language-switcher__back']}
                style={{ left: language === 'en' ? 0 : '50%' }}
              />
              <div
                className={
                  styles['sidebar__inner__language-switcher__languages']
                }
              >
                <span
                  onClick={() => languageOnClick('en', language)}
                  className={
                    language === 'en'
                      ? styles[
                          'sidebar__inner__language-switcher__languages-active'
                        ]
                      : null
                  }
                >
                  EN
                </span>
                <span
                  onClick={() => languageOnClick('ja', language)}
                  className={
                    language === 'ja'
                      ? styles[
                          'sidebar__inner__language-switcher__languages-active'
                        ]
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

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Author author={author} isIndex={isIndex} />
        {renderLanguageSwitcher()}
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

export default Sidebar;
