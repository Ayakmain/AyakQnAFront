import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Question = ({ name, pageName, location }) => {
  const [qa, setQa] = useState('');
  const pageNumber = location.pathname.split('/')[2];

  useEffect(() => {
    switch (pageName) {
      case 'name':
        return setQa(
          <Fragment>
            <span>아약</span>이 고객님을 <br />
            어떻게 부르면 좋을까요?
          </Fragment>
        )
      case 'sex':
        return setQa(
          <Fragment>
            {name}님의<br />
            <span>성별</span>은 무엇인가요?
          </Fragment>
        )
      case 'age':
        return setQa(
          <Fragment>
            {name}님의<br />
            건강체크를 위해<br />
            <span>출생년도</span>가 궁금합니다.
          </Fragment>
        )
      case 'qna':
        return pageNumber ?
          setQa(
            <Fragment>
              개선하고 싶은 것들은
            </Fragment>
          ) :
          setQa(
            <Fragment>
              {name}님의 요즘 고민은 <br />
              무엇인가요?
            </Fragment>
          )
      default:
        return setQa(
          <Fragment>
            <span>아약</span>이 고객님을 <br />
            어떻게 부르면 좋을까요?
          </Fragment>
        )
    }
  }, [pageName, name, pageNumber])

  return (
    <span className={cx('info__question')}>
      {qa}
    </span>);
};


export default withRouter(Question);