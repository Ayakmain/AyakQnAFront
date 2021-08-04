/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames/bind';
import { Header } from 'Main/components';
import styles from './stylesheet.scss';
import { Home, InfoIntro, InfoQna, Qna, QnaResult } from '../index';

const cx = classNames.bind(styles);

const Main = ({ setUser }) => {
  // localstorage에 있는 데이터들 user로 업데이트 해주는 부분
  useEffect(() => {
    // localhost에서 user 가져오기
    const localUser = JSON.parse(window.localStorage.getItem('user'));

    if (localUser) {
      setUser({ ...localUser });
    }
  }, []);

  return (
    <div className={cx('main')}>
      <Header />
      <Route
        render={({ location }) => (
          <TransitionGroup className={cx('transition-group')}>
            <CSSTransition timeout={450} key={location.key} classNames="fade">
              <Switch location={location}>
                <Route exact path="/" component={Home} />
                <Route exact path="/info/name" component={InfoQna} />
                <Route exact path="/info/intro" component={InfoIntro} />
                <Route exact path="/info/sex" component={InfoQna} />
                <Route exact path="/info/age" component={InfoQna} />
                <Route exact path="/qna" component={Qna} />
                <Route exact path="/qna/:index" component={Qna} />
                <Route exact path="/info/email" component={InfoQna} />
                <Route exact path="/result" component={QnaResult} />
                <Redirect path="*" to="/" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  );
};

const mapStateToProps = state => ({ user: state.env.user });

export default connect(mapStateToProps, envActions)(withRouter(Main));
