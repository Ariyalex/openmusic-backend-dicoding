require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "admin123",
  database: process.env.PGDATABASE || "openmusic",
  max: 10,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
