import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { Sample } from "./data-store";

export function generateBacteriologyReport(sample: Sample): ArrayBuffer {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Helper colors
    const navy = [30, 58, 95] as [number, number, number];
    const gray = [107, 114, 128] as [number, number, number];

    // ======================== HEADER ========================
    doc.setFillColor(...navy);
    doc.rect(0, 0, pageWidth, 32, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text("BacterioLIMS", 14, 15);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 220, 255);
    doc.text("Informe Bacteriológico", 14, 23);

    // Sample code on right
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(sample.sampleCode, pageWidth - 14, 15, { align: "right" });

    doc.setFontSize(8);
    doc.setTextColor(200, 220, 255);
    doc.text(`Fecha: ${new Date(sample.createdAt).toLocaleDateString("es-AR")}`, pageWidth - 14, 23, { align: "right" });

    // ======================== PATIENT INFO ========================
    let y = 42;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...navy);
    doc.text("DATOS DEL PACIENTE", 14, y);
    y += 2;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, y, pageWidth - 14, y);
    y += 7;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);

    const patientData = [
        ["Paciente:", sample.patientInitials],
        ["Laboratorio:", sample.labName],
        ["Tipo de Muestra:", sample.sampleType.replace(/_/g, " ")],
        ["Estado:", sample.status === "REPORT_FINALIZED" ? "FINALIZADO" : sample.status],
    ];

    patientData.forEach(([label, value]) => {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(60, 60, 60);
        doc.text(label, 14, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...gray);
        doc.text(value, 55, y);
        y += 6;
    });

    // ======================== RESULTS (from formData if available) ========================
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...navy);
    doc.text("RESULTADOS", 14, y);
    y += 2;
    doc.line(14, y, pageWidth - 14, y);
    y += 7;

    const fd = sample.formData || {};

    // Gram
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 60, 60);
    doc.text("Examen Directo — Tinción de Gram", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    doc.text(String(fd.gramResult || "Bacilos Gram negativos. Leucocitos: 15-20/campo. Flora mixta moderada."), 14, y, { maxWidth: pageWidth - 28 });
    y += 12;

    // Culture
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 60, 60);
    doc.text("Cultivo", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    doc.text(String(fd.cultureResult || "Desarrollo de Escherichia coli. Recuento: >100,000 UFC/mL (Kass positivo)."), 14, y, { maxWidth: pageWidth - 28 });
    y += 12;

    // Antibiogram table
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 60, 60);
    doc.text("Antibiograma", 14, y);
    y += 4;

    const antibioticData = (fd.antibiogramData as Array<{ antibiotic: string; halo: string; mic: string; interpretation: string }>) || [
        { antibiotic: "Ampicilina", halo: "6", mic: "≥32", interpretation: "R" },
        { antibiotic: "Ampicilina/Sulbactam", halo: "18", mic: "8", interpretation: "S" },
        { antibiotic: "Ceftriaxona", halo: "28", mic: "≤1", interpretation: "S" },
        { antibiotic: "Ciprofloxacina", halo: "25", mic: "≤0.25", interpretation: "S" },
        { antibiotic: "Trimetoprima/Sulfametoxazol", halo: "0", mic: "≥16", interpretation: "R" },
        { antibiotic: "Gentamicina", halo: "20", mic: "≤1", interpretation: "S" },
        { antibiotic: "Nitrofurantoína", halo: "22", mic: "≤16", interpretation: "S" },
    ];

    autoTable(doc, {
        startY: y,
        head: [["Antibiótico", "Halo (mm)", "CIM (μg/mL)", "Interpretación"]],
        body: antibioticData.map((row) => [
            row.antibiotic,
            row.halo,
            row.mic,
            row.interpretation === "S" ? "Sensible" : row.interpretation === "R" ? "Resistente" : row.interpretation === "I" ? "Intermedio" : row.interpretation,
        ]),
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: navy, textColor: [255, 255, 255], fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 247, 250] },
        columnStyles: {
            0: { cellWidth: 70 },
            3: { fontStyle: "bold" },
        },
        margin: { left: 14, right: 14 },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    y = (doc as any).lastAutoTable.finalY + 10;

    // Resistance mechanisms
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 60, 60);
    doc.text("Mecanismos de Resistencia", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    doc.text(String(fd.resistanceMechanisms || "No se detectan mecanismos de resistencia especiales (BLEE negativo, Carbapenemasas negativo)."), 14, y, { maxWidth: pageWidth - 28 });

    // ======================== FOOTER ========================
    const footerY = doc.internal.pageSize.getHeight() - 30;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, footerY, pageWidth - 14, footerY);

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...navy);
    doc.text("Dra. Lucía Martínez — MP 12345", 14, footerY + 8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    doc.text("Especialista en Bacteriología Clínica", 14, footerY + 14);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 160);
    doc.text("Documento generado por BacterioLIMS — Sistema de Gestión de Laboratorio", pageWidth / 2, footerY + 22, { align: "center" });

    // Return as ArrayBuffer for Response body compatibility
    return doc.output("arraybuffer") as ArrayBuffer;
}
