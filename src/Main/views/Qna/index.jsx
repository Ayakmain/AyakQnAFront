import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as answerActions } from 'store/reducers/answer';
import classNames from 'classnames/bind';
import { Question, BarGauge, AnswerList, InfoControl } from 'Main/components';
import { Button, MetaTag } from 'components';
import { List } from 'static/json/list.json';
import { staticQa as StaticList } from 'static/json/list.json';
import styles from './stylesheet.scss';
import Know from 'static/images/logo.png';
import Sun from 'static/images/sun.png';
import Drink from 'static/images/drink.png';
import Healthy from 'static/images/healthy.png';
import Smoke from 'static/images/smoke.png';
import Pregnant from 'static/images/pregnant.png';
import PMS from 'static/images/heart.png';
import Eye from 'static/images/eye.png';

const cx = classNames.bind(styles);

const Qna = ({ user, location, history, questions, setQuestions, match }) => {
  const imgList = [
    {
      type: 'eye',
      img: Eye,
    },
    {
      type: 'healthy',
      img: Healthy,
    },
    {
      type: 'sun',
      img: Sun,
    },
    {
      type: 'smoke',
      img: Smoke,
    },
    {
      type: 'drink',
      img: Drink,
    },
    {
      type: 'pregnant',
      img: Pregnant,
    },
    {
      type: 'pms',
      img: PMS,
    },
    {
      type: 'know',
      img: Know,
    },
  ];
  const [list, setList] = useState([]);
  const { type, qa } = match.params;
  const pageName = location.pathname.split('/')[1];

  useEffect(() => {
    if (pageName === 'qna') {
      const questionList = List.filter(
        (item, i) => questions.includes(item) && i
      );
      return setList(questionList);
    }
  }, [questions, pageName]);

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
    console.log(questions, 'qa: ', qa);
    if (list.length > 0) {
      // /qna일 때 다음 페이지로 넘어가주는 부분
      // TODO: 이부분에서 API 호춣 해야함
      if (pageName === 'qna' && !qa) {
        // 낮은 순으로 재정렬 해주는 부분
        list.sort((a, b) => a - b);
        const lists = List.filter((item, i) => list.includes(i) && item);
        setQuestions(lists);
        return history.push(`/qna/${lists[0].type}`);
      } else if (qa) {
        // TODO: 마지막 질문일 경우 다음 질문 페이지로 이동시켜주는 부분
        return history.push('/info/height');
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
        <div
          className={
            type ? cx('customized__match') : cx('customized__question')
          }
        >
          {type && (
            <img
              className={cx('customized__match--img')}
              src={imgList.find(item => item.type === type).img}
              alt={`${type} 사진`}
            />
          )}
          <Question
            className={type && cx('customized__match--question')}
            name={user.name && user.name}
            pageName={type ? type : pageName}
          />
        </div>
        {type === 'sun' || type === 'smoke' ? (
          <InfoControl pageName={type} />
        ) : (
          <AnswerList
            pageName={type}
            List={
              match.params.type
                ? StaticList.find(item => item.type === type).qas
                : List
            }
            picks={list}
            pickQna={pickQna}
          />
        )}
      </article>
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
      <BarGauge />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.env.user,
  questions: state.answer.questions,
});

export default connect(mapStateToProps, answerActions)(withRouter(Qna));
