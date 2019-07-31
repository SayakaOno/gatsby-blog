// @flow
import React from 'react';
import type { Edges } from '../../types';
import BlogList from './BlogList';
import styles from './Search.module.scss';
import { useCategoriesList, useCategoriesListJa } from '../../hooks';

type Props = {
  edges: Edges
};

const Search = ({ edges, totalCount, language }: Props) => {
  const categoriesList =
    language === 'ja' ? useCategoriesListJa() : useCategoriesList();
  return (
    <div className={styles['search']}>
      <h1>{language === 'en' ? 'Search' : 'さがす'}</h1>
      <p>
        {language === 'en' ? 'blog' : 'ブログ'}: {totalCount}
      </p>
      <ul>
        {categoriesList.map(category => {
          return <li key={category.fieldValue}>{category.fieldValue}</li>;
        })}
      </ul>
      <BlogList edges={edges} />
    </div>
  );
};

export default Search;
