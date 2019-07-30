import React from 'react';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const SignupHeading = styled.h1`
  text-align: center;
`;

const SignupFormContainer = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.125);
  width: 100%;
  max-width: 700px;
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 4px;
  justify-self: center;
`;

const SignupForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 25px;
  justify-items: center;
  /* padding: 35px; */

  /* @media screen and (min-width: 550px) {
    box-shadow: 0px 2px 10px 2px #ccc;
  } */
`;

const ContinueButton = styled.input`
  height: 45px;
  border-radius: 4px;
  background-color: #ccc;
  border: none;
  justify-self: center;
  width: 100px;
  font-size: 1em;
  margin: 30px;
  outline: none;
  :active {
    background-color: #bbb;
  }
`;

const SignupInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-self: flex-start;
  flex-wrap: wrap;
`;

const SignupTextInput = styled.input`
  border-radius: 4px;
  border: 1px solid #dedede;
  height: 3em;
  font-family: 'Assistant', sans-serif;
  font-size: 1em;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;
`;

const SignupTextareaInput = styled.textarea`
  border-radius: 4px;
  background-color: #dedede;
  border: none;
  height: 10em;
  resize: none;
  font-family: 'Assistant', sans-serif;
  font-size: 1em;
  outline: none;
  padding: 10px;
`;

const SignupContainer = props => {
  return (
    <Container>
      {/* <SignupHeading>
        Locate unavailable affiliate links on your site
      </SignupHeading> */}
      <SignupFormContainer>
        <ErrorMessage error={props.error} />
        <SignupForm
          id="urlForm"
          onSubmit={e => this.requestPricing(e, determinePricing)}>
          Register
          <SignupInputContainer>
            <label htmlFor="websiteURL">Website URL</label>
            <SignupTextInput
              id="websiteURL"
              name="websiteURL"
              type="text"
              placeholder="https://example.com/"
              required
              value={props.websiteURL}
              onChange={props.handleChange}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="sitemapURLs">Sitemap URL(s)</label>
            <SignupTextInput
              id="sitemapURLs"
              name="sitemapURLs"
              placeholder="https://www.example.com/post-sitemap.xml"
              required
              value={props.sitemapURLs}
              onChange={props.handleChange}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="name">Name</label>
            <SignupTextInput
              id="name"
              name="name"
              type="text"
              placeholder=""
              required
              value={props.name}
              onChange={props.handleChange}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="email">Email Address</label>
            <SignupTextInput
              id="email"
              name="email"
              type="text"
              placeholder=""
              required
              value={props.email}
              onChange={props.handleChange}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="password">Password</label>
            <SignupTextInput
              id="password"
              name="password"
              type="password"
              placeholder=""
              required
              value={props.password}
              onChange={props.handleChange}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <SignupTextInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder=""
              required
              value={props.confirmPassword}
              onChange={props.handleChange}
            />
          </SignupInputContainer>
        </SignupForm>
        <ContinueButton type="submit" value="Continue" form="urlForm" />
      </SignupFormContainer>
    </Container>
  );
};

export default SignupContainer;
export { Container, SignupHeading, SignupFormContainer, ContinueButton };
