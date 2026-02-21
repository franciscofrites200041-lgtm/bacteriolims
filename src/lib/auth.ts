import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";


const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "bacteriolims-dev-secret-key-change-in-production"
);

const COOKIE_NAME = "bacteriolims-session";

export interface JWTPayload {
    userId: string;
    email: string;
    name: string;
    role: "ADMIN" | "LAB_CLIENT";
}

export async function signToken(payload: JWTPayload): Promise<string> {
    return new SignJWT(payload as unknown as Record<string, unknown>)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as unknown as JWTPayload;
    } catch {
        return null;
    }
}

export async function getSession(): Promise<JWTPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
}

export async function createSession(payload: JWTPayload) {
    const token = await signToken(payload);
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
    });
    return token;
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

// Simple password verification (mock - in production use bcrypt with DB)
export function verifyCredentials(
    email: string,
    password: string
): JWTPayload | null {
    // Demo credentials
    const demoUsers: Record<string, { password: string; payload: JWTPayload }> = {
        "admin@bacteriolims.com": {
            password: "admin123",
            payload: {
                userId: "usr-admin-001",
                email: "admin@bacteriolims.com",
                name: "Dra. Lucía Martínez",
                role: "ADMIN",
            },
        },
        "lab@labcentral.com": {
            password: "lab123",
            payload: {
                userId: "usr-lab-001",
                email: "lab@labcentral.com",
                name: "Lab Central SRL",
                role: "LAB_CLIENT",
            },
        },
    };

    const user = demoUsers[email];
    if (!user || user.password !== password) return null;
    return user.payload;
}
