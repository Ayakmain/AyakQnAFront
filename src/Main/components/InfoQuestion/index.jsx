import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { QAList } from 'static/json/QAList.json';

const cx = classNames.bind(styles);

const Question = ({ name, pageName, location }) => {
  const [qa, setQa] = useState('');
  const pageNumber = location.pathname.split('/')[2];

  useEffect(() => {
    let pageQa = '';
    if (pageName.indexOf('info') !== -1) {
      // list에서 info에 관한 QA 관리
      const obj = QAList.find(item => item.type === pageName.split('/')[2]);
      pageQa = obj.qa.replace(/\n/g, '<br/>');
    } else {
      if (pageName === 'qna') {
        pageQa = `{name}님의 요즘 고민은 <br /> 무엇인가요?`;
      }
    }
    if (pageQa.indexOf('{name}') !== -1) {
      pageQa = pageQa.replace('{name}', name);
    }
    return setQa(pageQa);
  }, [pageName, name, pageNumber]);

  // dangerouslySetInnerHTML사용하여서 문자열을 HTML로 변경
  return (
    <span
      className={cx('info__question')}
      dangerouslySetInnerHTML={{ __html: qa }}
    ></span>
  );
};

export default withRouter(Question);
