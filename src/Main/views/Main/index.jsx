/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames/bind';
import { Header } from 'Main/components';
import styles from './stylesheet.scss';
import {
  Home,
  Intro,
  InfoQna,
  Qna,
  QnaResult,
  QnaPick,
  StaticQna,
} from '../index';
import { UserApi } from 'api';

const cx = classNames.bind(styles);

const Main = ({ setUser }) => {
  // localstorage에 있는 데이터들 user로 업데이트 해주는 부분
  useEffect(() => {
    // localhost에서 user 가져오기
    const localUser = JSON.parse(window.localStorage.getItem('user'));

    if (localUser) {
      return UserApi.get(localUser._id).then(({ user }) => {
        if (user) setUser({ ...user });
        else setUser({ ...localUser });
      });
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
                <Route exact path="/intro/Basics" component={Intro} />
                <Route exact path="/intro/Symptoms" component={Intro} />
                <Route exact path="/intro/Lifestyle" component={Intro} />
                <Route exact path="/intro/result" component={Intro} />
                <Route exact path="/info/name" component={InfoQna} />
                <Route exact path="/info/gender" component={InfoQna} />
                <Route exact path="/info/birth" component={InfoQna} />
                <Route exact path="/qna" component={QnaPick} />
                <Route exact path="/qna/:qa" component={Qna} />
                <Route exact path="/result" component={QnaResult} />
                <Route exact path="/height" component={StaticQna} />
                <Route exact path="/weight" component={StaticQna} />
                <Route exact path="/healthy" component={StaticQna} />
                <Route exact path="/sunning" component={StaticQna} />
                <Route exact path="/smoke" component={StaticQna} />
                <Route exact path="/drink" component={StaticQna} />
                <Route exact path="/pregnant" component={StaticQna} />
                <Route exact path="/pms" component={StaticQna} />
                <Route exact path="/know" component={StaticQna} />
                <Route exact path="/email" component={StaticQna} />
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
