// @flow
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import styles from './Pagination.module.scss';

type Props = {
  body: string,
  title: object
};

const Pagination = ({ language, prev, next }: Props) => {
  const renderPrevLink = prev => {
    if (!prev || !prev.slug) {
      return null;
    }
    return (
      <div className={styles['pagination__prev']}>
        <Link className={styles['pagination__prev__link']} to={prev.slug}>
          <div className={styles['pagination__prev__link-date']}>
            {moment(prev.date).format(
              language === 'en' ? 'MMMM D, YYYY' : 'YYYY-MM-DD'
            )}
          </div>
          <div className={styles['pagination__prev__link-title']}>
            <span>←</span> {prev.title}
          </div>
        </Link>
      </div>
    );
  };

  const renderNextLink = next => {
    if (!next || !next.slug) {
      return null;
    }
    return (
      <div className={styles['pagination__next']}>
        <Link className={styles['pagination__next__link']} to={next.slug}>
          <div className={styles['pagination__next__link-date']}>
            {moment(next.date).format(
              language === 'en' ? 'MMMM D, YYYY' : 'YYYY-MM-DD'
            )}
          </div>
          <div className={styles['pagination__next__link-title']}>
            {next.title} <span>→</span>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className={styles['pagination']}>
      {renderPrevLink(prev)}
      {renderNextLink(next)}
    </div>
  );
};

export default Pagination;
