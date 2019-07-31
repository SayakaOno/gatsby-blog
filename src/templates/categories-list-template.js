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
  const { title, subtitle } = useSiteMetadata();
  const categories =
    pageContext.language === 'ja' ? useCategoriesListJa() : useCategoriesList();
  const language = pageContext.language === 'ja' ? 'ja' : 'en';
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
