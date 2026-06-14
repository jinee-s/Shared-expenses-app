import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const settlements = await prisma.settlement.findMany({
    orderBy: {
      date: "desc",
    },
  });

  return NextResponse.json(settlements);
}

export async function POST(req: Request) {
  const body = await req.json();

  const settlement = await prisma.settlement.create({
    data: {
      fromUserId: body.fromUserId,
      toUserId: body.toUserId,
      amount: Number(body.amount),
      date: new Date(body.date),
    },
  });

  return NextResponse.json(settlement);
}