'use strict';

const _ = require('lodash');
const path = require('path');
const siteConfig = require('../../config.js');

module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  const { postsPerPage } = siteConfig;

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            template: { eq: "post" }
            draft: { ne: true }
            language: { eq: "en" }
          }
        }
      ) {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  _.each(result.data.allMarkdownRemark.group, category => {
    const numPages = Math.ceil(category.totalCount / postsPerPage);
    const categorySlug = `/category/${_.kebabCase(category.fieldValue)}`;

    for (let i = 0; i < numPages; i += 1) {
      createPage({
        path: i === 0 ? categorySlug : `${categorySlug}/page/${i}`,
        component: path.resolve('./src/templates/category-template.js'),
        context: {
          category: category.fieldValue,
          currentPage: i,
          postsLimit: postsPerPage,
          postsOffset: i * postsPerPage,
          prevPagePath: i <= 1 ? categorySlug : `${categorySlug}/page/${i - 1}`,
          nextPagePath: `${categorySlug}/page/${i + 1}`,
          hasPrevPage: i !== 0,
          hasNextPage: i !== numPages - 1,
          language: 'en'
        }
      });
    }
  });

  // ja
  const resultJa = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            template: { eq: "post" }
            draft: { ne: true }
            language: { eq: "ja" }
          }
        }
      ) {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  _.each(resultJa.data.allMarkdownRemark.group, category => {
    const numPages = Math.ceil(category.totalCount / postsPerPage);
    const categorySlug = `/category/${_.kebabCase(category.fieldValue)}`;

    for (let i = 0; i < numPages; i += 1) {
      createPage({
        path: i === 0 ? categorySlug + '/ja' : `${categorySlug}/page/${i}/ja`,
        component: path.resolve('./src/templates/category-template.js'),
        context: {
          category: category.fieldValue,
          currentPage: i,
          postsLimit: postsPerPage,
          postsOffset: i * postsPerPage,
          prevPagePath:
            i <= 1 ? categorySlug + '/ja' : `${categorySlug}/page/${i - 1}/ja`,
          nextPagePath: `${categorySlug}/page/${i + 1}/ja`,
          hasPrevPage: i !== 0,
          hasNextPage: i !== numPages - 1,
          language: 'ja'
        }
      });
    }
  });
};
