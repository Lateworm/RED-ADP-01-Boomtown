const { Client } = require("pg");

const tq = tags => tags.map((id, i) => `($1, $${i + 2})`).join(", ");

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
      // 	client.query("SELECT * FROM tags",
      // 		inner join itemtags on itemtags.tagid = tags.id
      // 		where itemtags.itemid = $1, [itemid], (err, data) => {
      //	resolve(data.rows);
      // 	});
      // });
    },

    async createItem({ title, description, imageurl, itemowner, tags }) {
      const itemValues = [title, description, imageurl, itemowner];

      // query expects array of tag id
      tags = tags.map(t => t.id);

      const itemInsertQuery = `INSERT INTO items(title, description, imageurl, itemowner)
											VALUES($1, $2, $3, $4) RETURNING *`;

      try {
        await client.query("BEGIN");
        const itemResults = await client.query(itemInsertQuery, itemValues);

        const tagsInsertQuery = `INSERT INTO itemtags(itemid, tagid)
																		VALUES ${tq(tags)}`;

        const tagsResult = await client.query(tagsInsertQuery, [
          itemResults.rows[0].id,
          ...tags
        ]);

        await client.query("COMMIT");
        return itemResults.rows[0];
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      }
    },

    updateItem(id) {
      return;
    },

    getItemsByTag(id) {
      return;
    }
  };
};
