import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const InfoSex = ({ info, changeInfo, history }) => {
  const selectSex = (sex) => {
    changeInfo(sex, 'sex');
    return history.push('/info/age');
  }

  return info.name ? (
    <article className={cx('qna')}>
      <section className={cx('qna__info')}>
        <span className={cx('qna__info--question')}>
          {info.name}님의<br />
          <span>성별</span>은 무엇인가요?
        </span>
        <div className={cx('qna__sex')}>
          <button className={cx('qna__sex--btn')} onClick={() => selectSex('male')}>
            남성
          </button>
          <button className={cx('qna__sex--btn')} onClick={() => selectSex('female')}>
            여성
          </button>
        </div>
      </section>
    </article>
  ) : <Redirect to={{ pathname: '/info/name' }} />;
};

export default withRouter(InfoSex);