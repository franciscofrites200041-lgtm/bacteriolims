"use client";

import type { DirectExamData } from "@/lib/types";
import { LEUKOCYTE_RANGES, INFLAMMATORY_REACTION, BAAR_RESULTS } from "@/lib/constants";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
    data: DirectExamData;
    onChange: (data: DirectExamData) => void;
}

export default function StepExamenDirecto({ data, onChange }: Props) {
    const [showGram, setShowGram] = useState(data.gramPerformed);
    const [showZhiehl, setShowZhiehl] = useState(data.zhiehlPerformed);
    const [showFresh, setShowFresh] = useState(data.freshExamPerformed);

    const update = (field: keyof DirectExamData, value: unknown) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h2 className="text-lg font-bold text-clinical-900">Examen Directo</h2>
                <p className="text-sm text-clinical-400 mt-0.5">Citología, tinciones y examen en fresco</p>
            </div>

            {/* Citología */}
            <fieldset className="border border-clinical-200 rounded-xl p-5">
                <legend className="text-xs font-bold uppercase tracking-wider text-clinical-500 px-2">Citología</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="form-label">Leucocitos</label>
                        <select value={data.leukocytes} onChange={(e) => update("leukocytes", e.target.value)} className="form-input form-select">
                            <option value="">—</option>
                            {LEUKOCYTE_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Hematíes</label>
                        <select value={data.redBloodCells} onChange={(e) => update("redBloodCells", e.target.value)} className="form-input form-select">
                            <option value="">—</option>
                            {LEUKOCYTE_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Células Epiteliales</label>
                        <select value={data.epithelialCells} onChange={(e) => update("epithelialCells", e.target.value)} className="form-input form-select">
                            <option value="">—</option>
                            <option value="Escasas">Escasas</option>
                            <option value="Regular cantidad">Regular cantidad</option>
                            <option value="Abundantes">Abundantes</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Reacción Inflamatoria</label>
                        <select value={data.inflammatoryReaction} onChange={(e) => update("inflammatoryReaction", e.target.value)} className="form-input form-select">
                            <option value="">—</option>
                            {INFLAMMATORY_REACTION.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                </div>
            </fieldset>

            {/* Gram */}
            <fieldset className="border border-clinical-200 rounded-xl overflow-hidden">
                <button type="button" onClick={() => { setShowGram(!showGram); update("gramPerformed", !showGram); }}
                    className="w-full flex items-center justify-between p-4 hover:bg-clinical-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${showGram ? "bg-corp-600 border-corp-600" : "border-clinical-300"}`}>
                            {showGram && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                        <legend className="text-sm font-semibold text-clinical-800">Coloración de Gram</legend>
                    </div>
                    {showGram ? <ChevronUp className="w-4 h-4 text-clinical-400" /> : <ChevronDown className="w-4 h-4 text-clinical-400" />}
                </button>
                {showGram && (
                    <div className="px-5 pb-5 space-y-4 animate-fadeIn border-t border-clinical-100 pt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">Cocos</label>
                                <select value={data.gramCocci} onChange={(e) => update("gramCocci", e.target.value)} className="form-input form-select">
                                    <option value="">No observados</option>
                                    <option value="Cocos Gram (+) en racimos">Cocos Gram (+) en racimos</option>
                                    <option value="Cocos Gram (+) en cadenas">Cocos Gram (+) en cadenas</option>
                                    <option value="Cocos Gram (+) en pares">Diplococos Gram (+)</option>
                                    <option value="Cocos Gram (-)">Cocos Gram (-)</option>
                                    <option value="Diplococos Gram (-) intracelulares">Diplococos Gram (-) intracelulares</option>
                                </select>
                            </div>
                            <div>
                                <label className="form-label">Bacilos</label>
                                <select value={data.gramBacilli} onChange={(e) => update("gramBacilli", e.target.value)} className="form-input form-select">
                                    <option value="">No observados</option>
                                    <option value="Bacilos Gram (-)">Bacilos Gram (-)</option>
                                    <option value="Bacilos Gram (+)">Bacilos Gram (+)</option>
                                    <option value="Cocobacilos Gram (-)">Cocobacilos Gram (-)</option>
                                    <option value="Bacilos Gram (+) esporulados">Bacilos Gram (+) esporulados</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 text-sm text-clinical-700 cursor-pointer">
                                <input type="checkbox" checked={data.gramYeasts} onChange={(e) => update("gramYeasts", e.target.checked)} className="w-4 h-4 rounded border-clinical-300 text-corp-600" />
                                Levaduras
                            </label>
                            <label className="flex items-center gap-2 text-sm text-clinical-700 cursor-pointer">
                                <input type="checkbox" checked={data.gramClue} onChange={(e) => update("gramClue", e.target.checked)} className="w-4 h-4 rounded border-clinical-300 text-corp-600" />
                                Clue Cells
                            </label>
                        </div>
                        <div>
                            <label className="form-label">Resultado descriptivo</label>
                            <input type="text" value={data.gramResult} onChange={(e) => update("gramResult", e.target.value)} className="form-input" placeholder="Descripción del hallazgo" />
                        </div>
                    </div>
                )}
            </fieldset>

            {/* Ziehl-Neelsen */}
            <fieldset className="border border-clinical-200 rounded-xl overflow-hidden">
                <button type="button" onClick={() => { setShowZhiehl(!showZhiehl); update("zhiehlPerformed", !showZhiehl); }}
                    className="w-full flex items-center justify-between p-4 hover:bg-clinical-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${showZhiehl ? "bg-corp-600 border-corp-600" : "border-clinical-300"}`}>
                            {showZhiehl && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                        <legend className="text-sm font-semibold text-clinical-800">Ziehl-Neelsen (BAAR)</legend>
                    </div>
                    {showZhiehl ? <ChevronUp className="w-4 h-4 text-clinical-400" /> : <ChevronDown className="w-4 h-4 text-clinical-400" />}
                </button>
                {showZhiehl && (
                    <div className="px-5 pb-5 animate-fadeIn border-t border-clinical-100 pt-4">
                        <label className="form-label">Resultado</label>
                        <select value={data.zhiehlResult} onChange={(e) => update("zhiehlResult", e.target.value)} className="form-input form-select max-w-xs">
                            <option value="">Seleccionar</option>
                            {BAAR_RESULTS.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                )}
            </fieldset>

            {/* Notas */}
            <div>
                <label className="form-label">Observaciones del Examen Directo</label>
                <textarea value={data.notes} onChange={(e) => update("notes", e.target.value)} className="form-input resize-none" rows={2} placeholder="Notas adicionales..." />
            </div>
        </div>
    );
}
