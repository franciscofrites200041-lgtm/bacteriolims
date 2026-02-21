"use client";

import Sidebar from "@/components/layout/Sidebar";
import { useAuthStore } from "@/lib/store";
import { useEffect } from "react";
import { mockAdminUser } from "@/lib/mock-data";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isAuthenticated } = useAuthStore();

    // Auto-login as admin for demo purposes
    useEffect(() => {
        if (!isAuthenticated) {
            useAuthStore.setState({ user: mockAdminUser, isAuthenticated: true });
        }
    }, [isAuthenticated]);

    return (
        <div className="min-h-screen bg-clinical-50">
            <Sidebar role="ADMIN" />
            <main className="lg:ml-[260px] min-h-screen">
                <div className="pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}
