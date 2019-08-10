// @flow
import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate = ({ pageContext }) => {
  const { language } = pageContext;
  const title =
    language === 'en' ? useSiteMetadata().title : useSiteMetadata().titleJa;
  const subtitle =
    language === 'en'
      ? useSiteMetadata().subtitle
      : useSiteMetadata().subtitleJa;

  return (
    <Layout
      title={`${title} - ${
        language === 'en' ? 'Not Found' : 'ページがありません'
      }`}
      description={subtitle}
    >
      <Sidebar />
      <Page title={language === 'ja' ? 'ページがありません' : 'NOT FOUND'}>
        <p>
          {language === 'ja'
            ? 'お探しのページは存在しません。'
            : "You just hit a route that doesn't exist... the sadness."}
        </p>
      </Page>
    </Layout>
  );
};

export default NotFoundTemplate;
