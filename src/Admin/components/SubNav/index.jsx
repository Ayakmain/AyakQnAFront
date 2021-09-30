import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Button } from 'components/index';

const cx = classNames.bind(styles);

const SubNav = ({ setToggle, toggle }) => (
  <ul className={cx('admin--sub--nav')}>
    <li className={cx('admin--sub--nav--item')}>
      <Button
        onClick={() => setToggle(false)}
        className={cx('admin--sub--nav--item--btn', !toggle && 'active')}
      >
        차트로 보기
      </Button>
    </li>
    <li className={cx('admin--sub--nav--item')}>
      <Button
        onClick={() => setToggle(true)}
        className={cx('admin--sub--nav--item--btn', toggle && 'active')}
      >
        리스트로 보기
      </Button>
    </li>
  </ul>
);

export default withRouter(SubNav);
