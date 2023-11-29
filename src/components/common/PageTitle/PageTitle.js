import React from 'react';
import PropTypes from 'prop-types';
import GGPageTitle from '@george-gillams/components/page-title';
import TextLink from 'components/common/TextLink';
import Head from 'next/head';
import appConfig from 'helpers/appConfig';

const PageTitle = props => {
  const { name, pageTitle, ...rest } = props;

  const pageTitleFinal = `${pageTitle || name} - ${appConfig.projectTitle}`;

  return (
    <>
      <Head>
        <title>{pageTitleFinal}</title>
        <meta key="og:title" name="og:title" content={pageTitleFinal} />
      </Head>
      <GGPageTitle name={name} anchorComponent={TextLink} {...rest} />
    </>
  );
};

PageTitle.propTypes = {
  name: PropTypes.string.isRequired,
  pageTitle: PropTypes.string,
};

PageTitle.defaultProps = {
  pageTitle: null,
};

export default PageTitle;
