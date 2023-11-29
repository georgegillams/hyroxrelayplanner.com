import { backgroundColorDarkMode, backgroundColorElevatedDarkMode } from '@george-gillams/components/constants/colors';
import { breakpointSm, spacingBase } from '@george-gillams/components/constants/layout';
import styled from 'styled-components';

export const StepsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  max-width: 56rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${breakpointSm}) {
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
  }
`;

export const Step = styled.div`
  background-color: ${backgroundColorDarkMode};
  padding: ${spacingBase};
  display: grid;
  grid-gap: ${spacingBase};
  grid-template-rows: auto 1fr;

  /* different colour for alternate instances */
  /* &:nth-child(odd) {
    background-color: ${backgroundColorElevatedDarkMode};
  } */
`;
