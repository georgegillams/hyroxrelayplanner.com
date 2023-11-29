import styled from 'styled-components';

import { breakpointMd, spacingLg } from '@george-gillams/components/constants/layout';

export const MainCtaWrapper = styled.div`
  padding: ${spacingLg};
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpointMd}) {
    padding: calc(2 * ${spacingLg});
  }
`;
