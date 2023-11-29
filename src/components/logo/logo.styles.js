import styled, { keyframes } from 'styled-components';
import { spacingLg, spacingBase, breakpointMd } from '@george-gillams/components/constants/layout';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

export const LogoWrapper = styled.div`
  margin-top: ${spacingLg};
  margin-bottom: ${spacingBase};
  animation: ${fadeIn} 0.4s;
  padding-left: ${spacingLg};
  padding-right: ${spacingLg};
  text-align: center;
  width: 100%;

  @media (min-width: ${breakpointMd}) {
    text-align: left;
    width: unset;
  }
`;
