import jsPDF from "jspdf";

type BreakdownItem = {
  label: string;
  points: number;
};

type PDFExportData = {
  totalPoints: number;
  passMark: number;
  breakdown: BreakdownItem[];
  visaEligibility: {
    visa: string;
    label: string;
    status: string;
    typical: number;
  }[];
};

export async function generatePointsPDF(data: PDFExportData) {
  const { totalPoints, passMark, breakdown, visaEligibility } = data;
  const passed = totalPoints >= passMark;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Colors
  const navy = [15, 23, 42];       // dark bg
  const teal = [45, 212, 191];     // accent
  const white = [255, 255, 255];
  const gray = [148, 163, 184];
  const rose = [251, 113, 133];

  // ===== Header banner =====
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, pageWidth, 52, "F");

  // Teal accent line
  doc.setFillColor(teal[0], teal[1], teal[2]);
  doc.rect(0, 52, pageWidth, 2, "F");

  // Brand name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(white[0], white[1], white[2]);
  doc.text("AusVisa Guide", 15, 22);

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(gray[0], gray[1], gray[2]);
  doc.text("SkillSelect Points Test — Score Report", 15, 30);

  // Date
  const dateStr = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  doc.setFontSize(9);
  doc.text(`Generated: ${dateStr}`, 15, 38);

  // Score badge (right aligned)
  const badgeX = pageWidth - 50;
  const scoreColor = passed ? teal : rose;
  doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.roundedRect(badgeX, 12, 35, 30, 4, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text(String(totalPoints), badgeX + 17.5, 30, { align: "center" });
  doc.setFontSize(8);
  doc.text("POINTS", badgeX + 17.5, 37, { align: "center" });

  // ===== Result Status =====
  let y = 64;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const [statusR, statusG, statusB] = passed ? teal : rose;
  doc.setTextColor(statusR, statusG, statusB);
  const statusText = passed
    ? `✓ You meet the pass mark of ${passMark} points!`
    : `✗ You need ${passMark - totalPoints} more points to reach the pass mark.`;
  doc.text(statusText, 15, y);

  // ===== Visa Eligibility Section =====
  y += 14;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(white[0], white[1], white[2]);
  doc.setFillColor(navy[0], navy[1], navy[2]);

  // Section header
  doc.setTextColor(30, 41, 59);
  doc.text("Visa Eligibility", 15, y);
  y += 8;

  visaEligibility.forEach((visa) => {
    // Card background
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(15, y - 4, pageWidth - 30, 18, 2, 2, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text(`Subclass ${visa.visa} — ${visa.label}`, 20, y + 3);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    let statusColor: number[];
    if (visa.status.includes("Competitive")) statusColor = [16, 185, 129];
    else if (visa.status.includes("Eligible")) statusColor = [245, 158, 11];
    else statusColor = [239, 68, 68];
    doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
    doc.text(visa.status, 20, y + 10);

    doc.setTextColor(148, 163, 184);
    doc.text(`Typical invite: ${visa.typical}+ pts`, pageWidth - 65, y + 10);

    y += 22;
  });

  // ===== Points Breakdown Table =====
  y += 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text("Points Breakdown", 15, y);
  y += 8;

  // Table header
  doc.setFillColor(teal[0], teal[1], teal[2]);
  doc.rect(15, y - 4, pageWidth - 30, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text("Category", 20, y + 1);
  doc.text("Points", pageWidth - 35, y + 1, { align: "right" });
  y += 8;

  // Table rows
  breakdown.forEach((item, i) => {
    if (i % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(15, y - 4, pageWidth - 30, 8, "F");
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(item.label, 20, y + 1);

    doc.setFont("helvetica", "bold");
    const [pR, pG, pB] = item.points > 0 ? [16, 185, 129] : [148, 163, 184];
    doc.setTextColor(pR, pG, pB);
    doc.text(`+${item.points}`, pageWidth - 35, y + 1, { align: "right" });
    y += 8;
  });

  // Total row
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(15, y - 4, pageWidth - 30, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(white[0], white[1], white[2]);
  doc.text("Total", 20, y + 2);
  doc.setTextColor(teal[0], teal[1], teal[2]);
  doc.text(`${totalPoints} points`, pageWidth - 35, y + 2, { align: "right" });

  // ===== Footer =====
  y = doc.internal.pageSize.getHeight() - 20;
  doc.setDrawColor(226, 232, 240);
  doc.line(15, y, pageWidth - 15, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Disclaimer: This is an indicative score only. The Department of Home Affairs (DHA) makes the final determination.",
    15,
    y
  );
  doc.text(
    "Always verify with official sources or a Registered Migration Agent (RMA).",
    15,
    y + 4
  );
  doc.text("© AusVisa Guide — ausvisa.guide", pageWidth - 15, y, {
    align: "right",
  });

  // Save
  doc.save(`AusVisa_Points_Score_${totalPoints}pts.pdf`);
}
