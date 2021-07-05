import React, { useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Home, InfoName, InfoAge } from '../index';
import { Header } from 'Main/components';


const cx = classNames.bind(styles);

const Main = () => {
  const [info, setInfo] = useState({
    name: '',
    sex: '',
    age: 0,
  });

  const changeInfo = (e, target) => setInfo({ ...info, [target]: e.target.value });

  return (
    <div className={cx('main')}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/info/name" component={() => <InfoName name={info.name} changeInfo={changeInfo} />} />
        {/* <Route exact path="/info/intro" component={Info} />
        <Route exact path="/info/sex" component={Info} /> */}
        <Route exact path="/info/age" component={() => <InfoAge info={info} changeInfo={changeInfo} />} />
      </Switch>
    </div>
  );
};

export default withRouter(Main);