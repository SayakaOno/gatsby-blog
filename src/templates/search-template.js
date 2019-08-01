// @flow
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import Search from '../components/Search';
import { useSiteMetadata } from '../hooks';
import type { PageContext, AllMarkdownRemark } from '../types';

type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext
};

const BlogTemplate = ({ data, pageContext }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();

  const { language } = pageContext;
  const { edges } = data.allMarkdownRemark;
  const pageTitle = `${language === 'en' ? 'Search' : '検索'} ${siteTitle}`;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Sidebar isIndex />
      <Page>
        <Search
          totalCount={data.allMarkdownRemark.totalCount}
          edges={edges}
          language={language}
        />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query BlogTemplate($language: String!) {
    allMarkdownRemark(
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
            tags
            description
          }
        }
      }
      totalCount
    }
  }
`;

export default BlogTemplate;
