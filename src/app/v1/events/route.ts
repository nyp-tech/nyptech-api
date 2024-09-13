import { prisma } from "@/lib/clients";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const eventData = await req.json();
    const event = await prisma.events.create({
      data: eventData,
    });
    return NextResponse.json(event, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "An unknown error had occurred." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const event = await prisma.events.findUnique({
        where: {
          id,
        },
      });
      if (!event) return NextResponse.json({ message: "Event not found." }, { status: 404 });
      return NextResponse.json(event, { status: 200 });
    } else {
      const events = await prisma.events.findMany();
      return NextResponse.json(events, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "An unknown error had occurred." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, ...eventData } = await req.json();
    const event = await prisma.events.update({
      where: {
        id,
      },
      data: eventData,
    });
    return NextResponse.json(event, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "An unknown error had occurred." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ message: "ID is required." }, { status: 400 });
    const event = await prisma.events.delete({
      where: {
        id,
      },
    });
    if (!event) return NextResponse.json({ message: "Event not found." }, { status: 404 });
    return NextResponse.json({ message: "Event deleted." }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "An unknown error had occurred." }, { status: 500 });
  }
}