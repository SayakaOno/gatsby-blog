// @flow
import React, { useContext } from 'react';
import { withPrefix, Link } from 'gatsby';
import styles from './Author.module.scss';
import { LanguageContext } from '../../../utils/languageContext';

type Props = {
  author: {
    name: string,
    bio: string,
    photo: string
  },
  isIndex: ?boolean
};

const Author = ({ author, isIndex }: Props) => {
  const { language } = useContext(LanguageContext);
  console.log(language);

  return (
    <div className={styles['author']}>
      {isIndex ? (
        <h1 className={styles['author__title']}>
          <Link className={styles['author__title-link']} to="/">
            {author.name[language]}
          </Link>
        </h1>
      ) : (
        <h2 className={styles['author__title']}>
          <Link className={styles['author__title-link']} to="/">
            {author.name[language]}
          </Link>
        </h2>
      )}
      <p className={styles['author__subtitle']}>{author.bio}</p>
    </div>
  );
};

export default Author;
