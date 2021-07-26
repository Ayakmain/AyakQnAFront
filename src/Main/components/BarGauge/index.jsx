import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const BarGauge = () => {
  // const BarGauge = ({ location }) => {
  // const gauge = location.pathname.split('/')[2];

  return (
    <div className={cx('bar')}>
      <div className={cx('bar__gauge')} />
    </div>
  );
};

export default withRouter(BarGauge);
