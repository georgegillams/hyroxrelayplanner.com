import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 45rem;
  margin: auto;
`;

export const Section = styled.div`
  > * {
    margin: 0.5rem 0.5rem 0 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
