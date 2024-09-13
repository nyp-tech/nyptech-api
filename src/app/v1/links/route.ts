import { Redirect, RedirectRecord } from "@/lib/backend";
import { deleteLink, getLink, getLinks, setLink } from "@/lib/database";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const record = (await req.json()) as Redirect;
  if (!("id" in record && "url" in record)) return NextResponse.json({ message: "Body is invalid." }, { status: 400 });

  const link = await setLink(record.id, record as RedirectRecord);
  return NextResponse.json(link, { status: 200 });
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (id) {
    const link = await getLink(id);
    if (!link) return NextResponse.json({ message: "Not found." }, { status: 404 });
    return NextResponse.json(link, { status: 200 });
  } else {
    const links = await getLinks();
    return NextResponse.json(links, { status: 200 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ message: "ID is required." }, { status: 400 });

  const success = await deleteLink(id);
  if (!success) return NextResponse.json({ message: "Not found." }, { status: 404 });
  return NextResponse.json({ message: "Redirect was deleted." }, { status: 200 });
}