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
  const [selectedTags, setSelectedTags] = useState('');
  const [tags, setTags] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [blogsInSelectedCategory, setBlogsInSelectedCategory] = useState([]);
  const [number, setNumber] = useState([]);

  useEffect(() => {
    setBlogs(edges);
    setNumber(totalCount);
  }, []);

  const onClickCategory = category => {
    if (category === selectedCategory) {
      setSelectedCategory('');
      setTags([]);
      setSelectedTags([]);
      setBlogs(edges);
      setBlogsInSelectedCategory([]);
      setNumber(totalCount);
    } else {
      setSelectedCategory(category);
      filterBlogByCategory(category);
      setSelectedTags([]);
    }
  };

  const filterBlogByCategory = category => {
    let blogs = edges.filter(
      edge => edge.node.frontmatter.category === category
    );
    setNumber(blogs.length);
    setTags(getTags(blogs));
    setBlogs(blogs);
    setBlogsInSelectedCategory(blogs);
  };

  const getTags = blogs => {
    let tags = [];
    blogs.forEach(blog => {
      if (blog.node.frontmatter.tags) {
        tags.push(...blog.node.frontmatter.tags);
      }
    });
    let tagsSet = new Set(tags);
    tags = Array.from(tagsSet);
    return tags;
  };

  const onClickTag = clickedTag => {
    let tags = [];
    if (!selectedTags.length) {
      tags.push(clickedTag);
    } else if (selectedTags.includes(clickedTag)) {
      tags = selectedTags.filter(tag => tag !== clickedTag);
    } else {
      tags = [...selectedTags, clickedTag];
    }
    filterBlogByTags(tags);
    setSelectedTags(tags);
  };

  const filterBlogByTags = tags => {
    let newblogs = blogsInSelectedCategory.filter(blog =>
      includesAllTags(tags, blog.node.frontmatter.tags)
    );
    setNumber(newblogs.length);
    setBlogs(newblogs);
  };

  const includesAllTags = (tags, array) => {
    for (let i = 0; i < tags.length; i++) {
      if (!array.includes(tags[i])) {
        return false;
      }
    }
    return true;
  };

  const renderCategories = () => {
    return (
      <ul className={styles['search__categories-list']}>
        {categoriesList.map(category => {
          return (
            <li
              onClick={() => onClickCategory(category.fieldValue)}
              key={category.fieldValue}
              className={
                selectedCategory.includes(category.fieldValue)
                  ? styles['search__categories-list-item-selected']
                  : ''
              }
            >
              {category.fieldValue}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderTags = () => {
    return (
      <ul className={styles['search__tags-list']}>
        {tags.map(tag => {
          return (
            <li
              onClick={() => onClickTag(tag)}
              key={tag}
              className={
                selectedTags.includes(tag)
                  ? styles['search__tags-list-item-selected']
                  : ''
              }
            >
              {tag}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={styles['search']}>
      <h1>{language === 'en' ? 'Search' : 'さがす'}</h1>
      <p>
        {language === 'en' ? 'blog' : 'ブログ'}: {number}
      </p>
      {renderCategories()}
      {tags ? renderTags() : null}
      <BlogList edges={blogs} />
    </div>
  );
};

export default Search;
