import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Doughnut } from 'react-chartjs-2';

const cx = classNames.bind(styles);

const Graph = ({ results }) => {
  let [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#3366FF',
          '#98C906',
          '#00AEFF',
          '#FFA500',
          '#FF4530',
          '#0E0205',
        ],
      },
    ],
  });

  useEffect(() => {
    setData({
      labels: results.map(item => item.type),
      datasets: [
        {
          data: results.map(item => item.percent),
          backgroundColor: [
            '#3366FF',
            '#98C906',
            '#00AEFF',
            '#FFA500',
            '#FF4530',
            '#0E0205',
          ],
        },
      ],
    });
  }, [results]);

  return (
    <section className={cx('doughnut')}>
      <Doughnut data={data} />
    </section>
  );
};

export default withRouter(Graph);
