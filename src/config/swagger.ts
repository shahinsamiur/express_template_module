import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Express API",
      version: "1.0.0",
      description: "Express API Documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: ["./src/modules/**/*.ts"],

  failOnErrors: true,
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
