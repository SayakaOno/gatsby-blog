// @flow
import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate = ({ pageContext }) => {
  const { title, subtitle } = useSiteMetadata();
  const { language } = pageContext;

  return (
    <Layout
      title={`${title[language]} - ${
        language === 'en' ? 'Not Found' : 'ページがありません'
      }`}
      description={subtitle[language]}
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
