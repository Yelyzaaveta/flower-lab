const router = require("express").Router();
const auth = require("../middleware/auth");
const db = require("../config/db");
const { generateSlug } = require("../utils/slug");

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
      const slug = generateSlug(bouquet.name);
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
      const slug = generateSlug(category.name);
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
