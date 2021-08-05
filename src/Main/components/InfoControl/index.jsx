import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Arrow from 'static/images/Arrow.png';
import { Button } from 'components/index';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

const InfoControl = ({
  pageName,
  toggle,
  user,
  years,
  setToggle,
  controlFunc,
  confirm,
}) => {
  const [placeholder, setPlaceholder] = useState('');
  const [type, setType] = useState('input');
  const [inputValue, setValue] = useState('');

  const initialFunc = (place, form) => {
    setPlaceholder(place);
    return setType(form);
  };

  useEffect(() => {
    switch (pageName) {
      case 'name':
        setValue(user.name);
        return initialFunc('이름을 입력해주세요', 'input');
      case 'email':
        setValue(user.email);
        return initialFunc('Ayak@ayak.com', 'input');
      case 'height':
        setValue(user.height);
        return initialFunc('', 'number');
      case 'weight':
        setValue(user.weight);
        return initialFunc('', 'number');
      case 'birth':
        return initialFunc('', 'selectBox');
      default:
        return initialFunc('', 'select');
    }
  }, [pageName, user]);

  const selectFunc = value => {
    if (pageName === 'sex') {
      return value === 'yes'
        ? confirm(pageName, 'Male')
        : confirm(pageName, 'Female');
    } else {
      return confirm(pageName, value);
    }
  };

  return type === 'select' ? (
    <div className={cx('sex')}>
      <Button className={cx('sex__btn')} onClick={() => selectFunc('yes')}>
        {pageName === 'sex' ? '남성' : '예'}
      </Button>
      <Button className={cx('sex__btn')} onClick={() => selectFunc('no')}>
        {pageName === 'sex' ? '여성' : '아니오'}
      </Button>
    </div>
  ) : (
    <div className={cx('info__control')}>
      {type === 'input' || type === 'number' ? (
        <Fragment>
          <input
            type={type === 'number' ? 'number' : 'text'}
            className={cx('info__control--input')}
            value={inputValue}
            placeholder={placeholder}
            onChange={e => controlFunc(pageName, e.target.value)}
          />
          {pageName === 'height' ? (
            <div className={cx('info__control--place')}>cm</div>
          ) : (
            pageName === 'weight' && (
              <div className={cx('info__control--place')}>kg</div>
            )
          )}
          {/*  TODO: 이부분 수정 해야함 */}
          <Button
            onClick={() =>
              pageName === 'name'
                ? confirm(pageName, user.name)
                : confirm(pageName, user.email)
            }
            className={cx('info__control--confirm')}
          >
            <img
              src={Arrow}
              alt="확인버튼"
              className={cx('info__control--confirm--img')}
            />
          </Button>
          {(pageName === 'height' || pageName === 'weight') && (
            <div className={cx('info__control--intro')}>
              영양성분 추천에 체질량지수(BMI)를 활용합니다.
            </div>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <Button
            className={cx('info__control--input')}
            onClick={() => setToggle(true)}
          >
            {user.birth ? (
              user.birth + ' 년생'
            ) : (
              <span>나이를 입력해주세요</span>
            )}
          </Button>
          {toggle && (
            <div className={cx('info__control--select')}>
              {years.length > 0 &&
                years.map((year, i) => (
                  <Button key={i} onClick={() => controlFunc('birth', year)}>
                    {year} 년생
                  </Button>
                ))}
            </div>
          )}
          <Button
            onClick={() => confirm('birth', user.birth)}
            className={cx('info__control--check')}
          >
            <img
              src={Arrow}
              alt="확인버튼"
              className={cx('info__control--check--img')}
            />
          </Button>
        </Fragment>
      )}
    </div>
  );
};

export default withRouter(InfoControl);
