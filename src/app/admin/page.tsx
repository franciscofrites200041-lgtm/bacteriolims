"use client";

import { useState } from "react";
import { mockAdminStats, mockSamples } from "@/lib/mock-data";
import { formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";
import {
    FlaskConical,
    TrendingUp,
    DollarSign,
    Clock,
    AlertCircle,
    Building2,
    ArrowUpRight,
    ArrowRight,
    BarChart3,
    Activity,
} from "lucide-react";
import Link from "next/link";

const stats = mockAdminStats;

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-clinical-900 tracking-tight">
                        Panel de Control
                    </h1>
                    <p className="text-clinical-500 text-sm mt-1">
                        Resumen operativo · Febrero 2026
                    </p>
                </div>
                <Link
                    href="/admin/samples/new"
                    className="btn btn-primary group"
                >
                    <FlaskConical className="w-4 h-4" />
                    Nueva Carga
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Muestras del Mes"
                    value={stats.totalSamplesMonth.toString()}
                    subtext={`${stats.samplesInProcess} en proceso`}
                    icon={FlaskConical}
                    color="blue"
                />
                <StatCard
                    label="Informes Finalizados"
                    value={stats.reportsFinalized.toString()}
                    subtext={`${Math.round((stats.reportsFinalized / stats.totalSamplesMonth) * 100)}% completado`}
                    icon={Activity}
                    color="emerald"
                />
                <StatCard
                    label="Ingresos del Mes"
                    value={formatCurrency(stats.monthlyRevenue)}
                    subtext="+12.4% vs. mes anterior"
                    icon={TrendingUp}
                    color="green"
                    trend="up"
                />
                <StatCard
                    label="Cuentas por Cobrar"
                    value={formatCurrency(stats.accountsReceivable)}
                    subtext={`${stats.pendingPayments} pagos pendientes`}
                    icon={DollarSign}
                    color="amber"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-3 card-clinical p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-sm font-semibold text-clinical-800">
                                Evolución de Ingresos
                            </h2>
                            <p className="text-xs text-clinical-400 mt-0.5">
                                Últimos 6 meses · ARS
                            </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            +12.4%
                        </div>
                    </div>
                    <div className="h-[200px] flex items-end gap-3">
                        {stats.revenueByMonth.map((item, i) => {
                            const maxRevenue = Math.max(...stats.revenueByMonth.map((r) => r.revenue));
                            const height = (item.revenue / maxRevenue) * 100;
                            const isLast = i === stats.revenueByMonth.length - 1;
                            return (
                                <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                                    <span className="text-[10px] font-semibold text-clinical-500">
                                        {formatCurrency(item.revenue / 1000000)}M
                                    </span>
                                    <div className="w-full relative">
                                        <div
                                            className={`w-full rounded-t-lg transition-all duration-500 ${isLast
                                                    ? "bg-gradient-to-t from-corp-600 to-corp-400"
                                                    : "bg-clinical-200 hover:bg-clinical-300"
                                                }`}
                                            style={{
                                                height: `${height * 1.6}px`,
                                                animationDelay: `${i * 80}ms`,
                                            }}
                                        />
                                    </div>
                                    <span className={`text-[11px] font-medium ${isLast ? "text-corp-600 font-semibold" : "text-clinical-400"}`}>
                                        {item.month}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Samples by Lab */}
                <div className="lg:col-span-2 card-clinical p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-sm font-semibold text-clinical-800">
                                Volumen por Laboratorio
                            </h2>
                            <p className="text-xs text-clinical-400 mt-0.5">
                                Mes actual
                            </p>
                        </div>
                        <BarChart3 className="w-4 h-4 text-clinical-400" />
                    </div>
                    <div className="space-y-3.5">
                        {stats.samplesByLab.map((lab, i) => {
                            const maxCount = Math.max(...stats.samplesByLab.map((l) => l.count));
                            const width = (lab.count / maxCount) * 100;
                            return (
                                <div key={lab.labName}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-xs font-medium text-clinical-700 truncate mr-2">
                                            {lab.labName}
                                        </span>
                                        <span className="text-xs font-bold text-clinical-800 tabular-nums">
                                            {lab.count}
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-clinical-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-700 ease-out"
                                            style={{
                                                width: `${width}%`,
                                                background: `linear-gradient(90deg, ${["#2563eb", "#0891b2", "#059669", "#7c3aed", "#d97706"][i]
                                                    }, ${["#3b82f6", "#06b6d4", "#10b981", "#8b5cf6", "#f59e0b"][i]
                                                    })`,
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Recent Samples Table */}
            <div className="card-clinical overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-clinical-100">
                    <div className="flex items-center gap-2">
                        <FlaskConical className="w-4 h-4 text-clinical-500" />
                        <h2 className="text-sm font-semibold text-clinical-800">
                            Muestras Recientes
                        </h2>
                    </div>
                    <Link
                        href="/admin/samples"
                        className="text-xs font-semibold text-corp-600 hover:text-corp-700 flex items-center gap-1 transition-colors"
                    >
                        Ver todas
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Estado</th>
                                <th>Paciente</th>
                                <th>Tipo de Muestra</th>
                                <th>Laboratorio</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockSamples.slice(0, 6).map((sample) => (
                                <tr key={sample.id}>
                                    <td>
                                        <span className="font-mono text-xs font-semibold text-corp-600">
                                            {sample.sampleCode}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${getStatusColor(sample.status)}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${sample.status === "IN_PROCESS" ? "bg-blue-500 animate-pulse-gentle" :
                                                    sample.status === "PENDING_RECEPTION" ? "bg-amber-500" :
                                                        "bg-emerald-500"
                                                }`} />
                                            {getStatusLabel(sample.status)}
                                        </span>
                                    </td>
                                    <td className="font-medium">{sample.patientInitials}</td>
                                    <td className="text-clinical-500">
                                        {sample.sampleType.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                                    </td>
                                    <td>
                                        <span className="text-xs font-medium">{sample.labName}</span>
                                    </td>
                                    <td className="text-clinical-500 text-xs tabular-nums">
                                        {new Date(sample.createdAt).toLocaleDateString("es-AR")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Stat Card Component
function StatCard({
    label,
    value,
    subtext,
    icon: Icon,
    color,
    trend,
}: {
    label: string;
    value: string;
    subtext: string;
    icon: React.ElementType;
    color: string;
    trend?: "up" | "down";
}) {
    const colorMap: Record<string, { bg: string; icon: string; badge: string }> = {
        blue: { bg: "bg-blue-50", icon: "text-blue-600", badge: "bg-blue-100" },
        emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", badge: "bg-emerald-100" },
        green: { bg: "bg-emerald-50", icon: "text-emerald-600", badge: "bg-emerald-100" },
        amber: { bg: "bg-amber-50", icon: "text-amber-600", badge: "bg-amber-100" },
    };
    const colors = colorMap[color] || colorMap.blue;

    return (
        <div className="stat-card">
            <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 ${colors.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-4.5 h-4.5 ${colors.icon}`} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-0.5 text-[10px] font-bold ${trend === "up" ? "text-emerald-600" : "text-red-600"
                        }`}>
                        <ArrowUpRight className={`w-3 h-3 ${trend === "down" ? "rotate-90" : ""}`} />
                        12.4%
                    </div>
                )}
            </div>
            <p className="text-xl font-bold text-clinical-900 tracking-tight leading-none">
                {value}
            </p>
            <p className="text-xs text-clinical-500 mt-1.5 font-medium">{label}</p>
            <p className="text-[11px] text-clinical-400 mt-0.5">{subtext}</p>
        </div>
    );
}
