import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Arrow from 'static/images/Arrow.png';
import { Button } from 'components/index';

const cx = classNames.bind(styles);

const InfoControl = ({ pageName, toggle, years, setToggle, year, controlFunc, name, confirm }) => pageName === 'sex' ?
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
      pageName === 'name' ?
        <Fragment>
          <input type="text" className={cx('info__control--input')} value={name} placeholder="이름을 입력해주세요" onChange={e => controlFunc('name', e.target.value)} />
          <Button onClick={() => confirm('name')}>
            <img src={Arrow} alt="확인버튼" className={cx('info__control--confirm')} />
          </Button>
        </Fragment>
        :
        <Fragment>
          <Button className={cx('info__control--input')} onClick={() => setToggle(true)}>
            {year ? year : <span>나이를 입력해주세요</span>}
          </Button>
          {
            toggle && <div className={cx('info__control--select')}>
              {years.length > 0 && years.map((year, i) =>
                <Button key={i} onClick={() => controlFunc('year', year)}>{year}</Button>
              )}
            </div>
          }
          <Button onClick={() => confirm('year', year)}>
            <img src={Arrow} alt="확인버튼" className={cx('qna__control--confirm')} />
          </Button>
        </Fragment>
    }
  </div>;

export default withRouter(InfoControl);