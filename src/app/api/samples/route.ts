import { NextRequest, NextResponse } from "next/server";
import { sampleStore } from "@/lib/data-store";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const labName = searchParams.get("labName") || undefined;
    const status = searchParams.get("status") || undefined;
    const samples = sampleStore.findMany({ labName, status });
    return NextResponse.json({ samples });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const sample = sampleStore.create(body);
        return NextResponse.json({ sample }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Error al crear muestra" }, { status: 400 });
    }
}
