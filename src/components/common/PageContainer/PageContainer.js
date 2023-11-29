import React, { useState, useEffect } from 'react';

import { DEBUG_SHOW_PAGE_CONTAINER_KEY } from '@george-gillams/webapp/helpers/storageConstants';
export * from '@george-gillams/components/page-container';
import { StyledPageContainer } from './page-container.styles';

const PageContainer = props => {
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    setDebug(window.localStorage.getItem(DEBUG_SHOW_PAGE_CONTAINER_KEY) === 'true');
  }, []);

  return <StyledPageContainer debug={debug} {...props} />;
};

export default PageContainer;
