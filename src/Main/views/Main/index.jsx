import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import {
  Home,
  Error,
  InfoIntro,
  InfoQna,
  Qna,
  QnaResult
} from '../index';
import { Header } from 'Main/components';


const cx = classNames.bind(styles);

const Main = ({ location }) => {
  const [page, setPage] = useState('/');
  const pageName = location.pathname.split('/')[2];

  const [info, setInfo] = useState({
    name: null,
    sex: null,
    age: 0,
  });

  const [pickList, setPickList] = useState([]);

  useEffect(() => {
    switch (pageName) {
      case 'name':
        setPage('/');
        break;
      case 'intro':
        setPage('/info/name');
        break;
      case 'sex':
        setPage('/info/intro');
        break;
      case 'age':
        setPage('/info/sex');
        break;
      default:
        setPage('/');
        break;
    }
  }, [pageName])

  const changeInfo = (value, target) => setInfo({ ...info, [target]: value });

  return (
    <div className={cx('main')}>
      <Header page={page} />
      <Switch>
        <Route exact path="/info/intro" component={() => <InfoIntro info={info} />} />
        <Route exact path="/info/sex" component={() => <InfoQna info={info} changeInfo={changeInfo} pageName={pageName} />} />
        <Route exact path="/info/name" component={() => <InfoQna info={info} changeInfo={changeInfo} pageName={pageName} />} />
        <Route exact path="/info/age" component={() => <InfoQna info={info} changeInfo={changeInfo} pageName={pageName} />} />
        <Route exact path="/qna" component={() => <Qna info={info} setPickList={setPickList} />} />
        <Route exact path="/qna/:index" component={() => <Qna info={info} />} />
        <Route exact path="/result" component={() => <QnaResult info={info} />} />
        <Route exact path="/resultCart" component={() => <QnaResult info={info} />} />
        <Route exact path="/" component={Home} />
        <Route path="/404" component={Error} />
        <Redirect path="*" to="/404" />
      </Switch>
    </div>
  );
};

export default withRouter(Main);