/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as answerActions } from 'store/reducers/answer';
import classNames from 'classnames/bind';
import { BarGauge, AnswerList, InfoControl } from 'Main/components';
import { Button, MetaTag } from 'components';
import { List } from 'static/json/list.json';
import { staticQa as StaticList } from 'static/json/list.json';
import { Questions } from 'static/json/Question.json';
import { QaHeader } from './components';
import styles from './stylesheet.scss';
import { localStorage } from 'common/env';
const cx = classNames.bind(styles);

const Qna = ({ user, location, history, questions, setQuestions, match }) => {
  const [list, setList] = useState([]);
  const { type, qa, index } = match.params;
  const pageName = location.pathname.split('/')[1];
  const statics = [
    'healthy',
    'sun',
    'smoke',
    'drink',
    'pragnent',
    'pms',
    'know',
  ];

  useEffect(() => {
    if (pageName === 'qna' && qa) {
      // TODO: 이부분에서 QA API 호춣 해야함
      // QA API에서 받아오는 데이터
      setQuestions(JSON.parse(window.localStorage.getItem('qa')));
      return;
    } else if (pageName === 'qna') {
      const questionList = List.filter(
        (item, i) => questions.includes(item) && i
      );
      return setList(questionList);
    }
  }, [pageName, qa, index]);

  const pickQna = index => {
    if (list.includes(index)) {
      const states = list.filter(item => item !== index);
      return setList(states);
    }
    if (list.length < 3) {
      return setList([...list, index]);
    }
  };

  const confirmQna = () => {
    if (list.length > 0) {
      // /qna일 때 다음 페이지로 넘어가주는 부분
      if (pageName === 'qna' && !qa) {
        let typeList = [];
        // 낮은 순으로 재정렬 해주는 부분
        list.sort((a, b) => a - b);
        // TODO: 이부분 수정해야함
        const lists = List.filter((item, i) => {
          if (list.includes(i) && item) {
            typeList = Questions.filter(
              question => question.type === item.type
            );
            return item;
          }
        });

        setQuestions(typeList);
        localStorage('qa', '', [...typeList]);
        return history.push(`/qna/${lists[0].type}/0`);
      } else if (qa) {
        // TODO: 마지막 질문일 경우 다음 질문 페이지로 이동시켜주는 부분
        return history.push('/info/height');
      } else if (type) {
        console.log('dsdsdsads');
        return history.push(`/${statics[statics.indexOf(type) + 1]}`);
      }
    }
  };

  return (
    <Fragment>
      <MetaTag
        keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
        description="아약 맞춤형 추천"
        title="아약 맞춤형 추천"
      />
      <article className={cx('customized')}>
        <QaHeader
          name={user.name}
          question={questions.length > 0 && questions[0].question}
        />
        {type === 'sun' || type === 'smoke' ? (
          <InfoControl pageName={type} confirm={() => confirmQna()} />
        ) : (
          <AnswerList
            pageName={type}
            List={
              type
                ? StaticList.find(item => item.type === type).qas
                : qa
                ? questions[0].answers
                : List
            }
            picks={list}
            pickQna={pickQna}
          />
        )}
      </article>
      {type === 'sun' ||
        (type !== 'smoke' && (
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
                onClick={() => confirmQna()}
              >
                선택 완료
              </Button>
            )}
          </section>
        ))}

      <BarGauge />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.env.user,
  questions: state.answer.questions,
});

export default connect(mapStateToProps, answerActions)(withRouter(Qna));
