// @flow
import React from 'react';
import { Location } from '@reach/router';
import { getContactHref, getIcon } from '../../../utils';
import styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';
import { getLanguage } from '../../../utils/languageContext';
import Icon from '../../Icon/Icon';

const Author = ({ language }) => {
  const { author } = useSiteMetadata();

  return (
    <Location>
      {({ location }) => {
        return (
          <div className={styles['author']}>
            <div className={styles['author__title']}>
              <strong>{author.name[language]}</strong>
              {['github', 'linkedin', 'twitter'].map(name =>
                !author.contacts[name] ? null : (
                  <span
                    className={styles['author__title__contacts-item']}
                    key={name}
                  >
                    <a
                      className={styles['author__title__contacts-item-link']}
                      href={getContactHref(
                        name,
                        author.contacts[name][language]
                      )}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Icon icon={getIcon(name)} />
                    </a>
                  </span>
                )
              )}
            </div>
            <div className={styles['author__bio']}>
              {author.bio[getLanguage(location.pathname)]}
              <div className={styles['author__bio-portfolio']}>
                <a
                  href={author.contacts.portfolio.en}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {author.contacts.portfolio.en}
                </a>
              </div>
            </div>
          </div>
        );
      }}
    </Location>
  );
};

export default Author;
