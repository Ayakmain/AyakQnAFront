import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { MetaTag } from 'components/index';
import Logo from 'static/images/logo.png';
import Basic from 'static/images/basicInfo.jpeg';
import Symptom from 'static/images/symptomInfo.jpeg';
import Life from 'static/images/lifeInfo.jpeg';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const InfoIntro = ({ history, location, user }) => {
  const { pathname } = location;
  const pageName = pathname.split('/')[2];
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    switch (pageName) {
      case 'Basics':
        setTimeout(() => history.push('/info/name'), 3000);
        break;
      case 'Symptoms':
        setTimeout(() => history.push('/qna'), 3000);
        break;
      case 'Lifestyle':
        setTimeout(() => history.push('/height'), 3000);
        break;
      default:
        setTimeout(() => setToggle(true), 1);
        setTimeout(() => history.push('/result'), 3000);
        break;
    }
  }, [history, pageName]);

  return pageName === 'result' ? (
    <article className={cx('intro')}>
      <section className={cx('intro__logo')}>
        <img
          className={cx('intro__logo--img')}
          src={Logo}
          alt="로딩페이지 Logo 이미지"
        />
        <div
          className={toggle ? cx('intro__logo--ani') : cx('intro__logo--cover')}
        />
      </section>
      <section className={cx('intro__section')}>
        <strong>{user.name}</strong>님의 <br />
        건강설문 결과를
        <br />
        분석 중입니다.
      </section>
      <section className={cx('intro__footer')}>잠시만 기다려 주세요</section>
    </article>
  ) : (
    <article
      className={cx('intro')}
      style={{
        background: `url(${
          pageName === 'Basic'
            ? Basic
            : pageName === 'Symptoms'
            ? Symptom
            : Life
        }) no-repeat`,
        backgroundSize: '101% 140%',
        width: '100%',
        height: '80%',
      }}
    >
      <MetaTag
        keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
        description="아약 맞춤형 추천 설문조사 인트로"
        title="아약 맞춤형 추천"
      />
      <section className={cx('intro__header')}>
        <div className={cx('intro__header--title')}>{pageName}</div>
      </section>
      <section className={cx('intro__info')}>
        <strong className={cx('intro__info--header')}>
          당신의 건강을 위한 시작
        </strong>
        <div className={cx('intro__info--intro')}>
          {pageName === 'symptom' ? (
            <Fragment>고객님의 요즘 고민은 무엇인가요?</Fragment>
          ) : (
            <Fragment>
              고객님께 필요한 영양소를 설계하기 위해
              <br />몇 가지 질문을 드리겠습니다.
            </Fragment>
          )}
        </div>
      </section>
    </article>
  );
};

const mapStateToProps = state => ({ user: state.env.user });

export default connect(mapStateToProps, envActions)(withRouter(InfoIntro));
