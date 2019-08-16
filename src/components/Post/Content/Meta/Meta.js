// @flow
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import { getIcon } from '../../../../utils';
import Icon from '../../../Icon';
import styles from './Meta.module.scss';

type Props = {
  date: string
};

const Meta = ({ language, fields, frontmatter }: Props) => {
  const { tagSlugs, categorySlug } = fields;
  const { tags, date, category } = frontmatter;

  return (
    <div>
      <div className={styles['meta']}>
        <div className={styles['meta__date']}>
          {moment(date).format(
            language === 'en' ? 'MMMM D, YYYY' : 'YYYY/MM/DD'
          )}
        </div>
        <div className={styles['meta__category']}>
          <span className={styles['meta__emoji']}>
            {' '}
            <Icon icon={getIcon('category')} />
          </span>
          <Link
            to={`${categorySlug}${language === 'en' ? '' : '/ja'}`}
            className={styles['meta__category-link']}
          >
            {category}
          </Link>
        </div>
        <div className={styles['meta__tags']}>
          <span className={styles['meta__emoji']}>
            {' '}
            <Icon icon={getIcon('tag')} />
          </span>
          <ul className={styles['meta__tags__list']}>
            {tagSlugs &&
              tagSlugs.map((slug, i) => (
                <li className={styles['meta__tags__list-item']} key={tags[i]}>
                  <Link
                    to={`${slug}${language === 'ja' ? '/ja' : ''}`}
                    className={styles['meta__tags__list-item-link']}
                  >
                    {tags[i]}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Meta;
