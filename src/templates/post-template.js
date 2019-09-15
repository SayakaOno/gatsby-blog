// @flow
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import { useSiteMetadata, useUrlsList } from '../hooks';
import type { MarkdownRemark } from '../types';

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const PostTemplate = (props: Props) => {
  const { data, pageContext, location } = props;
  const { language, prev, next } = pageContext;
  const siteTitle =
    language === 'en' ? useSiteMetadata().title : useSiteMetadata().titleJa;
  const siteSubtitle =
    language === 'en'
      ? useSiteMetadata().subtitle
      : useSiteMetadata().subtitleJa;
  const {
    title: postTitle,
    description: postDescription
  } = data.markdownRemark.frontmatter;
  const metaDescription =
    postDescription !== null ? postDescription : siteSubtitle;
  const pageExist = (targetLink, linkList) => {
    if (!targetLink) {
      return false;
    }
    for (let list of linkList) {
      if (list.path === targetLink) {
        return true;
      }
    }
    return false;
  };
  const link = {
    exist: pageExist(data.markdownRemark.frontmatter.link, useUrlsList()),
    path: data.markdownRemark.frontmatter.link
  };
  const stateForSearchPage = () => {
    if (
      location.state.from === '/search' ||
      location.state.from === '/search/ja'
    ) {
      return {
        year: location.state.year,
        month: location.state.month,
        selectedCategory: location.state.selectedCategory,
        selectedTags: location.state.selectedTags
      };
    }
    return null;
  };

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription}>
      <Sidebar link={link} />
      <Post
        post={data.markdownRemark}
        language={pageContext.language}
        prev={prev}
        next={next}
        backLink={location.state ? location.state.from : null}
        stateForSearchPage={location.state ? stateForSearchPage() : null}
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
        categorySlug
        tagSlugs
      }
      frontmatter {
        date
        description
        category
        tags
        title
        link
        related
      }
    }
  }
`;

export default PostTemplate;
