// @flow
import React from 'react';
import { Location } from '@reach/router';
import Author from './Author';
import LanguageSwitcher from './LanguageSwitcher';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import { useSiteMetadata } from '../../hooks';
import { getLanguage } from '../../utils/languageContext';

type Props = {
  isIndex?: boolean
};

const Sidebar = ({ isIndex, link }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();

  return (
    <Location>
      {({ location }) => {
        const language = getLanguage(location.pathname);
        return (
          <div className={styles['sidebar']}>
            <div className={styles['sidebar__inner']}>
              <Author author={author} isIndex={isIndex} language={language} />
              <LanguageSwitcher
                link={link}
                language={language}
                path={location.pathname}
              />
              <Menu menu={menu} language={language} />
              <Contacts contacts={author.contacts} language={language} />
              <Copyright copyright={copyright} />
            </div>
          </div>
        );
      }}
    </Location>
  );
};

export default Sidebar;
