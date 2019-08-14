import styled from 'styled-components';

const CTAButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
`;

const CTAButton = styled.div`
  display: grid;
  align-items: center;
  padding: 10px 20px 10px 20px;
  /* /* box-shadow: 0px 1px 1px 1px #c4941c;  */
  height: 30px;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  background-color: goldenrod;
  border-radius: 2px;
  border: none;
  color: white;
`;

export { CTAButton, CTAButtonContainer };
