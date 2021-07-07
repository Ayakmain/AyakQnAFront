import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
const cx = classNames.bind(styles);

const Button = ({ children, to, className, onClick, disabled, placeholder, svg: Svg, href, hrefSelf }) => {
  // 공통적으로 사용 되는 props들
  const commonProps = { className: cx(styles.button, className), 'data-placeholder': placeholder };

  const wrappedChilder = [
    Svg && (
      <div className={styles.svgContainer} key='svgContainer'>
        <Svg className={styles.svg} />
      </div>
    ),
    children,
  ];

  return to ? (
    <Link {...commonProps} to={to}>
      {wrappedChilder}
    </Link>
  ) : href ? (
    <a {...commonProps} href={href} target="_blank" rel="noopener noreferrer">
      {wrappedChilder}
    </a>
  ) : hrefSelf ? (
    <a {...commonProps} href={hrefSelf} target="_self">
      {wrappedChilder}
    </a>
  ) : onClick ? (
    <button type="button" {...commonProps} onClick={onClick} disabled={disabled}>
      {wrappedChilder}
    </button>
  ) : (
    <button type="submit" {...commonProps} disabled={disabled}>
      {wrappedChilder}
    </button>
  );
};

export default withRouter(Button);
