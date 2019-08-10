// @flow
import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata, useTagsList, useTagsListJa } from '../hooks';

const TagsListTemplate = ({ pageContext }) => {
  const { language } = pageContext;
  const title =
    language === 'en' ? useSiteMetadata().title : useSiteMetadata().titleJa;
  const subtitle =
    language === 'en'
      ? useSiteMetadata().subtitle
      : useSiteMetadata().subtitleJa;
  const tags = language === 'en' ? useTagsList() : useTagsListJa();

  return (
    <Layout
      title={`${language === 'en' ? 'Tags' : 'タグ'} - ${title}`}
      description={subtitle}
    >
      <Sidebar />
      <Page title={language === 'en' ? 'Tags' : 'タグ'}>
        <ul>
          {tags.map(tag => (
            <li key={tag.fieldValue}>
              <Link
                to={`/tag/${kebabCase(tag.fieldValue)}/${
                  language === 'en' ? '' : 'ja'
                }`}
              >
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export default TagsListTemplate;
