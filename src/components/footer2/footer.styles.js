import styled from 'styled-components';
import Footer from './footer-nav';
import TechSpecs from './tech-specs';
import { breakpointSm, spacingBase, spacingLg } from '@george-gillams/components/constants/layout';
import {
  backgroundColorElevatedColoredDarkMode,
  notBlack,
  notBlackDarkMode,
} from '@george-gillams/components/constants/colors';
import { hyroxYellow } from 'constants/hyrox-theme';

export const Container = styled.footer`
  display: flex;
  padding: ${spacingLg} ${spacingBase};
  flex-direction: column;
  justify-content: space-around;
  border-top: solid ${notBlack} 0.15rem;
  background-color: ${notBlack};
  background-position: center;
  background-size: cover;
  color: ${notBlackDarkMode};
  border-top: solid ${hyroxYellow} 0.15rem;

  @media (min-width: ${breakpointSm}) {
    padding: ${spacingLg} ${spacingLg};
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${backgroundColorElevatedColoredDarkMode};
  }
`;

export const StyledTechSpecs = styled(TechSpecs)`
  text-align: center;
`;

export const StyledFooterNav = styled(Footer)``;
