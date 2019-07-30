// @flow
import React from 'react';
import { Location } from '@reach/router';
import { getContactHref } from '../../../utils';
import styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';
import { getLanguage } from '../../../utils/languageContext';

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <Location>
      {({ location }) => {
        return (
          <div className={styles['author']}>
            <p className={styles['author__bio']}>
              {author.bio[getLanguage(location.pathname)]}
              <a
                className={styles['author__bio-twitter']}
                href={getContactHref('twitter', author.contacts.twitter)}
                rel="noopener noreferrer"
                target="_blank"
              >
                <strong>{author.name[getLanguage(location.pathname)]}</strong>{' '}
                on Twitter
              </a>
            </p>
          </div>
        );
      }}
    </Location>
  );
};

export default Author;
