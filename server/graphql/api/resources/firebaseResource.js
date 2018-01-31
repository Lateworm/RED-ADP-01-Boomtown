module.exports = app => {
  const ITEMS_URL = `http://localhost:${app.get("JSON_PORT")}/items`;
  const USERS_URL = `http://localhost:${app.get("JSON_PORT")}/users`;
  return {
    getUsers() {
      return;
    },

    getUser() {
      return;
    }
  };
};
