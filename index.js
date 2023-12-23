import { ApolloServer, gql } from 'apollo-server';
import fetch from "node-fetch";


const typeDefs = gql`

  # This "User" type defines the queryable fields shown below.
  type User {
    auth_type: String
    email: String
    id: Int
    name: String
    oath_token: String
    username: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "user" query returns an array of zero or more Users (defined above).
  type Query {
    user(token: String): User
  }`;

const compositeBaseURL = "http://34.30.142.63"

const resolvers = {
    Query: {
        async user(parent, args, contextValue, info){
          return fetch(`${compositeBaseURL}/composite/user/user-info/`, {headers: {
              Authorization: `Bearer ${args.token}`,
              'Content-Type': 'application/json', 
          }})
          .then(response => {
            return response.json()
          })
          .then(data => {
            return data.user
          })
        } 
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
