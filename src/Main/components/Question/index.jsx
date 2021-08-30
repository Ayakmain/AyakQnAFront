import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { QAList } from 'static/json/QAList.json';
// import { Questions } from 'static/json/Question.json';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Question = ({
  name,
  pageName,
  location,
  match,
  history,
  className,
  questionSelect,
}) => {
  const { qa } = match.params;
  const [question, setQa] = useState('');
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
    } else if (pageName === 'qna') {
      if (questionSelect) {
        pageQa = questionSelect;
      } else {
        pageQa = `{name}님의 요즘 고민은 <br /> 무엇인가요?`;
      }
    }

    switch (pageName) {
      case 'height':
        pageQa = findQa(pageName);
        break;
      case 'weight':
        pageQa = findQa(pageName);
        break;
      case 'email':
        pageQa = findQa(pageName);
        break;
      case 'sunning':
        pageQa = findQa(pageName);
        break;
      case 'smoke':
        pageQa = findQa(pageName);
        break;
      case 'drink':
        pageQa = findQa(pageName);
        break;
      case 'pregnant':
        pageQa = findQa(pageName);
        break;
      case 'pms':
        pageQa = findQa(pageName);
        break;
      case 'know':
        pageQa = findQa(pageName);
        break;
      case 'healthy':
        pageQa = findQa(pageName);
        break;
      default:
        break;
    }

    if (pageQa.indexOf('{name}') !== -1) {
      pageQa = pageQa.replace('{name}', name);
    }

    return setQa(pageQa);
  }, [pageName, name, pageNumber, qa, history, questionSelect]);

  // dangerouslySetInnerHTML사용하여서 문자열을 HTML로 변경
  return (
    <span
      className={className ? className : cx('info__question')}
      dangerouslySetInnerHTML={{ __html: question }}
    ></span>
  );
};

export default withRouter(Question);
