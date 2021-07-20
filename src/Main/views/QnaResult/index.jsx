import React, { useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Logo from 'static/images/logo.png';
import Publish from 'static/images/publish.png';
import { Button } from 'components';
import moment from 'moment';
import { ResultList, PublicPopup } from "./components";
import { Nutrient } from "static/json/list";

const cx = classNames.bind(styles);

const QnaResult = ({ info }) => {
  const [result, setResult] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    let list = Nutrient.filter(item => item.type === 'lutein' || item.type === 'omega3');
    setResult(list);
  }, []);

  const toggleFunc = () => setToggle(!toggle);

  return (
    <Fragment>
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
      </article>
      <section className={cx('result__control')}>
        <Button className={cx('result__control--pulish')} onClick={toggleFunc}><img src={Publish} alt="공유하기 버튼" /></Button>
        <Button className={cx('result__control--confirm')}>선택완료</Button>
      </section>
      {
        toggle && <PublicPopup name={info.name} toggleFunc={toggleFunc} />
      }
    </Fragment >
  )
};

export default withRouter(QnaResult);