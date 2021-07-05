import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Arrow from 'static/images/Arrow.png';
import moment from 'moment';

const cx = classNames.bind(styles);

const InfoAge = ({ info }) => {
  const [years, setYears] = useState([]);

  const YEARS = () => {
    const years = []
    const dateStart = moment().subtract(50, 'y')
    const dateEnd = moment()
    while (dateEnd.diff(dateStart, 'years') >= 0) {
      years.push(dateStart.format('YYYY'))
      dateStart.add(1, 'year')
    }
    return setYears(years);
  }

  useEffect(() => YEARS(), [])

  return (
    <article className={cx('qna')}>
      <section className={cx('qna__main')}>
        <span className={cx('qna__main--text')}>
          {info.name}님의<br />
          건강체크를 위해<br />
          <span>나이</span>가 궁금합니다.
        </span>
        <div className={cx('qna__control')}>
          <select className={cx('qna__control--input')}>
            <option value="">나이를 입력해주세요</option>
            {
              years.length > 0 && years.map((year, i) =>
                <option value="year" key={i}>{year}</option>
              )
            }
          </select>
          <button>
            <img src={Arrow} alt="확인버튼" className={cx('qna__control--confirm')} />
          </button>
        </div>
      </section>
    </article>
  );
};

export default withRouter(InfoAge);