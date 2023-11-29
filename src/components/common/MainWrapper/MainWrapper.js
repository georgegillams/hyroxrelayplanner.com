import React from 'react';

import { StyledMainWrapper } from './main-wrapper.styles';

const MainWrapper = props => {
  const { ...rest } = props;

  return <StyledMainWrapper id="main" {...rest} />;
};

MainWrapper.propTypes = {};

MainWrapper.defaultProps = {};

export default MainWrapper;
