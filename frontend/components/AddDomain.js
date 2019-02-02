import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import styled from 'styled-components';

const Overlay = styled.div`
  visibility: ${props => (props.addDomainVisibility ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const AddDomainContainer = styled.div`
  visibility: ${props => (props.addDomainVisibility ? 'visible' : 'hidden')};
  /* display: grid; */
  width: 70%;
  /* height: 200px; */
  position: fixed;
  margin-left: 15%;
  /* top: 50%; */
  /* margin-top: -75px; */
  background-color: white;
  border-radius: 5px;
  z-index: 11; /* 1px higher than the overlay layer */
  box-shadow: 0px 2px 2px 2px #787878;
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 08fr 0.2fr;
  grid-template-areas:
    'heading close'
    'input input'
    'add add';
  grid-gap: 20px;
`;

const StyledButton = styled.div`
  grid-area: close;
  justify-self: end;
  align-self: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: none;
  background-color: transparent;
`;

const StyledH3 = styled.h3`
  grid-area: heading;
  justify-self: start;
  margin-left: 20px;
  /* grid-column: 1 / -1; */
  /* border: 1px solid; */
  /* grid-row: 1 / 2; */
`;

const StyledFieldset = styled.fieldset`
  grid-area: input;
  border: 0;
  /* grid-column: 1 / -1; */
  padding: 0;
  margin: 0;
  justify-self: center;
  display: grid;
  justify-items: center;
  align-items: center;
  min-width: 0;
`;

const StyledAddDomainButton = styled.button`
  grid-area: add;
  justify-self: center;
  align-self: center;
  margin-bottom: 20px;
`;

const ADD_DOMAIN_MUTATION = gql`
  mutation ADD_DOMAIN_MUTATION($hostname: String!) {
    addDomain(hostname: $hostname) {
      id
    }
  }
`;

class AddDomain extends Component {
  state = {
    hostname: '', //New hostname for domain creation
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      /* Create a new domain using this mutation and input box */
      <>
        <Overlay addDomainVisibility={this.props.showAddDomain} />
        <AddDomainContainer addDomainVisibility={this.props.showAddDomain}>
          <Mutation
            mutation={ADD_DOMAIN_MUTATION}
            variables={this.state}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
            {(addDomain, { error, loading }) => (
              <StyledForm
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  try {
                    const res = await addDomain();
                    console.log({ res });
                    this.props.toggleAddDomain();
                  } catch (err) {
                    console.log({ err });
                  }
                  this.setState({ hostname: '' });
                }}>
                <StyledButton onClick={this.props.hideAddDomain}>
                  x
                </StyledButton>
                <StyledH3>Add a domain</StyledH3>
                <StyledFieldset disabled={loading} aria-busy={loading}>
                  <Error error={error} />
                  <label htmlFor="addDomain">
                    Https://
                    <input
                      type="text"
                      name="hostname"
                      placeholder="mydomainname.com"
                      value={this.state.hostname}
                      onChange={this.saveToState}
                      required
                    />
                  </label>
                </StyledFieldset>
                <StyledAddDomainButton type="submit">
                  Add domain
                </StyledAddDomainButton>
              </StyledForm>
            )}
          </Mutation>
        </AddDomainContainer>
      </>
    );
  }
}

export default AddDomain;
