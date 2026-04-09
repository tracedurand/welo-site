const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL environment variable.");
}

const useSsl = process.env.PGSSLMODE === "require";

const pool = new Pool({
  connectionString,
  ssl: useSsl ? { rejectUnauthorized: false } : false
});

async function getProducts() {
  const query = `
    SELECT
      id,
      model_name,
      business_size,
      user_range,
      threat_prevention_gbps,
      overview_points
    FROM products
    ORDER BY sort_order ASC, model_name ASC
  `;

  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  pool,
  getProducts
};
