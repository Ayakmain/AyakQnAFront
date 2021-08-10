import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Question } from 'Main/components';
import styles from './stylesheet.scss';
import Know from 'static/images/logo.png';
import Sun from 'static/images/sun.png';
import Drink from 'static/images/drink.png';
import Healthy from 'static/images/healthy.png';
import Smoke from 'static/images/smoke.png';
import Pregnant from 'static/images/pregnant.png';
import PMS from 'static/images/heart.png';
import Eye from 'static/images/eye.png';

const cx = classNames.bind(styles);

const QaHeader = ({ name, location, match, question }) => {
  // TODO: 이부분 이미지 수정해야함
  const imgList = [
    {
      type: 'eye',
      img: Eye,
    },
    {
      type: 'remember',
      img: Eye,
    },
    {
      type: 'immune',
      img: Eye,
    },
    {
      type: 'hair',
      img: Eye,
    },
    {
      type: 'urinary',
      img: Eye,
    },
    {
      type: 'bone',
      img: Eye,
    },
    {
      type: 'sexual',
      img: Eye,
    },
    {
      type: 'digestion',
      img: Eye,
    },
    {
      type: 'tooth',
      img: Eye,
    },
    {
      type: 'stress',
      img: Eye,
    },
    {
      type: 'tired',
      img: Eye,
    },
    {
      type: 'blood',
      img: Eye,
    },
    {
      type: 'women',
      img: Eye,
    },
    {
      type: 'skin',
      img: Eye,
    },
    {
      type: 'exercise',
      img: Eye,
    },
    {
      type: 'diet',
      img: Eye,
    },
    {
      type: 'sleep',
      img: Eye,
    },
    {
      type: 'healthy',
      img: Healthy,
    },
    {
      type: 'sun',
      img: Sun,
    },
    {
      type: 'smoke',
      img: Smoke,
    },
    {
      type: 'drink',
      img: Drink,
    },
    {
      type: 'pregnant',
      img: Pregnant,
    },
    {
      type: 'pms',
      img: PMS,
    },
    {
      type: 'know',
      img: Know,
    },
  ];
  const { type, qa } = match.params;
  const pageName = location.pathname.split('/')[1];

  return (
    <div className={type || qa ? cx('qa__section') : cx('qa__question')}>
      {(type || qa) && (
        <img
          className={cx('qa__section--img')}
          src={imgList.find(item => item.type === (type ?? qa)).img}
          alt={`${type} 사진`}
        />
      )}
      <Question
        className={(type || qa) && cx('qa__section--question')}
        questionSelect={question}
        name={name && name}
        pageName={type ? (qa ? qa : type) : pageName}
      />
    </div>
  );
};

export default withRouter(QaHeader);
