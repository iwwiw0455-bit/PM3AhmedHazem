const swaggerJsdoc = require("swagger-jsdoc");

const specs = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Versioning Service API",
      version: "1.0.0",
      description: "API documentation for the Versioning Service"
    }
  },
  apis: ["./src/routes/*.js"]
});

module.exports = specs;