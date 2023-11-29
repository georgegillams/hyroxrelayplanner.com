import React from 'react';
import PropTypes from 'prop-types';

import { StyledMainWrapper } from './flex-layout.styles';

const FlexLayout = props => {
  const { children } = props;

  return <StyledMainWrapper id="main">{children}</StyledMainWrapper>;
};

FlexLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FlexLayout;
