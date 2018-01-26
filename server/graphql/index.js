const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const schema = require("./api/schema");

const app = express();

const GQL_PORT = process.env.PORT; // Where does this come from?
// process.env.PORT is specified in package.json

// Where we will send all of our GraphQL requests
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// A route for accessing the GraphiQL tool
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

// The standard Express listen
app.listen(GQL_PORT, () =>
  console.log(`GraphQL is now running on http://localhost:${GQL_PORT}/graphql`)
);
