const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

function sslConfig() {
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

async function runSqlFile(client, relativePath) {
  const filePath = path.join(__dirname, "..", relativePath);
  const sql = fs.readFileSync(filePath, "utf8");
  const statements = sql
    .split(/;\s*(?:\r?\n|$)/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    await client.query(statement);
  }
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn(
      "release: DATABASE_URL is not set — skipping schema/seed (web dyno will still start)."
    );
    console.warn(
      "release: Add Heroku Postgres (Resources → Heroku Postgres), then redeploy so migrations run."
    );
    process.exit(0);
  }

  const client = new Client({
    connectionString,
    ssl: sslConfig()
  });

  await client.connect();
  try {
    await runSqlFile(client, "sql/schema.sql");
    await runSqlFile(client, "sql/seed_products.sql");
  } finally {
    await client.end();
  }

  console.log("release: schema and seed completed.");
}

main().catch((err) => {
  console.error("release failed:", err.message);
  process.exit(1);
});
