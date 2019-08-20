// @flow
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import PaginationBox from '../components/PaginationBox';
import { useSiteMetadata } from '../hooks';
import type { PageContext, AllMarkdownRemark } from '../types';
type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext
};

const IndexTemplate = ({ data, pageContext }: Props) => {
  const {
    currentPage,
    totalPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath,
    language,
    dates
  } = pageContext;

  const siteTitle =
    language === 'en' ? useSiteMetadata().title : useSiteMetadata().titleJa;
  const siteSubtitle =
    language === 'en'
      ? useSiteMetadata().subtitle
      : useSiteMetadata().subtitleJa;

  const { edges } = data.allMarkdownRemark;
  const pageTitle =
    currentPage > 0 ? `Page${currentPage} - ${siteTitle}` : siteTitle;

  return (
    <Layout title={pageTitle} description={siteSubtitle} language={language}>
      <Sidebar isIndex />
      <Page>
        <Feed edges={edges} />
        {totalPage > 1 ? (
          <PaginationBox
            currentPage={currentPage}
            totalPage={totalPage}
            prevPagePath={prevPagePath}
            nextPagePath={nextPagePath}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            language={language}
            dates={dates}
          />
        ) : null}
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
          home: { ne: false }
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
