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
import Women from 'static/images/women.png';
import Remember from 'static/images/remember.png';
import Immune from 'static/images/immune.png';
import Hair from 'static/images/hair.png';
import Urinary from 'static/images/urinary.png';
import Bone from 'static/images/bone.png';
import Sexual from 'static/images/sexual.png';
import Digestion from 'static/images/digestion.png';
import Tooth from 'static/images/tooth.png';
import Stress from 'static/images/stress.png';
import Tired from 'static/images/tired.png';
import Blood from 'static/images/blood.png';
import Skin from 'static/images/skin.png';
import Exercise from 'static/images/exercise.png';
import Diet from 'static/images/diet.png';
import Sleep from 'static/images/sleep.png';

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
      img: Remember,
    },
    {
      type: 'immune',
      img: Immune,
    },
    {
      type: 'hair',
      img: Hair,
    },
    {
      type: 'urinary',
      img: Urinary,
    },
    {
      type: 'bone',
      img: Bone,
    },
    {
      type: 'sexual',
      img: Sexual,
    },
    {
      type: 'digestion',
      img: Digestion,
    },
    {
      type: 'tooth',
      img: Tooth,
    },
    {
      type: 'stress',
      img: Stress,
    },
    {
      type: 'tired',
      img: Tired,
    },
    {
      type: 'blood',
      img: Blood,
    },
    {
      type: 'women',
      img: Women,
    },
    {
      type: 'skin',
      img: Skin,
    },
    {
      type: 'exercise',
      img: Exercise,
    },
    {
      type: 'diet',
      img: Diet,
    },
    {
      type: 'sleep',
      img: Sleep,
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
  const { qa } = match.params;
  const pageName = location.pathname.split('/')[1];

  return (
    <div
      className={
        pageName !== 'qna' || qa ? cx('qa__section') : cx('qa__question')
      }
    >
      {(pageName || qa) && (
        <img
          className={cx('qa__section--img')}
          src={imgList.find(item => item.type === (qa ?? pageName)).img}
          alt={`${pageName} 사진`}
        />
      )}
      <Question
        className={
          (pageName !== 'qna' || qa) &&
          cx('qa__section--question', pageName === 'sun' && 'qa__section--sun')
        }
        questionSelect={question}
        name={name && name}
        pageName={pageName}
      />
    </div>
  );
};

export default withRouter(QaHeader);
