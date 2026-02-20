"use client";

import { mockSamples } from "@/lib/mock-data";
import { getStatusColor, getStatusLabel } from "@/lib/utils";
import { useState } from "react";
import { Search, FlaskConical, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_FILTERS = [
    { value: "", label: "Todos" },
    { value: "PENDING_RECEPTION", label: "Pendiente" },
    { value: "IN_PROCESS", label: "En Proceso" },
    { value: "REPORT_FINALIZED", label: "Finalizado" },
];

export default function LabSamplesPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const labSamples = mockSamples.filter((s) => s.labName === "Lab Central SRL");

    const filtered = labSamples.filter((s) => {
        const matchSearch = !search || s.sampleCode.toLowerCase().includes(search.toLowerCase()) || s.patientInitials.toLowerCase().includes(search.toLowerCase());
        const matchStatus = !statusFilter || s.status === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-clinical-900 tracking-tight">Mis Muestras</h1>
                <p className="text-clinical-500 text-sm mt-1">Historial completo de muestras derivadas</p>
            </div>

            <div className="card-clinical p-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 text-clinical-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="form-input pl-9" placeholder="Buscar por código o paciente..." />
                </div>
                <div className="flex gap-1.5">
                    {STATUS_FILTERS.map((f) => (
                        <button key={f.value} onClick={() => setStatusFilter(f.value)}
                            className={cn("px-3 py-2 rounded-lg text-xs font-semibold transition-colors border", statusFilter === f.value ? "bg-corp-50 text-corp-700 border-corp-200" : "bg-white text-clinical-500 border-clinical-200 hover:bg-clinical-50")}>
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="card-clinical overflow-hidden">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Estado</th>
                            <th>Paciente</th>
                            <th>Tipo</th>
                            <th>Fecha</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((s) => (
                            <tr key={s.id}>
                                <td><span className="font-mono text-xs font-semibold text-corp-600">{s.sampleCode}</span></td>
                                <td>
                                    <span className={`status-badge ${getStatusColor(s.status)}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${s.status === "IN_PROCESS" ? "bg-blue-500 animate-pulse-gentle" : s.status === "PENDING_RECEPTION" ? "bg-amber-500" : "bg-emerald-500"}`} />
                                        {getStatusLabel(s.status)}
                                    </span>
                                </td>
                                <td className="font-medium">{s.patientInitials}</td>
                                <td className="text-xs text-clinical-500">{s.sampleType.replace(/_/g, " ")}</td>
                                <td className="text-xs tabular-nums text-clinical-500">{new Date(s.createdAt).toLocaleDateString("es-AR")}</td>
                                <td><button className="btn btn-ghost btn-sm"><Eye className="w-3.5 h-3.5" /></button></td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr><td colSpan={6} className="text-center py-10 text-clinical-400 text-sm">No se encontraron muestras</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
