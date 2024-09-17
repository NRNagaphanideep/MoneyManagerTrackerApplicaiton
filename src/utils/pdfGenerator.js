import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

export const generatePDF = (transactions, balance, filter) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text("Expense Manager Report", 14, 22);

  // Add filter information
  doc.setFontSize(12);
  doc.text(`Filter: ${filter}`, 14, 32);

  // Add date
  const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  doc.text(`Generated on: ${date}`, 14, 42);

  // Add balance
  doc.text(`Current Balance: ₹${balance.toFixed(2)}`, 14, 52);

  // Add transactions table
  const tableColumn = ["Date", "Title", "Amount", "Type", "Payment Mode"];
  const tableRows = transactions.map((transaction) => [
    format(new Date(transaction.date), "yyyy-MM-dd"),
    transaction.title,
    `₹${transaction.amount.toFixed(2)}`,
    transaction.type,
    transaction.paymentMode,
  ]);

  doc.autoTable({
    startY: 60,
    head: [tableColumn],
    body: tableRows,
  });

  // Save the PDF
  doc.save("expense_report.pdf");
};
