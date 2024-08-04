"use server";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import ExcelJS from "exceljs";
import { format } from "date-fns";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function generateInvoicePDF(
  invoiceId: string
): Promise<Uint8Array> {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { items: true },
  });

  if (!invoice) throw new Error("Invoice not found");

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 12;
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const drawText = (
    text: string,
    x: number,
    y: number,
    size = fontSize,
    color = rgb(0, 0, 0)
  ) => {
    page.drawText(text, { x, y, size, font, color });
  };

  // Header
  drawText("Invoice", 50, height - 50, 20);

  // Invoice Details
  drawText(`Invoice Number: #${invoice.invoiceNumber}`, 50, height - 80);
  drawText(
    `Date: ${format(invoice.createdAt, "dd/MM/yyyy")}`,
    50,
    height - 100
  );
  drawText(`Customer: ${invoice.clientName}`, 50, height - 120);
  drawText(`Client Email: ${invoice.clientEmail}`, 50, height - 140);
  drawText(`Description: ${invoice.description}`, 50, height - 160);
  drawText(`City: ${invoice.city}`, 50, height - 220);
  drawText(`Status: ${invoice.status}`, 50, height - 180);
  drawText(`Due Date: ${invoice.dueDate}`, 50, height - 200);

  // Items Table
  let yOffset = 260;
  drawText("Items", 50, height - yOffset, 16);
  yOffset += 30;

  // Table Header
  drawText("Name", 50, height - yOffset, fontSize, rgb(0.5, 0.5, 0.5));
  drawText("Quantity", 200, height - yOffset, fontSize, rgb(0.5, 0.5, 0.5));
  drawText("Price", 300, height - yOffset, fontSize, rgb(0.5, 0.5, 0.5));
  drawText("Total", 400, height - yOffset, fontSize, rgb(0.5, 0.5, 0.5));
  yOffset += 20;

  // Table Rows
  invoice.items.forEach((item, index) => {
    drawText(item.name, 50, height - yOffset);
    drawText(item.quantity.toString(), 200, height - yOffset);
    drawText(`$${item.price}`, 300, height - yOffset);
    drawText(`$${+item.quantity * +item.price}`, 400, height - yOffset);
    yOffset += 20;
  });

  // Total
  drawText(`Total: $${invoice.total}`, 50, height - yOffset - 20, fontSize);

  return pdfDoc.save();
}

export async function generateBalanceSheet(): Promise<Uint8Array> {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("User not found");
  }

  const invoices = await prisma.invoice.findMany({
    where: { userId: user.id },
    include: { user: true, items: true },
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Balance Sheet");

  // Define columns
  worksheet.columns = [
    { header: "Invoice Number", key: "invoiceNumber", width: 15 },
    { header: "Client Name", key: "clientName", width: 20 },
    { header: "Client Email", key: "clientEmail", width: 20 },
    { header: "City", key: "city", width: 15 },
    { header: "Item Name", key: "itemName", width: 20 },
    { header: "Quantity", key: "quantity", width: 10 },
    { header: "Price", key: "price", width: 10 },
    { header: "Total", key: "total", width: 15 },
    { header: "Due Date", key: "dueDate", width: 15 },
    { header: "Date", key: "date", width: 15 },
    { header: "Created By", key: "createdBy", width: 20 },
  ];

  // Add data rows
  let rowIndex = 2; // Start from row 2 to leave space for header
  invoices.forEach((invoice) => {
    // Add invoice details
    worksheet.addRow({
      invoiceNumber: invoice.invoiceNumber,
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      city: invoice.city,
      itemName: "",
      quantity: "",
      price: "",
      total: invoice.total,
      dueDate: format(invoice.dueDate, "dd/MM/yyyy"),
      date: format(invoice.createdAt, "dd/MM/yyyy"),
      createdBy: invoice.user.name,
    });

    // Add items
    invoice.items.forEach((item) => {
      worksheet.addRow({
        invoiceNumber: "",
        clientName: "",
        clientEmail: "",
        city: "",
        itemName: item.name,
        quantity: +item.quantity,
        price: +item.price,
        total: +item.quantity * +item.price,
        dueDate: "",
        date: "",
        createdBy: "",
      });
      rowIndex++;
    });
    rowIndex++;
  });

  // Calculate total
  const total = invoices.reduce((sum, invoice) => sum + invoice.total, 0);

  // Add total row
  const totalRow = worksheet.addRow({
    invoiceNumber: "Total",
    total: total,
  });

  // Style total row
  totalRow.font = { bold: true };
  totalRow.getCell("total").alignment = { horizontal: "right" };
  totalRow.getCell("invoiceNumber").alignment = { horizontal: "left" };

  // Style header row
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { horizontal: "center" };
  headerRow.eachCell((cell) => {
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Style data rows
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    }
  });

  // Auto filter
  worksheet.autoFilter = {
    from: "A1",
    to: "K1",
  };

  // Freeze header row
  worksheet.views = [{ state: "frozen", ySplit: 1 }];

  // Write to buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return new Uint8Array(buffer);
}
