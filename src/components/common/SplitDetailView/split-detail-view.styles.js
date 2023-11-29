import styled from 'styled-components';
import { spacingBase, spacingLg, breakpointMd } from '@george-gillams/components/constants/layout';
import { backgroundColor, backgroundColorDarkMode } from '@george-gillams/components/constants/colors';

export const Outer = styled.div`
  display: flex;
`;

export const ListView = styled.div`
  width: 100%;
  min-width: unset;
  max-width: unset;
  padding: 0;
  height: 100%;
  overflow: scroll;

  @media (min-width: ${breakpointMd}) {
    width: 30%;
    min-width: 20rem;
    max-width: 40rem;
    padding: ${spacingLg} ${spacingBase} ${spacingLg} 0;
  }
`;

export const DetailView = styled.div`
  justify-content: center;
  overflow: scroll;
  position: absolute;
  top: 0;
  left: 0;
  display: unset;
  z-index: 4;
  width: 100%;
  min-width: unset;
  max-width: unset;
  height: calc(100vh - ${spacingLg});
  padding: 4 * ${spacingLg} ${spacingBase} ${spacingBase} ${spacingBase};
  background: ${backgroundColor};

  @media (prefers-color-scheme: dark) {
    background: ${backgroundColorDarkMode};
  }

  @media (min-width: ${breakpointMd}) {
    position: unset;
    top: unset;
    left: unset;
    display: flex;
    z-index: unset;
    width: 70%;
    min-width: calc(100% - 40rem);
    max-width: calc(100% - 20rem);
    height: 100%;
    padding: ${spacingLg} 0 ${spacingLg} ${spacingBase};
    background: none;
  }
`;

export const DetailViewContent = styled.div`
  width: 100%;
  max-width: 40rem;
`;

export const CloseButtonContainer = styled.div`
  position: absolute;
  top: 6rem;
  right: ${spacingLg};
  display: inherit;
  z-index: 4;

  @media (min-width: ${breakpointMd}) {
    display: none;
  }
`;
