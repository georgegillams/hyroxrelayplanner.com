import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DebugObject from 'components/common/DebugObject';
import { detect } from 'detect-browser';
import { withRouter } from 'next/router';

const Analytics = props => {
  const [analytic, setAnalytic] = useState(null);
  const [analyticSent, setAnalyticSent] = useState(false);

  const {
    router,

    sendAnalytic,

    analyticState,
  } = props;

  const constructAnalytic = () => {
    if (!router) {
      return null;
    }
    let utm_medium;
    let utm_source;
    let url;
    let browser;
    let browserVersion;
    let os;

    const detectResult = detect();
    if (detectResult) {
      browser = detectResult.name;
      browserVersion = detectResult.version;
      os = detectResult.os;
    }
    if (router) {
      url = router.pathname;
      if (router.query) {
        utm_medium = router.query.utm_medium;
        utm_source = router.query.utm_source;
      }
    }
    return {
      type: 'SPA_LOAD',
      url,
      utm_source,
      utm_medium,
      browser,
      browserVersion,
      os,
    };
  };

  useEffect(() => {
    // Create the analytic data as soon as the container loads...
    const newAnalytic = constructAnalytic();
    if (!analytic) {
      setAnalytic(newAnalytic);
    }
    const analyticToSend = analytic || newAnalytic;
    if (analyticToSend && !analyticSent) {
      sendAnalytic(analyticToSend);
      setAnalyticSent(true);
    }
  }, []);

  return (
    <div>
      <DebugObject
        debugTitle="Analytics"
        debugObject={{
          sendAnalytic,
          analyticState,
        }}
      />
    </div>
  );
};

Analytics.propTypes = {
  router: PropTypes.object,
  sendAnalytic: PropTypes.func.isRequired,
  analyticState: PropTypes.shape({
    sending: PropTypes.bool,
    sendError: PropTypes.object,
  }).isRequired,
};

Analytics.defaultProps = {
  router: null,
};

export default withRouter(Analytics);
