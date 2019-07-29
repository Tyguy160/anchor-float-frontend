const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
      me: User
    }

    type Mutation {
      signUp: User
      signIn: User
      signOut: String
      addDomain: Domain
    }

    type User {
      email: String
    }
`;

module.exports = typeDefs;
