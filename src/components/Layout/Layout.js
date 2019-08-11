// @flow
import React, { useState, useContext, useEffect } from 'react';
import Helmet from 'react-helmet';
import type { Node as ReactNode } from 'react';
import { navigate } from 'gatsby';
import styles from './Layout.module.scss';
import { LanguageContext, LanguageProvider } from '../../utils/languageContext';

type Props = {
  children: ReactNode,
  title: object,
  description?: object
};

const Layout = ({ children, title, description, language }: Props) => {
  const languageContext = useContext(LanguageContext);
  const [languageB, setLanguage] = useState(languageContext.language);

  useEffect(() => {
    if (!language && !sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', 'true');
    } else {
      if (!sessionStorage.getItem('visited')) {
        const browserLanguage =
          globalThis.window.navigator.language ||
          globalThis.window.navigator.userLanguage;
        sessionStorage.setItem('visited', 'true');
        if (browserLanguage === 'ja') {
          navigate('/ja');
        }
      }
    }
  });

  return (
    <LanguageProvider value={{ languageB, setLanguage }}>
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
