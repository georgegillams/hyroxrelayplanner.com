import React from 'react';
import PageContainer from 'components/common/PageContainer';
import PropTypes from 'prop-types';
import Paragraph from '@george-gillams/components/paragraph';
import PageTitle from 'components/common/PageTitle';
import DebugObject from '@george-gillams/components/debug-object';

import { getTimeDifference } from '@george-gillams/webapp/helpers/time';

const Status = props => {
  const { appConfig, startedAt, builtAt, nodeEnv, ...rest } = props;

  return (
    <PageContainer bottomPadding {...rest}>
      <PageTitle anchor={false} name="Status">
        <Paragraph>
          <img alt="Build status" src={`${appConfig.githubRepoUrl}/workflows/CI/badge.svg`} />
          <br />
          Built {getTimeDifference(new Date(builtAt * 1000))}
          <br />
          Started {getTimeDifference(new Date(startedAt * 1000))}
          <br />
          Environment {nodeEnv}
        </Paragraph>
        <DebugObject debugObject={appConfig} debugTitle="App config"></DebugObject>
      </PageTitle>
    </PageContainer>
  );
};

Status.propTypes = {
  appConfig: PropTypes.object.isRequired,
  startedAt: PropTypes.number.isRequired,
  builtAt: PropTypes.number.isRequired,
  nodeEnv: PropTypes.string.isRequired,
};

export default Status;
