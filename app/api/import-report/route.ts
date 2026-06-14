import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const latestImport = await prisma.importJob.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!latestImport) {
    return NextResponse.json([]);
  }

  const anomalies = await prisma.importAnomaly.findMany({
    where: {
      importJobId: latestImport.id,
    },
    orderBy: {
      rowNumber: "asc",
    },
  });

  return NextResponse.json(anomalies);
}