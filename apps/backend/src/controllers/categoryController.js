const Category = require("../models/category");

const categoryController = {
  /**
   * GET /categories
   * List all categories.
   */
  async getAll(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.json({ data: categories });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /categories/:id
   * Get a single category with bouquet count.
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findById(parseInt(id, 10));

      if (!category) {
        return res.status(404).json({
          error: {
            code: "NOT_FOUND",
            message: "Category not found",
          },
        });
      }

      res.json({ data: category });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = categoryController;
