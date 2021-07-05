import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Image from 'static/images/image-small.png';

const cx = classNames.bind(styles);

const Home = () => {

  return (
    <article className={cx('home')}>
      <section className={cx('home__main')}>
        <span className={cx('home__main--text')}>
          당신의 아는약사가 <br />
          <strong>영양제</strong>를 <br />
          설계해 드립니다.
        </span>
        <a className={cx('home__main--btn')} href='/info/name'>
          시작하기
        </a>
      </section>
      <div className={cx('home__intro')}>자세한 진단 및 치료는 전문적인 의료기관을 이용하세요.</div>
      <div className={cx('home__introImg')}>
        <img src={Image} alt="" />
        <span><strong>제시카</strong> | 약사</span>
      </div>
      <div className={cx('home__footer')} />
    </article>
  );
};

export default withRouter(Home);