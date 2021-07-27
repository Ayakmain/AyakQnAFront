import React, { useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { actions as envActions } from 'store/reducers/env';
import moment from 'moment';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Logo from 'static/images/logo.png';
import Publish from 'static/images/publish.png';
import { Button, MetaTag } from 'components';
import { ResultList, PublicPopup } from './components';
import { Nutrient } from 'static/json/list';

const cx = classNames.bind(styles);

const QnaResult = ({ user }) => {
  const [result, setResult] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    let list = Nutrient.filter(
      item => item.type === 'lutein' || item.type === 'omega3'
    );
    setResult(list);
  }, []);

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
          <img
            className={cx('result__header--logo')}
            src={Logo}
            alt="메인 로고"
          />
          <div className={cx('result__header--title')}>
            <h3>
              <span>{user.name}</span> 님의 처방전
            </h3>
            {/* TODO: 이부분 나중에 데이터에서 저장한 날짜로 받아와야함 */}
            <p>DATE: {moment().format('YYYY.MM.DD')}</p>
          </div>
        </section>
        <section className={cx('result__list')}>
          {result.length > 0 &&
            result.map((item, i) => <ResultList key={i} item={item} />)}
        </section>
      </article>
      <section className={cx('result__control')}>
        <Button className={cx('result__control--pulish')} onClick={toggleFunc}>
          <img src={Publish} alt="공유하기 버튼" />
        </Button>
        <Button className={cx('result__control--confirm')}>선택완료</Button>
      </section>
      {toggle && <PublicPopup name={user.name} toggleFunc={toggleFunc} />}
    </Fragment>
  );
};

// const mapStateToProps = state => {
//   return { user: state.env.user };
// };

// export default connect(mapStateToProps, envActions)(withRouter(QnaResult));
export default withRouter(QnaResult);
