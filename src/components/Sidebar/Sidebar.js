// @flow
import React from 'react';
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

  return (
    <LanguageConsumer>
      {({ language, setLanguage }) => {
        return (
          <div className={styles['sidebar']}>
            <div className={styles['sidebar__inner']}>
              <button
                onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
              >
                Lang
              </button>
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
