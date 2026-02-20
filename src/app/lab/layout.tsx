"use client";

import Sidebar from "@/components/layout/Sidebar";
import { useAuthStore } from "@/lib/store";
import { useEffect } from "react";
import { mockLabUser } from "@/lib/mock-data";

export default function LabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuthStore();

    // Auto-login as lab client for demo purposes
    useEffect(() => {
        if (!isAuthenticated) {
            useAuthStore.setState({ user: mockLabUser, isAuthenticated: true });
        }
    }, [isAuthenticated]);

    return (
        <div className="min-h-screen bg-clinical-50">
            <Sidebar role="LAB_CLIENT" />
            <main className="lg:ml-[260px] min-h-screen">
                <div className="p-4 sm:p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}
