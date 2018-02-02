const config = require("./config"); // config environment variables
const express = require("express");
const app = express();
config(app);

const cors = require("cors"); // cross-origin resource sharing
const bodyParser = require("body-parser");

let firebaseResource = require("./api/resources/firebaseResource")(app);
let postgresResource = require("./api/resources/postgresResource");
postgresResource(app).then(pgResource => start(pgResource));

const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

const typeDefs = require("./api/schema");
const initResolvers = require("./api/resolvers");

const { makeExecutableSchema } = require("graphql-tools");

function start(postgresResource) {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: initResolvers({
      postgresResource, // ES2015 object property shorthand, functionally same as {postgresResource: postgresResource}
      firebaseResource
    })
  });

  app.use("*", cors()); // TODO: Whitelist for production

  // Where we will send all of our GraphQL requests
  app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

  // A route for accessing the GraphiQL tool
  app.use(
    "/graphiql",
    graphiqlExpress({
      endpointURL: "/graphql"
    })
  );

  // Express listen
  app.listen(app.get("PORT"), () => {
    console.log(`Express app lsitening on ${app.get("PORT")}`);
    console.log(
      `GraphQL is now running on http://localhost:${app.get("PORT")}/graphql`
    );
  });
}
