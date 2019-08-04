// import React from 'react';
// import { CURRENT_USER_QUERY } from './User';
// import { Mutation } from 'react-apollo';
// import gql from 'graphql-tag';
// import { StyledLink } from './Nav';
// import Router from 'next/router';

// const SIGN_OUT_MUTATION = gql`
//   mutation SIGN_OUT_MUTATION {
//     signOut {
//       message
//     }
//   }
// `;

// const SignOut = props => {
//   return (
//     <Mutation
//       mutation={SIGN_OUT_MUTATION}
//       refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
//       {(signOut, { error, loading }) => (
//         <StyledLink
//           onClick={async () => {
//             try {
//               Router.push({
//                 pathname: '/',
//               });
//               const res = await signOut();
//               console.log({ res });
//             } catch (err) {
//               console.log(err);
//             }
//           }}>
//           Sign Out
//         </StyledLink>
//       )}
//     </Mutation>
//   );
// };

// export default SignOut;
