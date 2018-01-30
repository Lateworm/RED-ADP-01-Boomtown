module.exports = app => {
  // Postgres config
  app.set("PGUSER", process.env.PGUSER || "boomdb");
  app.set("PGPASSWORD", process.env.PGPASSWORD || "boomdb");
  app.set("PGDATABASE", process.env.PGDATABASE || "boomdb");
  app.set("PGHOST", process.env.PGHOST || "localhost");
  app.set("PGPORT", process.env.PGPORT || "5432");

  // Express config
  app.set("PORT", process.env.PORT || "3002");
  // Temporary JSON dev server
  app.set("JSON_PORT", "4000");
};
