import React from 'react';

import Status from 'containers/common/Status';
import CommonLayout from 'components/common/CommonLayout';
import appConfig from 'helpers/appConfig';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { STARTED_AT } = publicRuntimeConfig;
const { builtAt, nodeEnv } = appConfig;

const Page = props => {
  return (
    <CommonLayout>
      <Status
        appConfig={appConfig}
        startedAt={parseInt(STARTED_AT, 10)}
        builtAt={parseInt(builtAt, 10)}
        nodeEnv={nodeEnv}
        {...props}
      />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
