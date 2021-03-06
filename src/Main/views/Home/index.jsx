import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from 'static/images/image-small.png';
import { Button, MetaTag } from 'components/index';
import styles from './stylesheet.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { localStorage } from 'common/env';

const cx = classNames.bind(styles);

const Home = () => {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    localStorage('nutrition', '', []);
    localStorage('qa', '', []);
  }, []);

  return (
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
        <Button className={cx('home__main--btn')} to="/intro/Basics">
          시작하기
        </Button>
      </section>
      <div className={cx('home__intro')}>
        자세한 진단 및 치료는 전문적인 의료기관을 이용하세요.
      </div>
      <Button
        className={cx('home__introImg')}
        onClick={() => setToggle(!toggle)}
      >
        <div className={cx('home__introImg--ani')}>
          <img src={Image} alt="약사 이미지" />
        </div>
        <span>
          <strong>아약쌤</strong>
        </span>
      </Button>
      {toggle && (
        <div className={cx('home__popup')}>
          <span className={cx('home__popup--span')}>
            약사들이 설계한 질문을 기반으로 고객님께 꼭 필요한 영양소를
            추천해드릴게요!
            {/* <br />
            <br />
            지금까지 31,286명이 추천받았습니다. */}
          </span>
        </div>
      )}
      <div className={cx('home__footer')} />
    </article>
  );
};

export default withRouter(Home);
