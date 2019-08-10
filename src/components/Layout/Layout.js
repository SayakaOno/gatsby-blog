// @flow
import React, { useState, useContext } from 'react';
import Helmet from 'react-helmet';
import type { Node as ReactNode } from 'react';
import styles from './Layout.module.scss';
import { LanguageContext, LanguageProvider } from '../../utils/languageContext';

type Props = {
  children: ReactNode,
  title: object,
  description?: object
};

const Layout = ({ children, title, description }: Props) => {
  const languageContext = useContext(LanguageContext);
  const [language, setLanguage] = useState(languageContext.language);

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
