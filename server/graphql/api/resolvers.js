const fetch = require("node-fetch");

module.exports = app => {
  const ITEMS_URL = `http://localhost:${app.get("JSON_PORT")}/items`;
  const USERS_URL = `http://localhost:${app.get("JSON_PORT")}/users`;

  return {
    Query: {
      items() {
        return fetch(ITEMS_URL).then(r => r.json());
      },

      users() {
        return fetch(USERS_URL).then(r => r.json());
      },

      userById(root, { id }) {
        return fetch(`${USERS_URL}/${id}`).then(r => r.json());
      },

      itemById(root, { id }) {
        return fetch(`${ITEMS_URL}/${id}`).then(r => r.json());
      }
    },

    Item: {
      itemowner(item) {
        return fetch(`${USERS_URL}/${item.itemowner}`).then(r => r.json());
      },
      borrower(item) {
        return fetch(`${USERS_URL}/${item.borrower}`).then(r => r.json());
      },
      tags() {
        return [];
      },
      async tags(item) {
        // TODO: Why do we have async here, but not for borrower and itemowner?
        const res = await fetch(`${ITEMS_URL}/${item.id}`).then(r => r.json());
        return item.tags;
      }
    },

    User: {
      shareditems(user) {
        return fetch(`${ITEMS_URL}/?itemowner=${user.id}`).then(r => r.json());
      }
    },

    Mutation: {
      updateItem(root, { updatedItem: { borrower } }) {
        console.log({ borrower });
        return { borrower };
      },

      addItem(
        root,
        { newItem: { itemowner, imageurl, title, description, tags } }
      ) {
        // TODO: Get this working in graphiQL. The itemowner is gumming up the works.
        // TODO: resolve new items to the database
        // TODO: Must return a new Item thanks to our mutation schema
        // access properties of newItem with dot notation
        console.log({ title }); // will appear in the terminal where Apollo server is running
        return { itemowner, imageurl, title, description, tags };
      }
    }
  };
};
