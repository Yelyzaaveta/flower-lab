const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

// Public routes
router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);

module.exports = router;
