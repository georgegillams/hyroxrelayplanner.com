import styled from 'styled-components';

import {
  breakpointMd,
  spacingBase,
  spacingLg,
  spacingSm,
  spacingXs,
} from '@george-gillams/components/constants/layout';
import { hyroxBlack, hyroxYellow } from 'constants/hyrox-theme';
import Button from 'components/common/Button';
import Paragraph from '@george-gillams/components/paragraph';

export const WarningBanner = styled.div`
  background: ${hyroxYellow};
  padding: ${spacingBase};
  color: ${hyroxBlack};
  display: flex;
  justify-content: center;

  > * {
    width: 100%;
    max-width: 56rem;
    font-weight: bold;
  }
`;

export const TeamWrapper = styled.div`
  display: grid;
  gap: ${spacingXs};
  width: 100%;
  margin: ${spacingLg} 0 calc(2 * ${spacingLg}) 0;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: ${breakpointMd}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, auto);
  }
`;

export const TeamItem = styled.div`
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 2;
`;

export const ShareButton = styled(Button)`
  margin-top: ${spacingBase};
`;

export const TeamItemLinks = styled.div`
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${spacingLg};

  @media (min-width: ${breakpointMd}) {
    margin-bottom: 0;
  }
`;

export const PlanGrid = styled.div`
  display: grid;
  margin: 2rem 0 1rem 0;
  border-radius: 1rem;
  overflow: hidden;
  grid-template-columns: repeat(1, 1fr);
  gap: ${spacingBase};

  @media (min-width: ${breakpointMd}) {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 0;
  }
`;

export const PlanItem = styled.div`
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 2;
  padding: ${spacingLg} ${spacingSm};
  gap: ${spacingLg};
  border-radius: 1rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);

  @media (min-width: ${breakpointMd}) {
    grid-row: 1 / 3;
    grid-column: ${({ index }) => `${index + 1} / span 1`};
    padding: ${spacingXs};
    padding-bottom: 0;
    gap: 0;
    border-radius: 0;
  }

  &:nth-child(even) {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const PlanItemName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlanItemAthlete = styled.div`
  grid-row-start: 2;
  align-self: center;
`;

export const NameBackground = styled.div`
  background: rgba(255, 255, 255, 0.06);
  grid-row: 2 / 2;
  grid-column: 1 / -1;
  z-index: 1;
  pointer-events: none;
  min-height: 3rem;
  display: none;

  @media (min-width: ${breakpointMd}) {
    display: unset;
  }
`;

export const MainCtaWrapper = styled(Paragraph)`
  > *:not(:first-child) {
    margin-left: ${spacingBase};
  }
`;
