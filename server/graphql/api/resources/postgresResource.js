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
    getSharedItems(userid) {
      return new Promise((resolve, reject) => {
        client.query(
          "SELECT * FROM items WHERE itemowner = $1",
          [userid],
          (err, data) => {
            resolve(data.rows);
          }
        );
      });
    },

    getBorrowedItems(userid) {
      return new Promise((resolve, reject) => {
        client.query(
          "SELECT * FROM items WHERE borrower = $1",
          [userid],
          (err, data) => {
            resolve(data.rows);
          }
        );
      });
    },

    getItems() {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM items", (err, data) => {
          resolve(data.rows);
        });
      });
    },

    getItem(id) {
      return;
      // return new Promise((resolve, reject) => {
      //   client.query("SELECT * FROM items WHERE id = $1", [id], (err, data) => {
      //     resolve(data.rows);
      //   });
      // });
    },

    getTags(itemid) {
      return;
      // return new Promise((resolve, reject) => {
      // 	client.query("SELECT * FROM ",
      // 		inner join itemtags on itemtags.tagid = tags.id
      // 		where itemtags.itemid = $1, [itemid], (err, data) => {
      // 	});
      // });
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
