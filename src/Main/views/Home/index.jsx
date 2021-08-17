import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from 'static/images/image-small.png';
import { Button, MetaTag } from 'components/index';
import styles from './stylesheet.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Home = () => {
  const [toggle, setToggle] = useState(false);

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
        <Button className={cx('home__main--btn')} to="/intro/Basic">
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
        <img src={Image} alt="AI약사 이미지" />
        {/* <span>
        <strong>제시카</strong> | 약사
      </span> */}
      </Button>
      {toggle && (
        <div className={cx('home__popup')}>
          <span className={cx('home__popup--span')}>
            이 설문 조사는 약사님들이 설계한 질문지로 당신의 건강을 체크할 수
            있습니다.
          </span>
        </div>
      )}
      <div className={cx('home__footer')} />
    </article>
  );
};

export default withRouter(Home);
