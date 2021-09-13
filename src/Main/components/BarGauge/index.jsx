/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const BarGauge = ({ location, user }) => {
  const { pathname } = location;
  const qa = JSON.parse(window.localStorage.getItem('qa'));
  const [percent, setPercent] = useState(0);
  const [pageList, setPageList] = useState([
    '/qna',
    '/height',
    '/weight',
    '/healthy',
    '/sunning',
    '/smoke',
    '/drink',
    '/know',
    '/email',
  ]);
  const [toggle, setToggle] = useState(false);

  const percentFunc = (prevPercent, totalLength) => {
    return setPercent(prevPercent + (1 / Number(totalLength)) * 100);
  };

  useEffect(() => {
    setPageList(pageList.splice(1, 0, ...qa.map(item => `/qna/${item.type}`)));
    let totalLength = 11;

    if (user.gender === 'female') {
      totalLength += 2;
      pageList.splice(7, 0, ...['/pregnant', '/pms']);
    }

    if (qa.length) {
      totalLength += qa.length;
    }

    if (pathname === '/qna') {
      return percentFunc(0, totalLength);
    }
    percentFunc(
      (Number(pageList.indexOf(pathname) - 1) / Number(totalLength)) * 100,
      totalLength
    );

    if (pathname !== '/qna') {
      return setTimeout(() => {
        setToggle(true);
        return percentFunc(
          (Number(pageList.indexOf(pathname)) / Number(totalLength)) * 100,
          totalLength
        );
      }, 500);
    }
  }, [pathname]);

  return (
    <div className={cx('bar')}>
      <div
        className={cx('bar__gauge', toggle && 'bar__ani')}
        style={{
          width: `${percent}%`,
        }}
      />
    </div>
  );
};

const mapStateToProps = state => ({ user: state.env.user });

export default connect(mapStateToProps, envActions)(withRouter(BarGauge));
