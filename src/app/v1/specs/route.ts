import { createSwaggerSpec } from "next-swagger-doc";

export async function GET() {
  return Response.json(
    createSwaggerSpec({
      apiFolder: "src/app/v1",
      definition: {
        openapi: "3.0.0",
        info: {
          title: "NYP Technopreneurship Club",
          version: "1.0",
        },
      },
    })
  );
}