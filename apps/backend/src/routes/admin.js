const router = require("express").Router();
const auth = require("../middleware/auth");
const db = require("../config/db");
const { generateSlug } = require("../utils/slug");

// Helper to generate unique slug
async function generateUniqueSlug(baseSlug, table, idToUpdate) {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await db.query(
      `SELECT id FROM ${table} WHERE slug = $1 AND id != $2`,
      [slug, idToUpdate]
    );

    if (existing.rows.length === 0) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

// Protected route - only authenticated admins
router.post("/populate-slugs", auth, async (req, res, next) => {
  try {
    let bouquetsCount = 0;
    let categoriesCount = 0;

    // Update bouquets with NULL slug
    const bouquetsRes = await db.query(
      "SELECT id, name FROM bouquets WHERE slug IS NULL"
    );

    for (const bouquet of bouquetsRes.rows) {
      const baseSlug = generateSlug(bouquet.name);
      const slug = await generateUniqueSlug(baseSlug, "bouquets", bouquet.id);
      await db.query("UPDATE bouquets SET slug = $1 WHERE id = $2", [
        slug,
        bouquet.id,
      ]);
      bouquetsCount++;
    }

    // Update categories with NULL slug
    const categoriesRes = await db.query(
      "SELECT id, name FROM categories WHERE slug IS NULL"
    );

    for (const category of categoriesRes.rows) {
      const baseSlug = generateSlug(category.name);
      const slug = await generateUniqueSlug(
        baseSlug,
        "categories",
        category.id
      );
      await db.query("UPDATE categories SET slug = $1 WHERE id = $2", [
        slug,
        category.id,
      ]);
      categoriesCount++;
    }

    res.json({
      message: "Slugs populated successfully",
      bouquetsUpdated: bouquetsCount,
      categoriesUpdated: categoriesCount,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
