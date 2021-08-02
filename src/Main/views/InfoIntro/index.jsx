import React, { useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import classNames from 'classnames/bind';
import Img from 'static/images/image1.png';
import { MetaTag } from 'components/index';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const InfoIntro = ({ user, history }) => {
  useEffect(() => setTimeout(() => history.push('/info/sex'), 3000), [history]);

  return user.name ? (
    <article className={cx('intro')}>
      <MetaTag
        keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
        description="아약 맞춤형 추천"
        title="아약 맞춤형 추천"
      />
      <section className={cx('intro__info')}>
        <span className={cx('intro__info--intro')}>
          반갑습니다! {user.name}
          님,
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

const mapStateToProps = state => ({ user: state.env.user });

export default connect(mapStateToProps, envActions)(withRouter(InfoIntro));
