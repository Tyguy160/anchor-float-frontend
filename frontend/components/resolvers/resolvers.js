import gql from 'graphql-tag';

const GET_CURRENT_USER = gql`
  query me {
    me {
      id
      subscriptionLevel
    }
  }
`;

const USERSITES_QUERY = gql`
  query userSites {
    userSites {
      hostname
      scanFreq
    }
  }
`;

const ADD_USERSITE_MUTATION = gql`
  mutation ADD_USERSITE_MUTATION($input: AddUserSiteInput!) {
    addUserSite(input: $input) {
      UserSite {
        hostname
      }
    }
  }
`;

const DELETE_USERSITE_MUTATION = gql`
  mutation DELETE_USERSITE_MUTATION($input: DeleteUserSiteInput!) {
    deleteUserSite(input: $input) {
      message
    }
  }
`;

export {
  GET_CURRENT_USER,
  USERSITES_QUERY,
  ADD_USERSITE_MUTATION,
  DELETE_USERSITE_MUTATION,
};
