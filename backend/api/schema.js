const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: String
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
    signOut: SuccessMessage
    requestReset(email: String!): SuccessMessage
    resetPassword(input: ResetPasswordInput!): User!
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  type SignUpPayload {
    id: String
    email: String
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type SignInPayload {
    token: String
    user: User
  }

  input AddDomainInput {
    hostname: String!
  }

  type AddDomainPayload {
    domain: Domain
  }

  type SuccessMessage {
    message: String
  }

  input ResetPasswordInput {
    resetToken: String!
    password: String!
    confirmPassword: String!
  }
`;

module.exports = typeDefs;