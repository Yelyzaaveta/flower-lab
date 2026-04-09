const db = require("../src/config/db");
const { generateSlug } = require("../src/utils/slug");

async function populateSlugs() {
  try {
    console.log("Populating slugs for bouquets...");

    // Get all bouquets with NULL slug
    const bouquetsRes = await db.query(
      "SELECT id, name FROM bouquets WHERE slug IS NULL"
    );

    for (const bouquet of bouquetsRes.rows) {
      const slug = generateSlug(bouquet.name);
      await db.query("UPDATE bouquets SET slug = $1 WHERE id = $2", [
        slug,
        bouquet.id,
      ]);
      console.log(`✓ Bouquet ${bouquet.id}: ${bouquet.name} → ${slug}`);
    }

    console.log("\nPopulating slugs for categories...");

    // Get all categories with NULL slug
    const categoriesRes = await db.query(
      "SELECT id, name FROM categories WHERE slug IS NULL"
    );

    for (const category of categoriesRes.rows) {
      const slug = generateSlug(category.name);
      await db.query("UPDATE categories SET slug = $1 WHERE id = $2", [
        slug,
        category.id,
      ]);
      console.log(`✓ Category ${category.id}: ${category.name} → ${slug}`);
    }

    console.log("\n✅ Done!");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

populateSlugs();
