// TODO: Recreate sign-up to let users create accounts on the site

// <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
//   {(signup, { loading, error }) => (
//     <form onSubmit={e => this.createAccount(e, signup)}>
//       <ErrorMessage error={error} />
//       <fieldset disabled={loading} aria-busy={loading}>
//         <label htmlFor="name">
//           Name
//           <input
//             type="text"
//             id="name"
//             name="name"
//             placeholder="Full name"
//             required
//             value={this.state.name}
//             onChange={this.handleChange}
//           />
//         </label>
//         <label htmlFor="email">
//           Email
//           <input
//             type="text"
//             id="email"
//             name="email"
//             placeholder="Email"
//             required
//             value={this.state.email}
//             onChange={this.handleChange}
//           />
//         </label>
//         <label htmlFor="password">
//           Password
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Password"
//             required
//             value={this.state.password}
//             onChange={this.handleChange}
//           />
//         </label>
//         <label htmlFor="confirmPassword">
//           Confirm Password
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             placeholder="Confirm password"
//             required
//             value={this.state.confirmPassword}
//             onChange={this.handleChange}
//           />
//         </label>
//         <button type="submit">Sign Up</button>
//       </fieldset>
//     </form>
//   )}
// </Mutation>
