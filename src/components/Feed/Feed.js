// @flow
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import type { Edges } from '../../types';
import styles from './Feed.module.scss';
import { getLanguage } from '../../utils/languageContext';

type Props = {
  edges: Edges
};

const Feed = ({ edges }: Props) => (
  <Location>
    {({ location }) => {
      const language = getLanguage(location.pathname);
      return (
        <div className={styles['feed']}>
          {edges.map(edge => (
            <div className={styles['feed__item']} key={edge.node.fields.slug}>
              <div className={styles['feed__item-meta']}>
                <time
                  className={styles['feed__item-meta-time']}
                  dateTime={moment(edge.node.frontmatter.date).format(
                    'MMMM D, YYYY'
                  )}
                >
                  {moment(edge.node.frontmatter.date).format(
                    language === 'en' ? 'MMMM D, YYYY' : 'YYYY/MM/DD'
                  )}
                </time>
                <span className={styles['feed__item-meta-divider']} />
                <span className={styles['feed__item-meta-category']}>
                  <Link
                    to={`${edge.node.fields.categorySlug}${
                      language === 'en' ? '' : '/ja'
                    }`}
                    className={styles['feed__item-meta-category-link']}
                  >
                    {edge.node.frontmatter.category}
                  </Link>
                </span>
              </div>
              <h2 className={styles['feed__item-title']}>
                <Link
                  className={styles['feed__item-title-link']}
                  to={edge.node.fields.slug}
                  state={{ from: location.pathname }}
                >
                  {edge.node.frontmatter.title}
                </Link>
              </h2>
              <p className={styles['feed__item-description']}>
                {edge.node.frontmatter.description}
              </p>
            </div>
          ))}
        </div>
      );
    }}
  </Location>
);

export default Feed;
