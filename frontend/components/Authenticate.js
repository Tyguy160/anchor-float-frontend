// import React from 'react';
// import { Query } from 'react-apollo';
// import SignIn from './SignIn';
// import { CURRENT_USER_QUERY } from './User';
// const Authenticate = props => {
//   return (
//     <Query query={CURRENT_USER_QUERY}>
//       {({ data, loading }) => {
//         if (loading) return <p>Loading...</p>;
//         if (!data.me) {
//           return (
//             <div>
//               <p>Please sign in before continuing 🔑</p>
//               <SignIn />
//             </div>
//           );
//         }
//         return props.children;
//       }}
//     </Query>
//   );
// };

// export default Authenticate;
