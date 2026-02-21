/**
 * In-memory data store — drop-in replacement for Prisma.
 * Seeded with mock data. All mutations happen in memory (reset on restart).
 */

import { mockSamples, mockInvoices, mockPayments } from "./mock-data";
import { NBU_COMMON_CODES } from "./constants";

// ============================================================================
// Types
// ============================================================================

export interface Sample {
    id: string;
    sampleCode: string;
    labName: string;
    patientInitials: string;
    sampleType: string;
    status: string;
    createdAt: string;
    completedAt?: string | null;
    formData?: Record<string, unknown>;
}

export interface Lab {
    id: string;
    name: string;
    cuit: string;
    email: string;
    phone: string;
    address: string;
    active: boolean;
    createdAt: string;
}

export interface NbuCode {
    code: string;
    description: string;
    price: number;
}

// ============================================================================
// Store — seeded from mock data
// ============================================================================

const samples: Sample[] = mockSamples.map((s) => ({ ...s, completedAt: s.completedAt ?? undefined }));

const labs: Lab[] = [
    { id: "lab-001", name: "Lab Central SRL", cuit: "30-71234567-9", email: "contacto@labcentral.com.ar", phone: "+54 351 456-7890", address: "Av. Colón 1234, Córdoba", active: true, createdAt: "2024-06-01" },
    { id: "lab-002", name: "Bioanalítica SA", cuit: "30-70987654-3", email: "info@bioanalitica.com", phone: "+54 351 432-1098", address: "Bv. San Juan 567, Córdoba", active: true, createdAt: "2024-08-15" },
    { id: "lab-003", name: "Lab del Sol", cuit: "20-34567890-1", email: "admin@labdelsol.com.ar", phone: "+54 351 499-3456", address: "Ruta 9 km 45, Jesús María", active: true, createdAt: "2025-01-10" },
    { id: "lab-004", name: "Diagnos-Lab", cuit: "30-71122334-5", email: "recepcion@diagnoslab.com", phone: "+54 351 488-7654", address: "Caseros 890, Córdoba", active: true, createdAt: "2025-03-20" },
    { id: "lab-005", name: "Lab Puente", cuit: "20-29876543-0", email: "lab@labpuente.com", phone: "+54 351 477-2345", address: "27 de Abril 321, Córdoba", active: false, createdAt: "2025-05-01" },
];

// Invoice shape adaptor
const invoices = mockInvoices.map((inv) => ({
    id: inv.id,
    labId: "lab-001",
    labName: "Lab Central SRL",
    invoiceNumber: inv.invoiceNumber,
    amount: inv.total,
    status: inv.status,
    issuedAt: inv.period + "-01",
    dueDate: inv.dueDate,
}));

// Payment shape adaptor
const payments = mockPayments.map((p) => ({
    id: p.id,
    labId: "lab-001",
    labName: p.labName,
    invoiceId: "inv-001",
    amount: p.amount,
    status: p.status,
    receiptUrl: p.receiptFilename,
    submittedAt: p.paymentDate,
    reviewedAt: p.reviewedAt || undefined,
}));

const defaultPrices: Record<string, number> = {
    "660104": 9200, "660105": 12500, "660035": 14800, "660036": 18000,
    "660106": 22000, "660107": 18500, "660108": 15000, "660110": 25000,
    "660112": 16500, "660113": 14000, "660114": 19500, "660120": 8500,
    "660130": 11000, "660140": 16000, "660141": 14500, "660142": 18500,
    "660143": 14500, "660150": 6500,
};
let nbuCodes: NbuCode[] = NBU_COMMON_CODES.map((c) => ({ code: c.code, description: c.description, price: defaultPrices[c.code] || 10000 }));

// ============================================================================
// Samples
// ============================================================================

export const sampleStore = {
    findMany: (filters?: { labName?: string; status?: string }) => {
        let result = [...samples];
        if (filters?.labName) result = result.filter((s) => s.labName === filters.labName);
        if (filters?.status) result = result.filter((s) => s.status === filters.status);
        return result;
    },
    findById: (id: string) => samples.find((s) => s.id === id) || null,
    create: (data: Omit<Sample, "id" | "sampleCode" | "createdAt">) => {
        const id = `smp-${Date.now()}`;
        const count = samples.length + 1;
        const sample: Sample = {
            ...data,
            id,
            sampleCode: `BAC-2026-${String(count).padStart(4, "0")}`,
            createdAt: new Date().toISOString(),
        };
        samples.unshift(sample);
        return sample;
    },
    update: (id: string, data: Partial<Sample>) => {
        const idx = samples.findIndex((s) => s.id === id);
        if (idx === -1) return null;
        samples[idx] = { ...samples[idx], ...data };
        return samples[idx];
    },
};

// ============================================================================
// Labs
// ============================================================================

export const labStore = {
    findMany: () => [...labs],
    findById: (id: string) => labs.find((l) => l.id === id) || null,
    create: (data: Omit<Lab, "id" | "createdAt">) => {
        const lab: Lab = { ...data, id: `lab-${Date.now()}`, createdAt: new Date().toISOString() };
        labs.push(lab);
        return lab;
    },
    update: (id: string, data: Partial<Lab>) => {
        const idx = labs.findIndex((l) => l.id === id);
        if (idx === -1) return null;
        labs[idx] = { ...labs[idx], ...data };
        return labs[idx];
    },
};

// ============================================================================
// NBU Codes
// ============================================================================

export const nbuStore = {
    findMany: () => [...nbuCodes],
    update: (code: string, data: Partial<NbuCode>) => {
        const idx = nbuCodes.findIndex((n) => n.code === code);
        if (idx === -1) return null;
        nbuCodes[idx] = { ...nbuCodes[idx], ...data };
        return nbuCodes[idx];
    },
    bulkUpdate: (percentage: number) => {
        nbuCodes = nbuCodes.map((n) => ({
            ...n,
            price: Math.round(n.price * (1 + percentage / 100) * 100) / 100,
        }));
        return nbuCodes;
    },
};

// ============================================================================
// Invoices
// ============================================================================

export const invoiceStore = {
    findMany: (filters?: { labId?: string; status?: string }) => {
        let result = [...invoices];
        if (filters?.labId) result = result.filter((i) => i.labId === filters.labId);
        if (filters?.status) result = result.filter((i) => i.status === filters.status);
        return result;
    },
    findById: (id: string) => invoices.find((i) => i.id === id) || null,
};

// ============================================================================
// Payments
// ============================================================================

export const paymentStore = {
    findMany: (filters?: { labId?: string; status?: string }) => {
        let result = [...payments];
        if (filters?.labId) result = result.filter((p) => p.labId === filters.labId);
        if (filters?.status) result = result.filter((p) => p.status === filters.status);
        return result;
    },
    create: (data: { labId: string; labName: string; invoiceId: string; amount: number; status: string; receiptUrl?: string }) => {
        const payment = { ...data, id: `pay-${Date.now()}`, submittedAt: new Date().toISOString(), reviewedAt: undefined as string | undefined };
        payments.unshift(payment as typeof payments[0]);
        return payment;
    },
    update: (id: string, data: Record<string, unknown>) => {
        const idx = payments.findIndex((p) => p.id === id);
        if (idx === -1) return null;
        payments[idx] = { ...payments[idx], ...data } as typeof payments[0];
        return payments[idx];
    },
};
