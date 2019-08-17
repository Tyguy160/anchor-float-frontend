import gql from 'graphql-tag';

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

export { USERSITES_QUERY, ADD_USERSITE_MUTATION };
