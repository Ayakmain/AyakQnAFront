import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Logo from 'static/images/logo.png';
import Publish from 'static/images/publish.png';
import { Button } from 'components';
import moment from 'moment';
import { ResultList } from "./components";

const cx = classNames.bind(styles);

const QnaResult = ({ info, location }) => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    setResult([{
      name: "루테인",
      descriptions: ['눈 건강에 도움', '유산균증식 및 유해균 억제', '배변 활동 원활에 도움']
    }, {
      name: "루테인",
      descriptions: ['눈 건강에 도움', '유산균증식 및 유해균 억제', '배변 활동 원활에 도움']
    }, {
      name: "루테인",
      descriptions: ['눈 건강에 도움', '유산균증식 및 유해균 억제', '배변 활동 원활에 도움']
    }, {
      name: "루테인",
      descriptions: ['눈 건강에 도움', '유산균증식 및 유해균 억제', '배변 활동 원활에 도움']
    }])
  }, []);

  return (
    <article className={cx('result')}>
      <section className={cx('result__header')}>
        <img className={cx('result__header--logo')} src={Logo} alt="메인 로고" />
        <div className={cx('result__header--title')}>
          <h3>
            <span>{info.name}</span> 님의 처방전
          </h3>
          {/* TODO: 이부분 나중에 데이터에서 저장한 날짜로 받아와야함 */}
          <p>DATE: {moment().format('YYYY.MM.DD')}</p>
        </div>
      </section>
      <ResultList result={result} />
      <section className={cx('result__control')}>
        <Button className={cx('result__control--pulish')}><img src={Publish} alt="공유하기 버튼" /></Button>
        <Button className={cx('result__control--confirm')}>선택완료</Button>
      </section>
    </article >
  )
};

export default withRouter(QnaResult);