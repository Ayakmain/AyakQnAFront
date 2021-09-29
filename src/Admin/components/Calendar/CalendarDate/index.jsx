import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const CalendarDate = ({ m, firstWeek, lastWeek, selectDate, changeMonth }) => {
  const onClick = date => {
    selectDate(date);
  };

  const dateArrFunc = index => {
    let days = m
      .clone()
      .startOf('year')
      .week(week)
      .startOf('week')
      .add(index, 'day');

    if (m.format('YYYYMMDD') === days.format('YYYYMMDD')) {
      return (
        <td
          key={index}
          className={cx('calendar__days', 'calendar__days__select')}
        >
          <button onClick={() => onClick(days)}>{days.format('D')}</button>
        </td>
      );
    } else if (days.format('MM') !== changeMonth.format('MM')) {
      return (
        <td
          key={index}
          className={cx('calendar__days', 'calendar__days__before')}
        >
          <button onClick={() => onClick(days)}>{days.format('D')}</button>
        </td>
      );
    } else {
      return (
        <td key={index} className={cx('calendar__days')}>
          <button onClick={() => onClick(days)}>{days.format('D')}</button>
        </td>
      );
    }
  };

  let weekArr = [];
  let week = firstWeek;
  for (week; week <= lastWeek; week++) {
    weekArr = weekArr.concat(
      <tr key={week} className={cx('calendar__days__wrap')}>
        {Array(7)
          .fill(0)
          .map((data, index) => dateArrFunc(index))}
      </tr>
    );
  }
  return weekArr;
};

export default withRouter(CalendarDate);
