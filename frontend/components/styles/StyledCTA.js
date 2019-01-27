import styled from 'styled-components';

const CTAContainer = styled.div`
  height: 100vh;
  display: grid;
  justify-items: center;
`;

const CTAButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
`;

const CTAButton = styled.div`
  margin: 20px;
  padding: 10px 20px 10px 20px;
  box-shadow: 0px 1px 1px 1px #c4941c;
  height: 30px;
  cursor: pointer;
  font-size: 1.5em;
  font-family: 'Quicksand', sans-serif;
  background-color: goldenrod;
  border-radius: 2px;
  border: none;
`;

export { CTAButton, CTAButtonContainer, CTAContainer };
