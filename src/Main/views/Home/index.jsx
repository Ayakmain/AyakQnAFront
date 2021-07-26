import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Image from 'static/images/image-small.png';
import { Button, MetaTag } from 'components/index';

const cx = classNames.bind(styles);

const Home = () => (
  <article className={cx('home')}>
    <MetaTag
      keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
      description="아약 맞춤형 추천"
      title="아약 맞춤형 추천"
    />
    <section className={cx('home__main')}>
      <span className={cx('home__main--text')}>
        당신의 아는약사가 <br />
        <strong>영양제</strong>를 <br />
        설계해 드립니다.
      </span>
      <Button className={cx('home__main--btn')} to="/info/name">
        시작하기
      </Button>
    </section>
    <div className={cx('home__intro')}>
      자세한 진단 및 치료는 전문적인 의료기관을 이용하세요.
    </div>
    <div className={cx('home__introImg')}>
      <img src={Image} alt="AI약사 이미지" />
      <span>
        <strong>제시카</strong> | 약사
      </span>
    </div>
    <div className={cx('home__footer')} />
  </article>
);

export default withRouter(Home);
