"use client";

import { mockLabStats, mockSamples } from "@/lib/mock-data";
import { formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";
import { FlaskConical, Clock, CheckCircle2, AlertCircle, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LabDashboardPage() {
    const labSamples = mockSamples.filter((s) => s.labName === "Lab Central SRL");

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-clinical-900 tracking-tight">Panel de Seguimiento</h1>
                <p className="text-clinical-500 text-sm mt-1">Laboratorio Central SRL · Estado de muestras derivadas</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="stat-card">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                        <FlaskConical className="w-4.5 h-4.5 text-blue-600" />
                    </div>
                    <p className="text-xl font-bold text-clinical-900">{mockLabStats.totalSamples}</p>
                    <p className="text-xs text-clinical-500 mt-1 font-medium">Total Muestras</p>
                </div>
                <div className="stat-card">
                    <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center mb-3">
                        <Clock className="w-4.5 h-4.5 text-amber-600" />
                    </div>
                    <p className="text-xl font-bold text-clinical-900">{mockLabStats.pendingReception}</p>
                    <p className="text-xs text-clinical-500 mt-1 font-medium">Pend. Recepción</p>
                </div>
                <div className="stat-card">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                        <AlertCircle className="w-4.5 h-4.5 text-blue-600" />
                    </div>
                    <p className="text-xl font-bold text-clinical-900">{mockLabStats.inProcess}</p>
                    <p className="text-xs text-clinical-500 mt-1 font-medium">En Proceso</p>
                </div>
                <div className="stat-card">
                    <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                    </div>
                    <p className="text-xl font-bold text-clinical-900">{mockLabStats.finalized}</p>
                    <p className="text-xs text-clinical-500 mt-1 font-medium">Finalizados</p>
                </div>
            </div>

            {/* Debt Banner */}
            {mockLabStats.currentDebt > 0 && (
                <div className="card-clinical p-5 flex items-center justify-between bg-gradient-to-r from-amber-50 to-white border-amber-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-clinical-800">Saldo pendiente</p>
                            <p className="text-xl font-bold text-amber-700 tabular-nums">{formatCurrency(mockLabStats.currentDebt)}</p>
                        </div>
                    </div>
                    <Link href="/lab/payments" className="btn btn-primary btn-sm">
                        Ir a Pagos <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            )}

            {/* Samples Grid / Kanban-style */}
            <div className="card-clinical overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-clinical-100">
                    <h2 className="text-sm font-semibold text-clinical-800 flex items-center gap-2">
                        <FlaskConical className="w-4 h-4 text-clinical-500" /> Muestras Derivadas
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Estado</th>
                                <th>Paciente</th>
                                <th>Tipo</th>
                                <th>Fecha</th>
                                <th>Informe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {labSamples.map((sample) => (
                                <tr key={sample.id}>
                                    <td><span className="font-mono text-xs font-semibold text-corp-600">{sample.sampleCode}</span></td>
                                    <td>
                                        <span className={`status-badge ${getStatusColor(sample.status)}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${sample.status === "IN_PROCESS" ? "bg-blue-500 animate-pulse-gentle" : sample.status === "PENDING_RECEPTION" ? "bg-amber-500" : "bg-emerald-500"}`} />
                                            {getStatusLabel(sample.status)}
                                        </span>
                                    </td>
                                    <td className="font-medium">{sample.patientInitials}</td>
                                    <td className="text-clinical-500 text-xs">{sample.sampleType.replace(/_/g, " ")}</td>
                                    <td className="text-xs tabular-nums text-clinical-500">{new Date(sample.createdAt).toLocaleDateString("es-AR")}</td>
                                    <td>
                                        {sample.status === "REPORT_FINALIZED" ? (
                                            <button className="btn btn-ghost btn-sm text-xs text-corp-600">
                                                <FileText className="w-3.5 h-3.5" /> Descargar PDF
                                            </button>
                                        ) : (
                                            <span className="text-xs text-clinical-400">—</span>
                                        )}
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
