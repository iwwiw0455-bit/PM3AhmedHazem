const express = require("express");
const swaggerUi = require("swagger-ui-express");
const specs = require("../docs/swagger");

const router = express.Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;