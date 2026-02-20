"use client";

import type { ResistanceData } from "@/lib/types";
import { CARBAPENEMASE_TYPES, VRE_TYPES, RESISTANCE_DETECTION_METHODS } from "@/lib/constants";
import { AlertTriangle, Shield } from "lucide-react";

interface Props {
    data: ResistanceData;
    onChange: (data: ResistanceData) => void;
}

export default function StepResistencia({ data, onChange }: Props) {
    const update = (field: keyof ResistanceData, value: unknown) => {
        onChange({ ...data, [field]: value });
    };

    const hasAnyMechanism = data.bleeDetected || data.mrsaDetected || data.carbapenemaseDetected || data.ampcDetected || data.vreDetected;

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h2 className="text-lg font-bold text-clinical-900 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-600" />
                    Mecanismos de Resistencia y Vigilancia
                </h2>
                <p className="text-sm text-clinical-400 mt-0.5">Detección fenotípica para normativas WHONET</p>
            </div>

            {hasAnyMechanism && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 animate-fadeIn">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 font-medium">Se han detectado mecanismos de resistencia. Este informe puede requerir notificación epidemiológica.</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* BLEE */}
                <MechanismCard label="BLEE (Betalactamasas de Espectro Extendido)" detected={data.bleeDetected} onToggle={(v) => update("bleeDetected", v)}
                    method={data.bleeMethod} onMethodChange={(v) => update("bleeMethod", v)} methods={RESISTANCE_DETECTION_METHODS.blee as unknown as string[]} />

                {/* MRSA */}
                <MechanismCard label="MRSA (Staphylococcus aureus Meticilino-Resistente)" detected={data.mrsaDetected} onToggle={(v) => update("mrsaDetected", v)}
                    method={data.mrsaMethod} onMethodChange={(v) => update("mrsaMethod", v)} methods={RESISTANCE_DETECTION_METHODS.mrsa as unknown as string[]} />

                {/* Carbapenemasas */}
                <div className="border border-clinical-200 rounded-xl p-5 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${data.carbapenemaseDetected ? "bg-red-600 border-red-600" : "border-clinical-300"}`}>
                            {data.carbapenemaseDetected && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                        <span className="text-sm font-semibold text-clinical-800" onClick={() => update("carbapenemaseDetected", !data.carbapenemaseDetected)}>Carbapenemasas</span>
                    </label>
                    {data.carbapenemaseDetected && (
                        <div className="space-y-3 animate-fadeIn pl-8">
                            <div>
                                <label className="form-label">Tipo</label>
                                <select value={data.carbapenemaseType} onChange={(e) => update("carbapenemaseType", e.target.value)} className="form-input form-select">
                                    <option value="">Seleccionar</option>
                                    {CARBAPENEMASE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="form-label">Método de Detección</label>
                                <select value={data.carbapenemaseMethod} onChange={(e) => update("carbapenemaseMethod", e.target.value)} className="form-input form-select">
                                    <option value="">Seleccionar</option>
                                    {(RESISTANCE_DETECTION_METHODS.carbapenemase as unknown as string[]).map((m) => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* AmpC */}
                <MechanismCard label="AmpC" detected={data.ampcDetected} onToggle={(v) => update("ampcDetected", v)}
                    method={data.ampcMethod} onMethodChange={(v) => update("ampcMethod", v)} methods={RESISTANCE_DETECTION_METHODS.ampc as unknown as string[]} />

                {/* VRE */}
                <div className="border border-clinical-200 rounded-xl p-5 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${data.vreDetected ? "bg-red-600 border-red-600" : "border-clinical-300"}`}>
                            {data.vreDetected && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                        <span className="text-sm font-semibold text-clinical-800" onClick={() => update("vreDetected", !data.vreDetected)}>VRE (Enterococo Resistente a Vancomicina)</span>
                    </label>
                    {data.vreDetected && (
                        <div className="animate-fadeIn pl-8">
                            <label className="form-label">Tipo</label>
                            <select value={data.vreType} onChange={(e) => update("vreType", e.target.value)} className="form-input form-select">
                                <option value="">Seleccionar</option>
                                {VRE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    )}
                </div>

                {/* WHONET */}
                <div className="border border-clinical-200 rounded-xl p-5">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${data.whonetReported ? "bg-corp-600 border-corp-600" : "border-clinical-300"}`}>
                            {data.whonetReported && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                        <div onClick={() => update("whonetReported", !data.whonetReported)}>
                            <span className="text-sm font-semibold text-clinical-800 block">Reportado a WHONET</span>
                            <span className="text-[11px] text-clinical-400">Marcar si se realizó la carga en el sistema de vigilancia</span>
                        </div>
                    </label>
                </div>
            </div>

            <div>
                <label className="form-label">Observaciones de Resistencia</label>
                <textarea value={data.notes} onChange={(e) => update("notes", e.target.value)} className="form-input resize-none" rows={2} placeholder="Notas sobre mecanismos detectados..." />
            </div>
        </div>
    );
}

function MechanismCard({ label, detected, onToggle, method, onMethodChange, methods }: {
    label: string; detected: boolean; onToggle: (v: boolean) => void; method: string; onMethodChange: (v: string) => void; methods: string[];
}) {
    return (
        <div className="border border-clinical-200 rounded-xl p-5 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${detected ? "bg-red-600 border-red-600" : "border-clinical-300"}`}>
                    {detected && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <span className="text-sm font-semibold text-clinical-800" onClick={() => onToggle(!detected)}>{label}</span>
            </label>
            {detected && (
                <div className="animate-fadeIn pl-8">
                    <label className="form-label">Método de Detección</label>
                    <select value={method} onChange={(e) => onMethodChange(e.target.value)} className="form-input form-select">
                        <option value="">Seleccionar</option>
                        {methods.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
            )}
        </div>
    );
}
