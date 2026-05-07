function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "Unexpected server error",
      details: err.details || {}
    },
    meta: {
      service: process.env.SERVICE_NAME,
      request_id: req.requestId
    }
  });
}

module.exports = errorMiddleware;