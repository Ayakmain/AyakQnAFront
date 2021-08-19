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
// import { ResultList, PublicPopup } from './components';
import { PublicPopup } from './components';
import { Nutrient } from 'static/json/list';
import Logo from 'static/images/logo.png';

const cx = classNames.bind(styles);

const QnaResult = ({ user }) => {
  const [result, setResult] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    let list = Nutrient.filter(
      item =>
        item.type === 'lutein' ||
        item.type === 'omega3' ||
        item.type === 'milkThistle'
    );
    setResult(list);
  }, []);

  // TODO: 반응형 끝내고 List마다 색 다른것 적용해야함

  const toggleFunc = () => setToggle(!toggle);

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
              {user.sex === 'male' ? '남성' : '여성'}
            </li>
            <li className={cx('result__header--info--item')}>
              <strong>나이</strong>
              {/* TODO: 이부분 Back에서 데이터 받아올것 */}
              {moment().format('YYYY') - user.birth + 1}
            </li>
            <li className={cx('result__header--info--item')}>
              <strong>BMI</strong>
              {/* 이부분 BMI 계산 결과값 추출해야함 */}
              22.3
            </li>
          </ul>

          <ul className={cx('result__header--bmi')}>
            <li className={cx('result__header--bmi--list')}>저체중</li>
            <li className={cx('result__header--bmi--list')}>정상</li>
            <li className={cx('result__header--bmi--list')}>과체중</li>
            <li className={cx('result__header--bmi--list')}>비만</li>
            <li className={cx('result__header--bmi--list')}>중도비만</li>
          </ul>
          <ul className={cx('result__header--bmi', 'result__header--wrap')}>
            <li className={cx('result__header--bmi--list')}>
              <div className={cx('result__header--bmi--list--gauge')} />
            </li>
            <li className={cx('result__header--bmi--list')}>
              <div className={cx('result__header--bmi--list--gauge')} />
            </li>
            <li className={cx('result__header--bmi--list')}>
              <div className={cx('result__header--bmi--list--gauge')} />
            </li>
            <li className={cx('result__header--bmi--list')}>
              <div className={cx('result__header--bmi--list--gauge')} />
            </li>
            <li className={cx('result__header--bmi--list')}>
              <div className={cx('result__header--bmi--list--gauge')} />
            </li>
          </ul>
          <span className={cx('result__header--intro')}>
            건강한 신체를 위하여 체중관리를 하시는걸 추천 드립니다.
          </span>
        </section>
        {/* 영양제 보여주는 부분 */}
        <section className={cx('result__list')}>
          <span className={cx('result__list--title')}>
            <strong>{user.name}</strong>님을 위한 추천영양성분
          </span>
          {result.length > 0 &&
            result.map(
              (item, i) => (
                <div className={cx('result__list--map')} key={i}>
                  <div className={cx('result__list--map--cover')}>
                    <img
                      className={cx('result__list--map--cover--img')}
                      src={Logo}
                      alt="대표 알약 이미지"
                    />
                  </div>
                  <div className={cx('result__list--map--info')}>
                    <span className={cx('result__list--map--info--header')}>
                      추천영양성분
                    </span>
                    <div className={cx('result__list--map--info--name')}>
                      <strong>{item.name}</strong>
                      <span>{item.type}</span>
                    </div>
                    <ul>
                      {item.hashtags.map(hashtag => (
                        <li
                          className={cx('result__list--map--info--description')}
                        >
                          {hashtag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
              // <ResultList key={i} item={item} />
            )}
        </section>
        <section className={cx('result__ad')}>
          <img src={AD} alt="광고 사진" />
        </section>
      </article>
      <section className={cx('result__control')}>
        <Button className={cx('result__control--pulish')} onClick={toggleFunc}>
          <img src={Publish} alt="공유하기 버튼" />
        </Button>
        <Button className={cx('result__control--confirm')}>상담하기</Button>
      </section>
      {toggle && <PublicPopup name={user.name} toggleFunc={toggleFunc} />}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { user: state.env.user };
};

export default connect(mapStateToProps, envActions)(withRouter(QnaResult));
