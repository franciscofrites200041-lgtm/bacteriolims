import { NextResponse } from "next/server";
import { labStore } from "@/lib/data-store";

export async function GET() {
    const labs = labStore.findMany();
    return NextResponse.json({ labs });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const lab = labStore.create(body);
        return NextResponse.json({ lab }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Error al crear laboratorio" }, { status: 400 });
    }
}
