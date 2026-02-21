import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No se proporcionó archivo" }, { status: 400 });
        }

        // In production: upload to Vercel Blob / S3 / etc.
        // For demo: we accept the file and return a mock URL
        const filename = `receipt-${Date.now()}-${file.name}`;

        return NextResponse.json({
            success: true,
            url: `/uploads/${filename}`,
            filename: file.name,
            size: file.size,
        }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Error al subir archivo" }, { status: 500 });
    }
}
