import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import moment from 'moment';
import DownButton from 'static/images/btn-dropDown.svg';
import CalendarDate from './CalendarDate';

const cx = classNames.bind(styles);

const Calendar = ({ date, selectDate }) => {
  const [m] = useState(moment(date));
  const [changeMonth, setChangeMoment] = useState(moment(date));

  const firstWeek = changeMonth.clone().startOf('month').week();
  const lastWeek =
    changeMonth.clone().endOf('month').week() === 1
      ? 53
      : changeMonth.clone().endOf('month').week();

  const prevMonth = () => {
    setChangeMoment(changeMonth.clone().subtract(1, 'month'));
  };

  const nextMonth = () => {
    setChangeMoment(changeMonth.clone().add(1, 'month'));
  };

  const chooseDate = date => {
    selectDate(date, 'date');
  };

  return (
    <div className={cx('calendar')}>
      <div className={cx('calendar__control')}>
        <button className={cx('calendar__btn')} onClick={prevMonth}>
          <img
            src={DownButton}
            alt="이전달"
            className={cx('calendar__btn__prev')}
          />
        </button>
        <div className={cx('calendar__month__title')}>
          {changeMonth.format('YYYY년')}
          <br />
          {changeMonth.format('MM월')}
        </div>
        <button className={cx('calendar__btn')} onClick={nextMonth}>
          <img
            src={DownButton}
            alt="다음달"
            className={cx('calendar__btn__next')}
          />
        </button>
      </div>
      <table className={cx('calendar__date__wrap')}>
        <tbody>
          <CalendarDate
            m={m}
            changeMonth={changeMonth}
            firstWeek={firstWeek}
            lastWeek={lastWeek}
            selectDate={chooseDate}
          />
        </tbody>
      </table>
    </div>
  );
};

export default withRouter(Calendar);
