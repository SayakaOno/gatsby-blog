// @flow
import React from 'react';
import { withPrefix, Link } from 'gatsby';
import styles from './Author.module.scss';

type Props = {
  author: {
    name: string,
    bio: string,
    photo: string
  },
  isIndex: ?boolean
};

const Author = ({ author, isIndex, language }: Props) => {
  return (
    <div className={styles['author']}>
      {isIndex ? (
        <h1 className={styles['author__title']}>
          <Link
            className={styles['author__title-link']}
            to={language === 'en' ? '/' : '/ja'}
          >
            {author.name[language]}
          </Link>
        </h1>
      ) : (
        <h2 className={styles['author__title']}>
          <Link
            className={styles['author__title-link']}
            to={language === 'en' ? '/' : '/ja'}
          >
            {author.name[language]}
          </Link>
        </h2>
      )}
      <p className={styles['author__subtitle']}>{author.bio[language]}</p>
    </div>
  );
};

export default Author;
