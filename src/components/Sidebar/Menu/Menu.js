// @flow
import React from 'react';
import { getIcon } from '../../../utils';
import Icon from '../../Icon';
import { Link } from 'gatsby';
import styles from './Menu.module.scss';

type Props = {
  menu: {
    label: string,
    path: string
  }[]
};

const Menu = ({ menu, language }: Props) => {
  return (
    <nav className={styles['menu']}>
      <ul className={styles['menu__list']}>
        {menu.map(item => (
          <li className={styles['menu__list-item']} key={item.path}>
            <Link
              to={`${item.path}${language === 'en' ? '' : '/ja'}`}
              className={styles['menu__list-item-link']}
              activeClassName={styles['menu__list-item-link--active']}
            >
              <Icon icon={getIcon(item.label.en.toLowerCase())} />
              {item.label[language]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
