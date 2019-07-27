// @flow
import React, { useState, useEffect, useContext } from 'react';
import Helmet from 'react-helmet';
import type { Node as ReactNode } from 'react';
import styles from './Layout.module.scss';
import { getLanguage, LanguageProvider } from '../../utils/languageContext';

type Props = {
  children: ReactNode,
  title: string,
  description?: string
};

const Layout = ({ children, title, description }: Props) => {
  const [language, setLanguage] = useState('');

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  return (
    <LanguageProvider value={{ language, setLanguage }}>
      <div className={styles.layout}>
        <Helmet>
          <html lang="en" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:site_name" content={title} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
        </Helmet>
        {children}
      </div>
    </LanguageProvider>
  );
};

export default Layout;
