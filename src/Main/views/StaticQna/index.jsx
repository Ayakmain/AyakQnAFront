import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import classNames from 'classnames/bind';
import { localStorage } from 'common/env';
import { isEmail } from 'common/util';
import {
  BarGauge,
  QaHeader,
  AnswerList,
  InfoControl,
  Question,
} from 'Main/components';
import { Button } from 'components';
import { staticQa } from 'static/json/Question.json';
import styles from './stylesheet.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

const StaticQna = ({
  history,
  location,
  user,
  setUser,
  staticData,
  setStatic,
}) => {
  const { pathname } = location;
  const pageName = pathname.split('/')[1];
  const [error, setError] = useState(null);
  const [page, setPage] = useState('');
  const [list, setList] = useState([]);
  const [qaList, setQaList] = useState([]);

  useEffect(() => {
    if (
      pageName === 'weight' ||
      pageName === 'height' ||
      pageName === 'email'
    ) {
      setPage('info');
    } else if (pageName === 'sun' || pageName === 'smoke') {
      setPage('select');
    } else {
      setPage('list');
      setQaList(staticQa.find(item => item.type === pageName).qas);
    }
    setError(null);
  }, [pageName]);

  const pickQna = index => {
    if (list.includes(index)) {
      const states = list.filter(item => item !== index);
      return setList(states);
    }
    if (list.length < 1 || list.length === 1) {
      return setList([index]);
    }
  };

  const localStorageUpdate = (storage, data, type, value, url, controll) => {
    if (storage === 'user') setUser({ ...data, [type]: value });
    else if (storage === 'staticData') setStatic({ ...data, [type]: value });
    localStorage(storage, data, { ...data, [type]: value });
    if (controll === 'confirm') {
      return url && history.push(url);
    }
  };

  const confirm = (type, value) => {
    switch (type) {
      case 'height':
        if (Number(value) >= 100 && Number(value) <= 250) {
          return localStorageUpdate(
            'user',
            user,
            type,
            value,
            '/weight',
            'confirm'
          );
        } else {
          return setError('키는 100cm부터 250cm까지 입력가능합니다.');
        }
      case 'weight':
        if (Number(value) >= 30 && Number(value) <= 190) {
          return localStorageUpdate(
            'user',
            user,
            type,
            value,
            '/healthy',
            'confirm'
          );
        } else {
          return setError('몸무게는 30kg부터 190kg까지 입력가능합니다.');
        }
      case 'email':
        if (isEmail(value)) {
          return localStorageUpdate(
            'user',
            user,
            type,
            value,
            '/intro/result',
            'confirm'
          );
          // TODO: 이부분에서 이메일 체크하고 이메일 보내는 API 적용해야함
        } else {
          return setError('Email 방식이 올바르지 않습니다.');
        }
      case 'sun':
        if (!value) {
          const selectNutritions = JSON.parse(
            window.localStorage.getItem('nutrition')
          );
          selectNutritions.push('비타민D');
          localStorage('nutrition', '', selectNutritions);
        }
        return localStorageUpdate(
          'staticData',
          staticData,
          type,
          value,
          '/smoke',
          'confirm'
        );
      case 'smoke':
        return localStorageUpdate(
          'staticData',
          staticData,
          type,
          value,
          '/drink',
          'confirm'
        );
      default:
        break;
    }
  };

  const confirmStatic = () => {
    switch (pageName) {
      case 'healthy':
        return localStorageUpdate(
          'staticData',
          staticData,
          pageName,
          qaList.find((item, i) => list.map(index => index === i)),
          '/sun',
          'confirm'
        );
      case 'drink':
        return localStorageUpdate(
          'staticData',
          staticData,
          pageName,
          qaList.find((item, i) => list.map(index => index === i)),
          user.gender === 'female' ? '/pregnant' : '/know',
          'confirm'
        );
      case 'pregnant':
        return localStorageUpdate(
          'staticData',
          staticData,
          pageName,
          qaList.find((item, i) => list.map(index => index === i)),
          '/pms',
          'confirm'
        );
      case 'pms':
        return localStorageUpdate(
          'staticData',
          staticData,
          pageName,
          qaList.find((item, i) => list.map(index => index === i)),
          '/know',
          'confirm'
        );
      case 'know':
        // TODO: Know API연결
        return history.push('/email');
      default:
        break;
    }
  };

  return (
    page !== '' && (
      <Fragment>
        <article
          className={cx(page === 'info' && 'static__qna', 'static__list')}
        >
          <section className={cx('static__qna--info')}>
            {page === 'info' ? (
              <Question
                name={user.name !== '' && user.name}
                pageName={pageName}
              />
            ) : (
              <QaHeader
                name={user.name !== '' && user.name}
                pageName={pageName}
              />
            )}
            {page === 'list' ? (
              <AnswerList
                pageName={pageName}
                List={qaList}
                picks={list}
                pickQna={pickQna}
              />
            ) : (
              <InfoControl
                pageName={pageName}
                confirm={confirm}
                localStorageUserUpdate={localStorageUpdate}
                error={error}
              />
            )}
          </section>
        </article>
        {page === 'list' && (
          <section className={cx('customized__confirm')}>
            {list.length === 0 ? (
              <div className={cx('customized__confirm__footer')}>
                한 개 이상 선택해 주세요
              </div>
            ) : (
              <Button
                className={cx(
                  'customized__confirm__footer',
                  'customized__confirm__btn'
                )}
                onClick={confirmStatic}
              >
                선택 완료
              </Button>
            )}
          </section>
        )}
        <BarGauge />
      </Fragment>
    )
  );
};

const mapStateToProps = state => ({
  user: state.env.user,
  staticData: state.env.staticData,
});

export default connect(mapStateToProps, envActions)(withRouter(StaticQna));
