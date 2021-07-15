import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { InfoQuestion, BarGauge, AnswerList } from 'Main/components';
import { Button } from 'components';
import { List } from "static/json/list.json";

const cx = classNames.bind(styles);

const Qna = ({ info, location, history, setPickList, setAnswerList }) => {
  const [picks, setPicks] = useState([]);
  const pageName = location.pathname.split('/')[1];
  const pageNumber = location.pathname.split('/')[2];

  const pickQna = (i) => {
    if (picks.includes(i)) {
      let states = picks.filter(state => state !== i);;
      setPicks(states);
    } else if (picks.length >= 3) {
      return
    } else {
      setPicks([...picks, i]);
    }
  }

  const confirmQna = () => {
    if (picks.length > 0) {
      if (pageNumber) {
        setAnswerList();
        history.push(`/qna/${pageNumber + 1}`);
      } else {
        const list = List.filter((item, i) => picks.includes(i) && item);
        setPickList([...list]);
        history.push(`/qna/1`);
      }
    }
  }

  return (
    <Fragment>
      <article className={cx('qna')}>
        <div className={cx('qna__qusetion')}>
          <InfoQuestion name={info.name && info.name} pageName={pageName} />
        </div>
        <AnswerList picks={picks} List={List} pickQna={pickQna} />
      </article>
      <section className={cx('qna__confirm')}>
        <Button className={cx('qna__confirm__btn')} onClick={() => confirmQna()}>선택 완료</Button>
      </section>
      <BarGauge />
    </Fragment>
  )
};

export default withRouter(Qna);