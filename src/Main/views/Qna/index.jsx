/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import classNames from 'classnames/bind';
import { BarGauge, AnswerList, InfoControl } from 'Main/components';
import { Button, MetaTag } from 'components';
import { staticQa as StaticList } from 'static/json/list.json';
import { QAList } from 'static/json/QAList.json';
import { Questions } from 'static/json/Question.json';
import { QaHeader } from './components';
import styles from './stylesheet.scss';
import { localStorage } from 'common/env';
const cx = classNames.bind(styles);

const Qna = ({
  user,
  location,
  history,
  setUser,
  match,
  staticData,
  setStatic,
}) => {
  const [list, setList] = useState([]);
  const [selectQa, setSelect] = useState(null);
  const { qa } = match.params;
  const pageName = location.pathname.split('/')[1];
  const pickList = JSON.parse(window.localStorage.getItem('qa'));
  const statics = [
    'healthy',
    'sun',
    'smoke',
    'drink',
    'pregnant',
    'pms',
    'know',
  ];

  useEffect(() => {
    if (qa) {
      // TODO: 이부분에서 QA API 호춣 해야함
      // QA API에서 받아오는 데이터
      setSelect(Questions.find(item => item.type === qa));
      return;
    } else {
      setSelect(QAList.find(item => item.type === pageName));
    }
  }, [pageName, qa]);

  const pickQna = index => {
    if (list.includes(index)) {
      const states = list.filter(item => item !== index);
      return setList(states);
    }
    if (list.length < 3) {
      return setList([...list, index]);
    }
  };

  const confirmQna = (page, value) => {
    // QaPick에서 데이터 선택 시 질문 데이터 받는 부분
    if (qa) {
      const index = pickList.findIndex(item => item.type === selectQa.type);
      const pickLength = pickList.length;

      // 마지막 질문일 경우 다음 질문 페이지로 이동시켜주는 부분
      // TODO: 이 부분에서 API어떻게 보내서 저장할지에 대하여 고민
      if (pickLength - 1 === index) {
        return history.push('/height');
      } else {
        return history.push(`/qna/${pickList[index + 1].type}`);
      }
    }
    if (pageName === 'height' || pageName === 'weight') {
      setUser({ ...user, [pageName]: value });
      localStorage('user', user, { ...user, [page]: value });
    } else if (pageName === 'know') {
      // TODO: know API 연결
      return history.push(`/email`);
    } else {
      // TODO: Api 업데이트 사용
      // 여기
      setStatic({ ...staticData, [pageName]: value });
      localStorage('staticData', staticData, {
        ...staticData,
        [pageName]: list,
      });
    }
    return history.push(`/${statics[statics.indexOf(pageName) + 1]}`);
  };

  return (
    selectQa && (
      <Fragment>
        <MetaTag
          keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
          description="아약 맞춤형 추천"
          ㅌ
          title="아약 맞춤형 추천"
        />
        <article className={cx('customized')}>
          <QaHeader name={user.name} question={selectQa.question} />
          {pageName === 'sun' || pageName === 'smoke' ? (
            <InfoControl pageName={pageName} confirm={confirmQna} />
          ) : (
            <AnswerList
              pageName={pageName}
              List={
                pageName !== 'qna'
                  ? StaticList.find(item => item.type === pageName).qas
                  : qa && selectQa.answers
              }
              picks={list}
              pickQna={pickQna}
            />
          )}
        </article>
        {pageName !== 'sun' && pageName !== 'smoke' && (
          <section className={cx('customized__confirm')}>
            {list.length === 0 ? (
              <div className={cx('customized__confirm__footer')}>
                한개 이상을 선택해 주세요
              </div>
            ) : (
              <Button
                className={cx(
                  'customized__confirm__footer',
                  'customized__confirm__btn'
                )}
                onClick={confirmQna}
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
  questions: state.answer.questions,
});

export default connect(mapStateToProps, envActions)(withRouter(Qna));
