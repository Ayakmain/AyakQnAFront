import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Img from 'static/images/image1.png';

const cx = classNames.bind(styles);

const InfoIntro = ({ info }) =>
  info.name ? (
    <article className={cx('qna')}>
      <section className={cx('qna__info')}>
        <span className={cx('qna__info--intro')}>
          반갑습니다! {info.name}님,
        </span>
        <div className={cx('qna__info--img')}>
          <img src={Img} alt="약사 이미지" />
        </div>
        <p className={cx('qna__info--intro')}>
          당신의 영양을 담당하게 된 <br />
          <span>제시카</span> 약사 입니다.
        </p>
      </section>
    </article >
  ) : <Redirect to={{ pathname: '/info/name' }} />;

export default withRouter(InfoIntro);