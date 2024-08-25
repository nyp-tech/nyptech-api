import { createFeature, getFeature, getFeatures } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const featureData = await req.json();
    const feature = await createFeature(featureData);
    return NextResponse.json(feature, { status: 201 });
  } catch {
    return NextResponse.json({ error: "An unknown error had occurred!" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const event = await getFeature(id);
      if (!event) {
        return NextResponse.json({ error: "Event not found!" }, { status: 404 });
      } else {
        return NextResponse.json(event, { status: 200 });
      }
    }
    const features = await getFeatures();
    return NextResponse.json(features, { status: 200 });
  } catch {
    return NextResponse.json({ error: "An unknown error had occurred!" }, { status: 500 });
  }
}