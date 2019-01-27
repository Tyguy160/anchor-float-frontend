import styled from 'styled-components';
import { CTAButton, CTAButtonContainer } from './StyledCTA';

const HeroContainer = styled.div`
  color: white;
  background-image: url('../static/blake-connally-373084-unsplash.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.4fr 0.6fr;
  align-items: center;
`;

const HeroHeadline = styled.div`
  font-size: 2em;
  text-align: center;
  align-self: end;
  text-shadow: 1px 1px 3px #888;
`;

const HeroCTAButton = styled(CTAButton)`
  align-self: start;
  margin: 10px;
`;
const HeroCTAButtonContainer = styled(CTAButtonContainer)`
  margin-top: 50px;
  align-self: start;
`;

export { HeroContainer, HeroHeadline, HeroCTAButton, HeroCTAButtonContainer };
