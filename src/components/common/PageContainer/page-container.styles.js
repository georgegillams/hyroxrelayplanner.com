import PageContainer from '@george-gillams/components/page-container';
import styled, { css } from 'styled-components';

export const StyledPageContainer = styled(PageContainer)`
  ${({ debug }) =>
    debug &&
    css`
      background: linear-gradient(0.375turn, #ffdea3, orange);
    `}
`;
