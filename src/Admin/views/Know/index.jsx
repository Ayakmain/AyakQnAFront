import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { MetaTag, Button } from 'components/index';
import styles from './stylesheet.scss';
import { KnowApi } from 'api';

const cx = classNames.bind(styles);

const Know = () => {
  const [results, setResults] = useState([]);
  const [pages, setpage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    return apiFunc(13, 1);
  }, []);

  const apiFunc = (limit, page) => {
    return KnowApi.list({ limit, page }).then(
      ({ knowayaks, pageCount, list }) => {
        setResults(knowayaks);
        let pageList = [];

        for (let i = 0; i < pageCount; i++) {
          pageList.push(i + 1);
        }
        setCurrentPage(page);
        setList(list);
        return setpage(pageList);
      }
    );
  };

  const changePage = i => {
    return apiFunc(13, i);
  };

  return (
    <article>
      <MetaTag
        keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
        description="아약 맞춤형 추천"
        title="아약 맞춤형 추천"
      />
      <section className={cx('admin__home--header')}>Ayak 알게된 경위</section>
      <section className={cx('admin__home--gauge')}>
        {list.map(item => (
          <div style={{ width: `${item.percent}%` }}>
            {item.type} ({item.percent}%)
          </div>
        ))}
      </section>
      <table className={cx('admin__home--table')}>
        <thead className={cx('admin__home--table--header')}>
          <tr>
            <th className={cx('admin__home--table--header--th')}>이름</th>
            <th className={cx('admin__home--table--header--th')}>성별</th>
            <th className={cx('admin__home--table--header--th')}>나이</th>
            <th className={cx('admin__home--table--header--th')}>
              알게된 경위
            </th>
          </tr>
        </thead>
        <tbody className={cx('admin__home--table--body')}>
          {results.length === 0 ? (
            <tr>설문조사에 참여자가 없습니다.</tr>
          ) : (
            results.map((result, i) => (
              <tr key={i}>
                <td className={cx('admin__home--table--body--td')}>
                  {result.author ? result.author.name : '없음'}
                </td>
                <td className={cx('admin__home--table--body--td')}>
                  {result.author
                    ? result.author.gender === 'male'
                      ? '남자'
                      : '여자'
                    : '없음'}
                </td>
                <td className={cx('admin__home--table--body--td')}>
                  {result.author ? result.author.age : '없음'}
                </td>
                <td className={cx('admin__home--table--body--td')}>
                  {result.answerAyak}
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

export default withRouter(Know);
