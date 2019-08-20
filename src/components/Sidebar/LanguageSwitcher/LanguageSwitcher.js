// @flow
import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import styles from './LanguageSwitcher.module.scss';
import {
  pageExist,
  getCorrespondingPath
} from '../../../utils/get-corresponding-link';
import useTagsPathList from '../../../hooks/use-tags-path-list';
import useCategoriesPathList from '../../../hooks/use-categories-path-list';

const LanguageSwitcher = ({ link, language, path }) => {
  const [enLinkExist, setEnLinkExist] = useState(null);
  const [jaLinkExist, setJaLinkExist] = useState(null);
  const tagsPathList = path.includes('/tag/') ? useTagsPathList() : null;
  const categoriesPathList = path.includes('/category/')
    ? useCategoriesPathList()
    : null;
  const ref = React.createRef();
  // for github pages
  const PATH_PREFIX = '/gatsby-blog';

  useEffect(() => {
    if (link && !link.exist) {
      return;
    }
    if (path.includes('/category/') || path.includes('/tag/')) {
      if (
        pageExist(
          path,
          path.includes('/tag/') ? tagsPathList : categoriesPathList
        )
      ) {
        language === 'en' ? setJaLinkExist(true) : setEnLinkExist(true);
      }
      return;
    }
    if (language === 'en') {
      setJaLinkExist(true);
    } else {
      setEnLinkExist(true);
    }
  }, []);

  const otherLanguagePath = (language, currentPath) => {
    if (currentPath.includes('/page/')) {
      if (language === '/ja') {
        return '/';
      }
      return '/ja';
    } else if (
      currentPath.includes('/category/') ||
      currentPath.includes('/tag/')
    ) {
      return getCorrespondingPath(currentPath);
    }
    if (currentPath.includes('/ja')) {
      let path = currentPath.replace('/ja', '');
      // for github pages
      return path.replace(PATH_PREFIX, '');
    }
    let path = currentPath + '/ja';
    // for github pages
    return path.replace(PATH_PREFIX, '');
  };

  const languageOnClick = (clickedLang, displayedLanguage) => {
    if (clickedLang === displayedLanguage || (!enLinkExist && !jaLinkExist)) {
      return;
    }
    let path = '';
    if (link) {
      if (!link.exist) {
        return;
      }
      path = link.path;
    } else {
      path = otherLanguagePath(language, location.pathname);
    }
    ref.current.style.left = path.slice(-3) === '/ja' ? '50%' : '0';
    setTimeout(() => navigate(path), 30);
  };

  const pointerClassName = language => {
    if (language === 'en') {
      return enLinkExist
        ? styles['language-switcher__languages__pointer']
        : styles['language-switcher__languages__unavailable'];
    }
    return jaLinkExist
      ? styles['language-switcher__languages__pointer']
      : styles['language-switcher__languages__unavailable'];
  };
  return (
    <div className={styles['language-switcher']}>
      <div
        ref={ref}
        className={styles['language-switcher__back']}
        style={{ left: language === 'en' ? 0 : '50%' }}
      />
      <div className={styles['language-switcher__languages']}>
        <span
          onClick={() => languageOnClick('en', language)}
          className={`${
            language === 'en'
              ? styles['language-switcher__languages-active']
              : ''
          } ${pointerClassName('en')}`}
        >
          EN
        </span>
        <span
          onClick={() => languageOnClick('ja', language)}
          className={`${
            language === 'ja'
              ? styles['language-switcher__languages-active']
              : ''
          } ${pointerClassName('ja')}`}
        >
          日
        </span>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
