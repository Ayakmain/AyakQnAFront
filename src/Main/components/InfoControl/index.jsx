import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Arrow from 'static/images/Arrow.png';
import { Button } from 'components/index';

const cx = classNames.bind(styles);

const InfoControl = ({ pageName, toggle, email, years, setToggle, year, controlFunc, name, confirm }) => pageName === 'sex' ?
  <div className={cx('sex')}>
    <Button className={cx('sex__btn')} onClick={() => confirm('sex', 'male')}>
      남성
    </Button>
    <Button className={cx('sex__btn')} onClick={() => confirm('sex', 'female')}>
      여성
    </Button>
  </div> :
  <div className={cx('info__control')}>
    {
      (pageName === 'name' || pageName === 'email') ?
        <Fragment>
          {
            pageName === 'email' ?
              <input type="email" className={cx('info__control--input')} value={email} placeholder="Ayak@ayak.com" onChange={e => controlFunc(pageName, e.target.value)} />
              :
              <input type="text" className={cx('info__control--input')} value={name} placeholder="이름을 입력해주세요" onChange={e => controlFunc(pageName, e.target.value)} />
          }
          <Button onClick={() => confirm(pageName)} className={cx('info__control--confirm')} >
            <img src={Arrow} alt="확인버튼" className={cx('info__control--confirm--img')} />
          </Button>
        </Fragment>
        :
        <Fragment>
          <Button className={cx('info__control--input')} onClick={() => setToggle(true)}>
            {year ? year + ' 년생' : <span>나이를 입력해주세요</span>}
          </Button>
          {
            toggle && <div className={cx('info__control--select')}>
              {
                years.length > 0 && years.map((year, i) =>
                  <Button key={i} onClick={() => controlFunc('year', year)}>{year} 년생</Button>
                )
              }
            </div>
          }
          <Button onClick={() => confirm('year', year)} className={cx('info__control--check')}>
            <img src={Arrow} alt="확인버튼" className={cx('info__control--check--img')} />
          </Button>
        </Fragment>
    }
  </div>;

export default withRouter(InfoControl);