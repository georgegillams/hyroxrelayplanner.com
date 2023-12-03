import React from 'react';

import Team from 'containers/Team';
import CommonLayout from 'components/common/CommonLayout';
import apiStructure from 'helpers/common/apiStructure';

const Page = props => {
  return (
    <CommonLayout>
      <Team {...props} />
    </CommonLayout>
  );
};

Page.getInitialProps = async context => {
  const teamId = context.query.teamId;
  const isServer = !!context.req;

  if (!isServer) {
    return { ssrTeam: { teamId } };
  }

  const teamRequestUrl = apiStructure.loadTeam.fullPath.split(':teamId').join(teamId);
  const teamFetchResponse = await fetch(teamRequestUrl).then(data => data.json());
  const ssrTeam = teamFetchResponse?.team;

  const planRequestUrl = apiStructure.loadPlan.fullPath.split(':teamId').join(teamId);
  const planFetchResponse = await fetch(planRequestUrl).then(data => data.json());
  const ssrPlans = planFetchResponse?.plans;

  if (!teamFetchResponse.error && !planFetchResponse.error) {
    return { ssrTeam, ssrPlans };
  }

  // Return team ID anyway instead of error, so that the user can re-fetch data from the client.
  return { ssrTeam: { teamId } };
};

Page.propTypes = {};

export default Page;
