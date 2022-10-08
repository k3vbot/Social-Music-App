const express = require('express');
const path = require('path');
const db = require('./config/connection');
// Brings in the ApolloServer for use through a hook
const { ApolloServer } = require('apollo-server-express');
// Allows the .env file to to take the place of the NODE_ENV variable
require('dotenv').config();

// Brings is the resolvers and typeDefs for use by the ApolloServer and graphql
const { typeDefs, resolvers } = require('./schema')
// Brings in the use of the JWT middleware
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Creates the ApolloServer instance and imports the authMiddleware to use JWTs
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: authMiddleware
});

// Calls the server and applys the authMiddleware to the express application
// server.start().then(res => {
//     server.applyMiddleware({ app })
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/'))
  });
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });


  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };

  // Call the async function to start the server
  startApolloServer(typeDefs, resolvers);