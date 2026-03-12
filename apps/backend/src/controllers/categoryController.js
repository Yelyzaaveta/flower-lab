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

  /**
   * POST /categories
   * Create a new category.
   */
  async create(req, res, next) {
    try {
      const data = req.body;
      if (req.file) {
        data.previewImgUrl = req.file.path;
      }

      if (!data.name) {
        return res.status(400).json({
          error: {
            code: "VALIDATION_ERROR",
            message: "name is required",
          },
        });
      }

      const category = await Category.create(data);
      res.status(201).json({ data: category });
    } catch (err) {
      next(err);
    }
  },

  /**
   * PUT /categories/:id
   * Update a category.
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (req.file) {
        data.previewImgUrl = req.file.path;
      }

      const result = await Category.update(parseInt(id, 10), data);

      if (!result) {
        return res.status(404).json({
          error: {
            code: "NOT_FOUND",
            message: "Category not found",
          },
        });
      }

      res.json({ message: "Category updated successfully" });
    } catch (err) {
      next(err);
    }
  },

  /**
   * DELETE /categories/:id
   * Delete a category.
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Category.delete(parseInt(id, 10));

      if (!result) {
        return res.status(404).json({
          error: {
            code: "NOT_FOUND",
            message: "Category not found",
          },
        });
      }

      res.json({ message: "Category deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = categoryController;
