// @flow
import React, { useEffect, useContext } from 'react';
import { navigate, useStaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import { useSiteMetadata } from '../hooks';
import type { PageContext, AllMarkdownRemark } from '../types';
import {
  detectBrowserLanguage
  // LanguageContext
} from '../utils/languageContext';

type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext
};

const IndexTemplate = ({ data, pageContext }: Props) => {
  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath,
    language
  } = pageContext;

  const siteTitle =
    language === 'en' ? useSiteMetadata().title : useSiteMetadata().titleJa;
  const siteSubtitle =
    language === 'en'
      ? useSiteMetadata().subtitle
      : useSiteMetadata().subtitleJa;

  useEffect(() => {
    if (!sessionStorage.getItem('visited')) {
      const language =
        globalThis.window.navigator.language ||
        globalThis.window.navigator.userLanguage;
      sessionStorage.setItem('visited', 'true');
      if (language === 'ja') {
        navigate('/ja');
      }
    }
  }, []);

  const { edges } = data.allMarkdownRemark;
  const pageTitle =
    currentPage > 0 ? `Page${currentPage} - ${siteTitle}` : siteTitle;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Sidebar isIndex />
      <Page>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query IndexTemplate(
    $postsLimit: Int!
    $postsOffset: Int!
    $language: String!
  ) {
    allMarkdownRemark(
      limit: $postsLimit
      skip: $postsOffset
      filter: {
        frontmatter: {
          template: { eq: "post" }
          draft: { ne: true }
          language: { eq: $language }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;

export default IndexTemplate;
