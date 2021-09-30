import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'components/index';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Table = ({ results, theader, pages, type, currentPage, changePage }) => (
  <Fragment>
    <table className={cx('admin__table')}>
      <thead className={cx('admin__table--header')}>
        <tr>
          {theader.map((th, i) => (
            <th className={cx('admin__table--header--th')} key={i}>
              {th}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={cx('admin__table--body')}>
        {results.length === 0 ? (
          <tr>
            <td colSpan="4">설문조사에 참여한 사용자가 없습니다.</td>
          </tr>
        ) : (
          results.map((result, i) => (
            <tr key={i}>
              <td className={cx('admin__table--body--td')}>
                {type === 'user' ? result.name : result.author.name}
              </td>
              <td className={cx('admin__table--body--td')}>
                {type === 'user'
                  ? result.gender === 'male'
                    ? '남자'
                    : '여자'
                  : result.author.gender === 'male'
                  ? '남자'
                  : '여자'}
              </td>
              <td className={cx('admin__table--body--td')}>
                {type === 'user' ? result.age : result.author.age}
              </td>
              <td className={cx('admin__table--body--td')}>
                {type === 'user' ? result.email : result.answerAyak}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    <section className={cx('admin__page')}>
      <Button
        onClick={() => currentPage !== 1 && changePage(currentPage - 1)}
        className={cx('admin__page--btn')}
      >
        &lt;
      </Button>
      {pages.map((page, i) => (
        <Button
          key={i}
          onClick={() => changePage(page)}
          className={cx(
            'admin__page--btn',
            currentPage === page && 'admin__page--on'
          )}
        >
          {page}
        </Button>
      ))}
      <Button
        onClick={() =>
          pages[pages.length - 1] !== currentPage && changePage(currentPage + 1)
        }
        className={cx('admin__page--btn')}
      >
        &gt;
      </Button>
    </section>
  </Fragment>
);

export default withRouter(Table);
