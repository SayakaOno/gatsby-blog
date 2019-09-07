'use strict';

const path = require('path');
const _ = require('lodash');
const createCategoriesPages = require('./pagination/create-categories-pages.js');
const createTagsPages = require('./pagination/create-tags-pages.js');
const createPostsPages = require('./pagination/create-posts-pages.js');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Search
  createPage({
    path: '/search',
    component: path.resolve('./src/templates/search-template.js'),
    context: {
      language: 'en'
    }
  });
  createPage({
    path: '/search/ja',
    component: path.resolve('./src/templates/search-template.js'),
    context: {
      language: 'ja'
    }
  });

  // 404
  createPage({
    path: '/404',
    component: path.resolve('./src/templates/not-found-template.js'),
    context: { language: 'en' }
  });
  createPage({
    path: '/404/ja',
    component: path.resolve('./src/templates/not-found-template.js'),
    context: { language: 'ja' }
  });

  // Tags list
  createPage({
    path: '/tags',
    component: path.resolve('./src/templates/tags-list-template.js'),
    context: { language: 'en' }
  });
  createPage({
    path: '/tags/ja',
    component: path.resolve('./src/templates/tags-list-template.js'),
    context: { language: 'ja' }
  });

  // Categories list
  createPage({
    path: '/categories',
    component: path.resolve('./src/templates/categories-list-template.js'),
    context: { language: 'en' }
  });
  createPage({
    path: '/categories/ja',
    component: path.resolve('./src/templates/categories-list-template.js'),
    context: { language: 'ja' }
  });

  // Posts and pages from markdown
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { order: ASC, fields: frontmatter___date }
      ) {
        edges {
          node {
            frontmatter {
              template
              language
              title
              date
              home
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const { edges } = result.data.allMarkdownRemark;

  let edgesForIndexPage = edges.filter(edge => {
    return _.get(edge, 'node.frontmatter.home') !== false;
  });
  let edgesForSearchPageOnly = edges.filter(edge => {
    return _.get(edge, 'node.frontmatter.home') === false;
  });

  _.each(edgesForIndexPage, (edge, index) => {
    if (_.get(edge, 'node.frontmatter.template') === 'page') {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve('./src/templates/page-template.js'),
        context: {
          slug: edge.node.fields.slug
        }
      });
    } else if (_.get(edge, 'node.frontmatter.template') === 'post') {
      let prev = index - 1;
      let next = index + 1;
      while (prev >= 0) {
        if (
          _.get(edge, 'node.frontmatter.language') ===
            _.get(edgesForIndexPage[prev], 'node.frontmatter.language') &&
          _.get(edgesForIndexPage[prev], 'node.frontmatter.template') === 'post'
        ) {
          break;
        }
        prev--;
      }
      while (next < edgesForIndexPage.length) {
        if (
          _.get(edge, 'node.frontmatter.language') ===
            _.get(edgesForIndexPage[next], 'node.frontmatter.language') &&
          _.get(edgesForIndexPage[next], 'node.frontmatter.template') === 'post'
        ) {
          break;
        }
        next++;
      }
      if (
        _.get(edgesForIndexPage[next], 'node.frontmatter.template') !== 'post'
      ) {
        next = null;
      }

      createPage({
        path: edge.node.fields.slug,
        component: path.resolve('./src/templates/post-template.js'),
        context: {
          slug: edge.node.fields.slug,
          language: _.get(edge, 'node.frontmatter.language'),
          prev:
            prev || prev === 0
              ? {
                  slug: _.get(edgesForIndexPage[prev], 'node.fields.slug'),
                  title: _.get(
                    edgesForIndexPage[prev],
                    'node.frontmatter.title'
                  ),
                  date: _.get(edgesForIndexPage[prev], 'node.frontmatter.date')
                }
              : null,
          next:
            next === index
              ? null
              : next && next < edgesForIndexPage.length
              ? {
                  slug: _.get(edgesForIndexPage[next], 'node.fields.slug'),
                  title: _.get(
                    edgesForIndexPage[next],
                    'node.frontmatter.title'
                  ),
                  date: _.get(edgesForIndexPage[next], 'node.frontmatter.date')
                }
              : null
        }
      });
    }
  });

  _.each(edgesForSearchPageOnly, edge => {
    createPage({
      path: edge.node.fields.slug,
      component: path.resolve('./src/templates/post-template.js'),
      context: {
        slug: edge.node.fields.slug,
        language: _.get(edge, 'node.frontmatter.language')
      }
    });
  });

  // Feeds
  await createTagsPages(graphql, actions);
  await createCategoriesPages(graphql, actions);
  await createPostsPages(graphql, actions);
};

module.exports = createPages;
