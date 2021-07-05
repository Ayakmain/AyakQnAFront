import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Logo from 'static/images/logo.png';
import Close from 'static/images/x.png';
import Back from 'static/images/arrow2.png';

const cx = classNames.bind(styles);


const Header = ({ location }) => {
  const pathName = location.pathname.split('/')[1];

  // TODO: 이 부분에 백을 눌렀을때 전페이지로 돌아가야함
  return pathName ? (
    <div className={cx('header')}>
      <button className={cx('header__btn')}>
        <img className={cx('header__btn--close')} src={Back} alt="메인 로고" />
      </button>

      <button className={cx('header__btn')}>
        <img className={cx('header__btn--close')} src={Close} alt="닫기 버튼" />
      </button>
    </div>
  ) : (
    <div className={cx('header')}>
      <img className={cx('header__logo')} src={Logo} alt="메인 로고" />

      <button className={cx('header__btn')}>
        <img className={cx('header__btn--close')} src={Close} alt="닫기 버튼" />
      </button>
    </div>
  )
};

export default withRouter(Header);