import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Button } from 'components';
import Logo from "static/images/logo.png";
import Facebook from "static/images/facebook.png";
import Insta from 'static/images/insta.png';
import Kakao from 'static/images/kakao.png';
import Link from 'static/images/link.png';
// import Close from 'static/images/x.png';

const cx = classNames.bind(styles);

const PublicPopup = ({ name }) => {
  return (
    <div className={cx('popup__wrap')}>
      <div className={cx('public')}>
        <div className={cx('public__header')}>
          <img className={cx('public__header--logo')} src={Logo} alt="아약 로고" />
          <h3 className={cx('public__header--title')}>
            <span>{name}</span> 님의 <br />
            맞춤형 결과 공유하기
          </h3>
        </div>
        <ul className={cx('public__btn')}>
          <li className={cx('public__btn--list')}>
            <Button>
              <img className={cx('public__btn--list--img')} src={Facebook} alt="Facebook 공유하기" />
              <span className={cx('public__btn--list--span')} >페이스북 공유</span>
            </Button>
          </li>
          <li className={cx('public__btn--list')}>
            <Button>
              <img className={cx('public__btn--list--img')} src={Insta} alt="Insta 공유하기" />
              <span className={cx('public__btn--list--span')} >인스타 공유</span>
            </Button>
          </li>
          <li className={cx('public__btn--list')}>
            <Button>
              <img className={cx('public__btn--list--img')} src={Kakao} alt="Kakao 공유하기" />
              <span className={cx('public__btn--list--span')} >카카오 공유</span>
            </Button>
          </li>
          <li className={cx('public__btn--list')}>
            <Button>
              <img className={cx('public__btn--list--img')} src={Link} alt="Link 공유하기" />
              <span className={cx('public__btn--list--span')} >링크복사</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default withRouter(PublicPopup);