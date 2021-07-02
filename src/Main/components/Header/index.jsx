import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Logo from 'static/images/logo.png';
import Close from 'static/images/x.png';

const cx = classNames.bind(styles);

const Header = () => {

  return (
    <div className={cx('header')}>
      <img className={cx('header__logo')} src={Logo} alt="메인 로고" />
      
      <button className={cx('header__btn')}>
        <img className={cx('header__btn--close')} src={Close} alt="닫기 버튼" />
      </button>
    </div>
  );
};

export default withRouter(Header);