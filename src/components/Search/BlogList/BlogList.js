// @flow
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import type { Edges } from '../../../types';
import styles from './BlogList.module.scss';

type Props = {
  edges: Edges
};

const BlogList = ({ edges }: Props) => {
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
                  state={{ from: location.pathname }}
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
                          'MMMM D, YYYY'
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
                      <ul>
                        {edge.node.frontmatter.tags.map(tag => {
                          return <li key={tag}>{tag}</li>;
                        })}
                      </ul>
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
