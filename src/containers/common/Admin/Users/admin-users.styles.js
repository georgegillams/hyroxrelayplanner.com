import styled from 'styled-components';
import { spacingBase } from '@george-gillams/components/constants/layout';
import paragraph from '@george-gillams/components/paragraph';
import { VStack } from 'components/common/Stacks';

export const Count = styled(paragraph)`
  display: inline-block;
  margin-bottom: ${spacingBase};
`;

export const ControlPanel = styled(VStack)`
  align-items: flex-start;
`;
