import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { MetaTag, Button } from 'components/index';
import styles from './stylesheet.scss';
import { useEffect } from 'react';
import { UserApi } from 'api';

const cx = classNames.bind(styles);

const Home = () => {
  const [users, setUsers] = useState([]);
  const [pages, setpage] = useState([]);
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    return apiFunc(15, 1);
  }, []);

  const apiFunc = (limit, page) => {
    return UserApi.getList({ limit, page }).then(({ users, pageCount }) => {
      setUsers(users);
      let pageList = [];

      for (let i = 0; i < pageCount; i++) {
        pageList.push(i + 1);
      }
      setCurrentPage(page);
      return setpage(pageList);
    });
  };

  const changePage = i => {
    return apiFunc(15, i);
  };

  return (
    <article>
      <MetaTag
        keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
        description="아약 맞춤형 추천"
        title="아약 맞춤형 추천"
      />
      <section className={cx('admin__home--header')}>
        Ayak 설문조사 참여자
      </section>
      <table className={cx('admin__home--table')}>
        <thead className={cx('admin__home--table--header')}>
          <tr>
            <th className={cx('admin__home--table--header--th')}>이름</th>
            <th className={cx('admin__home--table--header--th')}>성별</th>
            <th className={cx('admin__home--table--header--th')}>나이</th>
            <th className={cx('admin__home--table--header--th')}>이메일</th>
          </tr>
        </thead>
        <tbody className={cx('admin__home--table--body')}>
          {users.length === 0 ? (
            <tr>설문조사에 참여한 사용자가 없습니다.</tr>
          ) : (
            users.map((user, i) => (
              <tr key={i}>
                <td className={cx('admin__home--table--body--td')}>
                  {user.name}
                </td>
                <td className={cx('admin__home--table--body--td')}>
                  {user.gender === 'male' ? '남자' : '여자'}
                </td>
                <td className={cx('admin__home--table--body--td')}>
                  {user.age}
                </td>
                <td className={cx('admin__home--table--body--td')}>
                  {user.email}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <section className={cx('admin__home--page')}>
        {pages.map((page, i) => (
          <Button
            key={i}
            onClick={() => changePage(page)}
            className={cx(
              'admin__home--page--btn',
              currentPage === page && 'admin__home--page--on'
            )}
          >
            {page}
          </Button>
        ))}
      </section>
    </article>
  );
};

export default withRouter(Home);
