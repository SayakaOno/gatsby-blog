// @flow
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import { useSiteMetadata } from '../hooks';
import type { AllMarkdownRemark, PageContext } from '../types';

type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext
};

const TagTemplate = ({ data, pageContext }: Props) => {
  const {
    tag,
    currentPage,
    prevPagePath,
    nextPagePath,
    hasPrevPage,
    hasNextPage,
    language
  } = pageContext;
  const siteTitle =
    language === 'en' ? useSiteMetadata().title : useSiteMetadata().titleJa;
  const siteSubtitle =
    language === 'en'
      ? useSiteMetadata().subtitle
      : useSiteMetadata().subtitleJa;

  const { edges } = data.allMarkdownRemark;
  const pageTitle =
    currentPage > 0
      ? language === 'en'
        ? `All Posts tagged as "${tag}" - Page${currentPage} - ${siteTitle}`
        : `"${tag}"タグのブログ - Page${currentPage} - ${siteTitle}`
      : language === 'en'
      ? `All Posts tagged as "${tag}" - ${siteTitle}`
      : `"${tag}"タグのブログ - ${siteTitle}`;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Sidebar />
      <Page title={tag}>
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
  query TagPage(
    $tag: String
    $postsLimit: Int!
    $postsOffset: Int!
    $language: String!
  ) {
    site {
      siteMetadata {
        title
        titleJa
        subtitle
        subtitleJa
      }
    }
    allMarkdownRemark(
      limit: $postsLimit
      skip: $postsOffset
      filter: {
        frontmatter: {
          tags: { in: [$tag] }
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

export default TagTemplate;
