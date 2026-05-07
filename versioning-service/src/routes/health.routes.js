const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "UP"
    },
    meta: {
      service: process.env.SERVICE_NAME || "versioning-service",
      request_id: req.requestId || null
    }
  });
});

router.get("/ready", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "READY",
      database: "connected"
    },
    meta: {
      service: process.env.SERVICE_NAME || "versioning-service",
      request_id: req.requestId || null
    }
  });
});

module.exports = router;