import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const members = await prisma.groupMember.findMany({
    include: {
      user: true,
      group: true,
    },
  });

  return NextResponse.json(members);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const member = await prisma.groupMember.create({
      data: {
        groupId: body.groupId,
        userId: body.userId,
        joinedAt: new Date(body.joinedAt),
        leftAt: body.leftAt
          ? new Date(body.leftAt)
          : null,
      },
      include: {
        user: true,
        group: true,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add member" },
      { status: 500 }
    );
  }
}