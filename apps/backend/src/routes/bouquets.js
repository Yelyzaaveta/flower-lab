const router = require("express").Router();
const bouquetController = require("../controllers/bouquetController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

// Public routes
router.get("/", bouquetController.getAll);
router.get("/:id", bouquetController.getById);

// Admin routes (protected)
router.post("/", auth, upload.single("img"), bouquetController.create);
router.put("/:id", auth, upload.single("img"), bouquetController.update);
router.delete("/:id", auth, bouquetController.delete);

module.exports = router;
