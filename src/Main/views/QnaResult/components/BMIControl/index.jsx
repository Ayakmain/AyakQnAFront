import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const BMIControl = ({ percent }) => (
  <Fragment>
    <ul className={cx('bmi')}>
      <li className={cx('bmi__list', percent < 20 && 'select')}>저체중</li>
      <li
        className={cx('bmi__list', percent >= 20 && percent < 40 && 'select')}
      >
        정상
      </li>
      <li
        className={cx('bmi__list', percent >= 40 && percent < 60 && 'select')}
      >
        과체중
      </li>
      <li
        className={cx('bmi__list', percent >= 60 && percent < 80 && 'select')}
      >
        비만
      </li>
      <li className={cx('bmi__list', percent >= 80 && 'select')}>중도비만</li>
    </ul>
    <div className={cx('bmi__section')}>
      <ul className={cx('bmi', 'bmi__wrap')}>
        <li className={cx('bmi__list', 'bmi__gauge')} />
        <li className={cx('bmi__list', 'bmi__gauge')} />
        <li className={cx('bmi__list', 'bmi__gauge')} />
        <li className={cx('bmi__list', 'bmi__gauge')} />
        <li className={cx('bmi__list', 'bmi__gauge')} />
      </ul>
      <div
        className={cx('bmi__section--gauge')}
        style={{
          width: `${percent}%`,
          maxWidth: '101%',
        }}
      />
    </div>
  </Fragment>
);

export default withRouter(BMIControl);
