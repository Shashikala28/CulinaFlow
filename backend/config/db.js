import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// When connected
pool.on("connect", () => {
  console.log("✅ Connected to Neon Postgres database");
});

// Error handling
pool.on("error", (err) => {
  console.error("❌ Unexpected database error:", err);
  process.exit(-1);
});

// Export query function + pool
export default {
  query: (text, params) => pool.query(text, params),
  pool,
};
