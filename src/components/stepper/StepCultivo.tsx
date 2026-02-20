"use client";

import type { CultureData } from "@/lib/types";
import { KASS_CRITERIA } from "@/lib/constants";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
    data: CultureData;
    onChange: (data: CultureData) => void;
    sampleType: string;
}

export default function StepCultivo({ data, onChange, sampleType }: Props) {
    const [showBiochem, setShowBiochem] = useState(data.biochemTestsPerformed);
    const isUrine = sampleType === "ORINA";

    const update = (field: keyof CultureData, value: unknown) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h2 className="text-lg font-bold text-clinical-900">Cultivo e Identificación</h2>
                <p className="text-sm text-clinical-400 mt-0.5">Desarrollo microbiológico e identificación de agentes</p>
            </div>

            {/* Resultado general */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label className="form-label">Resultado del Cultivo</label>
                    <select value={data.cultureResult} onChange={(e) => update("cultureResult", e.target.value)} className="form-input form-select">
                        <option value="">Seleccionar</option>
                        <option value="Positivo">Positivo</option>
                        <option value="Negativo">Negativo (sin desarrollo)</option>
                        <option value="Flora habitual">Flora habitual</option>
                        <option value="Flora mixta">Flora mixta</option>
                        <option value="Contaminado">Contaminado</option>
                    </select>
                </div>
                <div>
                    <label className="form-label">Horas de Incubación</label>
                    <input type="number" value={data.incubationHours || ""} onChange={(e) => update("incubationHours", parseInt(e.target.value) || null)} className="form-input" placeholder="24-48 hs" />
                </div>
                {isUrine && (
                    <div>
                        <label className="form-label">Recuento (Criterio de Kass)</label>
                        <select value={data.ufcCount} onChange={(e) => update("ufcCount", e.target.value)} className="form-input form-select">
                            <option value="">Seleccionar</option>
                            {KASS_CRITERIA.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
                        </select>
                    </div>
                )}
            </div>

            {/* Organismos identificados */}
            {data.cultureResult === "Positivo" && (
                <fieldset className="border border-clinical-200 rounded-xl p-5 animate-fadeIn">
                    <legend className="text-xs font-bold uppercase tracking-wider text-clinical-500 px-2">Organismos identificados</legend>
                    {[1, 2, 3].map((n) => {
                        const nameField = `organism${n}Name` as keyof CultureData;
                        const morphField = `organism${n}Morphology` as keyof CultureData;
                        return (
                            <div key={n} className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${n > 1 ? "mt-4 pt-4 border-t border-clinical-100" : ""}`}>
                                <div>
                                    <label className="form-label">Organismo {n}</label>
                                    <input type="text" value={(data[nameField] as string) || ""} onChange={(e) => update(nameField, e.target.value)} className="form-input" placeholder="Ej: Escherichia coli" />
                                </div>
                                <div>
                                    <label className="form-label">Morfología / Medio</label>
                                    <input type="text" value={(data[morphField] as string) || ""} onChange={(e) => update(morphField, e.target.value)} className="form-input" placeholder="Ej: Colonias lactosa+" />
                                </div>
                            </div>
                        );
                    })}
                </fieldset>
            )}

            {/* Pruebas bioquímicas colapsables */}
            <fieldset className="border border-clinical-200 rounded-xl overflow-hidden">
                <button type="button" onClick={() => { setShowBiochem(!showBiochem); update("biochemTestsPerformed", !showBiochem); }}
                    className="w-full flex items-center justify-between p-4 hover:bg-clinical-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${showBiochem ? "bg-corp-600 border-corp-600" : "border-clinical-300"}`}>
                            {showBiochem && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                        <span className="text-sm font-semibold text-clinical-800">Pruebas Bioquímicas (opcional)</span>
                    </div>
                    {showBiochem ? <ChevronUp className="w-4 h-4 text-clinical-400" /> : <ChevronDown className="w-4 h-4 text-clinical-400" />}
                </button>
                {showBiochem && (
                    <div className="px-5 pb-5 animate-fadeIn border-t border-clinical-100 pt-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {(["catalase", "oxidase", "coagulase", "indol", "citrate", "urease", "tsi", "motility", "optoquina", "bacitracina", "novobiocina", "bile"] as (keyof CultureData)[]).map((field) => (
                                <div key={field}>
                                    <label className="form-label capitalize">{field === "tsi" ? "TSI" : field}</label>
                                    <select value={(data[field] as string) || ""} onChange={(e) => update(field, e.target.value)} className="form-input form-select text-xs">
                                        <option value="">—</option>
                                        <option value="Positivo">+</option>
                                        <option value="Negativo">−</option>
                                        <option value="Variable">±</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </fieldset>
        </div>
    );
}
