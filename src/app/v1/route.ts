import { redirect } from "next/navigation";

export async function GET() {
  redirect("/v1/reference");
}