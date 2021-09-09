import React, { useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Publish from 'static/images/publish.png';
import AD from 'static/images/ad.jpeg';
import { Button, MetaTag } from 'components';
import { ResultList, PublicPopup, BMIControl } from './components';
import { ResultApi } from 'api';

const cx = classNames.bind(styles);

const QnaResult = ({ match }) => {
  const [result, setResult] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [percent, setPercent] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    ResultApi.get(match.params._id)
      .then(({ result }) => {
        setResult(result.nutritions);
        bmiPercent(result.author.bmi);
        return setUser(result.author);
      })
      .then(() => {
        // 보안상 local에 있는 데이터 삭제 해주는 부분
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('staticData');
        window.localStorage.removeItem('nutrition');
        window.localStorage.removeItem('qa');
        window.localStorage.removeItem('result');
      });
  }, [match.params._id]);

  const bmiPercent = bmiNum => {
    // 20% 내에서 나머지 BMI계산해주어야함
    if (bmiNum <= 18.5) {
      setPercent(((bmiNum / 100) * 100) / 5);
    } else if (bmiNum > 18.5 && bmiNum <= 23) {
      setPercent(((bmiNum / 100) * 100) / 5 + 20);
    } else if (bmiNum > 23 && bmiNum <= 25) {
      setPercent(((bmiNum / 100) * 100) / 5 + 40);
    } else if (bmiNum > 25 && bmiNum <= 30) {
      setPercent(((bmiNum / 100) * 100) / 5 + 60);
    } else {
      setPercent(((bmiNum / 100) * 100) / 5 + 80);
    }
  };

  const toggleFunc = () => setToggle(!toggle);

  return (
    user && (
      <Fragment>
        <MetaTag
          keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
          description="아약 맞춤형 추천"
          title="아약 맞춤형 추천 결과"
        />
        <article className={cx('result')}>
          <section className={cx('result__header')}>
            <div className={cx('result__header--title')}>
              <strong>{user.name}</strong>님의 <br />
              맞춤 영양제 리포트
            </div>
            <ul className={cx('result__header--info')}>
              <li className={cx('result__header--info--item')}>
                <strong>성별</strong>
                {user.gender === 'male' ? '남성' : '여성'}
              </li>
              <li className={cx('result__header--info--item')}>
                <strong>나이</strong>
                {user.age} 세
              </li>
              <li className={cx('result__header--info--item')}>
                <strong>BMI</strong>
                {user.bmi}
              </li>
            </ul>
            <BMIControl percent={percent} />
            {/* TODO: 이부분 데이터 필요함 */}
            <span className={cx('result__header--intro')}>
              건강한 신체를 위해 체중관리를 하시는 것을 추천 드립니다.
            </span>
          </section>
          {/* 영양제 보여주는 부분 */}
          {/* ADD: 이부분에 나중에 영양제 자세히보기 추가 할 예정 */}
          <section className={cx('result__list')}>
            <span className={cx('result__list--title')}>
              <strong>{user.name}</strong>님을 위한 추천영양성분
            </span>
            <ResultList result={result} />
          </section>
          <section className={cx('result__ad')}>
            <Button
              href={
                window.innerWidth < 800
                  ? 'http://m.ayak.kr/company/about.html'
                  : 'http://ayak.kr/company/about.html'
              }
            >
              <img src={AD} alt="광고 사진" />
            </Button>
          </section>
        </article>
        <section className={cx('result__control')}>
          <Button
            className={cx('result__control--pulish')}
            onClick={toggleFunc}
          >
            <img src={Publish} alt="공유하기 버튼" />
          </Button>
          <Button
            className={cx('result__control--confirm')}
            href={
              window.innerWidth < 800
                ? 'http://m.ayak.kr/company/about.html'
                : 'http://ayak.kr/company/about.html'
            }
          >
            상담하기
          </Button>
        </section>
        {toggle && <PublicPopup name={user.name} toggleFunc={toggleFunc} />}
      </Fragment>
    )
  );
};

const mapStateToProps = state => {
  return { user: state.env.user };
};

export default connect(mapStateToProps, envActions)(withRouter(QnaResult));
