const swaggerJsdoc = require("swagger-jsdoc");

const specs = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tagging Service API",
      version: "1.0.0",
      description: "API documentation for the Tagging Service"
    }
  },
  apis: ["./src/routes/*.js"]
});

module.exports = specs;