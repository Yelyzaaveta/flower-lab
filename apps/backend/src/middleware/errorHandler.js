/**
 * Global error handler middleware.
 * Format: { "error": { "code": "ERROR_CODE", "message": "..." } }
 */
function errorHandler(err, req, res, _next) {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    error: {
      code,
      message,
    },
  });
}

module.exports = errorHandler;
