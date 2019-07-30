const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
      email: String
    }

    type Domain {
      hostname: String
    }

    type Query {
      me: User
    }

    type Mutation {
      signUp(input: SignUpInput!): SignUpPayload
      signIn(input: SignInInput!): SignInPayload
      addDomain(input: AddDomainInput!): AddDomainPayload
    }

    input SignUpInput {
      email: String!
      password: String!
    }

    type SignUpPayload {
      user: User
    }

    input SignInInput {
      email: String!
      password: String!
    }

    type SignInPayload {
      user: User
    }

    input AddDomainInput {
      hostname: String!
    }

    type AddDomainPayload {
      domain: Domain
    }
`;

module.exports = typeDefs;
