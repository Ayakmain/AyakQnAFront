import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { MetaTag, Button } from 'components/index';
import { Graph, SubNav, SubHeader, Table, Modal } from 'Admin/components';
import styles from './stylesheet.scss';
import { useEffect } from 'react';
import { UserApi } from 'api';
import moment from 'moment';

const cx = classNames.bind(styles);

const Home = () => {
  const [users, setUsers] = useState([]);
  const [pages, setpage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const [date, setDate] = useState({ start: null, end: null });
  const [toggle, setToggle] = useState(false);
  const [toggleDate, setToggleDate] = useState({ start: false, end: false });
  const [list, setlist] = useState([]);

  useEffect(() => {
    return apiFunc(15, 1);
  }, []);

  const apiFunc = (limit, page, date) => {
    let option = {
      limit,
      page,
    };
    if (date && date.start && date.end) {
      option = {
        limit,
        page,
        startDate: date.start,
        endDate: date.end,
      };
    }
    return UserApi.getList(option).then(
      ({ users, pageCount, userCount, list }) => {
        setUsers(users);
        let pageList = [];

        for (let i = 0; i < pageCount; i++) {
          pageList.push(i + 1);
        }
        setCount(userCount);
        setlist(list);
        setCurrentPage(page);
        return setpage(pageList);
      }
    );
  };

  const changePage = i => {
    return apiFunc(15, i);
  };

  const selectDate = (e, type) => {
    setToggleDate({ start: false, end: false });
    return setDate({ ...date, [type]: moment(e).format('YYYY-MM-DD') });
  };

  const searchDate = () => {
    return apiFunc(15, 1, date);
  };

  const closeFunc = () => {
    setToggleDate({ start: false, end: false });
  };

  return (
    <article className={cx('admin__user')}>
      <MetaTag
        keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
        description="아약 맞춤형 추천"
        title="아약 맞춤형 추천"
      />
      <SubHeader
        header="Ayak 설문조사 참여자"
        subHeader={`총 설문조사 참여한 수: ${count} 명`}
      />
      <section className={cx('admin__user--search')}>
        <div className={cx('admin__user--search--header')}>날짜로 검색: </div>
        <div className={cx('admin__user--search--wrap')}>
          <Button
            onClick={() => setToggleDate({ ...toggleDate, start: true })}
            className={cx('admin__user--search--wrap--btn')}
          >
            {date.start}
            {toggleDate.start && (
              <Modal
                date={date.start}
                openFunc={() => setToggleDate({ start: true, end: false })}
                closeFunc={closeFunc}
                selectDate={selectDate}
                type="start"
              />
            )}
          </Button>
          ~
          <Button
            onClick={() => setToggleDate({ ...toggleDate, end: true })}
            className={cx('admin__user--search--wrap--btn')}
          >
            {date.end}
            {toggleDate.end && (
              <Modal
                date={date.end}
                openFunc={() => setToggleDate({ start: false, end: true })}
                closeFunc={closeFunc}
                selectDate={selectDate}
                type="end"
              />
            )}
          </Button>
        </div>
      </section>
      <Button onClick={searchDate} className={cx('admin__user--submit')}>
        검색
      </Button>
      <SubNav toggle={toggle} setToggle={setToggle} />
      {!toggle ? (
        <Graph results={list} />
      ) : (
        <Table
          theader={['이름', '성별', '나이', '이메일']}
          results={users}
          pages={pages}
          currentPage={currentPage}
          changePage={changePage}
          type="user"
        />
      )}
    </article>
  );
};

export default withRouter(Home);
