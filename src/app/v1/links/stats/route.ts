import { getLinkStats } from "@/lib/links";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ message: "ID is required." }, { status: 400 });

  const stats = await getLinkStats(id);
  if (!stats) return NextResponse.json({ message: "Not found." }, { status: 404 });

  return NextResponse.json(stats, { status: 200 });
}