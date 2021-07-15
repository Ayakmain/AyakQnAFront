import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { InfoQuestion, InfoControl } from 'Main/components';
import moment from 'moment';

const cx = classNames.bind(styles);

const InfoQna = ({ info, changeInfo, history, location }) => {
  const pageName = location.pathname.split('/')[2];

  const [name, setName] = useState('');
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

  // name이 없으면 이름 입력창으로 이동
  useEffect(() => (pageName !== 'name' && !info.name) && history.push('/info/name'), [history, info, pageName])

  // /info/age 일 때 년도를 불러 주는 부분
  useEffect(() => (pageName === 'age') && YEARS(), [pageName])

  const controlFunc = (type, value) => {
    if (type === 'name') {
      return setName(value);
    } else {
      setYear(value);
      return setToggle(false);
    }
  };

  const confirm = (type, value) => {
    if (type === 'name') {
      changeInfo(name, 'name');
      return history.push('/info/intro');
    } else if (type === 'sex') {
      changeInfo(value, 'sex');
      return history.push('/info/age');
    } else {
      changeInfo(year, 'age');
      return history.push('/qna');
    }
  }

  return (
    <article className={cx('qna')}>
      <section className={cx('qna__info')}>
        <InfoQuestion name={info.name && info.name} pageName={pageName} />
        <InfoControl pageName={pageName} toggle={toggle} setToggle={setToggle} years={years} year={year} controlFunc={controlFunc} confirm={confirm} />
      </section>
    </article>
  )
};

export default withRouter(InfoQna);