import React, { useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Img from 'static/images/image1.png';
import { MetaTag } from 'components/index';
const cx = classNames.bind(styles);

const InfoIntro = ({ info, history }) => {
  useEffect(() => setTimeout(() => history.push('/info/sex'), 3000), [history]);

  return info.name ? (
    <article className={cx('intro')}>
      <MetaTag
        keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
        description="아약 맞춤형 추천"
        title="아약 맞춤형 추천"
      />
      <section className={cx('intro__info')}>
        <span className={cx('intro__info--intro')}>
          반갑습니다! {info.name}님,
        </span>
        <div className={cx('intro__info--img')}>
          <img src={Img} alt="약사 이미지" />
        </div>
        <p className={cx('intro__info--intro')}>
          당신의 영양을 담당하게 된 <br />
          <span>제시카</span> 약사 입니다.
        </p>
      </section>
    </article>
  ) : (
    <Redirect to={{ pathname: '/info/name' }} />
  );
};
export default withRouter(InfoIntro);
