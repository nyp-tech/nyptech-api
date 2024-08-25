import { createEvent, deleteEvent, getEvent, getEvents } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const eventData = await req.json();
    const event = await createEvent(eventData);
    return NextResponse.json(event, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "An unknown error had occurred!" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const event = await getEvent(id);
      if (!event) {
        return NextResponse.json({ error: "Event not found!" }, { status: 404 });
      } else {
        return NextResponse.json(event, { status: 200 });
      }
    }
    const events = await getEvents();
    return NextResponse.json(events, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "An unknown error had occurred!" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await deleteEvent(id);
    return NextResponse.json({ message: "Event deleted!" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "An unknown error had occurred!" }, { status: 500 });
  }
}