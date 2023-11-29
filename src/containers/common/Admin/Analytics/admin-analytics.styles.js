import styled from 'styled-components';
import { spacingBase, spacingLg, spacingXs } from '@george-gillams/components/constants/layout';
import { cardContainer } from '@george-gillams/webapp/utils/styles';
import AnalyticsEntity from './AnalyticEntity';
import Button from 'components/common/Button';
import paragraph from '@george-gillams/components/paragraph';

export const CardContainer = styled.div`
  margin-bottom: ${spacingLg};
  ${cardContainer}
`;

export const StyledAnalyticsEntity = styled(AnalyticsEntity)`
  display: inline-block;
  width: 16rem;
  margin: ${spacingXs};
`;

export const Control = styled(Button)`
  display: inline-block;
  margin: ${spacingBase} ${spacingBase} 0 0;
`;

export const Count = styled(paragraph)`
  display: inline-block;
  margin: 0 0 ${spacingBase} 0;
`;
