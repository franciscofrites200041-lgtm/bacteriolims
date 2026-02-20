"use client";

import { useState } from "react";
import type { AntibiogramData, AntibiogramEntryData, ClinicalInterpretation } from "@/lib/types";
import { ANTIBIOTIC_GROUPS, CLSI_INTERPRETATIONS } from "@/lib/constants";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    data: AntibiogramData;
    onChange: (data: AntibiogramData) => void;
}

export default function StepAntibiograma({ data, onChange }: Props) {
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

    const toggleGroup = (group: string) => {
        const next = new Set(expandedGroups);
        next.has(group) ? next.delete(group) : next.add(group);
        setExpandedGroups(next);
    };

    const addAntibiotic = (name: string, group: string, disk: string) => {
        if (data.entries.find((e) => e.antibioticName === name)) return;
        const entry: AntibiogramEntryData = {
            id: `atbg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            antibioticName: name, antibioticGroup: group, diskContent: disk,
            haloDiameter: null, mic: null, interpretation: "", notes: "",
        };
        onChange({ ...data, entries: [...data.entries, entry] });
    };

    const updateEntry = (id: string, field: keyof AntibiogramEntryData, value: unknown) => {
        onChange({
            ...data,
            entries: data.entries.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
        });
    };

    const removeEntry = (id: string) => {
        onChange({ ...data, entries: data.entries.filter((e) => e.id !== id) });
    };

    const addAllFromGroup = (group: typeof ANTIBIOTIC_GROUPS[number]) => {
        const newEntries = group.antibiotics
            .filter((a) => !data.entries.find((e) => e.antibioticName === a.name))
            .map((a) => ({
                id: `atbg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                antibioticName: a.name, antibioticGroup: group.group, diskContent: a.disk,
                haloDiameter: null, mic: null, interpretation: "" as const, notes: "",
            }));
        onChange({ ...data, entries: [...data.entries, ...newEntries] });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h2 className="text-lg font-bold text-clinical-900">Antibiograma (ATBG)</h2>
                <p className="text-sm text-clinical-400 mt-0.5">
                    Matriz de sensibilidad antimicrobiana · Normativa CLSI {data.clsiVersion}
                </p>
            </div>

            {/* Config */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label className="form-label">Método</label>
                    <select value={data.method} onChange={(e) => onChange({ ...data, method: e.target.value })} className="form-input form-select">
                        <option value="Kirby-Bauer">Kirby-Bauer (difusión en disco)</option>
                        <option value="CIM">CIM (dilución)</option>
                        <option value="Automatizado">Automatizado</option>
                    </select>
                </div>
                <div>
                    <label className="form-label">Versión CLSI</label>
                    <input type="text" value={data.clsiVersion} onChange={(e) => onChange({ ...data, clsiVersion: e.target.value })} className="form-input" />
                </div>
                <div>
                    <label className="form-label">Organismo Testeado</label>
                    <input type="text" value={data.organismTested} onChange={(e) => onChange({ ...data, organismTested: e.target.value })} className="form-input" placeholder="Ej: E. coli" />
                </div>
            </div>

            {/* Antibiotic Selector */}
            <div className="card-clinical overflow-hidden">
                <div className="px-4 py-3 border-b border-clinical-100 bg-clinical-50">
                    <p className="text-xs font-semibold text-clinical-600">Seleccionar Antibióticos por Grupo</p>
                </div>
                <div className="divide-y divide-clinical-100 max-h-[300px] overflow-y-auto">
                    {ANTIBIOTIC_GROUPS.map((group) => (
                        <div key={group.group}>
                            <button type="button" onClick={() => toggleGroup(group.group)}
                                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-clinical-50 transition-colors text-left">
                                <span className="text-xs font-semibold text-clinical-700">{group.group}</span>
                                <div className="flex items-center gap-2">
                                    <button type="button" onClick={(e) => { e.stopPropagation(); addAllFromGroup(group); }}
                                        className="text-[10px] font-semibold text-corp-600 hover:text-corp-700 bg-corp-50 px-2 py-0.5 rounded">
                                        + Todos
                                    </button>
                                    {expandedGroups.has(group.group) ? <ChevronUp className="w-3.5 h-3.5 text-clinical-400" /> : <ChevronDown className="w-3.5 h-3.5 text-clinical-400" />}
                                </div>
                            </button>
                            {expandedGroups.has(group.group) && (
                                <div className="px-4 pb-2 flex flex-wrap gap-1.5 animate-fadeIn">
                                    {group.antibiotics.map((atb) => {
                                        const isAdded = data.entries.some((e) => e.antibioticName === atb.name);
                                        return (
                                            <button key={atb.name} type="button" disabled={isAdded}
                                                onClick={() => addAntibiotic(atb.name, group.group, atb.disk)}
                                                className={cn("text-[11px] px-2.5 py-1 rounded-full border transition-colors", isAdded ? "bg-corp-50 border-corp-200 text-corp-600 cursor-default" : "bg-white border-clinical-200 text-clinical-600 hover:border-corp-300 hover:text-corp-600")}>
                                                {isAdded && "✓ "}{atb.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ATBG Matrix Table */}
            {data.entries.length > 0 && (
                <div className="overflow-x-auto card-clinical">
                    <table className="atbg-matrix">
                        <thead>
                            <tr>
                                <th className="text-left min-w-[180px]">Antibiótico</th>
                                <th className="min-w-[80px]">Disco</th>
                                {data.method !== "CIM" && <th className="min-w-[80px]">Halo (mm)</th>}
                                {data.method !== "Kirby-Bauer" && <th className="min-w-[90px]">CIM (µg/ml)</th>}
                                <th className="min-w-[140px]">Interpretación</th>
                                <th className="w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.entries.map((entry) => (
                                <tr key={entry.id}>
                                    <td>
                                        <div>
                                            <span className="font-medium text-sm">{entry.antibioticName}</span>
                                            <span className="text-[10px] text-clinical-400 block">{entry.antibioticGroup}</span>
                                        </div>
                                    </td>
                                    <td><span className="text-xs text-clinical-500 font-mono">{entry.diskContent}</span></td>
                                    {data.method !== "CIM" && (
                                        <td>
                                            <input type="number" value={entry.haloDiameter ?? ""} onChange={(e) => updateEntry(entry.id, "haloDiameter", e.target.value ? parseFloat(e.target.value) : null)}
                                                className="form-input text-center text-sm w-[70px] mx-auto" placeholder="—" min={0} max={50} step={0.5} />
                                        </td>
                                    )}
                                    {data.method !== "Kirby-Bauer" && (
                                        <td>
                                            <input type="number" value={entry.mic ?? ""} onChange={(e) => updateEntry(entry.id, "mic", e.target.value ? parseFloat(e.target.value) : null)}
                                                className="form-input text-center text-sm w-[80px] mx-auto" placeholder="—" min={0} step={0.001} />
                                        </td>
                                    )}
                                    <td>
                                        <div className="flex justify-center gap-1">
                                            {CLSI_INTERPRETATIONS.map((interp) => (
                                                <button key={interp.value} type="button"
                                                    onClick={() => updateEntry(entry.id, "interpretation", interp.value as ClinicalInterpretation)}
                                                    className={cn("px-2 py-1 rounded text-[11px] font-bold border transition-all",
                                                        entry.interpretation === interp.value
                                                            ? `interp-${interp.value} border-current`
                                                            : "border-clinical-200 text-clinical-400 hover:border-clinical-300"
                                                    )}>
                                                    {interp.value}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => removeEntry(entry.id)}
                                            className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors group">
                                            <Trash2 className="w-3.5 h-3.5 text-clinical-300 group-hover:text-red-500" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {data.entries.length === 0 && (
                <div className="text-center py-10 text-clinical-400">
                    <p className="text-sm font-medium">No se han añadido antibióticos aún</p>
                    <p className="text-xs mt-1">Seleccione antibióticos de los grupos superiores</p>
                </div>
            )}
        </div>
    );
}
