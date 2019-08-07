// @flow
import React, { useState, useEffect } from 'react';
import type { Edges } from '../../types';
import BlogList from './BlogList';
import styles from './Search.module.scss';
import { useCategoriesList, useCategoriesListJa } from '../../hooks';

type Props = {
  edges: Edges
};

const Search = ({ edges, totalCount, language, savedFilter }: Props) => {
  const categoriesList =
    language === 'ja' ? useCategoriesListJa() : useCategoriesList();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState('');
  const [tags, setTags] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [blogsInSelectedCategory, setBlogsInSelectedCategory] = useState([]);
  const [number, setNumber] = useState([]);

  useEffect(() => {
    if (savedFilter && savedFilter.selectedCategory) {
      let savedCategory = savedFilter.selectedCategory;
      let savedTags = savedFilter.selectedTags;
      let blogsInCategory = filterBlogByCategory(savedCategory);
      let blogs = filterBlogByTags(savedTags, blogsInCategory);
      setSelectedCategory(savedCategory);
      setSelectedTags(savedTags);
      setTags(getTags(blogsInCategory));
      setBlogsInSelectedCategory(blogsInCategory);
      setBlogsAndNumber(blogs);
    } else {
      setBlogsAndNumber(edges, totalCount);
    }
  }, []);

  const setBlogsAndNumber = (blogs, number = blogs.length) => {
    setBlogs(blogs);
    setNumber(number);
  };

  const onClickCategory = category => {
    if (category === selectedCategory) {
      clearFilter();
    } else {
      setSelectedCategory(category);
      let blogs = filterBlogByCategory(category);
      setTags(getTags(blogs));
      setBlogsInSelectedCategory(blogs);
      setBlogsAndNumber(blogs);
      setSelectedTags([]);
    }
  };

  const filterBlogByCategory = category => {
    return edges.filter(edge => edge.node.frontmatter.category === category);
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
    let blogs = filterBlogByTags(tags);
    setBlogsAndNumber(blogs);
    setSelectedTags(tags);
  };

  const filterBlogByTags = (tags, blogs = blogsInSelectedCategory) => {
    return blogs.filter(blog =>
      includesAllTags(tags, blog.node.frontmatter.tags)
    );
  };

  const includesAllTags = (tags, array) => {
    for (let i = 0; i < tags.length; i++) {
      if (!array.includes(tags[i])) {
        return false;
      }
    }
    return true;
  };

  const clearTagFilter = () => {
    setSelectedTags([]);
    setBlogsAndNumber(blogsInSelectedCategory);
  };

  const clearFilter = () => {
    setSelectedCategory('');
    setTags([]);
    setSelectedTags([]);
    setBlogsInSelectedCategory([]);
    setBlogsAndNumber(edges, totalCount);
  };

  const renderCategories = () => {
    return (
      <ul className={styles['search__filter__categories-list']}>
        {categoriesList.map(category => {
          return (
            <li
              onClick={() => onClickCategory(category.fieldValue)}
              key={category.fieldValue}
              className={
                selectedCategory
                  ? selectedCategory.includes(category.fieldValue)
                    ? styles['search__filter__categories-list-item-selected']
                    : ''
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
      <>
        <ul className={styles['search__filter__tags-list']}>
          {tags.map(tag => {
            return (
              <li
                onClick={() => onClickTag(tag)}
                key={tag}
                className={
                  selectedTags.includes(tag)
                    ? styles['search__filter__tags-list-item-selected']
                    : ''
                }
              >
                {tag}
              </li>
            );
          })}
        </ul>

        {selectedTags.length ? renderClearTagButton() : null}
      </>
    );
  };

  const renderClearTagButton = () => {
    return (
      <div className={styles['search__filter__tags-list__clear']}>
        <span onClick={clearTagFilter}>
          <b>×</b> {language === 'en' ? 'reset tags' : 'タグをクリア'}
        </span>
      </div>
    );
  };

  const renderClearFilterButton = () => {
    return (
      <div>
        <span onClick={clearFilter} className={styles['search__filter__clear']}>
          {language === 'en' ? '→ All posts' : '→ 全ブログ'}
        </span>
      </div>
    );
  };

  const renderCount = () => {
    return (
      <div className={styles['search__count']}>
        {!selectedCategory
          ? language === 'en'
            ? `${number} posts`
            : `全${number}件`
          : language === 'en'
          ? number === 0
            ? 'No posts found'
            : `${number} posts found`
          : number === 0
          ? '該当ブログがありません'
          : `該当ブログ: ${number}`}
      </div>
    );
  };

  return (
    <div className={styles['search']}>
      <h1 className={styles['search__title']}>
        {language === 'en' ? 'Search' : 'さがす'}
      </h1>
      <div className={styles['search__filter']}>
        {renderCategories()}
        {tags.length ? renderTags() : null}
        {selectedCategory ? renderClearFilterButton() : null}
      </div>

      {renderCount()}
      <BlogList
        edges={blogs}
        selectedCategory={selectedCategory}
        selectedTags={selectedTags}
      />
    </div>
  );
};

export default Search;
