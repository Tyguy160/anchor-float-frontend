import styled from 'styled-components';

const PageSection = styled.div`
  padding: 0 20% 0 20%;
  height: 100vh;
  display: grid;
  align-content: center;
  > div > p {
    font-size: 1.2em;
    line-height: 1.8em;
    padding: 10px 0 10px 0;
  }
  > div > ul > * {
    font-size: 1.2em;
  }
`;

export default PageSection;
