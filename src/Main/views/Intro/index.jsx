import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { MetaTag } from 'components/index';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const InfoIntro = ({ history, location }) => {
  const { pathname } = location;
  const pageName = pathname.split('/')[2];
  useEffect(() => {
    pageName === 'Basic'
      ? setTimeout(() => history.push('/info/name'), 3000)
      : pageName === 'Symptom'
      ? setTimeout(() => history.push('/qna'), 3000)
      : setTimeout(() => history.push('/height'), 3000);
  }, [history, pageName]);

  return (
    <article
      className={
        (cx('intro'),
        pageName === 'Basic'
          ? cx('basic')
          : pageName === 'Symptom'
          ? cx('symptom')
          : cx('life'))
      }
    >
      <MetaTag
        keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
        description="아약 맞춤형 추천"
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
              고객님의 필요한 영양소 설계를 위해
              <br />몇 가지 질물을 드리겠습니다.
            </Fragment>
          )}
        </div>
      </section>
    </article>
  );
};

export default withRouter(InfoIntro);
