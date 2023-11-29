import styled from 'styled-components';
import { paragraphMarginTop } from '@george-gillams/components/constants/font';
import Paragraph from '@george-gillams/components/paragraph';

export const StyledTable = styled.table`
  width: 100%;
  margin-top: ${paragraphMarginTop};
`;

export const Description = styled(Paragraph)`
  display: inline-block;
  width: 15rem;
`;

export const Method = styled(Paragraph)`
  display: inline-block;
  width: 3.4rem;
`;

export const VerticalScrollContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
`;
