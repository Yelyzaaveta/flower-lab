const db = require("../config/db");

const Category = {
  /**
   * Get all categories (for the public listing).
   */
  async findAll() {
    const sql = `
      SELECT id, name, "prewiewImgUrl", description
      FROM categories
      ORDER BY id
    `;
    const { rows } = await db.query(sql);
    return rows;
  },

  /**
   * Get a single category by ID with bouquet count.
   */
  async findById(id) {
    const sql = `
      SELECT c.id, c.name, c.description,
             (SELECT COUNT(*) FROM bouquets b WHERE b.category = c.name)::int AS "bouquetsAmount"
      FROM categories c
      WHERE c.id = $1
    `;
    const { rows } = await db.query(sql, [id]);
    return rows[0] || null;
  },

  /**
   * Create a new category.
   */
  async create(data) {
    const sql = `
      INSERT INTO categories (name, description, "prewiewImgUrl")
      VALUES ($1, $2, $3)
      RETURNING id, name, description, "prewiewImgUrl", "creationDate", "updationDate"
    `;
    const params = [
      data.name,
      data.description || "",
      data.prewiewImgUrl || "",
    ];
    const { rows } = await db.query(sql, params);
    return rows[0];
  },

  /**
   * Update a category.
   */
  async update(id, data) {
    const allowedFields = ["name", "description", "prewiewImgUrl"];

    const setClauses = [];
    const params = [];
    let paramIdx = 0;

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        paramIdx++;
        const col = /[A-Z]/.test(field) ? `"${field}"` : field;
        setClauses.push(`${col} = $${paramIdx}`);
        params.push(data[field]);
      }
    }

    if (setClauses.length === 0) return null;

    setClauses.push(`"updationDate" = NOW()`);
    paramIdx++;
    params.push(id);

    const sql = `
      UPDATE categories
      SET ${setClauses.join(", ")}
      WHERE id = $${paramIdx}
      RETURNING id
    `;
    const { rows } = await db.query(sql, params);
    return rows[0] || null;
  },

  /**
   * Delete a category.
   */
  async delete(id) {
    const sql = "DELETE FROM categories WHERE id = $1 RETURNING id";
    const { rows } = await db.query(sql, [id]);
    return rows[0] || null;
  },
};

module.exports = Category;
