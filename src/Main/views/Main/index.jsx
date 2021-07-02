import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Home } from '../index';
import { Header } from 'Main/components';


const cx = classNames.bind(styles);

const Main = () => {

  return (
    <div className={cx('main')}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default withRouter(Main);