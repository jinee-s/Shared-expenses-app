import Papa from "papaparse";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const text = await file.text();

    const parsed = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
    });

    const rows = parsed.data as any[];

    const seenExpenses = new Map();

    const importJob = await prisma.importJob.create({
      data: {
        fileName: file.name,
        status: "COMPLETED",
      },
    });

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const description = String(
  row.description || ""
)
  .toLowerCase()
  .trim();

const amountKey = String(row.amount || "")
  .replace(",", "")
  .trim();

const duplicateKey =
  description + "_" + amountKey;

if (seenExpenses.has(duplicateKey)) {
  await prisma.importAnomaly.create({
    data: {
      importJobId: importJob.id,
      rowNumber: index + 1,
      issueType: "DUPLICATE_EXPENSE",
      actionTaken: "FLAGGED_FOR_REVIEW",
    },
  });
} else {
  seenExpenses.set(duplicateKey, true);
}


      // Missing Payer Detection
      if (!row.paid_by || row.paid_by.trim() === "") {
        await prisma.importAnomaly.create({
          data: {
            importJobId: importJob.id,
            rowNumber: index + 1,
            issueType: "MISSING_PAYER",
            actionTaken: "FLAGGED_FOR_REVIEW",
          },
        });
      }
      // Settlement Detection
if (
  row.description &&
  row.description.toLowerCase().includes("paid") &&
  row.description.toLowerCase().includes("back")
) {
  await prisma.importAnomaly.create({
    data: {
      importJobId: importJob.id,
      rowNumber: index + 1,
      issueType: "SETTLEMENT_ROW",
      actionTaken: "CONVERT_TO_SETTLEMENT",
    },
  });
}
if (!row.currency || row.currency.trim() === "") {
  await prisma.importAnomaly.create({
    data: {
      importJobId: importJob.id,
      rowNumber: index + 1,
      issueType: "MISSING_CURRENCY",
      actionTaken: "DEFAULT_TO_INR",
    },
  });
}
const amount = parseFloat(
  String(row.amount).replace(",", "")
);

if (amount < 0) {
  await prisma.importAnomaly.create({
    data: {
      importJobId: importJob.id,
      rowNumber: index + 1,
      issueType: "NEGATIVE_AMOUNT",
      actionTaken: "TREAT_AS_REFUND",
    },
  });
}
if (amount === 0) {
  await prisma.importAnomaly.create({
    data: {
      importJobId: importJob.id,
      rowNumber: index + 1,
      issueType: "ZERO_AMOUNT",
      actionTaken: "FLAGGED_FOR_REVIEW",
    },
  });
}

    }

    const anomalies = await prisma.importAnomaly.findMany({
      where: {
        importJobId: importJob.id,
      },
    });

    return NextResponse.json({
      importJobId: importJob.id,
      rows: rows.length,
      anomaliesFound: anomalies.length,
      anomalies,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Import failed",
      },
      {
        status: 500,
      }
    );
  }
}