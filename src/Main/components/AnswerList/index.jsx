import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button } from 'components/index';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const AnswerList = ({ List, picks, pickQna, location, className }) =>
  location.pathname === '/qna' ? (
    <section className={className ? className : cx('qna__list')}>
      {List.map((item, i) => (
        <Button
          className={
            picks.includes(i) ? cx('qna__list--pick') : cx('qna__list--three')
          }
          key={i}
          onClick={() => pickQna(i)}
        >
          {item.title}
        </Button>
      ))}
    </section>
  ) : (
    <section className={className ? className : cx('qna__list')}>
      {List.map((item, i) => (
        <Button
          key={i}
          className={
            picks.includes(i)
              ? cx('qna__list--select')
              : cx('qna__list--answer')
          }
          onClick={() => pickQna(i)}
        >
          <div
            className={
              picks.includes(i)
                ? cx('qna__list--answer--pick')
                : cx('qna__list--answer--check')
            }
          />
          <div className={cx('qna__list--answer--one')}>{item.title}</div>
        </Button>
      ))}
    </section>
  );

export default withRouter(AnswerList);
