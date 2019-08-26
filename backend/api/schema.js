const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
    userSites: [UserSite]
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload
    signIn(input: SignInInput!): SignInPayload
    signOut: SuccessMessage
    addUserSite(input: AddUserSiteInput!): AddUserSitePayload
    deleteUserSite(input: DeleteUserSiteInput): SuccessMessage
    requestReset(input: RequestResetInput!): SuccessMessage
    resetPassword(input: ResetPasswordInput!): User!
    updateUserPassword(input: UpdatePasswordInput!): UpdatePasswordPayload
    updateUserPlan(input: UpdateUserPlanInput!): UpdateUserPlanPayload
  }

  input UpdatePasswordInput {
    newPassword: String
  }

  type UpdatePasswordPayload {
    message: String
  }

  input UpdateUserPlanInput {
    level: Int
  }

  type UpdateUserPlanPayload {
    level: Int
  }

  type User {
    id: String
    firstName: String
    lastName: String
    email: String
    plan: Plan
  }

  type Plan {
    name: String
    level: Int
    siteLimit: Int
  }

  type UserSite {
    hostname: String
    scanFreq: String
  }

  input SignUpInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
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
