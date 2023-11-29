import React from 'react';
import PropTypes from 'prop-types';

import { StyledThemeProvider, STYLED_THEMES } from '@george-gillams/components/styled-theming';
import { Container, StyledTechSpecs } from './footer.styles';

const Footer = props => {
  return (
    <Container id="footer" {...props}>
      <StyledThemeProvider theme={STYLED_THEMES.white}>
        <StyledTechSpecs />
      </StyledThemeProvider>
    </Container>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: null,
};

export default Footer;
