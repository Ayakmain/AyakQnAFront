import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Arrow from 'static/images/Arrow.png';

const cx = classNames.bind(styles);

const Info = ({ name, setName }) => {

  return (
    <article className={cx('qna')}>
      <section className={cx('qna__info')}>
        <span className={cx('qna__info--question')}>
          <span>아약</span>이 고객님을 <br />
          어떻게 부르면 좋을까요?
        </span>
        <div className={cx('qna__control')}>
          <input type="text" className={cx('qna__control--input')} value={name} placeholder="이름을 입력해주세요" onChange={e => setName(e.target.value)} />
          <button>
            <img src={Arrow} alt="확인버튼" className={cx('qna__control--confirm')} />
          </button>
        </div>
      </section>
    </article>
  );
};

export default withRouter(Info);