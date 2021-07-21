import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Button } from 'components';
import Logo from "static/images/logo.png";
import Close from 'static/images/x.png';

const cx = classNames.bind(styles);

const ResultList = ({ key, item }) => {
  const [toggle, setToggle] = useState(false);
  const [selectItem, setSelect] = useState(null);

  const select = (item) => {
    if (!toggle) {
      setSelect(item);
    } else {
      setSelect(null);
    }
    setToggle(!toggle)
  };

  return (selectItem && item.name === selectItem.name) ? (
    <div className={cx('prescription__detail')}>
      <div className={cx('prescription__detail--section')}>
        <img src={Logo} alt="리스트 대표 사진" className={cx('prescription__detail--section--img')} />
        <div className={cx('prescription__detail--section--description')}>
          <h4 className={cx('prescription__detail--section--description--header')}>{selectItem.name}</h4>
          <ul>
            {
              selectItem.shortDescriptions.length > 0 && selectItem.shortDescriptions.map((description, i) =>
                <li key={i}>{description}</li>
              )
            }
          </ul>
        </div>
        <div className={cx('prescription__detail--section--bottom')}>
          <Button onClick={select}>
            <img src={Close} alt="닫기버튼" className={cx('prescription__detail--section--bottom--close')} />
          </Button>
        </div>
      </div>
      <div className={cx('prescription__detail--wrap')}>
        {
          selectItem.descriptions.length > 0 && selectItem.descriptions.map((item, i) =>
            <Fragment key={i}>
              <span className={cx('prescription__detail--wrap--title')}>{item.title}</span>
              <ul>
                {
                  item.detail.length > 0 && item.detail.map((description, i) =>
                    <li key={i}>{description}</li>
                  )
                }
              </ul>
            </Fragment>
          )
        }
      </div>
    </div>
  ) : (
    <div className={cx('prescription')} key={key}>
      <img src={Logo} alt="리스트 대표 사진" className={cx('prescription__img')} />
      <div className={cx('prescription__description')}>
        <h4 className={cx('prescription__description--header')}>{item.name}</h4>
        <ul>
          {
            item.shortDescriptions.length > 0 && item.shortDescriptions.map((description, i) =>
              <li key={i}>{description}</li>
            )
          }
        </ul>
      </div>
      <div className={cx('prescription__bottom')}>
        <Button className={cx('prescription__bottom--add')} onClick={() => select(item)}>
          &#43;
        </Button>
      </div>
    </div>
  )
};

export default withRouter(ResultList);