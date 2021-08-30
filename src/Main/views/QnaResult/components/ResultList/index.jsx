import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
// import { Button } from 'components';
import vitaminC from 'static/images/vitaminC.png';
import lutein from 'static/images/lutein.png';
import omega3 from 'static/images/omega3.png';
import probiotics from 'static/images/probiotics.png';
import milkThistle from 'static/images/milkThistle.png';
import vitaminB from 'static/images/vitaminB.png';
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
  const imageList = [
    { type: 'vitaminC', img: vitaminC },
    { type: 'lutein', img: lutein },
    { type: 'omega3', img: omega3 },
    { type: 'probiotics', img: probiotics },
    { type: 'milkThistle', img: milkThistle },
    { type: 'vitaminB2', img: vitaminB },
  ];

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
            src={
              imageList.find(img => img.type === item.type && img)
                ? imageList.find(img => img.type === item.type && img).img
                : Logo
            }
            alt="대표 알약 이미지"
          />
        </div>
        <div className={cx('prescription__info', `info__${index}`)}>
          <span className={cx('prescription__info--header')}>추천영양성분</span>
          <div className={cx('prescription__info--name')}>
            <strong>{item.name}</strong>
            <span>
              {/* 맨앞글자 대문자 만드는 법 */}
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </span>
          </div>
          <ul>
            {item.hashtags.map((hashtag, i) => (
              <li className={cx('prescription__info--description')} key={i}>
                {hashtag}
              </li>
            ))}
          </ul>
          <div className={cx('prescription__daily')}>
            <strong>일일 권장 섭취량 : </strong>
            {item.daily}
          </div>
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

//  "_id": "612c654947dd38d94ef3ab9e",
// "originalName": "biotin.png",
// "_id": "612c662647dd38d94ef3aba1",
//         "originalName": "vitaminA.png",
// 612c672b47dd38d94ef3aba9
