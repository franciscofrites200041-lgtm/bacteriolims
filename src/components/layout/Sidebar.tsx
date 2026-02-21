"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FlaskConical,
    Building2,
    BookOpen,
    CreditCard,
    FileCheck,
    LogOut,
    Menu,
    X,
    Microscope,
    ChevronDown,
    Settings,
} from "lucide-react";
import { useAuthStore } from "@/lib/store";

interface SidebarProps {
    role: "ADMIN" | "LAB_CLIENT";
}

const adminNavItems = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        label: "Carga Bacteriológica",
        href: "/admin/samples/new",
        icon: FlaskConical,
    },
    {
        label: "Muestras",
        href: "/admin/samples",
        icon: Microscope,
    },
    {
        label: "Laboratorios",
        href: "/admin/labs",
        icon: Building2,
    },
    {
        label: "Nomenclador NBU",
        href: "/admin/nomenclator",
        icon: BookOpen,
    },
    {
        label: "Facturación",
        href: "/admin/billing",
        icon: CreditCard,
    },
    {
        label: "Auditoría de Pagos",
        href: "/admin/payments",
        icon: FileCheck,
    },
];

const labNavItems = [
    {
        label: "Seguimiento",
        href: "/lab",
        icon: LayoutDashboard,
    },
    {
        label: "Mis Muestras",
        href: "/lab/samples",
        icon: FlaskConical,
    },
    {
        label: "Informes",
        href: "/lab/reports",
        icon: FileCheck,
    },
    {
        label: "Finanzas y Pagos",
        href: "/lab/payments",
        icon: CreditCard,
    },
];

export default function Sidebar({ role }: SidebarProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuthStore();
    const navItems = role === "ADMIN" ? adminNavItems : labNavItems;

    const isActive = (href: string) => {
        if (href === "/admin" || href === "/lab") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const handleLogout = () => {
        logout();
        if (typeof window !== "undefined") {
            window.location.href = "/";
        }
    };

    return (
        <>
            {/* Mobile top bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-30 h-14 bg-white border-b border-clinical-200 flex items-center justify-between px-4"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-clinical-100 transition-colors"
                    aria-label="Abrir menú"
                >
                    <Menu className="w-5 h-5 text-clinical-600" />
                </button>
                <Link href={role === "ADMIN" ? "/admin" : "/lab"} className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gradient-to-br from-[#1e3a5f] to-[#2563eb] rounded-md flex items-center justify-center">
                        <Microscope className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-clinical-800 font-bold text-sm tracking-tight">BacterioLIMS</span>
                </Link>
                <div className="w-9" /> {/* Spacer for centering */}
            </div>

            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen w-[260px] bg-white border-r border-clinical-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
                style={{ boxShadow: "var(--shadow-sidebar)" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-clinical-100">
                    <Link href={role === "ADMIN" ? "/admin" : "/lab"} className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#1e3a5f] to-[#2563eb] rounded-lg flex items-center justify-center">
                            <Microscope className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <span className="text-clinical-800 font-bold text-sm tracking-tight block leading-none">
                                BacterioLIMS
                            </span>
                            <span className="text-clinical-400 text-[10px] font-medium">
                                {role === "ADMIN" ? "Panel Administrador" : "Portal Cliente"}
                            </span>
                        </div>
                    </Link>
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="lg:hidden w-8 h-8 rounded-lg hover:bg-clinical-100 flex items-center justify-center transition-colors"
                    >
                        <X className="w-4 h-4 text-clinical-500" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-3 py-4">
                    <div className="space-y-0.5">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={cn("sidebar-nav-item", isActive(item.href) && "active")}
                            >
                                <item.icon className="w-[18px] h-[18px]" />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {role === "ADMIN" && (
                        <div className="mt-6 pt-4 border-t border-clinical-100">
                            <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-clinical-400 mb-2">
                                Sistema
                            </p>
                            <Link
                                href="/admin/settings"
                                className={cn("sidebar-nav-item", isActive("/admin/settings") && "active")}
                            >
                                <Settings className="w-[18px] h-[18px]" />
                                <span>Configuración</span>
                            </Link>
                        </div>
                    )}
                </nav>

                {/* User Profile Section */}
                <div className="border-t border-clinical-100 px-3 py-3">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-corp-500 to-corp-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {user?.name?.charAt(0) || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-clinical-800 truncate leading-none">
                                {user?.name || "Usuario"}
                            </p>
                            <p className="text-[11px] text-clinical-400 truncate mt-0.5">
                                {user?.email || ""}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors group"
                            title="Cerrar sesión"
                        >
                            <LogOut className="w-4 h-4 text-clinical-400 group-hover:text-red-500 transition-colors" />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
