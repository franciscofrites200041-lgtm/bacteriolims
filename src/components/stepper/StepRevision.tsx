"use client";

import type { SampleFormData } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { FileText, DollarSign, CheckCircle2, AlertCircle } from "lucide-react";
import { NBU_COMMON_CODES } from "@/lib/constants";

interface Props { data: SampleFormData; }

// Billing logic: auto-detect applicable NBU codes from form data
function calculateApplicableNbuCodes(data: SampleFormData) {
    const codes: { code: string; description: string; price: number }[] = [];

    // 660104 — Gram if performed
    if (data.directExam.gramPerformed) {
        codes.push({ code: "660104", description: "Examen directo y coloración de Gram", price: 9200 });
    }
    // 660120 — BAAR if performed
    if (data.directExam.zhiehlPerformed) {
        codes.push({ code: "660120", description: "Investigación de BAAR (Ziehl-Neelsen)", price: 7500 });
    }
    // 660150 — Fresh exam
    if (data.directExam.freshExamPerformed) {
        codes.push({ code: "660150", description: "Examen en fresco", price: 6000 });
    }
    // Culture codes based on sample type
    if (data.culture.cultureResult && data.culture.cultureResult !== "") {
        const cultureMap: Record<string, { code: string; desc: string; price: number }> = {
            ORINA: { code: "660107", desc: "Urocultivo con recuento de colonias", price: 18500 },
            SANGRE_HEMOCULTIVO: { code: "660106", desc: "Hemocultivo (cada muestra)", price: 22000 },
            ESPUTO: { code: "660112", desc: "Cultivo de esputo", price: 16500 },
            CATETER: { code: "660114", desc: "Cultivo de catéter", price: 17000 },
            LCR: { code: "660110", desc: "Cultivo de LCR", price: 20000 },
            MATERIA_FECAL: { code: "660108", desc: "Coprocultivo", price: 15000 },
        };
        const specific = cultureMap[data.sampleType];
        if (specific) {
            codes.push({ code: specific.code, description: specific.desc, price: specific.price });
        } else {
            codes.push({ code: "660113", description: "Cultivo de secreciones", price: 16000 });
        }
    }
    // 660130 — Biochem tests
    if (data.culture.biochemTestsPerformed) {
        codes.push({ code: "660130", description: "Pruebas bioquímicas de identificación", price: 11000 });
    }
    // 660035 — Antibiogram
    if (data.antibiogram.entries.length > 0) {
        codes.push({ code: "660035", description: "Antibiograma por difusión en disco", price: 14800 });
    }
    // Resistance mechanisms
    if (data.resistance.bleeDetected) codes.push({ code: "660141", description: "Detección de BLEE", price: 8500 });
    if (data.resistance.carbapenemaseDetected) codes.push({ code: "660142", description: "Detección de carbapenemasas", price: 12000 });
    if (data.resistance.mrsaDetected) codes.push({ code: "660143", description: "Detección de MRSA", price: 8500 });

    return codes;
}

export default function StepRevision({ data }: Props) {
    const nbuCodes = calculateApplicableNbuCodes(data);
    const total = nbuCodes.reduce((sum, c) => sum + c.price, 0);

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h2 className="text-lg font-bold text-clinical-900">Revisión Final y Facturación</h2>
                <p className="text-sm text-clinical-400 mt-0.5">Verifique los datos y los códigos NBU auto-detectados antes de emitir el informe</p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-clinical-700 flex items-center gap-2"><FileText className="w-4 h-4" /> Resumen del Análisis</h3>
                    <div className="bg-clinical-50 rounded-xl p-4 border border-clinical-200 space-y-2 text-sm">
                        <Row label="Paciente" value={`${data.patientInitials || "—"}, ${data.patientAge || "—"} años, ${data.patientGender || "—"}`} />
                        <Row label="Muestra" value={data.sampleType?.replace(/_/g, " ") || "—"} />
                        <Row label="Diagnóstico" value={data.clinicalDiagnosis || "—"} />
                        <Row label="Gram" value={data.directExam.gramPerformed ? (data.directExam.gramResult || "Realizado") : "No realizado"} />
                        <Row label="Cultivo" value={data.culture.cultureResult || "—"} />
                        {data.culture.organism1Name && <Row label="Organismo" value={data.culture.organism1Name} />}
                        <Row label="Antibióticos testeados" value={data.antibiogram.entries.length > 0 ? `${data.antibiogram.entries.length} antibióticos` : "Ninguno"} />
                        {(data.resistance.bleeDetected || data.resistance.mrsaDetected || data.resistance.carbapenemaseDetected) && (
                            <div className="pt-2 border-t border-clinical-200">
                                <div className="flex items-center gap-1.5 text-amber-700">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    <span className="text-xs font-semibold">Mecanismos de Resistencia Detectados</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Auto-billing */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-clinical-700 flex items-center gap-2"><DollarSign className="w-4 h-4" /> Facturación Automática NBU</h3>
                    <div className="bg-clinical-50 rounded-xl border border-clinical-200 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-clinical-200">
                                    <th className="text-left px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-clinical-500">Código</th>
                                    <th className="text-left px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-clinical-500">Práctica</th>
                                    <th className="text-right px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-clinical-500">Arancel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nbuCodes.map((c) => (
                                    <tr key={c.code} className="border-b border-clinical-100">
                                        <td className="px-4 py-2 font-mono text-xs font-semibold text-corp-600">{c.code}</td>
                                        <td className="px-4 py-2 text-xs text-clinical-700">{c.description}</td>
                                        <td className="px-4 py-2 text-right tabular-nums font-semibold text-xs">{formatCurrency(c.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-corp-50 border-t-2 border-corp-200">
                                    <td colSpan={2} className="px-4 py-3 text-sm font-bold text-corp-800">Total a Facturar</td>
                                    <td className="px-4 py-3 text-right text-base font-bold text-corp-800 tabular-nums">{formatCurrency(total)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    {nbuCodes.length === 0 && (
                        <p className="text-xs text-clinical-400 text-center py-4">Complete los pasos anteriores para generar la facturación automática</p>
                    )}
                </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-semibold text-emerald-800">¿Listo para emitir?</p>
                    <p className="text-xs text-emerald-700 mt-0.5">Al firmar el informe, los códigos NBU se inyectarán automáticamente en el libro mayor de deudas del laboratorio cliente.</p>
                </div>
            </div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-2">
            <span className="text-clinical-500 text-xs font-medium">{label}</span>
            <span className="text-clinical-800 text-xs font-semibold text-right">{value}</span>
        </div>
    );
}
