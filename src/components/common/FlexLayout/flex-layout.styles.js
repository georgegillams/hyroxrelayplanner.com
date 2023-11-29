import styled from 'styled-components';
import { breakpointSm, spacingBase, spacingLg } from '@george-gillams/components/constants/layout';

export const StyledMainWrapper = styled.main`
  display: flex;
  height: calc(100vh - 5.5rem);
  padding: 0 ${spacingBase};
  flex-flow: column;

  @media (min-width: ${breakpointSm}) {
    padding: 0 ${spacingLg};
  }
`;
