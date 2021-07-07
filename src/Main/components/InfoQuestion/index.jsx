import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const InfoQuestion = ({ name, pageName }) =>
  <span className={cx('info__question')}>
    {
      pageName === 'name' ?
        <Fragment>
          <span>아약</span>이 고객님을 <br />
          어떻게 부르면 좋을까요?
        </Fragment> :
        pageName === 'sex' ?
          <Fragment>
            {name}님의<br />
            <span>성별</span>은 무엇인가요?
          </Fragment> :
          <Fragment>
            {name}님의<br />
            건강체크를 위해<br />
            <span>나이</span>가 궁금합니다.
          </Fragment>
    }
  </span>;

export default withRouter(InfoQuestion);