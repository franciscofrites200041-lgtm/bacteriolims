import { NextRequest, NextResponse } from "next/server";
import { paymentStore } from "@/lib/data-store";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const labId = searchParams.get("labId") || undefined;
    const status = searchParams.get("status") || undefined;
    const payments = paymentStore.findMany({ labId, status });
    return NextResponse.json({ payments });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const payment = paymentStore.create(body);
        return NextResponse.json({ payment }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Error al registrar pago" }, { status: 400 });
    }
}
