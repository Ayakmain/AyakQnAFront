import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as envActions } from 'store/reducers/env';
import classNames from 'classnames/bind';
import { Button } from 'components/index';
import Logo from 'static/images/logo.png';
import InfoLogo from 'static/images/infoLogo.png';
import Close from 'static/images/x.png';
import Menu from 'static/images/menu.png';
import Back from 'static/images/arrow2.png';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Header = ({ location, history, user }) => {
  const [menuOpen, setToggle] = useState(false);
  const [view] = useState(window.innerWidth >= 800 ? 'web' : 'mobile');
  const [pageList] = useState([
    '/',
    '/info/name',
    '/info/sex',
    '/info/birth',
    '/qna',
    '/height',
    '/weight',
    '/healthy',
    '/sun',
    '/smoke',
    '/drink',
    '/pregnant',
    '/pms',
    '/know',
    '/email',
    '/result',
  ]);
  const { pathname } = location;
  const category = pathname.split('/')[1];
  const qa = pathname.split('/')[2];
  const questionList = JSON.parse(window.localStorage.getItem('qa'));

  const goToPreviousPath = () => {
    // TODO: 이부분 수정해야함
    if (pathname === '/height') {
      return history.push(`/qna/${questionList[questionList.length - 1].type}`);
    }
    if (pathname.includes('qna') && pathname.split('/')[2]) {
      const index = questionList.findIndex(item => item.type === qa);

      if (index === 0) {
        return history.push('/qna');
      } else {
        return history.push(`/qna/${questionList[index - 1].type}`);
      }
    } else {
      if (pathname === '/know' && user.sex === 'Male') {
        return history.push('/drink');
      }
      const index = pageList.findIndex(item => item === pathname);
      const prev = pageList[index - 1];
      return history.push(prev);
    }
  };

  return (
    <Fragment>
      <div className={cx('header')}>
        {!category || category === 'result' ? (
          <Button to={'/'}>
            <img
              className={cx(
                category === 'result' ? 'header__result' : 'header__logo'
              )}
              src={Logo}
              alt="메인 로고"
            />
          </Button>
        ) : category !== 'intro' ? (
          <Button className={cx('header__btn')} onClick={goToPreviousPath}>
            <img
              className={cx('header__btn--close')}
              src={Back}
              alt="뒤로가기 버튼"
            />
          </Button>
        ) : (
          <img className={cx('header__logo')} src={InfoLogo} alt="메인 로고" />
        )}
        {/* TODO: Cafe24 홈으로 이동시켜주어야함 */}
        {pathname !== '/intro/result' &&
          (category === 'result' ? (
            <Button
              className={cx('header__menu')}
              onClick={() => setToggle(!menuOpen)}
            >
              <img src={Menu} alt="메뉴 열기 버튼" />
            </Button>
          ) : (
            <Button className={cx('header__btn')} to="/">
              <img
                className={cx('header__btn--close')}
                src={Close}
                alt="닫기 버튼"
              />
            </Button>
          ))}
      </div>
      {category === 'result' && menuOpen && (
        <div className={cx('menu')}>
          <ul className={cx('menu__ul')}>
            <li className={cx('menu__ul--list')}>
              <Button
                className={cx('menu__ul--list--btn')}
                href={
                  view === 'mobile'
                    ? 'http://m.ayak.kr/company/about.html'
                    : 'http://ayak.kr/company/about.html'
                }
              >
                <strong>AYAK</strong>
                <br />
                APP
              </Button>
            </li>
            <li className={cx('menu__ul--list')}>
              <Button
                className={cx('menu__ul--list--btn')}
                href={
                  view === 'mobile'
                    ? 'http://m.ayak.kr/product/list.html?cate_no=43'
                    : 'http://ayak.kr/product/list.html?cate_no=43'
                }
              >
                <strong>AYAK</strong>
                <br />
                PRODUCT
              </Button>
            </li>
            <li className={cx('menu__ul--list')}>
              <Button
                className={cx('menu__ul--list--btn')}
                href={
                  view === 'mobile'
                    ? 'http://m.ayak.kr/company/pharm.html'
                    : 'http://ayak.kr/company/pharm.html'
                }
              >
                <strong>AYAK</strong>
                <br />
                PHARMACY
              </Button>
            </li>
            <li className={cx('menu__ul--list')}>
              <Button
                className={cx('menu__ul--list--btn')}
                href={
                  view === 'mobile'
                    ? 'http://m.ayak.kr/company/story.html'
                    : 'http://ayak.kr/company/story.html'
                }
              >
                <strong>AYAK</strong>
                <br />
                STORY
              </Button>
            </li>
          </ul>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.env.user,
});

export default connect(mapStateToProps, envActions)(withRouter(Header));
