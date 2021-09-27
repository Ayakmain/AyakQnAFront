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
import { KnowApi, ResultApi, StaticApi, UserApi } from 'api';

const cx = classNames.bind(styles);

const StaticQna = ({
  history,
  location,
  user,
  setUser,
  setStatic,
  setResult,
}) => {
  const { pathname } = location;
  const pageName = pathname.split('/')[1];
  const [error, setError] = useState(null);
  const [page, setPage] = useState('');
  const [list, setList] = useState([]);
  const [qaList, setQaList] = useState([]);
  const staticData = JSON.parse(window.localStorage.getItem('staticData'));

  useEffect(() => {
    if (
      pageName === 'weight' ||
      pageName === 'height' ||
      pageName === 'email'
    ) {
      setPage('info');
    } else if (pageName === 'sunning' || pageName === 'smoke') {
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

  const localStorageUpdate = (storage, data, url, control) => {
    if (storage === 'user') setUser({ ...data });
    else if (storage === 'staticData') setStatic({ ...data });
    localStorage(storage, data, { ...data });
    if (control === 'confirm') {
      return url && history.push(url);
    }
  };

  const confirm = (type, value) => {
    switch (type) {
      case 'height':
        if (Number(value) >= 100 && Number(value) <= 250) {
          return localStorageUpdate(
            'user',
            { ...user, [type]: value },
            '/weight',
            'confirm'
          );
        } else {
          return setError('키는 100cm부터 250cm까지 입력가능합니다.');
        }
      case 'weight':
        if (Number(value) >= 30 && Number(value) <= 190) {
          const body = { ...user, [type]: value };
          return UserApi.update(user._id, body)
            .then(({ user }) => {
              return localStorageUpdate('user', user, '/healthy', 'confirm');
            })
            .catch(() =>
              setError('몸무게는 30kg부터 190kg까지 입력가능합니다.')
            );
        } else {
          return setError('몸무게는 30kg부터 190kg까지 입력가능합니다.');
        }
      case 'email':
        if (isEmail(value)) {
          // email 넣어주고 수정
          user.email = value;
          const body = {
            author: user,
            nutritions: JSON.parse(window.localStorage.getItem('nutrition')),
          };
          // 결과 부분 수정
          return ResultApi.add(body)
            .then(({ result }) => {
              localStorage('result', result);
              return result;
            })
            .then(result =>
              setTimeout(
                () =>
                  history.push({
                    pathname: '/intro/result',
                    state: { result },
                  }),
                500
              )
            )
            .catch(error => setError(error));
        } else {
          return setError('Email 방식이 것 올바르지 않습니다.');
        }
      case 'sunning':
        if (!value) {
          const selectNutritions = JSON.parse(
            window.localStorage.getItem('nutrition')
          );
          selectNutritions.push('비타민D');
          localStorage('nutrition', '', selectNutritions);
        }
        return localStorageUpdate(
          'staticData',
          { ...staticData, [type]: value },
          '/smoke',
          'confirm'
        );
      case 'smoke':
        return localStorageUpdate(
          'staticData',
          { ...staticData, [type]: value },
          '/drink',
          'confirm'
        );
      default:
        break;
    }
  };

  const confirmStatic = () => {
    const selectNutritions = JSON.parse(
      window.localStorage.getItem('nutrition')
    );
    switch (pageName) {
      case 'healthy':
        return localStorageUpdate(
          'staticData',
          {
            ...staticData,
            [pageName]: qaList.find((item, i) =>
              list.map(index => index === i)
            ),
          },
          '/sunning',
          'confirm'
        );
      case 'drink':
        if (user.gender === 'female') {
          return localStorageUpdate(
            'staticData',
            {
              ...staticData,
              [pageName]: qaList.find((item, i) =>
                list.map(index => index === i)
              ).title,
            },
            '/pregnant',
            'confirm'
          );
        } else {
          const body = {
            ...staticData,
            [pageName]: qaList.find((item, i) => list.map(index => index === i))
              .title,
          };
          if (staticData._id) {
            return StaticApi.update(staticData._id, { author: user, ...body })
              .then(({ basic }) => {
                return localStorageUpdate(
                  'staticData',
                  basic,
                  '/know',
                  'confirm'
                );
              })
              .catch(error => alert(error));
          } else {
            return StaticApi.add({ author: user, ...body })
              .then(({ basic }) => {
                return localStorageUpdate(
                  'staticData',
                  basic,
                  '/know',
                  'confirm'
                );
              })
              .catch(error => alert(error));
          }
        }
      case 'pregnant':
        selectNutritions.push(
          ...qaList.find((item, i) => list.map(index => index === i)).nutrition
        );
        localStorage('nutrition', '', selectNutritions);
        return localStorageUpdate(
          'staticData',
          {
            ...staticData,
            [pageName]: qaList.find((item, i) => list.map(index => index === i))
              .title,
          },
          '/pms',
          'confirm'
        );
      case 'pms':
        selectNutritions.push(
          ...qaList.find((item, i) => list.map(index => index === i)).nutrition
        );
        localStorage('nutrition', '', selectNutritions);
        const body = {
          ...staticData,
          [pageName]: qaList.find((item, i) => list.map(index => index === i))
            .title,
        };

        if (staticData._id) {
          return StaticApi.update(staticData._id, { author: user, ...body })
            .then(({ basic }) => {
              return localStorageUpdate(
                'staticData',
                basic,
                '/know',
                'confirm'
              );
            })
            .catch(error => alert(error));
        } else {
          return StaticApi.add({ author: user, ...body })
            .then(({ basic }) => {
              return localStorageUpdate(
                'staticData',
                basic,
                '/know',
                'confirm'
              );
            })
            .catch(error => alert(error));
        }
      case 'know':
        return KnowApi.add({
          answerAyak: qaList.find((item, i) => list[0] === i),
          author: user,
        }).then(() => history.push('/email'));
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
