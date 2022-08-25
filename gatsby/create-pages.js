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

	let edgesForIndexPage = edges.filter((edge) => {
		return _.get(edge, 'node.frontmatter.home') !== false;
	});
	let edgesForCreatePage = edges.filter((edge) => {
		return _.get(edge, 'node.frontmatter.home') === false;
	});

	const sortedPosts = { ja: [], en: [] };
	const indexInLang = { ja: 0, en: 0 };

	_.each(edgesForIndexPage, (edge) => {
		if (_.get(edge, 'node.frontmatter.template') === 'page') {
			createPage({
				path: edge.node.fields.slug,
				component: path.resolve('./src/templates/page-template.js'),
				context: {
					slug: edge.node.fields.slug
				}
			});
		} else if (_.get(edge, 'node.frontmatter.template') === 'post') {
			if (!Object.keys(sortedPosts.ja).length) {
				edgesForIndexPage.forEach((edge, index) => {
					if (_.get(edge, 'node.frontmatter.template') === 'post') {
						const lang = _.get(edge, 'node.frontmatter.language');
						sortedPosts[lang].push({
							slug: _.get(edge, 'node.fields.slug'),
							title: _.get(edge, 'node.frontmatter.title'),
							date: _.get(edge, 'node.frontmatter.date')
						});
					}
				});
			}

			const lang = _.get(edge, 'node.frontmatter.language');

			const prev = indexInLang[lang] ? sortedPosts[lang][indexInLang[lang] - 1] : null;
			const next =
				indexInLang[lang] !== sortedPosts[lang].length - 1 ? sortedPosts[lang][indexInLang[lang] + 1] : null;

			indexInLang[lang]++;

			createPage({
				path: edge.node.fields.slug,
				component: path.resolve('./src/templates/post-template.js'),
				context: {
					slug: edge.node.fields.slug,
					language: _.get(edge, 'node.frontmatter.language'),
					prev: prev,
					next: next
				}
			});
		}
	});

	_.each(edgesForCreatePage, (edge) => {
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
