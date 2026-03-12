const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "subscription_api",
  password: "gr_hemanth_123",
  port: 5432
});

module.exports = pool;