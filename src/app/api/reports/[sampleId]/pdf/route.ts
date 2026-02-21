import { NextRequest, NextResponse } from "next/server";
import { sampleStore } from "@/lib/data-store";
import { generateBacteriologyReport } from "@/lib/pdf-generator";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ sampleId: string }> }
) {
    const { sampleId } = await params;
    const sample = sampleStore.findById(sampleId);

    if (!sample) {
        return NextResponse.json({ error: "Muestra no encontrada" }, { status: 404 });
    }

    const pdfArrayBuffer = generateBacteriologyReport(sample);

    return new Response(pdfArrayBuffer, {
        status: 200,
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename="${sample.sampleCode}-informe.pdf"`,
        },
    });
}
