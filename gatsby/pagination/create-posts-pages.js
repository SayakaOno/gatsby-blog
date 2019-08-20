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
  let dates = [];
  let datesSet = [];
  if (postsPerPage === 1) {
    result.data.allMarkdownRemark.edges.forEach(edge => {
      dates.push(edge.node.frontmatter.date);
    });
  } else {
    result.data.allMarkdownRemark.edges.forEach((edge, index) => {
      if (!(index % postsPerPage)) {
        datesSet.push(edge.node.frontmatter.date);
      } else if (!((index + 1) % postsPerPage)) {
        datesSet.push(edge.node.frontmatter.date);
      }
      if (
        datesSet.length === 2 ||
        index === result.data.allMarkdownRemark.edges.length - 1
      ) {
        dates.push(datesSet.slice());
        datesSet.length = 0;
      }
    });
  }

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
  let datesJa = [];
  if (postsPerPage === 1) {
    resultJa.data.allMarkdownRemark.edges.forEach(edge => {
      datesJa.push(edge.node.frontmatter.date);
    });
  } else {
    let datesSetJa = [];
    resultJa.data.allMarkdownRemark.edges.forEach((edge, index) => {
      if (!(index % postsPerPage)) {
        datesSetJa.push(edge.node.frontmatter.date);
      } else if (!((index + 1) % postsPerPage)) {
        datesSetJa.push(edge.node.frontmatter.date);
      }
      if (
        datesSetJa.length === 2 ||
        index === resultJa.data.allMarkdownRemark.edges.length - 1
      ) {
        datesJa.push(datesSetJa.slice());
        datesSetJa.length = 0;
      }
    });
  }

  for (let i = 0; i < numPagesJa; i += 1) {
    createPage({
      path: i === 0 ? '/ja' : `/page/${i}/ja`,
      component: path.resolve('./src/templates/index-template.js'),
      context: {
        currentPage: i,
        totalPage: numPagesJa,
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
