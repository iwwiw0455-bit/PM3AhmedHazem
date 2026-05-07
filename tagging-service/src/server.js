const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    service: process.env.SERVICE_NAME || "tagging-service",
    level: "INFO",
    message: `Tagging Service running on port ${PORT}`
  }));
});