import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import DebugObject from 'components/common/DebugObject';
import LoadingCover from '@george-gillams/components/loading-cover';
import { AdminOnly } from 'components/common/Walls';
import { setPostLoginRedirect } from 'client-utils/common/storageHelpers';
import Skeleton from './Skeleton';
import { withRouter } from 'next/router';
import AnalyticFilter, { filterAnalytics, defaultFilters } from './AnalyticsFilter';
import ErrorDisplay from 'components/common/ErrorDisplay';

import { Count, Control, StyledAnalyticsEntity, CardContainer } from './admin-analytics.styles';
import useTabMadeVisible from 'client-utils/common/useTabMadeVisible';

const AdminAnalytics = props => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);

  const {
    load,

    adminAnalyticsState,
    authenticatorState,
  } = props;

  const { loadError, analytics } = adminAnalyticsState;
  const { user } = authenticatorState;

  useTabMadeVisible(load);

  useEffect(() => {
    load();
  }, []);

  const showAnalytics = !!analytics && !!analytics.length && !!analytics.map;

  const filteredAnalytics = filterAnalytics(analytics, filters);

  let analyticsCount = 0;
  let filteredAnalyticsCount = 0;

  if (showAnalytics) {
    analytics.forEach(a => {
      analyticsCount += a.count;
    });
    filteredAnalytics.forEach(a => {
      filteredAnalyticsCount += a.count;
    });
  }

  const analyticsList = (
    <CardContainer>
      {showAnalytics && filteredAnalytics.map(n => <StyledAnalyticsEntity key={n.id} entity={n} />)}
    </CardContainer>
  );

  const filtersApplied = filters !== defaultFilters;
  const mainControls = (
    <div>
      <Control loading={adminAnalyticsState.loading} onClick={() => load()}>
        Reload analytics
      </Control>
      <Control onClick={() => setShowFilters(!showFilters)}>{showFilters ? 'Hide filters' : 'Show filters'}</Control>
      {filtersApplied && <Control onClick={() => setFilters(defaultFilters)}>Clear filters</Control>}
    </div>
  );

  return (
    <>
      <LoadingCover loadingSkeleton={Skeleton} loading={analytics} error={loadError}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => {
            setPostLoginRedirect('admin/analytics');
          }}>
          <div>
            <PageTitle link={{ to: '/admin', text: 'Admin' }} name="Admin analytics"></PageTitle>
          </div>
          {mainControls}
          {showFilters && <AnalyticFilter filters={filters} onFiltersChanged={newValue => setFilters(newValue)} />}
          <ErrorDisplay message="Could not load analytics" error={loadError} />
          {analytics && (
            <Count>
              Showing {filteredAnalyticsCount} of {analyticsCount} analytics
            </Count>
          )}
          {analyticsList && analyticsList}
        </AdminOnly>
      </LoadingCover>
      <DebugObject
        debugTitle="AdminAnalytics"
        debugObject={{
          load,
          adminAnalyticsState,
          authenticatorState,
        }}
      />
    </>
  );
};

AdminAnalytics.propTypes = {
  load: PropTypes.func.isRequired,
  adminAnalyticsState: PropTypes.shape({
    loading: PropTypes.bool,
    loadError: PropTypes.object,
    analytics: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
    loadAuthError: PropTypes.object,
  }).isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      highlight: PropTypes.string,
    }).isRequired,
  }),
};

AdminAnalytics.defaultProps = {
  adminAnalyticsState: null,
  verificationState: null,
  router: null,
};

export default withRouter(AdminAnalytics);
