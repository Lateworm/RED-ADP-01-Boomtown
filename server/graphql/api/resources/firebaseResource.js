const firebase = require("firebase");
require("firebase/auth");

module.exports = app => {
  // Initialize Firebase

  const firebaseApp = firebase.initializeApp(app.get("FIREBASE_CONFIG"));
  const db = firebaseApp.database();
  const auth = firebaseApp.auth();

  return {
    async getUsers() {
      const users = await db
        .ref("users")
        .once("value")
        .val();
      const userList = [];
      Object.keys(users.val(), userid => {
        userList.push({
          id: userid,
          email: users[userid].email,
          fullname: users[userid].fullname,
          bio: users[userid].bio
        });
      });
      return userList;
    },
    async getUser(userid) {
      let user = await db.ref(`users/${userid}`).once("value");
      user = user.val();
      console.log(user);
      console.log(userid);
      return {
        id: userid,
        ...user
      };
    }
  };
};
