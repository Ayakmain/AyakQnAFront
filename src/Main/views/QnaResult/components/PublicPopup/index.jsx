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
import Close from 'static/images/x.png';

const cx = classNames.bind(styles);

const PublicPopup = ({ name, toggleFunc }) => {
  const copyUrl = text => {
    // 흐름 1.
    if (!document.queryCommandSupported("copy")) {
      return alert("복사하기가 지원되지 않는 브라우저입니다.");
    }

    // 흐름 2.
    const textarea = document.createElement("textarea");
    textarea.value = text;

    // 흐름 3.
    document.body.appendChild(textarea);
    // focus() -> 사파리 브라우저 서포팅
    textarea.focus();
    // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
    textarea.select();
    // 흐름 4.
    document.execCommand("copy");
    // 흐름 5.
    document.body.removeChild(textarea);
    alert("클립보드에 복사되었습니다.");
  };

  return (
    <div className={cx('popup__wrap')}>
      <div className={cx('public')}>
        <div className={cx('public__header')}>
          <img className={cx('public__header--logo')} src={Logo} alt="아약 로고" />
          <h3 className={cx('public__header--title')}>
            <strong>{name}</strong> 님의 <br />
            맞춤형 결과 공유하기
          </h3>
          <Button onClick={toggleFunc} className={cx('public__header--btn')}>
            <img className={cx('public__header--btn--img')} src={Close} alt="pop up창 닫기 버튼" />
          </Button>
        </div>
        <ul className={cx('public__btn')}>
          <li className={cx('public__btn--list')}>
            <Button onClick={() => console.log("Facebook 공유하기")}>
              <img className={cx('public__btn--list--img')} src={Facebook} alt="Facebook 공유하기" />
              <span className={cx('public__btn--list--span')} >페이스북 공유</span>
            </Button>
          </li>
          <li className={cx('public__btn--list')}>
            <Button onClick={() => console.log("Insta 공유하기")}>
              <img className={cx('public__btn--list--img')} src={Insta} alt="Insta 공유하기" />
              <span className={cx('public__btn--list--span')} >인스타 공유</span>
            </Button>
          </li>
          <li className={cx('public__btn--list')}>
            <Button onClick={() => console.log("Kakao 공유하기")}>
              <img className={cx('public__btn--list--img')} src={Kakao} alt="Kakao 공유하기" />
              <span className={cx('public__btn--list--span')} >카카오 공유</span>
            </Button>
          </li>
          <li className={cx('public__btn--list')}>
            <Button onClick={() => copyUrl(window.location.href)}>
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