const Bouquet = require("../models/bouquet");

const searchController = {
  /**
   * GET /search?q=...
   * Search bouquets by name and shortDescription.
   */
  async search(req, res, next) {
    try {
      const { q, limit, lastId } = req.query;

      if (!q || q.trim() === "") {
        return res.status(400).json({
          error: {
            code: "VALIDATION_ERROR",
            message: "Search query (q) is required",
          },
        });
      }

      const options = {
        limit: parseInt(limit, 10) || 10,
        lastId: parseInt(lastId, 10) || undefined,
      };

      const result = await Bouquet.search(q.trim(), options);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = searchController;
