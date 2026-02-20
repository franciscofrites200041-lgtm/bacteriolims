"use client";

import { useState } from "react";
import { mockInvoices } from "@/lib/mock-data";
import { formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";
import { CreditCard, Search, FileText, Download, ChevronDown, ChevronUp, DollarSign, TrendingUp, Clock } from "lucide-react";

export default function AdminBillingPage() {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    // Extended mock invoices for multiple labs
    const allInvoices = [
        ...mockInvoices,
        {
            id: "inv-003", invoiceNumber: "BL-F-2602-002", period: "2026-02",
            subtotal: 385000, tax: 0, total: 385000, paidAmount: 0, balance: 385000,
            status: "PENDING" as const, dueDate: "2026-03-10", items: [],
        },
        {
            id: "inv-004", invoiceNumber: "BL-F-2601-002", period: "2026-01",
            subtotal: 298000, tax: 0, total: 298000, paidAmount: 298000, balance: 0,
            status: "PAID" as const, dueDate: "2026-02-10", items: [],
        },
        {
            id: "inv-005", invoiceNumber: "BL-F-2601-003", period: "2026-01",
            subtotal: 156000, tax: 0, total: 156000, paidAmount: 78000, balance: 78000,
            status: "PARTIALLY_PAID" as const, dueDate: "2026-02-10", items: [],
        },
    ];

    const filtered = allInvoices.filter(
        (inv) => !search || inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) || inv.period.includes(search)
    );

    const totalPending = allInvoices.filter((i) => i.status !== "PAID" && i.status !== "CANCELLED").reduce((s, i) => s + i.balance, 0);
    const totalCollected = allInvoices.filter((i) => i.paidAmount > 0).reduce((s, i) => s + i.paidAmount, 0);

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-clinical-900 tracking-tight">Facturación</h1>
                <p className="text-clinical-500 text-sm mt-1">Gestión de facturas y estado de cobros</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="stat-card">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                        <FileText className="w-4.5 h-4.5 text-blue-600" />
                    </div>
                    <p className="text-xl font-bold text-clinical-900">{allInvoices.length}</p>
                    <p className="text-xs text-clinical-500 mt-1 font-medium">Facturas Emitidas</p>
                </div>
                <div className="stat-card">
                    <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center mb-3">
                        <Clock className="w-4.5 h-4.5 text-amber-600" />
                    </div>
                    <p className="text-xl font-bold text-clinical-900">{formatCurrency(totalPending)}</p>
                    <p className="text-xs text-clinical-500 mt-1 font-medium">Pendiente de Cobro</p>
                </div>
                <div className="stat-card">
                    <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
                        <TrendingUp className="w-4.5 h-4.5 text-emerald-600" />
                    </div>
                    <p className="text-xl font-bold text-clinical-900">{formatCurrency(totalCollected)}</p>
                    <p className="text-xs text-clinical-500 mt-1 font-medium">Total Cobrado</p>
                </div>
            </div>

            {/* Search */}
            <div className="card-clinical p-4">
                <div className="relative">
                    <Search className="w-4 h-4 text-clinical-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="form-input pl-9" placeholder="Buscar por número de factura o período..." />
                </div>
            </div>

            {/* Invoices Table */}
            <div className="card-clinical overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nº Factura</th>
                                <th>Período</th>
                                <th className="text-right">Total</th>
                                <th className="text-right">Pagado</th>
                                <th className="text-right">Saldo</th>
                                <th>Estado</th>
                                <th>Vencimiento</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((inv) => (
                                <tr key={inv.id}>
                                    <td><span className="font-mono text-xs font-semibold text-corp-600">{inv.invoiceNumber}</span></td>
                                    <td className="text-sm">
                                        {new Date(inv.period + "-01").toLocaleDateString("es-AR", { month: "long", year: "numeric" })}
                                    </td>
                                    <td className="text-right tabular-nums font-semibold">{formatCurrency(inv.total)}</td>
                                    <td className="text-right tabular-nums text-emerald-600 font-medium">{formatCurrency(inv.paidAmount)}</td>
                                    <td className={`text-right tabular-nums font-bold ${inv.balance > 0 ? "text-red-600" : "text-clinical-400"}`}>
                                        {formatCurrency(inv.balance)}
                                    </td>
                                    <td><span className={`status-badge ${getStatusColor(inv.status)}`}>{getStatusLabel(inv.status)}</span></td>
                                    <td className="text-xs tabular-nums text-clinical-500">
                                        {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString("es-AR") : "—"}
                                    </td>
                                    <td>
                                        <button className="btn btn-ghost btn-sm"><Download className="w-3.5 h-3.5" /></button>
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
