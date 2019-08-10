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
    {language === 'en' ? (tags.length > 1 ? 'Tags:' : 'Tag:') : 'タグ：'}
    <ul className={styles['tags__list']}>
      {tagSlugs &&
        tagSlugs.map((slug, i) => (
          <li className={styles['tags__list-item']} key={tags[i]}>
            <Link
              to={language === 'en' ? slug : slug + '/ja'}
              className={styles['tags__list-item-link']}
            >
              {tags[i]}
            </Link>
          </li>
        ))}
    </ul>
  </div>
);

export default Tags;
