import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { InfoQuestion, BarGauge, AnswerList } from 'Main/components';
import { Button, MetaTag } from 'components';
import { List } from 'static/json/list.json';

const cx = classNames.bind(styles);

const Qna = ({ info, location, history, setPickList, setAnswerList }) => {
  const [picks, setPicks] = useState([]);
  const pageName = location.pathname.split('/')[1];
  const pageNumber = location.pathname.split('/')[2];

  const pickQna = i => {
    if (picks.includes(i)) {
      let states = picks.filter(state => state !== i);
      setPicks(states);
    } else if (picks.length >= 3) {
      return;
    } else {
      setPicks([...picks, i]);
    }
  };

  const confirmQna = () => {
    if (picks.length > 0) {
      if (Number(pageNumber) === 1) {
        return history.push(`/info/email`);
      } else if (pageNumber) {
        setAnswerList();
        return history.push(`/qna/${Number(pageNumber) + 1}`);
      } else {
        const list = List.filter((item, i) => picks.includes(i) && item);
        setPickList([...list]);
        return history.push(`/qna/1`);
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
        <div className={cx('customized__qusetion')}>
          <InfoQuestion name={info.name && info.name} pageName={pageName} />
        </div>
        <AnswerList picks={picks} List={List} pickQna={pickQna} />
      </article>
      <section className={cx('customized__confirm')}>
        {picks.length === 0 ? (
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

export default withRouter(Qna);
