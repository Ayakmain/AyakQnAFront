import React, { useState } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import {
  Home,
  InfoIntro,
  InfoQna,
  Qna,
  QnaResult
} from '../index';
import { Header } from 'Main/components';

const cx = classNames.bind(styles);

const Main = () => {
  const [info, setInfo] = useState({
    name: null,
    sex: null,
    age: 0,
    email: null
  });

  const [pickList, setPickList] = useState([]);
  const [answerList, setAnswerList] = useState([]);

  const changeInfo = (value, target) => setInfo({ ...info, [target]: value });

  return (
    <div className={cx('main')}>
      <Header />
      <Route render={({ location }) => (
        <TransitionGroup className={cx('transition-group')}>
          <CSSTransition timeout={450} key={location.key} classNames='fade'>
            <Switch location={location}>
              <Route exact path="/info/intro" component={() => <InfoIntro info={info} />} />
              <Route exact path="/info/name" component={() => <InfoQna info={info} changeInfo={changeInfo} />} />
              <Route exact path="/info/sex" component={() => <InfoQna info={info} changeInfo={changeInfo} />} />
              <Route exact path="/info/age" component={() => <InfoQna info={info} changeInfo={changeInfo} />} />
              <Route exact path="/qna" component={() => <Qna info={info} setPickList={setPickList} />} />
              <Route exact path="/qna/:index" component={() => <Qna info={info} setAnswerList={setAnswerList} />} />
              <Route exact path="/info/email" component={() => <InfoQna info={info} changeInfo={changeInfo} />} />
              <Route exact path="/result" component={() => <QnaResult info={info} pickList={pickList} answerList={answerList} />} />
              <Route exact path="/" component={Home} />
              <Redirect path="*" to="/" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    </div >
  );
};

export default withRouter(Main);