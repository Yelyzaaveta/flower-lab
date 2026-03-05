require("dotenv").config({
  path: require("path").resolve(__dirname, "../../../.env"),
});

const fs = require("fs");
const path = require("path");
const { pool } = require("./db");

const migrationsDir = path.resolve(__dirname, "../../migrations");

async function runMigrations() {
  console.log("🌱 Running migrations...");

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, "utf-8");

    try {
      await pool.query(sql);
      console.log(`  ✅ ${file}`);
    } catch (err) {
      console.error(`  ❌ ${file}: ${err.message}`);
      process.exit(1);
    }
  }

  console.log("🌸 Migrations complete!");
  await pool.end();
}

runMigrations();
