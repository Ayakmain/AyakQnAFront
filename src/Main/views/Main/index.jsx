import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import {
  Home,
  Error,
  InfoIntro,
  InfoQna
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
        <Route exact path="/" component={Home} />
        <Route path="*" component={Error} />
      </Switch>
    </div>
  );
};

export default withRouter(Main);