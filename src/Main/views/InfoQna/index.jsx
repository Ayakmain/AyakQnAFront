import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { InfoQuestion, InfoControl } from 'Main/components';
import moment from 'moment';

const cx = classNames.bind(styles);

const InfoQna = ({ history, location, user, setUser }) => {
  const pageName = location.pathname.split('/')[2];
  // localhost에서 user 가져오기
  let localStorage = JSON.parse(window.localStorage.getItem('user'));

  const [years, setYears] = useState([]);
  const [toggle, setToggle] = useState(false);

  const YEARS = () => {
    const yearList = [];
    const dateStart = moment().subtract(50, 'y');
    const dateEnd = moment();
    while (dateEnd.diff(dateStart, 'years') >= 0) {
      yearList.push(dateStart.format('YYYY'));
      dateStart.add(1, 'year');
    }
    yearList.reverse();
    return setYears(yearList);
  };

  // Local에 저장되어 있는 값 state에 저장
  // name이 없으면 이름 입력창으로 이동
  useEffect(() => {
    // /info/name이 아니고 localstorage가 없거나 localStorage.name이 없을 시에 되돌려주는 부분
    if (pageName !== 'name' && user.name === '' && localStorage.name === '') {
      return history.push('/info/name');
      // localStorage에 데이터가 있으면 User에 데이터 넣어준다.
    } else if (localStorage) {
      return setUser({ ...localStorage });
    } else {
      // 위의 두 상황이 아닐때 user업데이트 해주는 부분
      return window.localStorage.setItem('user', JSON.stringify({ ...user }));
    }
  }, [pageName, history]);

  // /info/age 일 때 년도를 불러 주는 부분
  useEffect(() => pageName === 'age' && YEARS(), [pageName]);

  const controlFunc = (type, value) => {
    type === 'year' && setToggle(false);
    return setUser({ ...user, [type]: value });
  };

  const confirm = (type, value) => {
    if (type === 'year' && user.birth !== '') {
      window.localStorage.setItem(
        'user',
        JSON.stringify({ ...user, [type]: user.birth })
      );
      setUser({ ...user, [type]: user.birth });
      return history.push('/qna');
    } else {
      window.localStorage.setItem(
        'user',
        JSON.stringify({ ...user, [type]: value })
      );
      setUser({ ...user, [type]: value });

      switch (type) {
        case 'name':
          return history.push('/info/intro');
        case 'sex':
          return history.push('/info/age');
        // TODO: 이부분에서 이메일 체크하고 이메일 보내는 API 적용해야함
        default:
          return history.push('/result');
      }
    }
  };

  return (
    <article className={cx('qna')} onClick={() => toggle && setToggle(false)}>
      <section className={cx('qna__info')}>
        <InfoQuestion
          name={user.name !== '' && user.name}
          pageName={pageName}
        />
        <InfoControl
          pageName={pageName}
          toggle={toggle}
          setToggle={setToggle}
          user={user}
          years={years}
          controlFunc={controlFunc}
          confirm={confirm}
        />
      </section>
    </article>
  );
};

const mapStateToProps = state => {
  return { user: state.env.user };
};

export default connect(mapStateToProps, envActions)(withRouter(InfoQna));
