const fetch = require("node-fetch");

module.exports = ({
  // destructuring makes it simpler to call these methods
  firebaseResource: { getUsers, getUser }, // info to come from firebase
  postgresResource: {
    getTags,
    getItems,
    getItem,
    getSharedItems,
    getBorrowedItems
  } // info to come from Postgres
}) => {
  return {
    Query: {
      items() {
        return getItems();
      },

      item(root, { id }) {
        return getItem();
      },

      users() {
        return getUsers();
      },

      user(root, { id }) {
        return getUser(id);
      }
    },

    Item: {
      itemowner(item) {
        return getUser(item.itemowner);
      },
      borrower(item) {
        // if (item.borrower) { TODO: check if borrower here instead of in the component; should be more efficient
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
      },
      borroweditems(user) {
        return getBorrowedItems(user.id);
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
