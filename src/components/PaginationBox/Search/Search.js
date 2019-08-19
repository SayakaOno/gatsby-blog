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

const Search = ({ language, dates }: Props) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const renderYearSelectBox = () => {
    let yearOptions = [];
    let start = +dates[0][0].substr(0, 4);
    let end = +dates[dates.length - 1][
      dates[dates.length - 1].length - 1
    ].substr(0, 4);
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
      <select value={month} onChange={onMonthSelect}>
        <option key="00" value="00">
          月
        </option>
        {options.map(option => option)}
      </select>
    );
  };

  const searchPage = () => {
    console.log(year, month);
    if (!year) {
      return;
    }
    let date = null;
    if (!month || month == '00') {
      date = +(year.toString() + '12');
      console.log(date);
    } else {
      date = +(year.toString() + month.toString());
    }
    for (let i = 0; i < dates.length; i++) {
      if (
        i === 0 &&
        dates[i][0].substr(0, 4) + dates[i][0].substr(5, 2) < date
      ) {
        console.log('1', dates[i][0].substr(0, 4) + dates[i][0].substr(5, 2));
        return 0;
      }
      if (date > +(dates[i][0].substr(0, 4) + dates[i][0].substr(5, 2))) {
        console.log('2');
        return i - 1;
      }
      if (i === dates.length - 1) {
        console.log('4');
        return i;
      }
      if (
        date <= +(dates[i][0].substr(0, 4) + dates[i][0].substr(5, 2)) &&
        date >= +(dates[i][0].substr(0, 4) + dates[i][1].substr(5, 2))
      ) {
        console.log('3');
        return i;
      }
    }
  };

  const getLink = () => {
    let page = searchPage();
    if (!page) {
      return language === 'en' ? '/' : '/ja';
    }
    return `/${language === 'en' ? '' : 'ja/'}page/${searchPage()}`;
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
      {year && year !== '00' ? (
        <Link to={getLink()} className={styles['search__select__link']}>
          {language === 'en'
            ? `Go to page ${searchPage() + 1}`
            : `${searchPage() + 1}ページへ`}
        </Link>
      ) : month && month !== '00' ? (
        <p>
          {language === 'en' ? 'Please select year.' : '年をお選びください。'}
        </p>
      ) : null}
    </div>
  );
};

export default Search;
