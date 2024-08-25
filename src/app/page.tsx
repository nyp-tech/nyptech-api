import SwaggerClient from "@/components/swagger-client";
import { getSwaggerSpec } from "@/lib/swagger";

export default async function Page() {
  const spec = getSwaggerSpec();
  return <SwaggerClient spec={spec} />;
}