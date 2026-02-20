"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Save, FlaskConical } from "lucide-react";
import StepPreanalitica from "@/components/stepper/StepPreanalitica";
import StepExamenDirecto from "@/components/stepper/StepExamenDirecto";
import StepCultivo from "@/components/stepper/StepCultivo";
import StepAntibiograma from "@/components/stepper/StepAntibiograma";
import StepResistencia from "@/components/stepper/StepResistencia";
import StepRevision from "@/components/stepper/StepRevision";
import type { SampleFormData } from "@/lib/types";
import { cn } from "@/lib/utils";

const STEPS = [
    { id: 1, label: "Preanalítica", shortLabel: "Pre" },
    { id: 2, label: "Examen Directo", shortLabel: "ED" },
    { id: 3, label: "Cultivo", shortLabel: "Cult" },
    { id: 4, label: "Antibiograma", shortLabel: "ATBG" },
    { id: 5, label: "Resistencia", shortLabel: "Res" },
    { id: 6, label: "Revisión y Cierre", shortLabel: "Rev" },
];

const initialFormData: SampleFormData = {
    labProfileId: "",
    patientInitials: "",
    patientAge: null,
    patientGender: "",
    clinicalDiagnosis: "",
    sampleType: "",
    sampleTypeOther: "",
    collectionDate: new Date().toISOString().split("T")[0],
    requestingDoctor: "",
    directExam: {
        leukocytes: "", redBloodCells: "", epithelialCells: "", inflammatoryReaction: "",
        gramPerformed: false, gramResult: "", gramCocci: "", gramBacilli: "",
        gramYeasts: false, gramClue: false, zhiehlPerformed: false, zhiehlResult: "",
        freshExamPerformed: false, freshExamResult: "", trichomonas: false,
        mobileBacteria: false, notes: "",
    },
    culture: {
        cultureResult: "", incubationHours: null, ufcCount: "", kassCriteria: "",
        organism1Name: "", organism1Morphology: "", organism2Name: "", organism2Morphology: "",
        organism3Name: "", organism3Morphology: "", biochemTestsPerformed: false,
        catalase: "", oxidase: "", coagulase: "", indol: "", citrate: "", urease: "",
        tsi: "", motility: "", lysineDecarboxylase: "", bile: "", optoquina: "",
        bacitracina: "", novobiocina: "", otherBiochemTests: "", notes: "",
    },
    antibiogram: { method: "Kirby-Bauer", clsiVersion: "M100-Ed34", organismTested: "", entries: [], notes: "" },
    resistance: {
        bleeDetected: false, bleeMethod: "", mrsaDetected: false, mrsaMethod: "",
        carbapenemaseDetected: false, carbapenemaseType: "", carbapenemaseMethod: "",
        ampcDetected: false, ampcMethod: "", vreDetected: false, vreType: "",
        whonetReported: false, notes: "",
    },
};

export default function NewSamplePage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<SampleFormData>(initialFormData);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

    const updateFormData = (updates: Partial<SampleFormData>) => {
        setFormData((prev) => ({ ...prev, ...updates }));
    };

    const goNext = () => {
        setCompletedSteps((prev) => new Set(prev).add(currentStep));
        if (currentStep < 6) setCurrentStep(currentStep + 1);
    };

    const goBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <StepPreanalitica data={formData} onChange={updateFormData} />;
            case 2: return <StepExamenDirecto data={formData.directExam} onChange={(d) => updateFormData({ directExam: d })} />;
            case 3: return <StepCultivo data={formData.culture} onChange={(d) => updateFormData({ culture: d })} sampleType={formData.sampleType} />;
            case 4: return <StepAntibiograma data={formData.antibiogram} onChange={(d) => updateFormData({ antibiogram: d })} />;
            case 5: return <StepResistencia data={formData.resistance} onChange={(d) => updateFormData({ resistance: d })} />;
            case 6: return <StepRevision data={formData} />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold text-clinical-900 tracking-tight flex items-center gap-2">
                    <FlaskConical className="w-6 h-6 text-corp-600" />
                    Carga Bacteriológica
                </h1>
                <p className="text-clinical-500 text-sm mt-1">Complete los pasos del análisis microbiológico</p>
            </div>

            {/* Stepper Navigation */}
            <div className="card-clinical p-4">
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                    {STEPS.map((step, i) => (
                        <button
                            key={step.id}
                            onClick={() => setCurrentStep(step.id)}
                            className={cn("stepper-step flex-shrink-0", currentStep === step.id && "active", completedSteps.has(step.id) && currentStep !== step.id && "completed")}
                        >
                            <span className="step-number">
                                {completedSteps.has(step.id) && currentStep !== step.id ? <Check className="w-3.5 h-3.5" /> : step.id}
                            </span>
                            <span className="hidden sm:inline">{step.label}</span>
                            <span className="sm:hidden">{step.shortLabel}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="card-clinical p-6 lg:p-8">{renderStep()}</div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <button onClick={goBack} disabled={currentStep === 1} className="btn btn-secondary">
                    <ChevronLeft className="w-4 h-4" /> Anterior
                </button>
                <span className="text-xs text-clinical-400 font-medium">Paso {currentStep} de 6</span>
                {currentStep < 6 ? (
                    <button onClick={goNext} className="btn btn-primary">
                        Siguiente <ChevronRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button className="btn btn-success"><Save className="w-4 h-4" /> Firmar y Emitir Informe</button>
                )}
            </div>
        </div>
    );
}
