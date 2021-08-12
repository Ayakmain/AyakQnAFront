import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import { Button } from 'components/index';
import Arrow from 'static/images/Arrow.png';
import classNames from 'classnames/bind';

import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const InfoControl = ({
  pageName,
  toggle,
  years,
  setToggle,
  controlFunc,
  confirm,
  user,
  setUser,
}) => {
  const [placeholder, setPlaceholder] = useState('');
  const [type, setType] = useState('input');
  const [inputValue, setValue] = useState('');

  const initialFunc = (place, form, vlaue) => {
    setValue(vlaue ?? '');
    setPlaceholder(place);
    return setType(form);
  };

  useEffect(() => {
    switch (pageName) {
      case 'name':
        return initialFunc('이름을 입력해주세요', 'input', user.name);
      case 'email':
        return initialFunc('Ayak@ayak.com', 'input', user.email);
      case 'height':
        return initialFunc('', 'number', user.height);
      case 'weight':
        return initialFunc('', 'number', user.weight);
      case 'birth':
        return initialFunc('', 'selectBox');
      default:
        return initialFunc('', 'select');
    }
  }, [pageName, user]);

  const selectFunc = value => {
    if (pageName === 'sex') {
      return value ? confirm(pageName, 'Male') : confirm(pageName, 'Female');
    } else {
      return confirm(pageName, value);
    }
  };

  const inputConfirm = (type, value) => {
    let confirmValue = '';

    if (pageName === 'name') {
      confirmValue = user.name;
    } else if (pageName === 'email') {
      confirmValue = user.email;
    } else if (pageName === 'height') {
      confirmValue = user.height;
    } else if (pageName === 'weight') {
      confirmValue = user.weight;
    }

    if (type === 'confirm') {
      return confirm(pageName, confirmValue);
    } else {
      setUser({ ...user, [pageName]: value });
      return setValue(value);
    }
  };

  return type === 'select' ? (
    <div className={cx('sex')}>
      <Button className={cx('sex__btn')} onClick={() => selectFunc(true)}>
        {pageName === 'sex' ? '남성' : '예'}
      </Button>
      <Button className={cx('sex__btn')} onClick={() => selectFunc(false)}>
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
            onChange={e => inputConfirm('', e.target.value)}
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
            onClick={() => inputConfirm('confirm')}
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

const mapStateToProps = state => ({ user: state.env.user });

export default connect(mapStateToProps, envActions)(withRouter(InfoControl));
