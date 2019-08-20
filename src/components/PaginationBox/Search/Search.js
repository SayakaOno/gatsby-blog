// @flow
import React, { useState } from 'react';
import { Link } from 'gatsby';
import styles from './Search.module.scss';

type Props = {
  prevPagePath: string,
  nextPagePath: string,
  hasNextPage: boolean,
  hasPrevPage: boolean
};

const Search = ({ currentPage, language, dates }: Props) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const searchPage = () => {
    if (!year) {
      return;
    }
    let date = null;
    if (!month || month == '00') {
      date = +(year.toString() + '12');
    } else {
      date = +(year.toString() + month.toString());
    }
    if (typeof dates[0] !== 'object') {
      for (let i = 0; i < dates.length; i++) {
        let postedDate = +(dates[i].substr(0, 4) + dates[i].substr(5, 2));
        if (i === 0 && postedDate < date) {
          return 0;
        }
        if (date > postedDate) {
          return i - 1;
        }
        if (i === dates.length - 1) {
          return i;
        }
        if (date === postedDate) {
          return i;
        }
      }
    } else {
      for (let i = 0; i < dates.length; i++) {
        let postedDate = +(dates[i][0].substr(0, 4) + dates[i][0].substr(5, 2));
        if (i === 0 && postedDate < date) {
          return 0;
        }
        if (date > postedDate) {
          return i - 1;
        }
        if (i === dates.length - 1) {
          return i;
        }
        if (
          date <= postedDate &&
          date >= +(dates[i][0].substr(0, 4) + dates[i][1].substr(5, 2))
        ) {
          return i;
        }
      }
    }
  };

  const getLink = () => {
    let page = searchPage();
    if (!page) {
      return language === 'en' ? '/' : '/ja';
    }
    return `/page/${searchPage()}${language === 'en' ? '' : '/ja'}`;
  };

  const renderYearSelectBox = () => {
    let yearOptions = [];
    let start = null;

    if (typeof dates[0] === 'object') {
      start = +dates[0][0].substr(0, 4);
    } else {
      start = +dates[0].substr(0, 4);
    }
    let end = null;
    if (typeof dates[dates.length - 1] === 'object') {
      end = +dates[dates.length - 1][dates[dates.length - 1].length - 1].substr(
        0,
        4
      );
    } else {
      end = +dates[dates.length - 1].substr(0, 4);
    }
    for (let i = start; i >= end; i--) {
      yearOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return (
      <select value={year} onChange={() => setYear(event.target.value)}>
        <option key="00" value="00">
          {language === 'en' ? 'Year' : '年'}
        </option>
        {yearOptions.map(option => option)}
      </select>
    );
  };

  const renderMonthSelectBox = language => {
    if (language === 'en') {
      return (
        <select value={month} onChange={() => setMonth(event.target.value)}>
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
      <select value={month} onChange={() => setMonth(event.target.value)}>
        <option key="00" value="00">
          月
        </option>
        {options.map(option => option)}
      </select>
    );
  };

  const renderResult = () => {
    return year && year !== '00' ? (
      searchPage() === currentPage ? (
        <p>
          {language === 'en'
            ? 'You are on the right page :)'
            : 'こちらがお探しのページです！'}
        </p>
      ) : (
        <Link to={getLink()} className={styles['search__select__link']}>
          {language === 'en'
            ? `Go to page ${searchPage() + 1}`
            : `${searchPage() + 1}ページへ`}
        </Link>
      )
    ) : month && month !== '00' ? (
      <p>
        {language === 'en' ? 'Please select year.' : '年をお選びください。'}
      </p>
    ) : null;
  };

  return (
    <div className={styles['search']}>
      <p>
        {language === 'en'
          ? 'Search by year and month?'
          : 'いつのブログをお探しですか？'}
      </p>
      <div className={styles['search__select']}>
        {renderYearSelectBox()}
        {renderMonthSelectBox(language)}
      </div>
      {renderResult()}
    </div>
  );
};

export default Search;
