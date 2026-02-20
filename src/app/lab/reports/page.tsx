"use client";

import { mockSamples } from "@/lib/mock-data";
import { getStatusColor, getStatusLabel } from "@/lib/utils";
import { FileText, Download, Eye, Search } from "lucide-react";
import { useState } from "react";

export default function LabReportsPage() {
    const [search, setSearch] = useState("");
    const finalized = mockSamples.filter((s) => s.labName === "Lab Central SRL" && s.status === "REPORT_FINALIZED");

    const filtered = finalized.filter(
        (s) => !search || s.sampleCode.toLowerCase().includes(search.toLowerCase()) || s.patientInitials.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-clinical-900 tracking-tight">Informes Bacteriológicos</h1>
                <p className="text-clinical-500 text-sm mt-1">Informes finalizados disponibles para descarga</p>
            </div>

            <div className="card-clinical p-4">
                <div className="relative">
                    <Search className="w-4 h-4 text-clinical-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="form-input pl-9" placeholder="Buscar por código o paciente..." />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((sample) => (
                    <div key={sample.id} className="card-clinical p-5">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
                                <FileText className="w-5 h-5 text-emerald-600" />
                            </div>
                            <span className={`status-badge ${getStatusColor(sample.status)}`}>
                                {getStatusLabel(sample.status)}
                            </span>
                        </div>

                        <h3 className="font-mono text-sm font-bold text-corp-600">{sample.sampleCode}</h3>
                        <p className="text-xs text-clinical-500 mt-1">Paciente: <span className="font-semibold text-clinical-700">{sample.patientInitials}</span></p>
                        <p className="text-xs text-clinical-500">Tipo: {sample.sampleType.replace(/_/g, " ")}</p>
                        <p className="text-xs text-clinical-400 mt-1">
                            Finalizado: {sample.completedAt ? new Date(sample.completedAt).toLocaleDateString("es-AR") : "—"}
                        </p>

                        <div className="flex gap-2 mt-4 pt-3 border-t border-clinical-100">
                            <button className="btn btn-secondary btn-sm flex-1 text-xs">
                                <Eye className="w-3 h-3" /> Ver
                            </button>
                            <button className="btn btn-primary btn-sm flex-1 text-xs">
                                <Download className="w-3 h-3" /> PDF
                            </button>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="col-span-full text-center py-16 text-clinical-400">
                        <FileText className="w-8 h-8 mx-auto mb-3 opacity-40" />
                        <p className="text-sm font-medium">No hay informes disponibles</p>
                    </div>
                )}
            </div>
        </div>
    );
}
