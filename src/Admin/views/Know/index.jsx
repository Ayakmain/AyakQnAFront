import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { MetaTag, Button } from 'components/index';
import styles from './stylesheet.scss';
import { KnowApi } from 'api';
import { Doughnut } from 'react-chartjs-2';

const cx = classNames.bind(styles);

const Know = () => {
  const [results, setResults] = useState([]);
  const [pages, setpage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const [data, setData] = useState({
    labels: [
      '지인의 추천',
      '쇼핑몰(네이버,쿠팡 등)',
      'SNS(인스타그램,페이스북,유투브 등)',
      '네이버/다음(블로그,기사 등)',
      '온라인 광고',
      '직접 검색',
    ],
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
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    return apiFunc(13, 1);
  }, []);

  const apiFunc = (limit, page) => {
    return KnowApi.list({ limit, page }).then(
      ({ knowayaks, pageCount, list, knowCount }) => {
        setResults(knowayaks);
        let pageList = [];

        for (let i = 0; i < pageCount; i++) {
          pageList.push(i + 1);
        }
        setCurrentPage(page);
        setCount(knowCount);
        setData({
          labels: [
            '지인의 추천',
            '쇼핑몰(네이버,쿠팡 등)',
            'SNS(인스타그램,페이스북,유투브 등)',
            '네이버/다음(블로그,기사 등)',
            '온라인 광고',
            '직접 검색',
          ],
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
        return setpage(pageList);
      }
    );
  };

  const changePage = i => {
    return apiFunc(13, i);
  };

  return (
    <article className={cx('admin__home')}>
      <MetaTag
        keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
        description="아약 맞춤형 추천 관리자"
        title="아약 맞춤형 추천 관리자"
      />
      <section className={cx('admin__home--header')}>
        <div className={cx('admin__home--header--div')}>Ayak 알게된 경위</div>
        <div className={cx('admin__home--header--count')}>
          총 검사한 수: {count}
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
                <tr>
                  <td>설문조사에 참여자가 없습니다.</td>
                </tr>
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
            <Button
              onClick={() => 1 !== currentPage && changePage(currentPage - 1)}
              className={cx('admin__home--page--btn')}
            >
              &lt;
            </Button>
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
            <Button
              onClick={() =>
                pages[pages.length - 1] !== currentPage &&
                changePage(currentPage + 1)
              }
              className={cx('admin__home--page--btn')}
            >
              &gt;
            </Button>
          </section>
        </Fragment>
      )}
    </article>
  );
};

export default withRouter(Know);
