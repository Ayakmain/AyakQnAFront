import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { QAList } from 'static/json/QAList.json';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Question = ({ name, pageName, location, match, history, className }) => {
  const [qa, setQa] = useState('');
  const pageNumber = location.pathname.split('/')[2];

  const findQa = value => {
    let obj = QAList.find(item => item.type === value);
    return obj.qa.replace(/\n/g, '<br/>');
  };

  useEffect(() => {
    let pageQa = '';
    if (pageName.indexOf('info') !== -1) {
      // list에서 info에 관한 QA 관리
      pageQa = findQa(pageName.split('/')[2]);
    } else {
      if (pageName === 'qna') {
        pageQa = `{name}님의 요즘 고민은 <br /> 무엇인가요?`;
      }
    }
    if (pageQa.indexOf('{name}') !== -1) {
      pageQa = pageQa.replace('{name}', name);
    }

    switch (match.params.type) {
      case 'sun':
        pageQa = findQa(match.params.type);
        break;
      case 'smoke':
        pageQa = findQa(match.params.type);
        break;
      case 'drink':
        pageQa = findQa(match.params.type);
        break;
      case 'pragnent':
        pageQa = findQa(match.params.type);
        break;
      case 'pms':
        pageQa = findQa(match.params.type);
        break;
      case 'know':
        pageQa = findQa(match.params.type);
        break;
      case 'healthy':
        pageQa = findQa(match.params.type);
        break;
      default:
        break;
    }

    return setQa(pageQa);
  }, [pageName, name, pageNumber, match.params, history]);

  // dangerouslySetInnerHTML사용하여서 문자열을 HTML로 변경
  return (
    <span
      className={className ? className : cx('info__question')}
      dangerouslySetInnerHTML={{ __html: qa }}
    ></span>
  );
};

export default withRouter(Question);
