const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL environment variable.");
}

function sslForPool() {
  if (process.env.PGSSLMODE === "disable") {
    return false;
  }
  if (
    process.env.PGSSLMODE === "require" ||
    process.env.NODE_ENV === "production"
  ) {
    return { rejectUnauthorized: false };
  }
  return false;
}

const pool = new Pool({
  connectionString,
  ssl: sslForPool()
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
