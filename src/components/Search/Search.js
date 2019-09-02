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
    if (savedFilter) {
      let year = savedFilter.year;
      let month = savedFilter.month;
      let savedCategory = savedFilter.selectedCategory;
      let savedTags = savedFilter.selectedTags;
      let blogsInCategory = filterBlogByCategory(savedCategory);
      filterBlogs(year, month, savedCategory, savedTags);
      setYear(year);
      setMonth(month);
      setSelectedCategory(savedCategory);
      setSelectedTags(savedTags ? savedTags : []);
      setTags(getTags(blogsInCategory));
      setBlogsInSelectedCategory(blogsInCategory);
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
    let targetMonth = month;
    if (year === '00') {
      setMonth('00');
      targetMonth = '';
    }
    setYear(year);
    filterBlogs(
      event.target.value,
      targetMonth,
      selectedCategory,
      selectedTags
    );
  };

  const filterBlogs = (year, month, category, tags) => {
    let filteredBlogs = edges.slice();
    // year & month
    if (month && month !== '00') {
      filteredBlogs = filteredBlogs.filter(blog => {
        return blog.node.frontmatter.date.substr(0, 7) === `${year}-${month}`;
      });
      // year
    } else if (year && year !== '00') {
      filteredBlogs = filteredBlogs.filter(blog => {
        return blog.node.frontmatter.date.substr(0, 4) === year;
      });
    }
    // category & tags
    if (tags && tags.length) {
      filteredBlogs = filterBlogByCategory(category, filteredBlogs);
      filteredBlogs = filterBlogByTags(tags, filteredBlogs);
      // category
    } else if (category) {
      filteredBlogs = filterBlogByCategory(category, filteredBlogs);
    }
    setBlogsAndNumber(filteredBlogs);
  };

  const renderYearSelect = () => {
    return (
      <div className={styles['search__filter__date-year']}>
        <select value={year} onChange={onYearSelect}>
          <option key="00" value="00">
            {language === 'en' ? 'Year' : '年'}
          </option>
          {getBlogYears().map(year => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        {year && year !== '00' ? renderClearButton(clearYear) : null}
      </div>
    );
  };

  const onMonthSelect = event => {
    setMonth(event.target.value);
    filterBlogs(year, event.target.value, selectedCategory, selectedTags);
  };

  const renderMonthSelect = () => {
    if (language === 'en') {
      return (
        <div className={styles['search__filter__date-month']}>
          <select value={month} onChange={onMonthSelect}>
            <option key="00" value="00">
              Month
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
          {month && month !== '00' ? renderClearButton(clearMonth) : null}
        </div>
      );
    }

    let options = [];
    for (let i = 1; i <= 12; i++) {
      let value = i < 10 ? '0' + i.toString() : i.toString();
      options.push(
        <option key={value} value={value}>
          {i + '月'}
        </option>
      );
    }
    return (
      <select value={month} onChange={onMonthSelect}>
        <option key="00" value="00">
          月
        </option>
        {options.map(option => option)}
      </select>
    );
  };

  const renderCategories = () => {
    return (
      <div className={styles['search__filter__categories']}>
        <div className={styles['search__filter__categories-title']}>
          <span>{language === 'en' ? 'Category' : 'カテゴリー'}</span>{' '}
          {selectedCategory ? renderClearButton(onClickClearCategory) : null}
        </div>
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
      </div>
    );
  };

  const renderTags = () => {
    return (
      <div className={styles['search__filter__tags']}>
        <div className={styles['search__filter__tags-title']}>
          <span>{language === 'en' ? 'Tags' : 'タグ'}</span>{' '}
          {selectedTags.length ? renderClearButton(clearTagFilter) : null}
        </div>
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
      </div>
    );
  };

  const renderClearButton = clearFunction => {
    return (
      <span
        onClick={clearFunction}
        className={styles['search__filter__clear-specific']}
      >
        ×
      </span>
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
        {selectedCategory || (year && year !== '00')
          ? number === 0
            ? language === 'en'
              ? 'No posts found'
              : '該当ブログがありません'
            : language === 'en'
            ? `${number} post${number > 1 ? 's' : ''} found`
            : `該当ブログ: ${number}件`
          : language === 'en'
          ? `${number} post${number > 1 ? 's' : ''}`
          : `全${number}件`}
      </div>
    );
  };

  return (
    <div className={styles['search']}>
      <h1 className={styles['search__title']}>
        {language === 'en' ? 'Search' : '検索'}
      </h1>
      <div className={styles['search__filter']}>
        <div className={styles['search__filter__date']}>
          {renderYearSelect()}
          {year && year !== '00' ? renderMonthSelect() : null}
        </div>
        {renderCategories()}
        {tags.length ? renderTags() : null}
        {(year && year !== '00') || selectedCategory
          ? renderClearFilterButton()
          : null}
      </div>

      {renderCount()}
      <BlogList
        edges={blogs}
        filters={
          year || month || selectedCategory
            ? {
                year: year,
                month: month,
                selectedCategory: selectedCategory,
                selectedTags: selectedTags
              }
            : null
        }
      />
    </div>
  );
};

export default Search;
