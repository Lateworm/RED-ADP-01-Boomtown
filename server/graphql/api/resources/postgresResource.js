const { Client } = require("pg");

module.exports = async app => {
  const client = new Client({
    user: app.get("PGUSER"),
    host: app.get("PGHOST"),
    database: app.get("PGDATABASE"),
    password: app.get("PGPASSWORD"),
    port: app.get("PGPORT")
  });

  await client.connect();

  // test query
  // client.query("SELECT * FROM items", (err, res) => {
  //   console.log(err, res);
  // });

  return {
    getItems() {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM items", (err, data) => {
          resolve(data.rows);
        });
      });
    },

    getItem() {
      return;
    },

    getTags(itemid) {
      return;
    },

    createItem(id) {
      return;
    },

    updateItem(id) {
      return;
    },

    getItemsByTag(id) {
      return;
    }
  };
};
