import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Button } from 'components/index';

const cx = classNames.bind(styles);

const AnswerList = ({ List, picks, pickQna, location }) => {
  return location === '/qna' ? (
    <section className={cx('qna__list')}>
      {
        List.map((item, i) => <Button className={picks.includes(i) ? cx('qna__list--pick') : cx('qna__list--answer')} key={i} onClick={() => pickQna(i)}>{item}</Button>)
      }
    </section>
  ) : (
    <section className={cx('qna__list')}>
      {
        List.map((item, i) => <Button className={picks.includes(i) ? cx('qna__list--pick') : cx('qna__list--answer')} key={i} onClick={() => pickQna(i)}>{item}</Button>)
      }
    </section>
  )
};

export default withRouter(AnswerList);