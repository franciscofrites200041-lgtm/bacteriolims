import { NextRequest, NextResponse } from "next/server";
import { sampleStore } from "@/lib/data-store";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const sample = sampleStore.findById(id);
    if (!sample) return NextResponse.json({ error: "Muestra no encontrada" }, { status: 404 });
    return NextResponse.json({ sample });
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const sample = sampleStore.update(id, body);
    if (!sample) return NextResponse.json({ error: "Muestra no encontrada" }, { status: 404 });
    return NextResponse.json({ sample });
}
