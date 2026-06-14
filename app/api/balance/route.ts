import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();

  const expenses = await prisma.expense.findMany();

  const result = [];

  for (const user of users) {
    const paid = expenses
      .filter((e) => e.paidById === user.id)
      .reduce((sum, e) => sum + e.amount, 0);

    result.push({
      user: user.name,
      totalPaid: paid,
    });
  }

  return NextResponse.json(result);
}