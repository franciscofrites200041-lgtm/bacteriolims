"use client";

import type { SampleFormData } from "@/lib/types";
import { SAMPLE_TYPES } from "@/lib/constants";

interface Props {
    data: SampleFormData;
    onChange: (updates: Partial<SampleFormData>) => void;
}

export default function StepPreanalitica({ data, onChange }: Props) {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h2 className="text-lg font-bold text-clinical-900">Datos Preanalíticos</h2>
                <p className="text-sm text-clinical-400 mt-0.5">Información del paciente, muestra y laboratorio de origen</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Lab origen */}
                <div>
                    <label className="form-label">Laboratorio de Origen</label>
                    <select value={data.labProfileId} onChange={(e) => onChange({ labProfileId: e.target.value })} className="form-input form-select">
                        <option value="">Seleccionar laboratorio</option>
                        <option value="lp-001">Lab Central SRL</option>
                        <option value="lp-002">Bioanalítica SA</option>
                        <option value="lp-003">Lab del Sol</option>
                        <option value="lp-004">Diagnos-Lab</option>
                        <option value="lp-005">Lab Puente</option>
                    </select>
                </div>

                <div>
                    <label className="form-label">Médico Solicitante</label>
                    <input type="text" value={data.requestingDoctor} onChange={(e) => onChange({ requestingDoctor: e.target.value })} className="form-input" placeholder="Dr./Dra." />
                </div>

                <div>
                    <label className="form-label">Iniciales del Paciente</label>
                    <input type="text" value={data.patientInitials} onChange={(e) => onChange({ patientInitials: e.target.value.toUpperCase() })} className="form-input" placeholder="Ej: M.G." maxLength={10} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="form-label">Edad</label>
                        <input type="number" value={data.patientAge || ""} onChange={(e) => onChange({ patientAge: e.target.value ? parseInt(e.target.value) : null })} className="form-input" placeholder="Años" min={0} max={120} />
                    </div>
                    <div>
                        <label className="form-label">Sexo</label>
                        <select value={data.patientGender} onChange={(e) => onChange({ patientGender: e.target.value })} className="form-input form-select">
                            <option value="">—</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="X">No especificado</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="form-label">Tipo de Muestra</label>
                    <select value={data.sampleType} onChange={(e) => onChange({ sampleType: e.target.value })} className="form-input form-select">
                        <option value="">Seleccionar tipo</option>
                        {SAMPLE_TYPES.map((t) => (<option key={t.value} value={t.value}>{t.label}</option>))}
                    </select>
                </div>

                <div>
                    <label className="form-label">Fecha de Recolección</label>
                    <input type="date" value={data.collectionDate} onChange={(e) => onChange({ collectionDate: e.target.value })} className="form-input" />
                </div>

                <div className="md:col-span-2">
                    <label className="form-label">Diagnóstico / Sospecha Clínica</label>
                    <textarea value={data.clinicalDiagnosis} onChange={(e) => onChange({ clinicalDiagnosis: e.target.value })} className="form-input resize-none" rows={2} placeholder="Ej: ITU recurrente, sospecha de pielonefritis" />
                </div>
            </div>
        </div>
    );
}
