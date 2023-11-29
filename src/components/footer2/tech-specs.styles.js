import Paragraph from '@george-gillams/components/paragraph';
import styled from 'styled-components';

export const StyledParagraph = styled(Paragraph)`
  width: 100%;
  margin-top: 0.5rem;
`;

export const Icon = styled.img`
  display: inline-block;
  width: 100%;
  max-width: 2.3rem;
  height: 100%;
  max-height: 2.3rem;
  padding: 0 0.5rem 0 0.2rem;
  filter: brightness(0) invert(1);

  &:hover {
    filter: brightness(0) invert(1) opacity(70%);
  }
`;
