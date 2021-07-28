import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Arrow from 'static/images/Arrow.png';
import { Button } from 'components/index';

const cx = classNames.bind(styles);

const InfoControl = ({
  pageName,
  toggle,
  user,
  years,
  setToggle,
  controlFunc,
  confirm,
}) =>
  pageName === 'sex' ? (
    <div className={cx('sex')}>
      <Button className={cx('sex__btn')} onClick={() => confirm('sex', 'male')}>
        남성
      </Button>
      <Button
        className={cx('sex__btn')}
        onClick={() => confirm('sex', 'female')}
      >
        여성
      </Button>
    </div>
  ) : (
    <div className={cx('info__control')}>
      {pageName === 'name' || pageName === 'email' ? (
        <Fragment>
          <input
            type="text"
            className={cx('info__control--input')}
            value={pageName === 'name' ? user.name : user.email}
            placeholder={
              pageName === 'name' ? '이름을 입력해주세요' : 'Ayak@ayak.com'
            }
            onChange={e => controlFunc(pageName, e.target.value)}
          />
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

export default withRouter(InfoControl);
