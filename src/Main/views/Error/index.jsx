import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Logo from 'static/images/logo.png';
import { Button } from 'components/index';

const cx = classNames.bind(styles);

const Error = ({ url }) => {
  return (
    <div className={cx('main')}>
      <img src={Logo} alt="" />
      <span>{url}은 잘못된 경로 입니다</span>
      <Button to='/'>메인으로 돌아가기</Button>
    </div>
  );
};

export default withRouter(Error);