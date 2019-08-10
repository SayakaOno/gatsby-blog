// @flow
import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import {
  useSiteMetadata,
  useCategoriesList,
  useCategoriesListJa
} from '../hooks';

const CategoriesListTemplate = ({ pageContext }) => {
  const language = pageContext.language;
  const title =
    language === 'en' ? useSiteMetadata().title : useSiteMetadata().titleJa;
  const subtitle =
    language === 'en'
      ? useSiteMetadata().subtitle
      : useSiteMetadata().subtitleJa;
  const categories =
    language === 'ja' ? useCategoriesListJa() : useCategoriesList();
  return (
    <Layout
      title={`${language === 'en' ? 'Categories' : 'カテゴリー'} - ${title}`}
      description={subtitle}
    >
      <Sidebar />
      <Page title={language === 'en' ? 'Categories' : 'カテゴリー'}>
        <ul>
          {categories.map(category => (
            <li key={category.fieldValue}>
              <Link
                to={`/category/${kebabCase(category.fieldValue)}/${
                  language === 'en' ? '' : 'ja'
                }`}
              >
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export default CategoriesListTemplate;
