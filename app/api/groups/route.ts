import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const group = await prisma.group.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create group" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const groups = await prisma.group.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(groups);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: 500 }
    );
  }
}