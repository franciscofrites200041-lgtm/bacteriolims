// =============================================================================
// BacterioLIMS — Type Definitions
// =============================================================================

export type UserRole = "ADMIN" | "LAB_CLIENT";

export type SampleStatus =
    | "PENDING_RECEPTION"
    | "IN_PROCESS"
    | "REPORT_FINALIZED"
    | "DELIVERED";

export type PaymentStatus = "PENDING_REVIEW" | "APPROVED" | "REJECTED";
export type InvoiceStatus = "DRAFT" | "PENDING" | "PARTIALLY_PAID" | "PAID" | "OVERDUE" | "CANCELLED";
export type ClinicalInterpretation = "S" | "R" | "I" | "SDD";

// Session user
export interface SessionUser {
    id: string;
    email: string;
    role: UserRole;
    name: string;
    labProfileId?: string;
}

// Dashboard stats
export interface AdminDashboardStats {
    totalSamplesMonth: number;
    samplesInProcess: number;
    reportsFinalized: number;
    monthlyRevenue: number;
    accountsReceivable: number;
    pendingPayments: number;
    samplesByLab: { labName: string; count: number }[];
    revenueByMonth: { month: string; revenue: number }[];
}

export interface LabDashboardStats {
    totalSamples: number;
    pendingReception: number;
    inProcess: number;
    finalized: number;
    currentDebt: number;
    pendingPayments: number;
}

// Sample form data (stepper)
export interface SampleFormData {
    // Step 1: Preanalítica
    labProfileId: string;
    patientInitials: string;
    patientAge: number | null;
    patientGender: string;
    clinicalDiagnosis: string;
    sampleType: string;
    sampleTypeOther: string;
    collectionDate: string;
    requestingDoctor: string;

    // Step 2: Examen Directo
    directExam: DirectExamData;

    // Step 3: Cultivo
    culture: CultureData;

    // Step 4: Antibiograma
    antibiogram: AntibiogramData;

    // Step 5: Resistencia
    resistance: ResistanceData;
}

export interface DirectExamData {
    leukocytes: string;
    redBloodCells: string;
    epithelialCells: string;
    inflammatoryReaction: string;
    gramPerformed: boolean;
    gramResult: string;
    gramCocci: string;
    gramBacilli: string;
    gramYeasts: boolean;
    gramClue: boolean;
    zhiehlPerformed: boolean;
    zhiehlResult: string;
    freshExamPerformed: boolean;
    freshExamResult: string;
    trichomonas: boolean;
    mobileBacteria: boolean;
    notes: string;
}

export interface CultureData {
    cultureResult: string;
    incubationHours: number | null;
    ufcCount: string;
    kassCriteria: string;
    organism1Name: string;
    organism1Morphology: string;
    organism2Name: string;
    organism2Morphology: string;
    organism3Name: string;
    organism3Morphology: string;
    biochemTestsPerformed: boolean;
    catalase: string;
    oxidase: string;
    coagulase: string;
    indol: string;
    citrate: string;
    urease: string;
    tsi: string;
    motility: string;
    lysineDecarboxylase: string;
    bile: string;
    optoquina: string;
    bacitracina: string;
    novobiocina: string;
    otherBiochemTests: string;
    notes: string;
}

export interface AntibiogramData {
    method: string;
    clsiVersion: string;
    organismTested: string;
    entries: AntibiogramEntryData[];
    notes: string;
}

export interface AntibiogramEntryData {
    id: string;
    antibioticName: string;
    antibioticGroup: string;
    diskContent: string;
    haloDiameter: number | null;
    mic: number | null;
    interpretation: ClinicalInterpretation | "";
    notes: string;
}

export interface ResistanceData {
    bleeDetected: boolean;
    bleeMethod: string;
    mrsaDetected: boolean;
    mrsaMethod: string;
    carbapenemaseDetected: boolean;
    carbapenemaseType: string;
    carbapenemaseMethod: string;
    ampcDetected: boolean;
    ampcMethod: string;
    vreDetected: boolean;
    vreType: string;
    whonetReported: boolean;
    notes: string;
}

// Payment form
export interface PaymentFormData {
    invoiceId: string;
    amount: number;
    paymentDate: string;
    receiptFile: File | null;
    notes: string;
}

// Invoice with items
export interface InvoiceWithItems {
    id: string;
    invoiceNumber: string;
    period: string;
    subtotal: number;
    tax: number;
    total: number;
    paidAmount: number;
    balance: number;
    status: InvoiceStatus;
    dueDate: string | null;
    items: {
        id: string;
        nbuCode: string;
        sampleCode: string;
        description: string;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
    }[];
}

// Sample list item
export interface SampleListItem {
    id: string;
    sampleCode: string;
    status: SampleStatus;
    patientInitials: string;
    sampleType: string;
    labName: string;
    createdAt: string;
    completedAt: string | null;
}
