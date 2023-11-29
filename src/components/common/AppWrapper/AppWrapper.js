import React from 'react';

import { StyledAppWrapper } from './app-wrapper.styles';

const AppWrapper = props => {
  const { ...rest } = props;

  return <StyledAppWrapper {...rest} />;
};

AppWrapper.propTypes = {};

AppWrapper.defaultProps = {};

export default AppWrapper;
