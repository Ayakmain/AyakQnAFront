import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import Logo from 'static/images/logo.png';
import Close from 'static/images/x.png';
import Back from 'static/images/arrow2.png';
import { Button } from 'components/index';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Header = ({ location, history }) => {
  const [pageList] = useState([
    '/',
    '/info/name',
    '/info/sex',
    '/info/birth',
    '/qna',
    '/info/height',
    '/info/weight',
    '/info/email',
    '/result',
  ]);
  const { pathname } = location;
  const category = pathname.split('/')[1];

  // const prevHistory = useHistory();

  const goToPreviousPath = () => {
    // TODO: 이부분 수정해야함
    // if (pathname === '/info/email' || category === '/qna') {
    //   prevHistory();
    // }
    if (pathname === '/qna/1') {
      return history.push('/qna');
    } else {
      const index = pageList.findIndex(item => item === pathname);
      const prev = pageList[index - 1];
      return history.push(prev);
    }
  };

  return (
    <div className={cx('header')}>
      {category ? (
        <Button className={cx('header__btn')} onClick={goToPreviousPath}>
          <img
            className={cx('header__btn--close')}
            src={Back}
            alt="뒤로가기 버튼"
          />
        </Button>
      ) : (
        <img className={cx('header__logo')} src={Logo} alt="메인 로고" />
      )}
      {/* TODO: Cafe24 홈으로 이동시켜주어야함 */}
      <Button className={cx('header__btn')} to="/">
        <img className={cx('header__btn--close')} src={Close} alt="닫기 버튼" />
      </Button>
    </div>
  );
};

export default withRouter(Header);
