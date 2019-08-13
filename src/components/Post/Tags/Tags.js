// @flow
import React from 'react';
import { Link } from 'gatsby';
import styles from './Tags.module.scss';

type Props = {
  tags: string[],
  tagSlugs: string[]
};

const Tags = ({ tags, tagSlugs, language }: Props) => (
  <div className={styles['tags']}>
    {language === 'en' ? (tags.length > 1 ? 'Tags: ' : 'Tag: ') : 'タグ： '}
    <React.Fragment>
      {tagSlugs &&
        tagSlugs.map((slug, i) => (
          <span className={styles['tags__list-item']} key={tags[i]}>
            <Link
              to={language === 'en' ? slug : slug + '/ja'}
              className={styles['tags__list-item-link']}
            >
              {tags[i]}
            </Link>
          </span>
        ))}
    </React.Fragment>
  </div>
);

export default Tags;
