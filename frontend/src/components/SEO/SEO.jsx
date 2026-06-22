import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type }) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content={type} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
};

SEO.defaultProps = {
  title: 'MD TechKanpur | Premium Polymer Masterbatch Manufacturer',
  description: 'State-of-the-art manufacturer of high-performance masterbatches and custom additive compounds. Exported to 30+ countries worldwide.',
  name: 'MD TechKanpur',
  type: 'website'
};

export default SEO;
