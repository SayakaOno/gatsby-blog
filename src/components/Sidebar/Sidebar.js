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
import { LanguageConsumer } from '../../utils/languageContext';

type Props = {
  isIndex?: boolean
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();

  const otherLanguagePath = currentPath => {
    if (currentPath.includes('/page')) {
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

  return (
    <LanguageConsumer>
      {({ language, setLanguage }) => {
        return (
          <div className={styles['sidebar']}>
            <div className={styles['sidebar__inner']}>
              <Location>
                {({ location }) => {
                  return (
                    <button
                      onClick={() => {
                        setLanguage(language === 'en' ? 'ja' : 'en');
                        navigate(otherLanguagePath(location.pathname));
                      }}
                    >
                      Lang
                    </button>
                  );
                }}
              </Location>
              <Author author={author} isIndex={isIndex} />
              <Menu menu={menu} />
              <Contacts contacts={author.contacts} />
              <Copyright copyright={copyright} />
            </div>
          </div>
        );
      }}
    </LanguageConsumer>
  );
};

export default Sidebar;
