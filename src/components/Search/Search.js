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
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

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
      filterBlogs(year, month, '', '');
    } else {
      setSelectedCategory(category);
      let blogs = filterBlogByCategory(category);
      setTags(getTags(blogs));
      setBlogsInSelectedCategory(blogs);
      setSelectedTags([]);
      filterBlogs(year, month, category, null);
    }
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
    setSelectedTags(tags);
    filterBlogs(year, month, selectedCategory, tags);
  };

  const filterBlogByCategory = (category, blogs = edges) => {
    return blogs.filter(edge => edge.node.frontmatter.category === category);
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

  const clearYear = () => {
    setMonth('00');
    setYear('00');
    filterBlogs('', '', selectedCategory, selectedTags);
  };

  const clearMonth = () => {
    setMonth('00');
    filterBlogs(year, '', selectedCategory, selectedTags);
  };

  const clearTagFilter = () => {
    setSelectedTags([]);
    filterBlogs(year, month, selectedCategory, '');
  };

  const clearCategoryFilter = () => {
    setSelectedCategory('');
    setTags([]);
    setSelectedTags([]);
    setBlogsInSelectedCategory([]);
  };

  const clearFilter = () => {
    setYear('');
    setMonth('');
    clearCategoryFilter();
    setBlogsAndNumber(edges, totalCount);
  };

  const getBlogYears = () => {
    return Array.from(
      new Set(edges.map(edge => edge.node.frontmatter.date.substr(0, 4)))
    );
  };

  const onClickClearCategory = () => {
    clearCategoryFilter();
    setBlogsAndNumber(edges, totalCount);
    filterBlogs(year, month, '', '');
  };

  const onYearSelect = event => {
    let year = event.target.value;
    let month = month;
    if (year === '00') {
      setMonth('00');
      month = '';
    }
    setYear(year);
    filterBlogs(event.target.value, month, selectedCategory, selectedTags);
  };

  const filterBlogs = (year, month, category, tags) => {
    console.log('arg', year, month, category, tags);
    let filteredBlogs = edges.slice();
    // year & month
    if (month && month !== '00') {
      filteredBlogs = filteredBlogs.filter(blog => {
        return blog.node.frontmatter.date.substr(0, 7) === `${year}-${month}`;
      });
      console.log('year & month', filteredBlogs);
      // year
    } else if (year && year !== '00') {
      filteredBlogs = filteredBlogs.filter(blog => {
        return blog.node.frontmatter.date.substr(0, 4) === year;
      });
      console.log('year', filteredBlogs);
    }
    // category & tags
    if (tags && tags.length) {
      filteredBlogs = filterBlogByCategory(category, filteredBlogs);
      filteredBlogs = filterBlogByTags(tags, filteredBlogs);
      console.log('category & tags', filteredBlogs);
      // category
    } else if (category) {
      filteredBlogs = filterBlogByCategory(category, filteredBlogs);
      console.log('category', filteredBlogs);
    }
    setBlogsAndNumber(filteredBlogs);
  };

  const renderYearSelect = () => {
    return (
      <div className={styles['search__filter__year']}>
        <select value={year} onChange={onYearSelect}>
          <option key="00" value="00">
            All
          </option>
          {getBlogYears().map(year => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <span onClick={clearYear}>🔄</span>
      </div>
    );
  };

  const onMonthSelect = event => {
    setMonth(event.target.value);
    filterBlogs(year, event.target.value, selectedCategory, selectedTags);
  };

  const renderMonthSelect = () => {
    return (
      <div className={styles['search__filter__month']}>
        <select value={month} onChange={onMonthSelect}>
          <option key="00" value="00">
            All
          </option>
          <option key="01" value="01">
            January
          </option>
          <option key="02" value="02">
            February
          </option>
          <option key="03" value="03">
            March
          </option>
          <option key="04" value="04">
            April
          </option>
          <option key="05" value="05">
            May
          </option>
          <option key="06" value="06">
            June
          </option>
          <option key="07" value="07">
            July
          </option>
          <option key="08" value="08">
            August
          </option>
          <option key="09" value="09">
            September
          </option>
          <option key="10" value="10">
            October
          </option>
          <option key="11" value="11">
            November
          </option>
          <option key="12" value="12">
            December
          </option>
        </select>
        <span onClick={clearMonth}>🔄</span>
      </div>
    );
  };

  const renderCategories = () => {
    return (
      <>
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
        {selectedCategory ? renderClearCategoryButton() : null}
      </>
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

  const renderClearCategoryButton = () => {
    return (
      <div className={styles['search__filter__clear-specific']}>
        <span onClick={onClickClearCategory}>
          <b>×</b> {language === 'en' ? 'reset category' : 'カテゴリーをクリア'}
        </span>
      </div>
    );
  };

  const renderClearTagButton = () => {
    return (
      <div className={styles['search__filter__clear-specific']}>
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
        {language === 'en' ? 'Search' : '検索'}
      </h1>
      <div className={styles['search__filter']}>
        {renderYearSelect()}
        {year && year !== '00' ? renderMonthSelect() : null}
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
