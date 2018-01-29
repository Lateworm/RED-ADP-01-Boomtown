# RED-adp-01-Boomtown

Red Academy App Development Project 01: Boomtown Web App

## About The Project

This project is coursework for RED Academy's app development program. Boomtown is an app for sharing things.

## Technologies

* JavaScript / JSON
* Node
* React
* Material UI
* Redux
* Apollo / GraphQL
* Express

## Installation

Download the repo, then run:

```bash
cd client && npm install
```

## Start-up

From inside the `server` directory, start the JSON server:

```bash
json-server --watch db.json -p 4000
```

then in `server/graphql` start the GraphQL server:

```bash
npm start
```

In the `client` directory, start the client:

```bash
npm start
```

If needed, access the GraphiQL UI at:

```
http://localhost:3002/graphiql
```
