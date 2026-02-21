import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "bacteriolims-dev-secret-key-change-in-production"
);

const COOKIE_NAME = "bacteriolims-session";

async function verifyAuth(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as unknown as { userId: string; role: string };
    } catch {
        return null;
    }
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public routes — no auth needed
    if (
        pathname === "/" ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon")
    ) {
        return NextResponse.next();
    }

    const token = request.cookies.get(COOKIE_NAME)?.value;

    // No token → redirect to login
    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const session = await verifyAuth(token);
    if (!session) {
        // Invalid/expired token → clear cookie and redirect
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete(COOKIE_NAME);
        return response;
    }

    // Role-based access control
    if (pathname.startsWith("/admin") && session.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/lab", request.url));
    }
    if (pathname.startsWith("/lab") && session.role !== "LAB_CLIENT") {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/lab/:path*", "/api/samples/:path*", "/api/labs/:path*", "/api/invoices/:path*", "/api/payments/:path*", "/api/reports/:path*"],
};
