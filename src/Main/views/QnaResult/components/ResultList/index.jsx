import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
// import { Button } from 'components';
import Logo from 'static/images/logo.png';

const cx = classNames.bind(styles);

const ResultList = ({ result }) => {
  // ADD: 이부분에 setToggle 추가해줘야함
  const [toggle] = useState(false);
  // const [selectItem, setSelect] = useState(null);

  // const select = item => {
  //   if (!toggle) {
  //     setSelect(item);
  //   } else {
  //     setSelect(null);
  //   }
  //   setToggle(!toggle);
  // };

  return (
    result.length > 0 &&
    result.map((item, index) => (
      <div
        className={cx('prescription', toggle && 'prescription__on')}
        key={index}
      >
        <div className={cx('prescription__cover', `cover__${index}`)}>
          <img
            className={cx('prescription__cover--img')}
            src={Logo}
            alt="대표 알약 이미지"
          />
        </div>
        <div className={cx('prescription__info', `info__${index}`)}>
          <span className={cx('prescription__info--header')}>추천영양성분</span>
          <div className={cx('prescription__info--name')}>
            <strong>{item.name}</strong>
            <span>{item.type}</span>
          </div>
          <ul>
            {item.hashtags.map((hashtag, i) => (
              <li className={cx('prescription__info--description')} key={i}>
                {hashtag}
              </li>
            ))}
          </ul>
          {/* ADD: 나중에 눌렀을 때 자세한 정보 사진 보는 부분 추가할 예정 */}
          {/* <Button
          className={cx('prescription__info--btn')}
          onClick={() => select(item)}
        >
          <div className={cx('prescription__info--btn--open')} />
        </Button> */}
        </div>
      </div>
    ))
  );
};

export default withRouter(ResultList);
