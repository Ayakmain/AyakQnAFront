import React, { useState } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Home, InfoIntro, InfoQna, Qna, QnaResult } from '../index';
import { Header } from 'Main/components';

const cx = classNames.bind(styles);

const Main = ({ user }) => {
  const [pickList, setPickList] = useState([]);
  const [answerList, setAnswerList] = useState([]);

  return (
    <div className={cx('main')}>
      <Header />
      <Route
        render={({ location }) => (
          <TransitionGroup className={cx('transition-group')}>
            <CSSTransition timeout={450} key={location.key} classNames="fade">
              <Switch location={location}>
                <Route exact path="/info/name" component={InfoQna} />
                {!user.name && <Redirect to="/info/name" />}
                <Route exact path="/info/intro" component={InfoIntro} />
                <Route exact path="/info/sex" component={InfoQna} />
                {!user.sex && <Redirect to="/info/sex" />}
                <Route exact path="/info/age" component={InfoQna} />
                {!user.year && <Redirect to="/info/age" />}
                <Route
                  exact
                  path="/qna"
                  component={() => <Qna setPickList={setPickList} />}
                />
                <Route
                  exact
                  path="/qna/:index"
                  component={() => (
                    <Qna user={user} setAnswerList={setAnswerList} />
                  )}
                />
                <Route exact path="/info/email" component={InfoQna} />
                <Route
                  exact
                  path="/result"
                  component={() => (
                    <QnaResult
                      user={user}
                      pickList={pickList}
                      answerList={answerList}
                    />
                  )}
                />
                <Route exact path="/" component={Home} />
                <Redirect path="*" to="/" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.env.user };
};

export default connect(mapStateToProps, envActions)(withRouter(Main));
