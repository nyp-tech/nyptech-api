import { createSwaggerSpec } from "next-swagger-doc";

export function getSwaggerSpec() {
  return createSwaggerSpec({
    apiFolder: "src/app/v1",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "NYP Technopreneurship Club",
        version: "1.0",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [],
    },
  });
}