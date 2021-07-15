import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Logo from 'static/images/logo.png';
import Close from 'static/images/x.png';
import Back from 'static/images/arrow2.png';
import { Button } from 'components/index';

const cx = classNames.bind(styles);

const Header = ({ location }) => {
  const category = location.pathname.split('/')[1];
  const categoryPage = location.pathname.split('/')[2];
  let history = useHistory();
  const goToPreviousPath = () => {
    if (categoryPage === 'name') history.push('/');
    else history.goBack();
  }

  return (
    <div className={cx('header')}>
      {
        category ?
          <Button className={cx('header__btn')} onClick={goToPreviousPath}>
            <img className={cx('header__btn--close')} src={Back} alt="뒤로가기 버튼" />
          </Button> :
          <img className={cx('header__logo')} src={Logo} alt="메인 로고" />
      }
      {/* TODO: Cafe24 홈으로 이동시켜주어야함 */}
      <Button className={cx('header__btn')} to="/">
        <img className={cx('header__btn--close')} src={Close} alt="닫기 버튼" />
      </Button>
    </div>
  )
};

export default withRouter(Header);