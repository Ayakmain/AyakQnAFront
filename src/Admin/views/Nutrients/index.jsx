import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { MetaTag, Button } from 'components/index';
import styles from './stylesheet.scss';
import { NutritionApi, ImageApi } from 'api';

const cx = classNames.bind(styles);

const Nutrients = () => {
  const [results, setResults] = useState([]);

  useEffect(
    () => NutritionApi.list().then(({ nutritions }) => setResults(nutritions)),
    []
  );

  return (
    <article className={cx('admin__nutrition')}>
      <MetaTag
        keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
        description="아약 맞춤형 추천 관리자"
        title="아약 맞춤형 추천 관리자"
      />
      <section className={cx('admin__nutrition--header')}>
        <div className={cx('admin__nutrition--header--div')}>영양제 리스트</div>
      </section>
      <table className={cx('admin__nutrition--table')}>
        <thead className={cx('admin__nutrition--table--header')}>
          <tr>
            <th className={cx('admin__nutrition--table--header--th')}>
              대표 이미지
            </th>
            <th className={cx('admin__nutrition--table--header--th')}>이름</th>
            <th className={cx('admin__nutrition--table--header--th')}>타입</th>
            <th className={cx('admin__nutrition--table--header--th')}>
              디테일
            </th>
          </tr>
        </thead>
        <tbody className={cx('admin__nutrition--table--body')}>
          {results.length === 0 ? (
            <tr>
              <td colSpan="4">영양제 정보가 없습니다.</td>
            </tr>
          ) : (
            results.map((result, i) => (
              <tr key={i}>
                <td className={cx('admin__nutrition--table--body--td')}>
                  <img
                    className={cx('admin__nutrition--table--body--td--img')}
                    src={ImageApi.get(result.thumbnailImage)}
                    alt={result.name}
                  />
                </td>
                <td className={cx('admin__nutrition--table--body--td')}>
                  {result.name}
                </td>
                <td className={cx('admin__nutrition--table--body--td')}>
                  {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                </td>
                <td className={cx('admin__nutrition--table--body--td')}>
                  <Button
                    className={cx('admin__nutrition--table--body--td--btn')}
                    to={`/admin/nutrients/${result._id}`}
                  >
                    자세히 보기
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </article>
  );
};

export default withRouter(Nutrients);
