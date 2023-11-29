import styled from 'styled-components';
import { spacingBase } from '@george-gillams/components/constants/layout';

export const StyledVStack = styled.div`
  display: flex;
  flex-direction: column;
  ${({ topPadding }) => topPadding && `padding-top: ${spacingBase};`}
  ${({ bottomPadding }) => bottomPadding && `padding-bottom: ${spacingBase};`}

  > *:not(:first-child) {
    margin-top: ${spacingBase};
  }
`;

export const StyledHStack = styled.div`
  display: flex;
  flex-direction: row;

  > *:not(:first-child) {
    margin-left: ${spacingBase};
  }
`;
