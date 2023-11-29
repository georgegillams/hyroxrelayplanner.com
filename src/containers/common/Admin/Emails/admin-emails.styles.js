import Button from 'components/common/Button';
import styled from 'styled-components';
import { spacingBase } from '@george-gillams/components/constants/layout';
import paragraph from '@george-gillams/components/paragraph';
import SplitDetailView from 'components/common/SplitDetailView';

export const StyledButton = styled(Button)`
  margin-top: ${spacingBase};
  margin-right: ${spacingBase};
`;

export const StyledSplitDetailView = styled(SplitDetailView)`
  flex: 1;
  overflow: hidden;
`;

export const Count = styled(paragraph)`
  display: inline-block;
  margin: 0 0 ${spacingBase} 0;
`;
