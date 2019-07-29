// @flow
import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import styles from './Menu.module.scss';
import { LanguageContext, getLanguage } from '../../../utils/languageContext';

type Props = {
  menu: {
    label: string,
    path: string
  }[]
};

const Menu = ({ menu }: Props) => {
  const { language } = useContext(LanguageContext);

  return (
    <Location>
      {({ location }) => {
        return (
          <nav className={styles['menu']}>
            <ul className={styles['menu__list']}>
              {menu.map(item => (
                <li className={styles['menu__list-item']} key={item.path}>
                  <Link
                    to={item.path}
                    className={styles['menu__list-item-link']}
                    activeClassName={styles['menu__list-item-link--active']}
                  >
                    {item.label[getLanguage(location.pathname)]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        );
      }}
    </Location>
  );
};

export default Menu;
