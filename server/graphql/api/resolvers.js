const fetch = require("node-fetch");

module.exports = ({
  // destructuring makes it simpler to call these methods
  firebaseResource: { getUsers, getUser }, // info to come from firebase
  postgresResource: {
    getTags,
    getItems,
    getItem,
    getSharedItems,
    getBorrowedItems,
    createItem
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
        // TODO: check if (item.borrower) here instead of in the component; should be more efficient
        return getUser(item.borrower);
      },
      async tags(item) {
        return await getTags(item.id);
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
      createNewItem(root, { newItem }) {
        // newItem is destructured fromt eh argument
        console.log(newItem);
        return createItem(newItem);
      },

      updateItem(root, { updatedItem: { borrower } }) {
        console.log({ borrower });
        return { borrower };
      }
    }
  };
};
