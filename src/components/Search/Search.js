// @flow
import React, { useState, useEffect } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [number, setNumber] = useState([]);

  useEffect(() => {
    setBlogs(edges);
    setNumber(totalCount);
  }, []);

  const onClickCategory = category => {
    if (category === selectedCategory) {
      setSelectedCategory('');
      setBlogs(edges);
      setNumber(totalCount);
    } else {
      setSelectedCategory(category);
      filterBlogByCategory(category);
    }
  };

  const filterBlogByCategory = category => {
    let blogs = edges.filter(
      edge => edge.node.frontmatter.category === category
    );
    setNumber(blogs.length);
    return setBlogs(blogs);
  };

  return (
    <div className={styles['search']}>
      <h1>{language === 'en' ? 'Search' : 'さがす'}</h1>
      <p>
        {language === 'en' ? 'blog' : 'ブログ'}: {number}
      </p>
      <ul>
        {categoriesList.map(category => {
          return (
            <li
              onClick={() => onClickCategory(category.fieldValue)}
              key={category.fieldValue}
            >
              {category.fieldValue}
            </li>
          );
        })}
      </ul>
      <BlogList edges={blogs} />
    </div>
  );
};

export default Search;
