import gql from "graphql-tag";

const GET_CURRENT_USER = gql`
  query me {
    me {
      id
      creditsRemaining
      email
      plan {
        level
        creditsPerMonth
        name
        stripePlanId
      }
    }
  }
`;

const USERSITES_QUERY = gql`
  query userSites {
    userSites {
      hostname
      associatesApiKey
      minimumReview
      runningReport
    }
  }
`;

const REPORTS_QUERY = gql`
  query REPORTS_QUERY($input: SiteReportsInput!) {
    siteReports(input: $input) {
      reports {
        createdAt
        fileUrl
        # userSite {
        #   hostname
        # }
      }
    }
  }
`;

const SITEPAGES_QUERY = gql`
  query SITEPAGES_QUERY($input: SitePagesInput!) {
    sitePages(input: $input) {
      site {
        hostname
        pages {
          url
          wordCount
          links {
            href
          }
        }
      }
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

const UPDATE_USERSITE_MUTATION = gql`
  mutation UPDATE_USERSITE_MUTATION($input: UpdateUserSiteInput!) {
    updateUserSite(input: $input) {
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

const CREATE_STRIPE_SESSION_MUTATION = gql`
  mutation CREATE_STRIPE_SESSION_MUTATION($input: CreateStripeSessionInput!) {
    createStripeSession(input: $input) {
      stripeSessionId
    }
  }
`;

const RUN_SITE_REPORT_MUTATION = gql`
  mutation RUN_SITE_REPORT_MUTATION($input: RunSiteReportInput!) {
    runSiteReport(input: $input) {
      creditsRemaining
    }
  }
`;

export {
  GET_CURRENT_USER,
  USERSITES_QUERY,
  REPORTS_QUERY,
  SITEPAGES_QUERY,
  ADD_USERSITE_MUTATION,
  UPDATE_USERSITE_MUTATION,
  DELETE_USERSITE_MUTATION,
  CREATE_STRIPE_SESSION_MUTATION,
  RUN_SITE_REPORT_MUTATION
};
