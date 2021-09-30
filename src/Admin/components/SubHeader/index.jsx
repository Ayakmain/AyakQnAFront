import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const SubHeader = ({ header, subHeader }) => (
  <section className={cx('admin__user--header')}>
    <section className={cx('admin__user--header')}>
      <div className={cx('admin__user--header--div')}>{header}</div>
      <div className={cx('admin__user--header--count')}>{subHeader}</div>
    </section>
  </section>
);

export default withRouter(SubHeader);
