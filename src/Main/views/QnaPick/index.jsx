/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as answerActions } from 'store/reducers/answer';
import classNames from 'classnames/bind';
import { BarGauge, AnswerList } from 'Main/components';
import { Button, MetaTag } from 'components';
import { List } from 'static/json/list.json';
import { Question } from 'Main/components';
import styles from './stylesheet.scss';
import { localStorage } from 'common/env';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

const QnaPick = ({ user, location, history, setQuestions }) => {
  const [list, setList] = useState([]);
  const { pathname } = location;

  //선택되어있는 데이터 삭제 해주는 부분
  useEffect(() => {
    localStorage('nutrition', '', []);
    localStorage('qa', '', []);
  }, []);

  const pickQna = index => {
    if (list.includes(index)) {
      const states = list.filter(item => item !== index);
      return setList(states);
    } else if (list.length < 3) {
      return setList([...list, index]);
    }
  };

  const confirmQna = () => {
    if (list.length > 0) {
      // /qna일 때 다음 페이지로 넘어가주는 부분
      if (pathname === '/qna') {
        // 낮은 순으로 재정렬 해주는 부분
        list.sort((a, b) => a - b);
        const lists = List.filter((item, i) => list.includes(i) && item);

        setQuestions(lists);
        localStorage('qa', '', [...lists]);
        return history.push(`/qna/${lists[0].type}`);
      }
    }
  };

  // 질문리스트가 없어서 오류나는 부분 수정
  return (
    List.length !== 0 && (
      <Fragment>
        <MetaTag
          keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
          description="아약 맞춤형 추천"
          title="아약 맞춤형 추천"
        />
        <article className={cx('qna__pick')}>
          <Question
            pageName={pathname.split('/')[1]}
            name={user && user.name}
          />
          <AnswerList
            pageName={pathname.split('/')[1]}
            List={List}
            picks={list}
            pickQna={pickQna}
          />
        </article>
        <section className={cx('qna__pick--confirm')}>
          {list.length === 0 ? (
            <div className={cx('qna__pick--confirm--footer')}>
              한 개 이상 선택해 주세요
            </div>
          ) : (
            <Button
              className={cx(
                'qna__pick--confirm--footer',
                'qna__pick--confirm--btn'
              )}
              onClick={() => confirmQna()}
            >
              선택 완료
            </Button>
          )}
        </section>
        <BarGauge />
      </Fragment>
    )
  );
};

const mapStateToProps = state => ({
  questions: state.answer.questions,
  user: state.env.user,
});

export default connect(mapStateToProps, answerActions)(withRouter(QnaPick));
