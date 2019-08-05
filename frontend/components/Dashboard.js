import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import AddDomain from './AddDomain';
import styled from 'styled-components';
import DomainDataDisplay from './DomainDataDisplay';
const StyledAddDomainButton = styled.button`
  margin: 10px;
  width: 30px;
  height: 30px;
`;

class Dashboard extends Component {
  state = {
    domain: '', //Domain that you are selecting and querying
    showAddDomain: false,
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleAddDomain = () => {
    this.setState({
      showAddDomain: !this.state.showAddDomain,
    });
    console.log('Toggled addDomain window');
  };

  hideAddDomain = () => {
    this.setState({
      showAddDomain: false,
    });
    console.log('Closed the addDomain window');
  };

  render() {
    return (
      <div />
      //   <Query
      //     query={CURRENT_USER_QUERY}
      //     onCompleted={() => console.log('Completed the query')}>
      //     {({ data, error, loading }) => (
      //       <>
      //         <Error error={error} />
      //         <h2>Dashboard</h2>
      //         <label htmlFor="domains" onChange={this.saveToState}>
      //           <select name="domain" id="domain">
      //             {loading ? (
      //               <option>Loading...</option>
      //             ) : data.me.domains.length ? (
      //               data.me.domains.map(domain => (
      //                 <option key={domain.id}>{domain.hostname}</option>
      //               ))
      //             ) : (
      //               <option name="">No domains</option>
      //             )}
      //           </select>
      //         </label>
      //         <StyledAddDomainButton
      //           disabled={this.state.showAddDomain}
      //           onClick={this.toggleAddDomain}>
      //           +
      //         </StyledAddDomainButton>
      //         <AddDomain
      //           showAddDomain={this.state.showAddDomain}
      //           toggleAddDomain={this.toggleAddDomain}
      //           hideAddDomain={this.hideAddDomain}
      //         />
      //         <DomainDataDisplay data={data} domain={this.state.domain} />
      //       </>
      //     )}
      //   </Query>
    );
  }
}

export default Dashboard;
