import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Arrow from 'static/images/Arrow.png';

const cx = classNames.bind(styles);

const InfoControl = ({ pageName, toggle, years, setToggle, year, controlFunc, name, confirm }) => pageName === 'sex' ?
  <div className={cx('sex')}>
    <button className={cx('sex__btn')} onClick={() => confirm('sex', 'male')}>
      남성
    </button>
    <button className={cx('sex__btn')} onClick={() => confirm('sex', 'female')}>
      여성
    </button>
  </div> :
  <div className={cx('info__control')}>
    {
      pageName === 'name' ?
        <Fragment>
          <input type="text" className={cx('info__control--input')} value={name} placeholder="이름을 입력해주세요" onChange={e => controlFunc('name', e.target.value)} />
          <button onClick={() => confirm('name')}>
            <img src={Arrow} alt="확인버튼" className={cx('info__control--confirm')} />
          </button>
        </Fragment>
        :
        <Fragment>
          <button className={cx('info__control--input')} onClick={() => setToggle(true)}>
            {year ? year : <span>나이를 입력해주세요</span>}
          </button>
          {
            toggle && <div className={cx('info__control--select')}>
              {years.length > 0 && years.map((year, i) =>
                <button key={i} onClick={() => controlFunc('year', year)}>{year}</button>
              )}
            </div>
          }
          <button onClick={() => confirm('year', year)}>
            <img src={Arrow} alt="확인버튼" className={cx('qna__control--confirm')} />
          </button>
        </Fragment>
    }
  </div>;

export default withRouter(InfoControl);