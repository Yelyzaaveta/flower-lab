require("dotenv").config({
  path: require("path").resolve(__dirname, "../../../.env"),
});

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const bouquetRoutes = require("./routes/bouquets");
const categoryRoutes = require("./routes/categories");
const authRoutes = require("./routes/auth");
const searchRoutes = require("./routes/search");
const adminRoutes = require("./routes/admin");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/bouquets", bouquetRoutes);
app.use("/categories", categoryRoutes);
app.use("/auth", authRoutes);
app.use("/search", searchRoutes);
app.use("/admin", adminRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Global error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🌸 FlowerLab API running on port ${PORT}`);
});

module.exports = app;
