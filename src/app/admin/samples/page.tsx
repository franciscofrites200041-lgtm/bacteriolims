"use client";

import { useState } from "react";
import { mockSamples } from "@/lib/mock-data";
import { getStatusColor, getStatusLabel } from "@/lib/utils";
import { FlaskConical, Search, Filter, ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const STATUS_FILTERS = [
    { value: "", label: "Todos" },
    { value: "PENDING_RECEPTION", label: "Pendiente" },
    { value: "IN_PROCESS", label: "En Proceso" },
    { value: "REPORT_FINALIZED", label: "Finalizado" },
];

export default function AdminSamplesPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const filtered = mockSamples.filter((s) => {
        const matchSearch =
            !search ||
            s.sampleCode.toLowerCase().includes(search.toLowerCase()) ||
            s.patientInitials.toLowerCase().includes(search.toLowerCase()) ||
            s.labName.toLowerCase().includes(search.toLowerCase());
        const matchStatus = !statusFilter || s.status === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-clinical-900 tracking-tight">Muestras</h1>
                    <p className="text-clinical-500 text-sm mt-1">Listado general de muestras bacteriológicas</p>
                </div>
                <Link href="/admin/samples/new" className="btn btn-primary">
                    <FlaskConical className="w-4 h-4" /> Nueva Carga
                </Link>
            </div>

            {/* Filters */}
            <div className="card-clinical p-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 text-clinical-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-input pl-9"
                        placeholder="Buscar por código, paciente o laboratorio..."
                    />
                </div>
                <div className="flex gap-1.5">
                    {STATUS_FILTERS.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setStatusFilter(f.value)}
                            className={cn(
                                "px-3 py-2 rounded-lg text-xs font-semibold transition-colors border",
                                statusFilter === f.value
                                    ? "bg-corp-50 text-corp-700 border-corp-200"
                                    : "bg-white text-clinical-500 border-clinical-200 hover:bg-clinical-50"
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="card-clinical overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Estado</th>
                                <th>Paciente</th>
                                <th>Tipo de Muestra</th>
                                <th>Laboratorio</th>
                                <th>Fecha Ingreso</th>
                                <th>Finalizado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((sample) => (
                                <tr key={sample.id}>
                                    <td>
                                        <span className="font-mono text-xs font-semibold text-corp-600">
                                            {sample.sampleCode}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${getStatusColor(sample.status)}`}>
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${sample.status === "IN_PROCESS"
                                                        ? "bg-blue-500 animate-pulse-gentle"
                                                        : sample.status === "PENDING_RECEPTION"
                                                            ? "bg-amber-500"
                                                            : "bg-emerald-500"
                                                    }`}
                                            />
                                            {getStatusLabel(sample.status)}
                                        </span>
                                    </td>
                                    <td className="font-medium">{sample.patientInitials}</td>
                                    <td className="text-clinical-500 text-xs">
                                        {sample.sampleType.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                                    </td>
                                    <td className="text-sm">{sample.labName}</td>
                                    <td className="text-xs tabular-nums text-clinical-500">
                                        {new Date(sample.createdAt).toLocaleDateString("es-AR")}
                                    </td>
                                    <td className="text-xs tabular-nums text-clinical-500">
                                        {sample.completedAt
                                            ? new Date(sample.completedAt).toLocaleDateString("es-AR")
                                            : "—"}
                                    </td>
                                    <td>
                                        <button className="btn btn-ghost btn-sm">
                                            <Eye className="w-3.5 h-3.5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="text-center py-10 text-clinical-400 text-sm">
                                        No se encontraron muestras con los filtros aplicados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
