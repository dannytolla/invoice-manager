import { NextResponse } from "next/server";

import { generateBalanceSheet } from "@/features/invoices/api/use-report-generate-invoice";

export async function GET() {
  try {
    const excelBuffer = await generateBalanceSheet();

    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=balance-sheet.xlsx",
      },
    });
  } catch (error) {
    console.error("Error generating Excel file:", error);
    return NextResponse.json(
      { message: "Error generating Excel file" },
      { status: 500 }
    );
  }
}
