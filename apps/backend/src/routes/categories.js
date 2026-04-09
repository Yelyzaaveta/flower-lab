const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

// Public routes
router.get("/", categoryController.getAll);
router.get("/:id/bouquets", categoryController.getBouquets);
router.get("/:id", categoryController.getById);

// Admin routes (protected)
router.post("/", auth, upload.single("previewImgUrl"), categoryController.create);
router.put("/:id", auth, upload.single("previewImgUrl"), categoryController.update);
router.delete("/:id", auth, categoryController.delete);

module.exports = router;
