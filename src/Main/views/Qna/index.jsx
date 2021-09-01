/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import classNames from 'classnames/bind';
import { BarGauge, AnswerList } from 'Main/components';
import { Button, MetaTag } from 'components';
import { Questions } from 'static/json/Question.json';
import { QaHeader } from 'Main/components';
import styles from './stylesheet.scss';
import { localStorage } from 'common/env';
const cx = classNames.bind(styles);

const Qna = ({ user, location, history, match }) => {
  const [list, setList] = useState([]);
  const [selectQa, setSelect] = useState(null);
  const { qa } = match.params;
  const pageName = location.pathname.split('/')[1];
  const pickList = JSON.parse(window.localStorage.getItem('qa'));

  const selectNutritions = JSON.parse(window.localStorage.getItem('nutrition'));

  useEffect(() => {
    if (qa) {
      // QA API에서 받아오는 데이터
      setSelect(Questions.find(item => item.type === qa));
      return;
    }
  }, [pageName, qa]);

  const pickQna = index => {
    if (list.includes(index)) {
      const states = list.filter(item => item !== index);
      return setList(states);
    }
    return setList([...list, index]);
  };

  const confirmQna = () => {
    // QaPick에서 데이터 선택 시 질문 데이터 받는 부분
    if (qa) {
      const index = pickList.findIndex(item => item.type === selectQa.type);
      const pickLength = pickList.length;
      // 선택된 질문에 대한 영양제 정보 가져오는 부분
      const selectList = list
        .map(index => selectQa.answers.find((item, i) => index === i))
        .map(item => item.nutrition);
      const selectNutrition = selectList.filter(
        (item, pos) => selectList.indexOf(item) === pos
      );

      // 필터 돌려줘야함 (null이나 중복제거 필요)
      let concatArr = selectNutritions
        .concat(...selectNutrition)
        .filter(Boolean); // null 제거

      if (pickLength - 1 === index) {
        localStorage('nutrition', '', concatArr);
        // TODO: 이 부분에서 Result API 연결
        return history.push('/intro/Lifestyle');
      } else {
        localStorage('nutrition', '', concatArr);
        return history.push(`/qna/${pickList[index + 1].type}`);
      }
    }
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
          <AnswerList
            pageName={pageName}
            List={qa && selectQa.answers}
            picks={list}
            pickQna={pickQna}
          />
        </article>
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
              onClick={confirmQna}
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
  user: state.env.user,
});

export default connect(mapStateToProps, envActions)(withRouter(Qna));
