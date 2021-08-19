/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect } from 'react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const BarGauge = ({ location, match }) => {
  // const { pathname } = location;
  // const { qa } = match.params;
  // const [pageList, setList] = useState([
  //   'qna',
  //   'healthy',
  //   'sun',
  //   'smoke',
  //   'drink',
  //   'pregnant',
  //   'pms',
  //   'know',
  //   'email',
  // ]);
  // const qaList = JSON.parse(window.localStorage.getItem('qa'));

  // useEffect(() => {
  //   if (pathname.includes('/qna') && qa) {
  //     pageList.splice(1, 0, ...qaList.map(item => item.type));
  //     setList(pageList);
  //   }
  // }, [pathname]);
  // console.log(
  //   'pageList: ',
  //   (pageList.indexOf(qa ?? pathname.split('/')[1]) + 1 / pageList.length) * 100
  // );

  return (
    <div className={cx('bar')}>
      <div className={cx('bar__gauge')} />
    </div>
  );
};

export default withRouter(BarGauge);
