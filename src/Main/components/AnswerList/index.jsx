import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button } from 'components/index';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const AnswerList = ({ List, picks, pickQna, location, className }) => {
  return location.pathname === '/qna' ? (
    <section className={className ? className : cx('qna__list', 'qna__three')}>
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
    <section className={className ? className : cx('qna__one')}>
      {List.map((item, i) => (
        <Button
          key={i}
          className={cx(
            'qna__one--answer',
            picks.includes(i) && 'qna__one--select'
          )}
          onClick={() => pickQna(i)}
        >
          <div
            className={
              picks.includes(i)
                ? cx('qna__one--answer--pick')
                : cx('qna__one--answer--check')
            }
          />
          <div className={cx('qna__one--answer--one')}>
            {item.title ?? item}
          </div>
        </Button>
      ))}
    </section>
  );
};

export default withRouter(AnswerList);
