import React from 'react';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';

const Container = styled.div``;

const PageHeading = styled.h2`
  text-align: center;
`;

const SignupFormContainer = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.125);
  display: grid;
  grid-template-rows: 1fr auto;
`;

const SignupForm = styled.form`
  display: grid;
  padding: 20px 0px 20px 0px;
  grid-gap: 15px;
  justify-content: center;
`;

const ContinueButton = styled.input`
  height: 45px;
  border-radius: 4px;
  background-color: #ccc;
  border: none;
  justify-self: center;
  width: 100px;
  font-size: 1em;
  margin-bottom: 20px;
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
  margin-left: 10px;
  margin-right: 10px;
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
      <PageHeading>Register</PageHeading>
      <SignupFormContainer>
        <ErrorMessage error={props.error} />
        <SignupForm
          id="urlForm"
          onSubmit={e => this.createAccount(e, determinePricing)}>
          <SignupInputContainer>
            <label htmlFor="websiteURL">Website</label>
            <SignupTextInput
              id="websiteURL"
              name="websiteURL"
              type="text"
              //   placeholder="https://example.com/"
              required
              value={props.websiteURL}
              onChange={props.handleChange}
            />
          </SignupInputContainer>
          {/* <SignupInputContainer>
            <label htmlFor="sitemapURLs">Sitemap URL(s)</label>
            <SignupTextInput
              id="sitemapURLs"
              name="sitemapURLs"
              placeholder="https://www.example.com/post-sitemap.xml"
              required
              value={props.sitemapURLs}
              onChange={props.handleChange}
            />
          </SignupInputContainer> */}
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
export { Container, PageHeading, SignupFormContainer, ContinueButton };
