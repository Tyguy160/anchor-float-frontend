import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px 10px 20px;
  box-shadow: 0px 0px 1px 1px hsl(43, 74%, 46%);
  font-size: 1em;
  background-color: hsl(43, 74%, 49%);
  border-radius: 5px;
  height: 2.5em;
  border-color: none;
  border: none;
  color: white;
  outline: none;
  :active {
    background-color: hsl(43, 74%, 46%);
  }
`;

const SignupFormContainer = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.125);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1050px;
  /* grid-template-rows: 1fr auto; */
  border-radius: 5px;
`;

const SignupForm = styled.form`
  display: grid;
  padding: 20px;
  grid-gap: 15px;
  justify-content: center;
`;

const ContinueButton = styled(StyledButton)`
  height: 45px;
  /* border-radius: 4px; */
  /* background-color: #ccc; */
  /* border: none; */
  justify-self: center;
  width: 100px;
  font-size: 1em;
  outline: none;
  :active {
    background-color: #bbb;
  }
`;

const SignupInputContainer = styled.div`
  display: flex;
  justify-self: flex-end;
  flex-wrap: wrap;
  label {
    align-self: center;
  }
`;

const SignupTextInput = styled.input`
  border-radius: 4px;
  border: 1px solid #dedede;
  height: 2em;
  font-family: 'Assistant', sans-serif;
  font-size: 1em;
  outline: none;
  margin-left: 5px;
  margin-right: 5px;
`;

const SigninFormContainer = styled(SignupFormContainer)`
  /* background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.125);
  display: grid;
  grid-template-rows: 1fr auto; */
`;

const SigninForm = styled(SignupForm)`
  /* display: grid;
  padding: 20px 0px 20px 0px;
  grid-gap: 15px;
  justify-content: center; */
`;

const SigninInputContainer = styled(SignupInputContainer)`
  /* display: flex;
  justify-self: flex-end;
  flex-wrap: wrap;
  label {
    align-self: center; */
  }
`;

const SigninTextInput = styled(SignupTextInput)`
  /* border-radius: 4px;
  border: 1px solid #dedede;
  height: 2em;
  font-family: 'Assistant', sans-serif;
  font-size: 1em;
  outline: none;
  margin-left: 10px;
  margin-right: 10px; */
`;

const NavBar = styled.div`
  background: #383838;
  height: 60px;
  box-shadow: 0px 2px 2px 2px #787878;
  display: grid;
  @media screen and (max-width: 850px) {
    grid-template-rows: 1fr auto;
    height: 150px;
  }
  @media screen and (min-width: 851px) {
    grid-template-rows: auto;
    grid-template-columns: auto auto;
  }
`;

const Footer = styled.div`
  background: #383838;
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 60px;
  display: grid;
`;

const FooterText = styled.div`
  color: #efefef;
  text-align: center;
  align-self: center;
`;

const Logo = styled.div`
  color: #efefef;
  font-size: 2em;
  text-decoration: none;
  text-align: center;
  align-self: center;
  @media screen and (max-width: 850px) {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 20px;
    justify-content: center;
  }
  @media screen and (min-width: 851px) {
    img {
      padding: 0px 15px 0px 15px;
    }
    display: flex;
    justify-content: start;
  }
`;

const Links = styled.div`
  display: flex;
  @media screen and (max-width: 850px) {
    justify-self: center;
    align-self: end;
    padding-bottom: 20px;
  }
  @media screen and (min-width: 851px) {
    justify-self: end;
    align-self: center;
    padding: 0px;
  }
`;

const StyledLink = styled.a`
  color: #efefef;
  text-decoration: none;
  padding: 0px 20px 0px 20px;
  cursor: pointer;
  @media screen and (max-width: 850px) {
    justify-self: center;
  }
`;

const HeroContainer = styled.div`
  color: white;

  background-image: url('../../static/water.svg');
  background-repeat: repeat-x;
  background-position: bottom 0 left 50%;
  background-origin: border-box;
  height: 100%;
  width: 100%;
  position: fixed;
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (max-width: 850px) {
    background-size: 1000% 80%;
  }
  @media screen and (min-width: 851px) {
    background-size: 1000% 65%;
    grid-template-rows: 35% auto;
    align-items: center;
  }
`;

const HeroTextContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  color: #565656;
`;

const HeroHeadline = styled.div`
  text-align: center;
  align-self: center;
  font-weight: bold;

  @media screen and (max-width: 850px) {
    font-size: 1.5em;
    padding-left: 20px;
    padding-right: 20px;
  }

  @media screen and (min-width: 851px) {
    font-size: 2.5em;
  }
`;

const HeroSubtext = styled.div`
  text-align: center;
  align-self: center;

  @media screen and (max-width: 850px) {
    font-size: 1.2em;
    color: whitesmoke;
    padding: 0 45px 0 45px;
    text-shadow: 1px 1px 3px #888;
  }

  @media screen and (min-width: 851px) {
    font-size: 1.5em;
    color: #565656;
    text-shadow: none;
  }
`;

const CTAButtonContainer = styled.div`
  @media screen and (max-width: 850px) {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
  }
  @media screen and (min-width: 851px) {
    display: flex;
    justify-content: center;
  }
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

const HeroCTAButtonContainer = styled(CTAButtonContainer)`
  @media screen and (min-width: 851px) {
    align-self: start;
    padding-top: 100px;
  }
  justify-content: center;
  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
`;

const HeroCTAButton = styled(StyledButton)`
  justify-content: center;
  min-width: 120px;
  min-height: 30px;
  font-size: 1.2em;
  border-radius: 5px;

  @media screen and (max-width: 850px) {
    margin: 10px 50px 10px 50px;
  }

  @media screen and (min-width: 851px) {
    margin: 20px;
  }
`;

const PageSection = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr;
`;

const CenteredHeading = styled.h2`
  justify-self: center;
  font-size: 2em;
  padding-top: 20px;
`;

const StyledHeading = styled(CenteredHeading)`
  @media screen and (max-width: 1050px) {
    justify-self: center;
  }
  @media screen and (min-width: 1051px) {
    justify-self: start;
  }
`;

const PricingContainer = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1350px) {
    flex-wrap: wrap;
  }
`;

const StyledTierButton = styled.button`
  margin: 20px;
  border-radius: 5px;
  padding: 0 10px 0px 10px;
  box-shadow: 1px 1px 10px 1px #999;
  max-width: 300px;
  background-color: white;
  border-color: white;
  border: inherit;
  font: inherit;
`;

const StyledTierContainer = styled.div`
  margin: 20px;
  border-radius: 5px;
  padding: 0 10px 0px 10px;
  box-shadow: 1px 1px 10px 1px #999;
  max-width: 300px;
`;

const EnterpriseStyledTierContainer = styled(StyledTierContainer)`
  /* max-width: 500px; */
`;

const StyledTierHeading = styled.h3`
  font-size: 1.5em;
  text-align: center;
  margin: 0;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
`;

const StyledPrice = styled.h4`
  text-align: center;
  font-size: 2.5em;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin: 0;
  > div {
    padding: 5px;
    font-size: 1rem;
  }
`;

const StyledTierDetails = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0 20px 20px 20px;
  > li {
    padding-top: 10px;
  }
  border-bottom: 1px solid #ccc;
`;

const StyledPricingCTAButton = styled(CTAButton)`
  margin: 20px;
  /* align-self: center; */
  justify-content: center;
  min-width: 20%;
  max-width: 60%;
`;

const StyledPricingCTAButtonContainer = styled(CTAButtonContainer)``;

export {
  SigninFormContainer,
  SigninForm,
  SigninInputContainer,
  SigninTextInput,
  SignupForm,
  SignupFormContainer,
  SignupInputContainer,
  SignupTextInput,
  CenteredHeading,
  ContinueButton,
  NavBar,
  Footer,
  FooterText,
  Logo,
  Links,
  StyledLink,
  HeroContainer,
  HeroTextContainer,
  HeroHeadline,
  HeroSubtext,
  HeroCTAButton,
  HeroCTAButtonContainer,
  CTAButton,
  CTAButtonContainer,
  PricingContainer,
  StyledTierContainer,
  StyledTierButton,
  StyledTierHeading,
  EnterpriseStyledTierContainer,
  StyledPrice,
  StyledTierDetails,
  StyledPricingCTAButton,
  StyledPricingCTAButtonContainer,
  StyledHeading,
  PageSection,
  StyledButton,
};
