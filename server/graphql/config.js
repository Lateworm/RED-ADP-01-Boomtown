module.exports = app => {
  // Postgres config
  app.set("PGUSER", process.env.PGUSER || "boomdb");
  app.set("PGPASSWORD", process.env.PGPASSWORD || "boomdb");
  app.set("PGDATABASE", process.env.PGDATABASE || "boomdb");
  app.set("PGHOST", process.env.PGHOST || "localhost");
  app.set("PGPORT", process.env.PGPORT || "5432");

  // Express config
  app.set("PORT", process.env.PORT || "3002");

  // Firebase config
  app.set("FIREBASE_CONFIG", {
    apiKey: "AIzaSyBL4fXA3Xdr96eFPxQNwkLLX_BHYNEWT2Q",
    authDomain: "boomtown-8c56c.firebaseapp.com",
    databaseURL: "https://boomtown-8c56c.firebaseio.com",
    projectId: "boomtown-8c56c",
    storageBucket: "boomtown-8c56c.appspot.com",
    messagingSenderId: "704806820261"
  });
};
