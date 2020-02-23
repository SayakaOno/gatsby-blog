// @flow
import React from 'react';
import { Link } from 'gatsby';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import Pagination from './Pagination';
import RelatedPosts from './RelatedPosts';
import styles from './Post.module.scss';
import type { Node } from '../../types';

type Props = {
  post: Node
};

const Post = (props: Props) => {
  const { post, language, prev, next, backLink, stateForSearchPage } = props;
  const { html } = post;
  const { categorySlug, tagSlugs, slug } = post.fields;
  const { category, tags, title, date } = post.frontmatter;

  return (
    <div className={styles['post']}>
      <div className={styles['post__inner']}>
        <div className={styles['post__content']}>
          <Content
            body={html}
            title={title}
            language={language}
            fields={post.fields}
            frontmatter={post.frontmatter}
          />
        </div>

        <div className={styles['post__footer']}>
          <Meta date={date} language={language} />
          <div className={styles['post__footer-category']}>
            {language === 'en' ? 'Category: ' : 'カテゴリー： '}
            <Link to={`${categorySlug}${language === 'en' ? '' : '/ja'}`}>
              {category}
            </Link>
          </div>
          {tags && tagSlugs && (
            <Tags tags={tags} tagSlugs={tagSlugs} language={language} />
          )}
          {post.frontmatter.related ? (
            <RelatedPosts
              language={language}
              posts={post.frontmatter.related}
            />
          ) : null}
          <Link
            className={styles['post__home-button']}
            to={backLink ? backLink : language === 'en' ? '/' : '/ja'}
            state={backLink ? stateForSearchPage : null}
          >
            {language === 'en' ? '← Back' : '← もどる'}
          </Link>
          <Pagination language={language} prev={prev} next={next} />
          <Author language={language} />
        </div>

        <div className={styles['post__comments']}>
          <Comments postSlug={slug} postTitle={post.frontmatter.title} />
        </div>
      </div>
    </div>
  );
};

export default Post;
