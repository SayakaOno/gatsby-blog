'use strict';

const path = require('path');
const siteConfig = require('../../config.js');

module.exports = async (graphql, actions) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            template: { eq: "post" }
            draft: { ne: true }
            home: { ne: false }
            language: { eq: "en" }
          }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            frontmatter {
              date
            }
          }
        }
        totalCount
      }
    }
  `);

  const { postsPerPage } = siteConfig;
  const numPages = Math.ceil(
    result.data.allMarkdownRemark.totalCount / postsPerPage
  );
  const dates = [];
  result.data.allMarkdownRemark.edges.forEach((edge, index) => {
    if (!(index % postsPerPage)) {
      dates.push(edge.node.frontmatter.date);
    }
  });

  for (let i = 0; i < numPages; i += 1) {
    createPage({
      path: i === 0 ? '/' : `/page/${i}`,
      component: path.resolve('./src/templates/index-template.js'),
      context: {
        currentPage: i,
        totalPage: numPages,
        postsLimit: postsPerPage,
        postsOffset: i * postsPerPage,
        prevPagePath: i <= 1 ? '/' : `/page/${i - 1}`,
        nextPagePath: `/page/${i + 1}`,
        hasPrevPage: i !== 0,
        hasNextPage: i !== numPages - 1,
        language: 'en',
        dates: dates
      }
    });
  }

  // ja
  const resultJa = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            template: { eq: "post" }
            draft: { ne: true }
            home: { ne: false }
            language: { eq: "ja" }
          }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            frontmatter {
              date
            }
          }
        }
        totalCount
      }
    }
  `);

  const numPagesJa = Math.ceil(
    resultJa.data.allMarkdownRemark.totalCount / postsPerPage
  );
  const datesJa = [];
  resultJa.data.allMarkdownRemark.edges.forEach((edge, index) => {
    if (!(index % postsPerPage)) {
      datesJa.push(edge.node.frontmatter.date);
    }
  });

  for (let i = 0; i < numPagesJa; i += 1) {
    createPage({
      path: i === 0 ? '/ja' : `/page/${i}/ja`,
      component: path.resolve('./src/templates/index-template.js'),
      context: {
        currentPage: i,
        postsLimit: postsPerPage,
        postsOffset: i * postsPerPage,
        prevPagePath: i <= 1 ? '/ja' : `/page/${i - 1}/ja`,
        nextPagePath: `/page/${i + 1}/ja`,
        hasPrevPage: i !== 0,
        hasNextPage: i !== numPagesJa - 1,
        language: 'ja',
        dates: datesJa
      }
    });
  }
};
