import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { MetaTag, Button } from 'components/index';
import { Calendar } from 'Admin/components';
import styles from './stylesheet.scss';
import { useEffect } from 'react';
import { UserApi } from 'api';
import { Doughnut } from 'react-chartjs-2';
import Dialog from '@material-ui/core/Dialog';

const cx = classNames.bind(styles);

const Home = () => {
  const [users, setUsers] = useState([]);
  const [pages, setpage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const [date, setDate] = useState({ start: null, end: null });
  const [toggle, setToggle] = useState(false);
  const [toggleDate, setToggleDate] = useState(false);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#3366FF',
          '#98C906',
          '#00AEFF',
          '#FFA500',
          '#FF4530',
          '#0E0205',
        ],
      },
    ],
  });

  useEffect(() => {
    return apiFunc(15, 1);
  }, []);

  const apiFunc = (limit, page) => {
    return UserApi.getList({ limit, page }).then(
      ({ users, pageCount, userCount, list }) => {
        setUsers(users);
        let pageList = [];

        for (let i = 0; i < pageCount; i++) {
          pageList.push(i + 1);
        }
        setCount(userCount);
        setData({
          labels: list.map(item => item.type),
          datasets: [
            {
              data: list.map(item => item.percent),
              backgroundColor: [
                '#3366FF',
                '#98C906',
                '#00AEFF',
                '#FFA500',
                '#FF4530',
                '#0E0205',
              ],
            },
          ],
        });
        setCurrentPage(page);
        return setpage(pageList);
      }
    );
  };

  const changePage = i => {
    return apiFunc(15, i);
  };

  return (
    <article className={cx('admin__user')}>
      <MetaTag
        keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
        description="아약 맞춤형 추천"
        title="아약 맞춤형 추천"
      />
      <section className={cx('admin__user--header')}>
        <section className={cx('admin__user--header')}>
          <div className={cx('admin__user--header--div')}>
            Ayak 설문조사 참여자
          </div>
          <div className={cx('admin__user--header--count')}>
            총 설문조사 참여한 수: {count}
          </div>
        </section>
      </section>
      <section className={cx('admin__user--search')}>
        <div className={cx('admin__user--search--header')}>날짜로 검색: </div>
        <div className={cx('admin__user--search--wrap')}>
          <Button
            onClick={() => setToggleDate(true)}
            className={cx('admin__user--search--wrap--btn')}
          >
            {date.start}
            {toggleDate && (
              <Dialog
                open={toggleDate}
                onClose={() => setToggleDate(false)}
                fullWidth={true}
                // selectDate={}
              >
                <Calendar />
              </Dialog>
            )}
          </Button>
          ~
          <Button
            onClick={() => setToggleDate(true)}
            className={cx('admin__user--search--wrap--btn')}
          >
            {date.end}
            {toggleDate && (
              <Dialog
                open={toggleDate}
                onClose={() => setToggleDate(false)}
                fullWidth={true}
              >
                <Calendar />
              </Dialog>
            )}
          </Button>
        </div>
      </section>
      <ul className={cx('admin__home--nav')}>
        <li className={cx('admin__home--nav--item')}>
          <Button
            onClick={() => setToggle(false)}
            className={cx('admin__home--nav--item--btn', !toggle && 'active')}
          >
            차트로 보기
          </Button>
        </li>
        <li className={cx('admin__home--nav--item')}>
          <Button
            onClick={() => setToggle(true)}
            className={cx('admin__home--nav--item--btn', toggle && 'active')}
          >
            리스트로 보기
          </Button>
        </li>
      </ul>
      {!toggle ? (
        <section className={cx('admin__home--gauge')}>
          <Doughnut data={data} />
        </section>
      ) : (
        <Fragment>
          <table className={cx('admin__user--table')}>
            <thead className={cx('admin__user--table--header')}>
              <tr>
                <th className={cx('admin__user--table--header--th')}>이름</th>
                <th className={cx('admin__user--table--header--th')}>성별</th>
                <th className={cx('admin__user--table--header--th')}>나이</th>
                <th className={cx('admin__user--table--header--th')}>이메일</th>
              </tr>
            </thead>
            <tbody className={cx('admin__user--table--body')}>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4">설문조사에 참여한 사용자가 없습니다.</td>
                </tr>
              ) : (
                users.map((user, i) => (
                  <tr key={i}>
                    <td className={cx('admin__user--table--body--td')}>
                      {user.name}
                    </td>
                    <td className={cx('admin__user--table--body--td')}>
                      {user.gender === 'male' ? '남자' : '여자'}
                    </td>
                    <td className={cx('admin__user--table--body--td')}>
                      {user.age}
                    </td>
                    <td className={cx('admin__user--table--body--td')}>
                      {user.email}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <section className={cx('admin__user--page')}>
            <Button
              onClick={() => currentPage !== 1 && changePage(currentPage - 1)}
              className={cx('admin__user--page--btn')}
            >
              &lt;
            </Button>
            {pages.map((page, i) => (
              <Button
                key={i}
                onClick={() => changePage(page)}
                className={cx(
                  'admin__user--page--btn',
                  currentPage === page && 'admin__user--page--on'
                )}
              >
                {page}
              </Button>
            ))}
            <Button
              onClick={() =>
                pages[pages.length - 1] !== currentPage &&
                changePage(currentPage + 1)
              }
              className={cx('admin__user--page--btn')}
            >
              &gt;
            </Button>
          </section>
        </Fragment>
      )}
    </article>
  );
};

export default withRouter(Home);
