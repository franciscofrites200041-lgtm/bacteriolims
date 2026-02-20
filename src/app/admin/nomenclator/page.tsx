"use client";

import { useState } from "react";
import { NBU_COMMON_CODES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { BookOpen, Search, Edit2, Save, X, Plus, DollarSign, TrendingUp } from "lucide-react";

interface NbuEntry {
    id: string;
    code: string;
    description: string;
    category: string;
    price: number;
    isActive: boolean;
}

const initialNbuData: NbuEntry[] = NBU_COMMON_CODES.map((c, i) => ({
    id: `nbu-${i}`,
    code: c.code,
    description: c.description,
    category: c.category,
    price: [9200, 18500, 14800, 16000, 22000, 18500, 15000, 20000, 16500, 16000, 17000, 7500, 11000, 10000, 8500, 12000, 8500, 6000][i] || 10000,
    isActive: true,
}));

export default function AdminNomenclatorPage() {
    const [entries, setEntries] = useState<NbuEntry[]>(initialNbuData);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editPrice, setEditPrice] = useState("");
    const [bulkPercent, setBulkPercent] = useState("");

    const filtered = entries.filter(
        (e) =>
            !search ||
            e.code.includes(search) ||
            e.description.toLowerCase().includes(search.toLowerCase()) ||
            e.category.toLowerCase().includes(search.toLowerCase())
    );

    const categories = [...new Set(entries.map((e) => e.category))];

    const startEdit = (entry: NbuEntry) => {
        setEditingId(entry.id);
        setEditPrice(entry.price.toString());
    };

    const saveEdit = (id: string) => {
        setEntries((prev) =>
            prev.map((e) => (e.id === id ? { ...e, price: parseFloat(editPrice) || e.price } : e))
        );
        setEditingId(null);
    };

    const applyBulkIncrease = () => {
        const percent = parseFloat(bulkPercent);
        if (!percent || percent <= 0) return;
        setEntries((prev) =>
            prev.map((e) => ({ ...e, price: Math.round(e.price * (1 + percent / 100)) }))
        );
        setBulkPercent("");
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-clinical-900 tracking-tight">Nomenclador NBU</h1>
                    <p className="text-clinical-500 text-sm mt-1">Gestión dinámica de aranceles bacteriológicos</p>
                </div>
            </div>

            {/* Bulk Update */}
            <div className="card-clinical p-5 bg-gradient-to-r from-amber-50 to-white border-amber-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-amber-600" />
                        <div>
                            <p className="text-sm font-bold text-clinical-800">Ajuste Masivo por Inflación</p>
                            <p className="text-[11px] text-clinical-400">Incrementa todos los aranceles un porcentaje determinado</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        <div className="relative">
                            <input
                                type="number"
                                value={bulkPercent}
                                onChange={(e) => setBulkPercent(e.target.value)}
                                className="form-input w-[100px] pr-6 text-sm"
                                placeholder="0"
                                min={0}
                                step={0.5}
                            />
                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-clinical-400 text-sm font-semibold">%</span>
                        </div>
                        <button onClick={applyBulkIncrease} disabled={!bulkPercent} className="btn btn-primary btn-sm">
                            Aplicar Aumento
                        </button>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="card-clinical p-4">
                <div className="relative">
                    <Search className="w-4 h-4 text-clinical-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="form-input pl-9" placeholder="Buscar por código, descripción o categoría..." />
                </div>
            </div>

            {/* Table */}
            <div className="card-clinical overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Código NBU</th>
                                <th>Descripción</th>
                                <th>Categoría</th>
                                <th className="text-right">Arancel (ARS)</th>
                                <th>Estado</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((entry) => (
                                <tr key={entry.id}>
                                    <td>
                                        <span className="font-mono text-xs font-bold text-corp-600">{entry.code}</span>
                                    </td>
                                    <td className="text-sm">{entry.description}</td>
                                    <td>
                                        <span className="text-xs font-medium text-clinical-500 bg-clinical-100 px-2 py-0.5 rounded-full">
                                            {entry.category}
                                        </span>
                                    </td>
                                    <td className="text-right">
                                        {editingId === entry.id ? (
                                            <div className="flex items-center justify-end gap-1.5">
                                                <span className="text-clinical-400 text-sm">$</span>
                                                <input
                                                    type="number"
                                                    value={editPrice}
                                                    onChange={(e) => setEditPrice(e.target.value)}
                                                    className="form-input w-[100px] text-right text-sm tabular-nums"
                                                    autoFocus
                                                />
                                                <button onClick={() => saveEdit(entry.id)} className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center transition-colors">
                                                    <Save className="w-3.5 h-3.5 text-emerald-600" />
                                                </button>
                                                <button onClick={() => setEditingId(null)} className="w-7 h-7 rounded-lg bg-clinical-50 hover:bg-clinical-100 flex items-center justify-center transition-colors">
                                                    <X className="w-3.5 h-3.5 text-clinical-400" />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="font-semibold tabular-nums text-sm">{formatCurrency(entry.price)}</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${entry.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-clinical-50 text-clinical-400 border-clinical-200"}`}>
                                            {entry.isActive ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        {editingId !== entry.id && (
                                            <button onClick={() => startEdit(entry)} className="btn btn-ghost btn-sm text-xs">
                                                <Edit2 className="w-3 h-3" /> Editar
                                            </button>
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
