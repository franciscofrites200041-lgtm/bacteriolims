import { NextRequest, NextResponse } from "next/server";
import { invoiceStore } from "@/lib/data-store";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const labId = searchParams.get("labId") || undefined;
    const status = searchParams.get("status") || undefined;
    const invoices = invoiceStore.findMany({ labId, status });
    return NextResponse.json({ invoices });
}
