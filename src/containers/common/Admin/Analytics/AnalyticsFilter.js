import React from 'react';
import PropTypes from 'prop-types';
import Input from '@george-gillams/components/input';
import HelperFunctions from '@george-gillams/webapp/helpers/HelperFunctions';

const defaultFilters = {};

const filterAnalytics = (analytics, filters) => {
  let filteredAnalytics = analytics;
  if (filteredAnalytics && filteredAnalytics.filter) {
    if (filters.url) {
      filteredAnalytics = filteredAnalytics.filter(x => x.url && HelperFunctions.includes(x.url, filters.url));
    }
    if (filters.browser) {
      filteredAnalytics = filteredAnalytics.filter(
        x => x.browser && HelperFunctions.includes(x.browser, filters.browser)
      );
    }
    if (filters.browserVersion) {
      filteredAnalytics = filteredAnalytics.filter(
        x => x.browserVersion && HelperFunctions.includes(`${x.browser} ${x.browserVersion}`, filters.browserVersion)
      );
    }
    if (filters.utmSource) {
      filteredAnalytics = filteredAnalytics.filter(
        x => x.utmSource && HelperFunctions.includes(x.utmSource, filters.utmSource)
      );
    }
    if (filters.utmMedium) {
      filteredAnalytics = filteredAnalytics.filter(
        x => x.utmMedium && HelperFunctions.includes(x.utmMedium, filters.utmMedium)
      );
    }
    if (filters.os) {
      filteredAnalytics = filteredAnalytics.filter(x => x.os && HelperFunctions.includes(x.os, filters.os));
    }
    if (filters.ipAddressPrefix) {
      filteredAnalytics = filteredAnalytics.filter(
        x => x.ipAddressPrefix && HelperFunctions.includes(x.ipAddressPrefix, filters.ipAddressPrefix)
      );
    }
  }
  return filteredAnalytics;
};

const AnalyticsFilter = props => {
  const { filters, onFiltersChanged } = props;
  const { url, browser, browserVersion, utmSource, utmMedium, os, ipAddressPrefix } = filters;

  const onUrlFilterChanged = event => {
    onFiltersChanged({ ...filters, url: event.target.value });
  };

  const onBrowserFilterChanged = event => {
    onFiltersChanged({ ...filters, browser: event.target.value });
  };

  const onBrowserVersionFilterChanged = event => {
    onFiltersChanged({ ...filters, browserVersion: event.target.value });
  };

  const onUtmSourceFilterChanged = event => {
    onFiltersChanged({ ...filters, utmSource: event.target.value });
  };

  const onUtmMediumFilterChanged = event => {
    onFiltersChanged({ ...filters, utmMedium: event.target.value });
  };

  const onOsFilterChanged = event => {
    onFiltersChanged({ ...filters, os: event.target.value });
  };

  const onIpAddressPrefixFilterChanged = event => {
    onFiltersChanged({ ...filters, ipAddressPrefix: event.target.value });
  };

  return (
    <div>
      <label htmlFor="url">Filter by url</label>
      <Input id="url" value={url} onChange={onUrlFilterChanged} />
      <label htmlFor="browser">Filter by browser</label>
      <Input id="browser" value={browser} onChange={onBrowserFilterChanged} />
      <label htmlFor="browserVersion">Filter by browser version</label>
      <Input id="browserVersion" value={browserVersion} onChange={onBrowserVersionFilterChanged} />
      <label htmlFor="utmSource">Filter by UTM_SOURCE</label>
      <Input id="utmSource" value={utmSource} onChange={onUtmSourceFilterChanged} />
      <label htmlFor="utmMedium">Filter by UTM_MEDIUM</label>
      <Input id="utmMedium" value={utmMedium} onChange={onUtmMediumFilterChanged} />
      <label htmlFor="os">Filter by OS</label>
      <Input id="os" value={os} onChange={onOsFilterChanged} />
      <label htmlFor="ipAddressPrefix">Filter by IP address prefix</label>
      <Input id="ipAddressPrefix" value={ipAddressPrefix} onChange={onIpAddressPrefixFilterChanged} />
    </div>
  );
};

AnalyticsFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  onFiltersChanged: PropTypes.func.isRequired,
};

export default AnalyticsFilter;
export { defaultFilters, filterAnalytics };
