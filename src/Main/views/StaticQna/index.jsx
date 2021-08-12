import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import classNames from 'classnames/bind';
import { Question, InfoControl } from 'Main/components';
import { localStorage } from 'common/env';
import { isEmail } from 'common/util';
import { BarGauge } from 'Main/components/index';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const StaticQna = ({ history, location, user, setUser }) => {
  const { pathname } = location;

  const localStorageUpdate = (type, value, url, controll) => {
    setUser({ ...user, [type]: value });
    localStorage('user', user, { ...user, [type]: value });
    if (controll === 'confirm') {
      return url && history.push(url);
    }
  };

  // Local에 저장되어 있는 값 state에 저장
  // name이 없으면 이름 입력창으로 이동xw
  useEffect(() => {}, [pathname, history, user]);

  const confirm = (type, value) => {
    switch (type) {
      case 'height':
        return localStorageUpdate(type, value, '/weight', 'confirm');
      case 'weight':
        return localStorageUpdate(type, value, '/healthy', 'confirm');
      case 'email':
        if (isEmail(value)) {
          return localStorageUpdate(type, value, '/result', 'confirm');
          // TODO: 이부분에서 이메일 체크하고 이메일 보내는 API 적용해야함
        }
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <article className={cx('static__qna')}>
        <section className={cx('static__qna--info')}>
          <Question
            name={user.name !== '' && user.name}
            pageName={pathname.split('/')[1]}
          />
          <InfoControl
            pageName={pathname.split('/')[1]}
            confirm={confirm}
            localStorageUpdate={localStorageUpdate}
          />
        </section>
      </article>
      <BarGauge />
    </Fragment>
  );
};

const mapStateToProps = state => ({ user: state.env.user });

export default connect(mapStateToProps, envActions)(withRouter(StaticQna));
