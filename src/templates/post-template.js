// @flow
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const PostTemplate = (props: Props) => {
  const { data, pageContext, location } = props;
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const {
    title: postTitle,
    description: postDescription
  } = data.markdownRemark.frontmatter;
  const metaDescription =
    postDescription !== null ? postDescription : siteSubtitle;

  const stateForSearchPage = () => {
    if (
      location.state.from === '/search' ||
      location.state.from === '/search/ja'
    ) {
      return {
        selectedCategory: location.state.selectedCategory,
        selectedTags: location.state.selectedTags
      };
    }
    return null;
  };

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription}>
      <Sidebar />
      <Post
        post={data.markdownRemark}
        language={pageContext.language}
        backLink={location.state.from}
        stateForSearchPage={stateForSearchPage()}
      />
    </Layout>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        date
        description
        tags
        title
      }
    }
  }
`;

export default PostTemplate;
