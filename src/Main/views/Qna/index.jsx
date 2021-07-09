import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { InfoQuestion } from 'Main/components';
import { Button } from 'components';
import { List } from "static/json/list.json";

const cx = classNames.bind(styles);

const Qna = ({ info, location }) => {
  const pageName = location.pathname.split('/')[1];

  return (
    <article className={cx('qna')}>
      <section className={cx('qna__inf')}>
        <InfoQuestion name={info.name && info.name} pageName={pageName} />
        <div>
          {
            List.map((item, i) => <div key={i}>{item}</div>)
          }
        </div>
        <Button>선택완료</Button>
      </section>
    </article>
  )
};

export default withRouter(Qna);