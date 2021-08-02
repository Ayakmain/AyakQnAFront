import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import classNames from 'classnames/bind';
import { InfoQuestion, InfoControl } from 'Main/components';
import moment from 'moment';
import { isEmail } from 'common/util';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const InfoQna = ({ history, location, user, setUser }) => {
  // localhost에서 user 가져오기
  const localUser = JSON.parse(window.localStorage.getItem('user'));

  const [pageName] = useState(location.pathname.split('/')[2]);
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

  const localStorageUpdate = (type, value) => {
    setUser({ ...user, [type]: value });
    return window.localStorage.setItem(
      'user',
      JSON.stringify({ ...user, [type]: value })
    );
  };

  // const initialData = () => {};

  // Local에 저장되어 있는 값 state에 저장
  // name이 없으면 이름 입력창으로 이동xw
  useEffect(() => {
    // /info/name이 아니고 localstorage가 없거나 localStorage.name이 없을 시에 되돌려주는 부분
    if (pageName === 'name' && user.name === '' && localUser.name === '') {
      return history.push('/info/name');
    }
    // localStorage에 데이터가 있으면 User에 데이터 넣어준다.
    if (localUser) {
      return setUser({ ...localUser });
    }
    // 위의 두 상황이 아닐때 user업데이트 해주는 부분
    return window.localStorage.setItem('user', JSON.stringify({ ...user }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName, location, history]);

  // /info/age 일 때 년도를 불러 주는 부분
  useEffect(() => pageName === 'age' && YEARS(), [pageName]);

  const controlFunc = (type, value) => {
    type === 'year' && setToggle(false);
    return setUser({ ...user, [type]: value });
  };

  const confirm = (type, value) => {
    switch (type) {
      case 'sex':
        localStorageUpdate(type, value);
        return history.push('/info/age');
      case 'birth':
        if (user.birth !== '') {
          localStorageUpdate(type, user.birth);
          return history.push('/qna');
        }
        break;
      case 'email':
        if (isEmail(value)) {
          localStorageUpdate(type, value);
          // TODO: 이부분에서 이메일 체크하고 이메일 보내는 API 적용해야함
          return history.push('/result');
        }
        break;

      default:
        localStorageUpdate(type, value);
        return history.push('/info/intro');
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

const mapStateToProps = state => ({ user: state.env.user });

export default connect(mapStateToProps, envActions)(withRouter(InfoQna));
