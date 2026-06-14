import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const expenses = await prisma.expense.findMany({
    include: {
      group: true,
      paidBy: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return NextResponse.json(expenses);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const expense = await prisma.expense.create({
      data: {
        description: body.description,
        amount: Number(body.amount),
        currency: body.currency,
        splitType: body.splitType,
        date: new Date(body.date),
        groupId: body.groupId,
        paidById: body.paidById,
      },
    });

    return NextResponse.json(expense);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create expense" },
      { status: 500 }
    );
  }
}