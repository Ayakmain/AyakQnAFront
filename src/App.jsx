import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Main } from 'Main/views/index.js';
import styles from 'stylesheet.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx('app')}>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
};

// create-react-app에서는 데코레이터 사용하지 못함으로 이런식으로 사용
export default withRouter(App);
