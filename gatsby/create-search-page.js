'use strict';

const path = require('path');

module.exports = async (graphql, actions) => {
  const { createPage } = actions;

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
        totalCount
      }
    }
  `);

  createPage({
    path: '/search',
    component: path.resolve('./src/templates/search-template.js'),
    context: {
      language: 'en',
      totalCount: result.data.allMarkdownRemark.totalCount
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
        totalCount
      }
    }
  `);

  createPage({
    path: '/search/ja',
    component: path.resolve('./src/templates/search-template.js'),
    context: {
      language: 'ja',
      totalCount: resultJa.data.allMarkdownRemark.totalCount
    }
  });
};
