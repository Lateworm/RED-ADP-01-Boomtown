const config = require("./config");
const express = require("express");
const app = express();
config(app);

const cors = require("cors");
const bodyParser = require("body-parser");

let jsonResource = require("./api/resources/jsonResource")(app);
let firebaseResource = require("./api/resources/firebaseResource")(app);

let postgresResource = require("./api/resources/postgresResource");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

const typeDefs = require("./api/schema");
const initResolvers = require("./api/resolvers");

const { makeExecutableSchema } = require("graphql-tools");

postgresResource(app).then(pgResource => start(pgResource));

function start(postgresResource) {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: initResolvers({
      jsonResource,
      postgresResource // es2015 object property shorthand, same as postgresResource: postgresresource
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
