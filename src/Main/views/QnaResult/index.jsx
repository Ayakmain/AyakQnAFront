import React, { useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import moment from 'moment';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Publish from 'static/images/publish.png';
import AD from 'static/images/ad.jpeg';
import { Button, MetaTag } from 'components';
import { ResultList, PublicPopup } from './components';
import { Nutrient } from 'static/json/list';

const cx = classNames.bind(styles);

const QnaResult = ({ user }) => {
  const [result, setResult] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [percent, setPercent] = useState(0);
  const [bmi, setBmi] = useState(0);

  useEffect(() => {
    let list = Nutrient.filter(
      item =>
        item.type === 'vitaminC' ||
        item.type === 'omega3' ||
        item.type === 'probiotics' ||
        item.type === 'vitaminB' ||
        item.type === 'lutein' ||
        item.type === 'milkThistle'
    );
    setResult(list);

    // BMI 계산하는 부분
    let bmiNum = (
      user.weight /
      ((user.height / 100) * (user.height / 100))
    ).toFixed(2);
    setBmi(bmiNum);
    // BMI 지수가 30보다 작을때
    let bmiPercent = (bmiNum / 30) * 100;
    if (bmiNum <= 30) {
      setPercent(bmiPercent - 20);
    } else {
      // 80% 더해주기 20% 내에서 나머지 BMI계산해주어야함
      setPercent(((bmiNum / 100) * 100) / 5 + 80);
    }
  }, [user]);

  const toggleFunc = () => setToggle(!toggle);
  // 상담하기 버튼 눌렀을 때 작동되는 것
  const resultFunc = () => {
    if (window.innerWidth >= 800) {
    }
  };

  return (
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
              {/* TODO: 이부분 Back에서 데이터 받아올것 */}
              {moment().format('YYYY') - user.birth + 1}
            </li>
            <li className={cx('result__header--info--item')}>
              <strong>BMI</strong>
              {/* 이부분 BMI 계산 결과값 추출해야함 */}
              {bmi}
            </li>
          </ul>
          <ul className={cx('result__header--bmi')}>
            <li
              className={cx(
                'result__header--bmi--list',
                percent < 20 && 'select'
              )}
            >
              저체중
            </li>
            <li
              className={cx(
                'result__header--bmi--list',
                percent >= 20 && percent < 40 && 'select'
              )}
            >
              정상
            </li>
            <li
              className={cx(
                'result__header--bmi--list',
                percent >= 40 && percent < 60 && 'select'
              )}
            >
              과체중
            </li>
            <li
              className={cx(
                'result__header--bmi--list',
                percent >= 60 && percent < 80 && 'select'
              )}
            >
              비만
            </li>
            <li
              className={cx(
                'result__header--bmi--list',
                percent >= 80 && 'select'
              )}
            >
              중도비만
            </li>
          </ul>
          <div className={cx('result__header--section')}>
            <ul className={cx('result__header--bmi', 'result__header--wrap')}>
              <li
                className={cx(
                  'result__header--bmi--list',
                  'result__header--bmi--gauge'
                )}
              />
              <li
                className={cx(
                  'result__header--bmi--list',
                  'result__header--bmi--gauge'
                )}
              />
              <li
                className={cx(
                  'result__header--bmi--list',
                  'result__header--bmi--gauge'
                )}
              />
              <li
                className={cx(
                  'result__header--bmi--list',
                  'result__header--bmi--gauge'
                )}
              />
              <li
                className={cx(
                  'result__header--bmi--list',
                  'result__header--bmi--gauge'
                )}
              />
            </ul>
            <div
              className={cx('result__header--section--gauge')}
              style={{
                width: `${percent}%`,
                maxWidth: '101%',
              }}
            />
          </div>
          {/* TODO: 이부분 데이터 필요함 */}
          <span className={cx('result__header--intro')}>
            건강한 신체를 위하여 체중관리를 하시는걸 추천 드립니다.
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
        <Button className={cx('result__control--pulish')} onClick={toggleFunc}>
          <img src={Publish} alt="공유하기 버튼" />
        </Button>
        <Button className={cx('result__control--confirm')} onClick={resultFunc}>
          상담하기
        </Button>
      </section>
      {toggle && <PublicPopup name={user.name} toggleFunc={toggleFunc} />}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { user: state.env.user };
};

export default connect(mapStateToProps, envActions)(withRouter(QnaResult));
