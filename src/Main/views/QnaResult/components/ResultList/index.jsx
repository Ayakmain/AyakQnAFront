import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Button } from 'components';

const cx = classNames.bind(styles);

const ResultList = ({ result, location }) => {
  const pagename = location.pathname.split('/')[1];

  return (
    <section className={cx('result__main')}>
      {
        result.length > 0 && result.map((item, i) =>
          <div className={pagename === 'result' ? cx('result__main--wrap') : cx('result__main--section')} key={i}>
            <div className={pagename === 'resultCart' && cx('result__main--headerwrap')}>
              <div className={pagename === 'result' ? cx('result__main--wrap--medi') : cx('result__main--section--medi')} />
              <h4 className={cx('result__main--wrap--header')}>{item.name}</h4>
            </div>
            <ul>
              {
                item.descriptions.length > 0 && item.descriptions.map((description, i) =>
                  <li key={i}>{description}</li>
                )
              }
            </ul>
            {
              pagename === 'result' ? <Button className={cx('result__main--wrap--detail')}>자세히 보기</Button> :
                <div className={cx('result__main--section--btn')}>
                  <Button className={cx('result__main--section--add')}>&#43;</Button>
                </div>
            }
          </div>
        )
      }
    </section>
  )
};

export default withRouter(ResultList);