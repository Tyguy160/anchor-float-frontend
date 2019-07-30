import styled from 'styled-components';
import { CTAButton, CTAButtonContainer } from './StyledCTA';

const HeroContainer = styled.div`
  color: white;
  background-image: url('../static/water.svg');
  background-size: 200% 60%;

  background-repeat: repeat-x;
  background-position: bottom 0 left 50%;
  background-origin: border-box;
  height: 100%;
  width: 100%;
  position: fixed;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.4fr 0.6fr;
  align-items: center;
`;

const HeroHeadline = styled.div`
  font-size: 3.5em;
  text-align: center;
  align-self: end;
  text-shadow: 1px 1px 3px #888;
`;

const HeroSubtext = styled.div`
  font-size: 2em;
  text-align: center;
  align-self: end;
  text-shadow: 1px 1px 3px #888;
`;

const HeroCTAButton = styled(CTAButton)`
  align-self: start;
  margin: 10px;
  justify-content: center;
  min-width: 120px;
  min-height: 30px;
  font-size: 1.2em;
  border-radius: 5px;
`;
const HeroCTAButtonContainer = styled(CTAButtonContainer)`
  margin: 50px;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

export {
  HeroContainer,
  HeroHeadline,
  HeroSubtext,
  HeroCTAButton,
  HeroCTAButtonContainer,
};
