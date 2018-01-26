const fetch = require("node-fetch");

// mock database

const Items = [
  {
    id: "1",
    title: "Chainsaw",
    description: "quick and dirty",
    ownerid: 2,
    borrowerid: 1
  },
  {
    id: "2",
    title: "Bandsaw",
    description: "tighten before use, loosen after use",
    ownerid: 1,
    borrowerid: 2
  }
];

const Users = [
  {
    id: "1",
    email: "john@gmail.com",
    name: "John",
    imageurl: "www.google.com"
  },
  {
    id: "1",
    email: "jason@gmail.com",
    name: "Jason",
    imageurl: "www.google.com"
  }
];

const ITEMS_URL = "http://localhost:4000/items";
const USERS_URL = "http://localhost:4000/users";

const resolveFunctions = {
  Query: {
    items() {
      return fetch(ITEMS_URL).then(r => r.json());
    },

    users() {
      return fetch(USERS_URL).then(r => r.json());
    },

    user(root, { id }) {
      return fetch(`${USERS_URL}/${id}`).then(r => r.json());
    },

    item(root, { id }) {
      return fetch(`${ITEMS_URL}/${id}`).then(r => r.json());
    }
  },

  Item: {
    itemowner(item) {
      return fetch(`${USERS_URL}/${item.itemowner}`).then(r => r.json());
    },
    borrower(item) {
      return fetch(`${USERS_URL}/${item.itemowner}`).then(r => r.json());
    },
    tags() {
      return [];
    },
    async tags(item) {
      const res = await fetch(`${ITEMS_URL}/${item.id}`).then(r => r.json());
      return item.tags;
    }
  },

  User: {
    shareditems(user) {
      return fetch(`${ITEMS_URL}/?itemowner=${user.id}`).then(r => r.json());
    }
  }
};

module.exports = resolveFunctions;
