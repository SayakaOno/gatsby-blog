// @flow
import React from 'react';
import { Link } from 'gatsby';
import { getTitle } from '../../../hooks';
import styles from './RelatedPosts.module.scss';

const RelatedPosts = ({ language, posts }: Props) => (
  <div className={styles['related-posts']}>
    <h3>
      {language === 'en'
        ? `Related ${posts.length === 1 ? 'post' : 'posts'}`
        : '関連ブログ'}
    </h3>
    <ul>
      {posts.map(post => {
        return (
          <li key={post}>
            <Link to={post}>{getTitle(post)}</Link>
          </li>
        );
      })}
    </ul>
  </div>
);

export default RelatedPosts;
