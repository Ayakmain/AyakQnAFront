import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Arrow from 'static/images/Arrow.png';
import moment from 'moment';

const cx = classNames.bind(styles);

const InfoAge = ({ info }) => {
  const [years, setYears] = useState([]);
  const [year, setYear] = useState('');
  const [toggle, setToggle] = useState(false);

  const YEARS = () => {
    const yearList = []
    const dateStart = moment().subtract(50, 'y')
    const dateEnd = moment()
    while (dateEnd.diff(dateStart, 'years') >= 0) {
      yearList.push(dateStart.format('YYYY'))
      dateStart.add(1, 'year')
    }
    yearList.reverse();
    return setYears(yearList);
  }

  useEffect(() => YEARS(), [])

  const selectYear = (selectData) => {
    setYear(selectData);
    return setToggle(false);
  }

  return info.sex ? <Redirect to={{ pathname: '/info/sex' }} /> :
    info.name ? (
      <article className={cx('qna')}>
        <section className={cx('qna__info')}>
          <span className={cx('qna__info--question')}>
            {info.name}님의<br />
            건강체크를 위해<br />
            <span>나이</span>가 궁금합니다.
          </span>
          <div className={cx('qna__control')}>
            <button className={cx('qna__control--input')} onClick={() => setToggle(true)}>
              {year ? year : <span>나이를 입력해주세요</span>}
            </button>
            {
              toggle && <div className={cx('qna__control--select')}>
                {years.length > 0 && years.map((year, i) =>
                  <button key={i} onClick={() => selectYear(year)}>{year}</button>
                )}
              </div>
            }
            <button>
              <img src={Arrow} alt="확인버튼" className={cx('qna__control--confirm')} />
            </button>
          </div>
        </section>
      </article>
    ) : <Redirect to={{ pathname: '/info/name' }} />
};

export default withRouter(InfoAge);