const db = require("../config/db");

const Bouquet = {
  /**
   * Get bouquets with cursor-based pagination and optional filters.
   * Sorted by updationDate DESC, id DESC.
   */
  async findAll({ limit = 10, lastId, priceRange, category } = {}) {
    const conditions = [];
    const params = [];
    let paramIdx = 0;

    // Cursor: get items after lastId
    if (lastId) {
      paramIdx++;
      conditions.push(`
        ("updationDate", id) < (
          SELECT "updationDate", id FROM bouquets WHERE id = $${paramIdx}
        )
      `);
      params.push(lastId);
    }

    // Price filter
    if (priceRange) {
      if (priceRange.from !== undefined) {
        paramIdx++;
        conditions.push(`price >= $${paramIdx}`);
        params.push(priceRange.from);
      }
      if (priceRange.to !== undefined) {
        paramIdx++;
        conditions.push(`price <= $${paramIdx}`);
        params.push(priceRange.to);
      }
    }

    // Category filter (array overlap)
    if (category && category.length > 0) {
      paramIdx++;
      conditions.push(`categories && $${paramIdx}::text[]`);
      params.push(category);
    }

    const where =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // Fetch limit + 1 to check if there are more
    paramIdx++;
    const fetchLimit = limit + 1;
    params.push(fetchLimit);

    const sql = `
      SELECT id, name, "imgUrl", "shortDescription", categories, price,
             "creationDate", "updationDate", "longDescription", "flowersAmount"
      FROM bouquets
      ${where}
      ORDER BY "updationDate" DESC, id DESC
      LIMIT $${paramIdx}
    `;

    const { rows } = await db.query(sql, params);

    const hasMore = rows.length > limit;
    const data = hasMore ? rows.slice(0, limit) : rows;
    const nextLastId = hasMore ? data[data.length - 1].id : null;

    return {
      data,
      meta: {
        nextLastId,
        hasMore,
      },
    };
  },

  /**
   * Get a single bouquet by ID with full details.
   */
  async findById(id) {
    const sql = `
      SELECT id, name, "imgUrl", "shortDescription", "longDescription",
             categories, price, "flowersAmount", "buyAmount",
             "creationDate", "updationDate"
      FROM bouquets
      WHERE id = $1
    `;
    const { rows } = await db.query(sql, [id]);
    return rows[0] || null;
  },

  /**
   * Get 3 related bouquets sharing at least one category, with closest price.
   */
  async findRelated(bouquetId, categories, price) {
    if (!categories || categories.length === 0) return [];
    const sql = `
      SELECT id, name, "imgUrl", price, "shortDescription", categories
      FROM bouquets
      WHERE categories && $1 AND id != $2
      ORDER BY ABS(price - $3), id
      LIMIT 3
    `;
    const { rows } = await db.query(sql, [categories, bouquetId, price]);
    return rows;
  },

  /**
   * Create a new bouquet.
   */
  async create(data) {
    const categories = Array.isArray(data.categories)
      ? data.categories
      : data.categories
        ? [data.categories]
        : [];

    const sql = `
      INSERT INTO bouquets (name, "imgUrl", "shortDescription", "longDescription",
                            categories, price, "flowersAmount", "buyAmount")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, name, "imgUrl", "shortDescription", "longDescription",
                categories, price, "flowersAmount", "buyAmount",
                "creationDate", "updationDate"
    `;
    const params = [
      data.name,
      data.imgUrl || "",
      data.shortDescription || "",
      data.longDescription || "",
      categories,
      data.price,
      data.flowersAmount || 0,
      data.buyAmount || 0,
    ];
    const { rows } = await db.query(sql, params);
    return rows[0];
  },

  /**
   * Update a bouquet (only provided fields).
   */
  async update(id, data) {
    const allowedFields = [
      "name",
      "imgUrl",
      "shortDescription",
      "longDescription",
      "categories",
      "price",
      "flowersAmount",
      "buyAmount",
    ];

    const setClauses = [];
    const params = [];
    let paramIdx = 0;

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        paramIdx++;
        const col = /[A-Z]/.test(field) ? `"${field}"` : field;

        if (field === "categories") {
          const cats = Array.isArray(data.categories)
            ? data.categories
            : [data.categories];
          setClauses.push(`${col} = $${paramIdx}::text[]`);
          params.push(cats);
        } else {
          setClauses.push(`${col} = $${paramIdx}`);
          params.push(data[field]);
        }
      }
    }

    if (setClauses.length === 0) {
      return null;
    }

    // Always update updationDate
    setClauses.push(`"updationDate" = NOW()`);

    paramIdx++;
    params.push(id);

    const sql = `
      UPDATE bouquets
      SET ${setClauses.join(", ")}
      WHERE id = $${paramIdx}
      RETURNING id
    `;

    const { rows } = await db.query(sql, params);
    return rows[0] || null;
  },

  /**
   * Delete a bouquet by ID.
   */
  async delete(id) {
    const sql = "DELETE FROM bouquets WHERE id = $1 RETURNING id";
    const { rows } = await db.query(sql, [id]);
    return rows[0] || null;
  },

  /**
   * Search bouquets by name or shortDescription (ILIKE).
   */
  async search(query, { limit = 10, lastId } = {}) {
    const conditions = [`(name ILIKE $1 OR "shortDescription" ILIKE $1)`];
    const params = [`%${query}%`];
    let paramIdx = 1;

    if (lastId) {
      paramIdx++;
      conditions.push(`
        ("updationDate", id) < (
          SELECT "updationDate", id FROM bouquets WHERE id = $${paramIdx}
        )
      `);
      params.push(lastId);
    }

    paramIdx++;
    const fetchLimit = limit + 1;
    params.push(fetchLimit);

    const sql = `
      SELECT id, name, "imgUrl", "shortDescription", categories, price,
             "creationDate", "updationDate"
      FROM bouquets
      WHERE ${conditions.join(" AND ")}
      ORDER BY "updationDate" DESC, id DESC
      LIMIT $${paramIdx}
    `;

    const { rows } = await db.query(sql, params);

    const hasMore = rows.length > limit;
    const data = hasMore ? rows.slice(0, limit) : rows;
    const nextLastId = hasMore ? data[data.length - 1].id : null;

    return {
      data,
      meta: {
        nextLastId,
        hasMore,
      },
    };
  },
};

module.exports = Bouquet;
