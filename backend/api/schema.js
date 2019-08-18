const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: String
    email: String
    subscriptionLevel: String
  }

  type UserSite {
    hostname: String
    scanFreq: String
  }

  type Query {
    me: User
    userSites: [UserSite]
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload
    signIn(input: SignInInput!): SignInPayload
    addUserSite(input: AddUserSiteInput!): AddUserSitePayload
    signOut: SuccessMessage
    requestReset(input: RequestResetInput!): SuccessMessage
    resetPassword(input: ResetPasswordInput!): User!
    deleteUserSite(input: DeleteUserSiteInput): SuccessMessage
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

  input AddUserSiteInput {
    hostname: String!
    apiKey: String!
    scanFreq: String!
  }

  input DeleteUserSiteInput {
    hostname: String!
  }

  type AddUserSitePayload {
    UserSite: UserSite
  }

  type SuccessMessage {
    message: String
  }

  input RequestResetInput {
    email: String!
  }

  input ResetPasswordInput {
    resetToken: String!
    password: String!
    confirmPassword: String!
  }

  type UserSitesPayload {
    userSites: [UserSite]
  }
`;

module.exports = typeDefs;
