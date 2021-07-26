import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Button } from 'components';
import Logo from 'static/images/logo.png';
import Close from 'static/images/x.png';

const cx = classNames.bind(styles);

const ResultList = ({ key, item }) => {
  const [toggle, setToggle] = useState(false);
  const [selectItem, setSelect] = useState(null);

  const select = item => {
    if (!toggle) {
      setSelect(item);
    } else {
      setSelect(null);
    }
    setToggle(!toggle);
  };

  return (
    <div
      className={cx('prescription', selectItem === item && 'prescription__on')}
      key={key}
    >
      <div className={cx('prescription__section')}>
        <img
          src={Logo}
          alt="리스트 대표 사진"
          className={cx('prescription__section--img')}
        />
        <div className={cx('prescription__section--description')}>
          <h4 className={cx('prescription__section--description--header')}>
            {item.name}
          </h4>
          <ul>
            {item.shortDescriptions.length > 0 &&
              item.shortDescriptions.map((description, i) => (
                <li key={i}>{description}</li>
              ))}
          </ul>
        </div>
        {selectItem && item.name === selectItem.name ? (
          <div className={cx('prescription__section--bottom')}>
            <Button onClick={select}>
              <img
                src={Close}
                alt="닫기버튼"
                className={cx('prescription__section--bottom--close')}
              />
            </Button>
          </div>
        ) : (
          <div className={cx('prescription__bottom')}>
            <Button
              className={cx('prescription__bottom--add')}
              onClick={() => select(item)}
            >
              &#43;
            </Button>
          </div>
        )}
      </div>
      {selectItem === item && (
        <div className={cx('prescription__wrap')}>
          {item.descriptions.length > 0 &&
            item.descriptions.map((description, i) => (
              <Fragment key={i}>
                <span className={cx('prescription__wrap--title')}>
                  {description.title}
                </span>
                <ul>
                  {description.detail.length > 0 &&
                    description.detail.map((el, index) => (
                      <li key={index}>{el}</li>
                    ))}
                </ul>
              </Fragment>
            ))}
        </div>
      )}
    </div>
  );
};

export default withRouter(ResultList);
