import { NextRequest, NextResponse } from "next/server";
import { paymentStore } from "@/lib/data-store";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();

    const payment = paymentStore.update(id, {
        status: body.status,
        reviewedAt: new Date().toISOString(),
        reviewedBy: body.reviewedBy || "Admin",
    });

    if (!payment) {
        return NextResponse.json({ error: "Pago no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ payment });
}
