import styled from 'styled-components';
import { spacingBase } from '@george-gillams/components/constants/layout';
import Button from 'components/common/Button';
import Paragraph from '@george-gillams/components/paragraph';

export const Details = styled(Paragraph)`
  display: inline-block;
  width: 100%;
  margin-bottom: ${spacingBase};
`;

export const StyledButton = styled(Button)`
  margin-bottom: ${spacingBase};
`;

export const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
