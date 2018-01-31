const fetch = require("node-fetch");

module.exports = ({
  // destructuring makes it simpler to call these methods
  jsonResource: { getUsers, getItem, getUser, getSharedItems }, // info to come from JSON
  postgresResource: { getItems } // info to come from Postgres
}) => {
  return {
    Query: {
      items() {
        return getItems();
      },

      users() {
        return getUsers();
      },

      userById(root, { id }) {
        return getUser();
      },

      itemById(root, { id }) {
        return getItem();
      }
    },

    Item: {
      itemowner(item) {
        return getUser(item.itemowner);
      },
      borrower(item) {
        // if (item.borrower) { TODO: checking if borrower here instead on in the component, should be more efficient
        return getUser(item.borrower);
      },
      async tags(item) {
        // const res = await fetch(`${ITEMS_URL}/${item.id}`).then(r => r.json());
        return item.tags;
      }
    },

    User: {
      shareditems(user) {
        return getSharedItems(user.id);
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
