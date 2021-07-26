import React from 'react';
import { Helmet } from 'react-helmet';
import Logo from 'static/images/logo.png';

const MetaTag = ({ keywords, description, title }) => {
  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`아약,아약 맞춤형,맞춤형 추천,${keywords}`}
      />
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:image" content={Logo} />
      <meta property="og:site_name" content="아약 맞춤형 추천" />
      <meta property="og:description" content={description} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={Logo} />
      <meta name="twitter:card" content="summary" />
    </Helmet>
  );
};

export default MetaTag;
