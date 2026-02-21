"use client";

import Sidebar from "@/components/layout/Sidebar";
import { useAuthStore } from "@/lib/store";
import { useEffect } from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { checkSession, isAuthenticated, isLoading } = useAuthStore();

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-clinical-50 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-corp-200 border-t-corp-600 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-clinical-50">
            <Sidebar role="ADMIN" />
            <main className="lg:ml-[260px] min-h-screen">
                <div className="pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}
