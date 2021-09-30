import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { MetaTag } from 'components/index';
import { Graph, SubNav, SubHeader, Table } from 'Admin/components';
import styles from './stylesheet.scss';
import { KnowApi } from 'api';

const cx = classNames.bind(styles);

const Know = () => {
  const [results, setResults] = useState([]);
  const [pages, setpage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);
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
        setList(list);
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
      <SubHeader
        header="Ayak 알게된 경위"
        subHeader={`총 검사한 수: ${count}`}
      />

      <SubNav toggle={toggle} setToggle={setToggle} />
      {!toggle ? (
        <Graph results={list} />
      ) : (
        <Table
          theader={['이름', '성별', '나이', '알게된 경위']}
          results={results}
          pages={pages}
          currentPage={currentPage}
          changePage={changePage}
          type="know"
        />
      )}
    </article>
  );
};

export default withRouter(Know);
