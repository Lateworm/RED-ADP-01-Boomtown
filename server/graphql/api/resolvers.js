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
