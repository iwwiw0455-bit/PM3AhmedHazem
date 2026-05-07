require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const requestIdMiddleware = require("./middleware/request-id.middleware");
const errorMiddleware = require("./middleware/error.middleware");
const { metricsMiddleware } = require("./observability/metrics");

const healthRoutes = require("./routes/health.routes");
const versionRoutes = require("./routes/version.routes");
const metricsRoutes = require("./routes/metrics.routes");
const docsRoutes = require("./routes/docs.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(requestIdMiddleware);
app.use(metricsMiddleware);

app.use(healthRoutes);
app.use(versionRoutes);
app.use(metricsRoutes);
app.use(docsRoutes);

app.use(errorMiddleware);

module.exports = app;