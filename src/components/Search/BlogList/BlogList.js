// @flow
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import { getIcon } from '../../../utils';
import Icon from '../../Icon';
import type { Edges } from '../../../types';
import styles from './BlogList.module.scss';
import { getLanguage } from '../../../utils/languageContext';

type Props = {
  edges: Edges
};

const BlogList = (props: Props) => {
  const { edges, filters } = props;
  const year = filters ? filters.year : '';
  const month = filters ? filters.month : '';
  const selectedCategory = filters ? filters.selectedCategory : '';
  const selectedTags = filters ? filters.selectedTags : [];

  return (
    <Location>
      {({ location }) => {
        return (
          <div className={styles['blog-list']}>
            {edges.map(edge => {
              return (
                <Link
                  className={styles['blog-list__item-title-link']}
                  key={edge.node.fields.slug}
                  to={edge.node.fields.slug}
                  state={{
                    from: location.pathname,
                    year,
                    month,
                    selectedCategory,
                    selectedTags
                  }}
                >
                  <div className={styles['blog-list__item']}>
                    <div className={styles['blog-list__item-meta']}>
                      <time
                        className={styles['blog-list__item-meta-time']}
                        dateTime={moment(edge.node.frontmatter.date).format(
                          'MMMM D, YYYY'
                        )}
                      >
                        {moment(edge.node.frontmatter.date).format(
                          getLanguage(location.pathname) === 'en'
                            ? 'MMMM D, YYYY'
                            : 'YYYY/MM/DD'
                        )}
                      </time>
                      <span
                        className={styles['blog-list__item-meta-divider']}
                      />
                    </div>
                    <h2 className={styles['blog-list__item-title']}>
                      {edge.node.frontmatter.title}
                    </h2>
                    {edge.node.frontmatter.tags ? (
                      <div className={styles['blog-list__tags']}>
                        <Icon icon={getIcon('tag')} />
                        {edge.node.frontmatter.tags.map(tag => {
                          return <span key={tag}>{tag}</span>;
                        })}
                      </div>
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        );
      }}
    </Location>
  );
};

export default BlogList;
