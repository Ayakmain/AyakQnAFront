/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Home, Know, Nutrients, NutrientsDetail } from '../index';
import { Button } from 'components/index';

const cx = classNames.bind(styles);

const Admin = ({ location }) => {
  const { pathname } = location;

  return (
    <div className={cx('admin')}>
      <header className={cx('admin__header')}>
        <Button to={'/admin'} className={cx('admin__header--button')}>
          Ayak 맞춤형 설문조사 결과
        </Button>
      </header>
      <article className={cx('admin__article')}>
        <section className={cx('admin__nav')}>
          <Button
            className={cx(
              'admin__nav--item',
              pathname === '/admin' && 'admin__nav--select'
            )}
            to={'/admin'}
          >
            회원 정보
          </Button>
          <Button
            className={cx(
              'admin__nav--item',
              pathname === '/admin/know' && 'admin__nav--select'
            )}
            to={'/admin/know'}
          >
            설문조사 알게된 경위
          </Button>
          <Button
            className={cx(
              'admin__nav--item',
              pathname.includes('/admin/nutrients') && 'admin__nav--select'
            )}
            to={'/admin/nutrients'}
          >
            영양제
          </Button>
        </section>
        <section className={cx('admin__main')}>
          <Route
            render={({ location }) => (
              <Switch location={location}>
                <Route exact path="/admin" component={Home} />
                <Route exact path="/admin/know" component={Know} />
                <Route exact path="/admin/nutrients" component={Nutrients} />
                <Route
                  exact
                  path="/admin/nutrients/:_id"
                  component={NutrientsDetail}
                />
              </Switch>
            )}
          />
        </section>
      </article>
    </div>
  );
};

const mapStateToProps = state => ({ user: state.env.user });

export default connect(mapStateToProps, envActions)(withRouter(Admin));
