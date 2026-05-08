require("./observability/tracing");

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      service: process.env.SERVICE_NAME || "versioning-service",
      level: "INFO",
      message: `Versioning Service running on port ${PORT}`
    })
  );
});