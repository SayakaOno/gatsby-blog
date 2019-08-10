// @flow
import React from 'react';
import Meta from './Meta/Meta';
import styles from './Content.module.scss';

type Props = {
  body: string,
  title: object
};

const Content = ({ body, title, language, fields, frontmatter }: Props) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>
    <Meta language={language} fields={fields} frontmatter={frontmatter} />

    <div
      className={styles['content__body']}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  </div>
);

export default Content;
