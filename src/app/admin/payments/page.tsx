"use client";

import { useState } from "react";
import { mockPayments } from "@/lib/mock-data";
import { formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";
import { FileCheck, CheckCircle2, XCircle, Eye, Clock, Image as ImageIcon, FileText, AlertTriangle } from "lucide-react";

export default function AdminPaymentsPage() {
    const [payments, setPayments] = useState(mockPayments);
    const [previewId, setPreviewId] = useState<string | null>(null);

    const handleApprove = (id: string) => {
        setPayments((prev) => prev.map((p) => p.id === id ? { ...p, status: "APPROVED" as const, reviewedAt: new Date().toISOString() } : p));
    };

    const handleReject = (id: string) => {
        setPayments((prev) => prev.map((p) => p.id === id ? { ...p, status: "REJECTED" as const, reviewedAt: new Date().toISOString() } : p));
    };

    const pendingPayments = payments.filter((p) => p.status === "PENDING_REVIEW");
    const processedPayments = payments.filter((p) => p.status !== "PENDING_REVIEW");

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-clinical-900 tracking-tight">Auditoría de Pagos</h1>
                <p className="text-clinical-500 text-sm mt-1">Revisión y aprobación de comprobantes de transferencia</p>
            </div>

            {/* Pending */}
            {pendingPayments.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-sm font-bold text-amber-700 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Pendientes de Revisión ({pendingPayments.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pendingPayments.map((payment) => (
                            <div key={payment.id} className="card-clinical p-5 border-amber-200 border-l-4">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-sm font-bold text-clinical-800">{payment.labName}</p>
                                        <p className="text-xs text-clinical-400 mt-0.5">{new Date(payment.paymentDate).toLocaleDateString("es-AR")}</p>
                                    </div>
                                    <p className="text-lg font-bold text-clinical-900 tabular-nums">{formatCurrency(payment.amount)}</p>
                                </div>
                                <div className="flex items-center gap-2 mb-4 p-2.5 bg-clinical-50 rounded-lg border border-clinical-200">
                                    {payment.receiptFilename.endsWith(".pdf") ? <FileText className="w-4 h-4 text-red-500" /> : <ImageIcon className="w-4 h-4 text-blue-500" />}
                                    <span className="text-xs font-medium text-clinical-600 truncate">{payment.receiptFilename}</span>
                                    <button className="ml-auto text-[10px] font-semibold text-corp-600 hover:text-corp-700 flex items-center gap-1" onClick={() => setPreviewId(payment.id)}>
                                        <Eye className="w-3 h-3" /> Ver
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleApprove(payment.id)} className="btn btn-success btn-sm flex-1">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Aprobar
                                    </button>
                                    <button onClick={() => handleReject(payment.id)} className="btn btn-danger btn-sm flex-1">
                                        <XCircle className="w-3.5 h-3.5" /> Rechazar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Processed */}
            <div className="card-clinical overflow-hidden">
                <div className="px-6 py-4 border-b border-clinical-100">
                    <h2 className="text-sm font-semibold text-clinical-800 flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-clinical-500" /> Historial de Pagos
                    </h2>
                </div>
                <table className="data-table">
                    <thead>
                        <tr><th>Laboratorio</th><th>Monto</th><th>Fecha</th><th>Comprobante</th><th>Estado</th><th>Revisado</th></tr>
                    </thead>
                    <tbody>
                        {processedPayments.map((p) => (
                            <tr key={p.id}>
                                <td className="font-medium text-sm">{p.labName}</td>
                                <td className="tabular-nums font-semibold">{formatCurrency(p.amount)}</td>
                                <td className="text-xs tabular-nums text-clinical-500">{new Date(p.paymentDate).toLocaleDateString("es-AR")}</td>
                                <td className="text-xs text-clinical-500">{p.receiptFilename}</td>
                                <td><span className={`status-badge ${getStatusColor(p.status)}`}>{getStatusLabel(p.status)}</span></td>
                                <td className="text-xs text-clinical-400">{p.reviewedAt ? new Date(p.reviewedAt).toLocaleDateString("es-AR") : "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
