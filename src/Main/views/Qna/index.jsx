import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as answerActions } from 'store/reducers/answer';
import classNames from 'classnames/bind';
import { InfoQuestion, BarGauge, AnswerList } from 'Main/components';
import { Button, MetaTag } from 'components';
import { List } from 'static/json/list.json';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Qna = ({ user, location, history, questions, setQuestions }) => {
  const [list, setList] = useState([]);
  const pageName = location.pathname.split('/')[1];
  const pageNumber = location.pathname.split('/')[2];

  useEffect(() => {
    if (pageName === 'qna') {
      const questionList = List.filter(
        (item, i) => questions.includes(item) && i
      );
      return setList(questionList);
    }
    // const answerList = List.filter((item, i) => answers.includes(item) && i);
    // return setList(answerList);
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
    if (list.length > 0) {
      if (Number(pageNumber) === 1) {
        return history.push('/info/email');
      }
      if (pageNumber) {
        // 이부분 수정해야함
        // const lists = List.filter((item, i) => list.includes(i) && item);
        // setAnswers(lists);
        return history.push(`/qna/${Number(pageNumber) + 1}`);
      }
      const lists = List.filter((item, i) => list.includes(i) && item);
      setQuestions(lists);
      return history.push('/qna/1');
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
        <div className={cx('customized__qusetion')}>
          <InfoQuestion name={user.name && user.name} pageName={pageName} />
        </div>
        <AnswerList picks={list} List={List} pickQna={pickQna} />
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
