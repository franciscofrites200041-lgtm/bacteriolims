import { NextRequest, NextResponse } from "next/server";
import { nbuStore } from "@/lib/data-store";

export async function GET() {
    const codes = nbuStore.findMany();
    return NextResponse.json({ codes });
}

export async function PATCH(request: NextRequest) {
    const body = await request.json();

    // Bulk price adjustment
    if (body.bulkPercentage !== undefined) {
        const codes = nbuStore.bulkUpdate(body.bulkPercentage);
        return NextResponse.json({ codes });
    }

    // Single code update
    if (body.code && body.price !== undefined) {
        const code = nbuStore.update(body.code, { price: body.price });
        if (!code) return NextResponse.json({ error: "Código no encontrado" }, { status: 404 });
        return NextResponse.json({ code });
    }

    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
}
