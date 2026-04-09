const Bouquet = require("../models/bouquet");

const bouquetController = {
  /**
   * GET /bouquets
   * List bouquets with cursor pagination + optional filters.
   */
async getAll(req, res, next) {
  try {
    const { limit, lastId, priceFrom, priceTo, category } = req.query;

    const options = {
      limit: limit ? parseInt(limit, 10) : 10,
      lastId: lastId ? parseInt(lastId, 10) : undefined,
    };

    if (priceFrom !== undefined || priceTo !== undefined) {
      options.priceRange = {
        from: priceFrom ? parseInt(priceFrom, 10) : undefined,
        to: priceTo ? parseInt(priceTo, 10) : undefined,
      };
    }

    if (category) {
      options.category = Array.isArray(category) ? category : [category];
    }

    const result = await Bouquet.findAll(options);

    res.json(result);
  } catch (err) {
    next(err);
  }
},

  /**
   * GET /bouquets/:id
   * Get a single bouquet with related bouquets (by ID or slug).
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      let bouquet;

      // Try to parse as number first
      const numId = parseInt(id, 10);
      if (!isNaN(numId)) {
        bouquet = await Bouquet.findById(numId);
      } else {
        // If not a number, treat as slug
        bouquet = await Bouquet.findBySlug(id);
      }

      if (!bouquet) {
        return res.status(404).json({
          error: {
            code: "NOT_FOUND",
            message: "Bouquet not found",
          },
        });
      }

      const relatedBouquets = await Bouquet.findRelated(
        bouquet.id,
        bouquet.categories,
        bouquet.price,
      );

      res.json({
        data: bouquet,
        relatedBouquets,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /bouquets
   * Create a new bouquet.
   */
  async create(req, res, next) {
    try {
      const data = req.body;

      // If file uploaded via multer/cloudinary
      if (req.file) {
        data.imgUrl = req.file.path;
      }

      if (!data.name || data.price === undefined) {
        return res.status(400).json({
          error: {
            code: "VALIDATION_ERROR",
            message: "name and price are required",
          },
        });
      }

      const bouquet = await Bouquet.create(data);
      res.status(201).json({ data: bouquet });
    } catch (err) {
      next(err);
    }
  },

  /**
   * PUT /bouquets/:id
   * Update a bouquet (partial update).
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      // If file uploaded via multer/cloudinary
      if (req.file) {
        data.imgUrl = req.file.path;
      }

      const result = await Bouquet.update(parseInt(id, 10), data);

      if (!result) {
        return res.status(404).json({
          error: {
            code: "NOT_FOUND",
            message: "Bouquet not found",
          },
        });
      }

      res.json({ message: "Bouquet updated successfully" });
    } catch (err) {
      next(err);
    }
  },

  /**
   * DELETE /bouquets/:id
   * Delete a bouquet.
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Bouquet.delete(parseInt(id, 10));

      if (!result) {
        return res.status(404).json({
          error: {
            code: "NOT_FOUND",
            message: "Bouquet not found",
          },
        });
      }

      res.json({ message: "Bouquet deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = bouquetController;
