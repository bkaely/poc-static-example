import { fileURLToPath } from "node:url";
import path from "node:path";
import swaggerJsdoc from "swagger-jsdoc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "poc-static-example API",
      version: "0.1.0",
      description: "Sample API with stubbed book data for local development.",
    },
    servers: [{ url: "/", description: "Current host" }],
  },
  apis: [path.join(__dirname, "routes/*.js")],
});
