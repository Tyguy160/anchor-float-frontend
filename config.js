// This is client side config only - don't put anything in here that shouldn't be public!
const host = process.env.DOCKERIZED ? 'api' : 'localhost'; // is the app being ran in docker?

export const endpoint = `http://${host}:4000/graphql`;
export const productionEndpoint = `http://api.anchorfloat.com/graphql`;
