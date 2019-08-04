import styled from 'styled-components';
import { CTAButton, CTAButtonContainer } from './StyledCTA';

const HeroContainer = styled.div`
  color: white;
  background-image: url('../static/water.svg');
  background-size: 1000% 80%;
  background-repeat: repeat-x;
  background-position: bottom 0 left 50%;
  background-origin: border-box;
  height: 100%;
  width: 100%;
  position: fixed;
  display: grid;
  grid-template-columns: 1fr;
`;

const HeroTextContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  color: #565656;
`;

const HeroHeadline = styled.div`
  font-size: 1.5em;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  align-self: center;
`;

const HeroSubtext = styled.div`
  font-size: 1.2em;
  text-align: center;
  align-self: center;
  color: whitesmoke;
  padding: 0 45px 0 45px;
  text-shadow: 1px 1px 3px #888;
`;

const HeroCTAButtonContainer = styled(CTAButtonContainer)`
  justify-content: center;
  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
`;

const HeroCTAButton = styled(CTAButton)`
  margin: 10px 50px 10px 50px;
  justify-content: center;
  min-width: 120px;
  min-height: 30px;
  font-size: 1.2em;
  border-radius: 5px;
`;

export {
  HeroContainer,
  HeroTextContainer,
  HeroHeadline,
  HeroSubtext,
  HeroCTAButton,
  HeroCTAButtonContainer,
};
