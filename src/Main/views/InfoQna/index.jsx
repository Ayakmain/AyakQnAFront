import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import classNames from 'classnames/bind';
import { Question, InfoControl } from 'Main/components';
import moment from 'moment';
import { localStorage } from 'common/env';
// import { UserApi } from 'api';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const InfoQna = ({ history, location, user, setUser }) => {
  const [pageName] = useState(location.pathname);
  const [years, setYears] = useState([]);
  const [toggle, setToggle] = useState(false);

  const Years = () => {
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

  const localStorageUpdate = (data, url, controll) => {
    localStorage('user', data);
    if (controll === 'confirm') {
      return url && history.push(url);
    }
  };

  // Local에 저장되어 있는 값 state에 저장
  // name이 없으면 이름 입력창으로 이동xw
  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem('user'));
    // /info/name이 아니고 localstorage가 없거나 localStorage.name이 없을 시에 되돌려주는 부분
    if (
      pageName !== '/info/name' &&
      user.name === '' &&
      localUser.user === ''
    ) {
      return history.push('/info/name');
    }
    // /info/age 일 때 년도를 불러 주는 부분
    if (pageName === '/info/birth') {
      return Years();
    }
  }, [pageName, history, user]);

  const controlFunc = (type, value) => {
    type === 'year' && setToggle(false);
    return setUser({ ...user, [type]: value });
  };

  const confirm = type => {
    let userData = {
      name: user.name,
      birth: Number(user.birth),
      gender: user.gender,
    };

    switch (type) {
      case 'gender':
        return localStorageUpdate(userData, '/info/birth', 'confirm');
      case 'birth':
        if (user.birth) {
          // TODO: 이부분에서 User 생성해주기 <- UserApi 붙이기
          // return UserApi.post(userData).then(({ dataUser }) => {
          //   localStorageUpdate(dataUser, '/intro/Symptoms', 'confirm');
          //   console.log('dataUser: ', dataUser);
          //   console.log('userData: ', userData);
          //   setUser({ ...dataUser });
          return localStorageUpdate(userData, '/intro/Symptoms', 'confirm');
          // });
        } else {
          // TODO 오류메세지 넘겨줘야함
          return alert('날짜 입력');
          //  setError();
        }
      default:
        return localStorageUpdate(userData, '/info/gender', 'confirm');
    }
  };

  return (
    <article className={cx('qna')} onClick={() => toggle && setToggle(false)}>
      <section className={cx('qna__info')}>
        <Question name={user.name !== '' && user.name} pageName={pageName} />
        <InfoControl
          pageName={pageName.split('/')[2]}
          toggle={toggle}
          setToggle={setToggle}
          years={years}
          controlFunc={controlFunc}
          confirm={confirm}
          localStorageUpdate={localStorageUpdate}
        />
      </section>
    </article>
  );
};

const mapStateToProps = state => ({ user: state.env.user });

export default connect(mapStateToProps, envActions)(withRouter(InfoQna));
