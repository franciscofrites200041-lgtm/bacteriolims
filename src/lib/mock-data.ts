// =============================================================================
// BacterioLIMS — Mock Data for UI Development
// =============================================================================

import type {
    AdminDashboardStats,
    LabDashboardStats,
    SampleListItem,
    InvoiceWithItems,
    SessionUser,
} from "./types";

// Mock admin user
export const mockAdminUser: SessionUser = {
    id: "admin-001",
    email: "dra.martinez@bacteriolims.com",
    role: "ADMIN",
    name: "Dra. Lucía Martínez",
};

// Mock lab client user
export const mockLabUser: SessionUser = {
    id: "lab-001",
    email: "contacto@labcentral.com.ar",
    role: "LAB_CLIENT",
    name: "Laboratorio Central SRL",
    labProfileId: "lp-001",
};

// Admin dashboard stats
export const mockAdminStats: AdminDashboardStats = {
    totalSamplesMonth: 187,
    samplesInProcess: 23,
    reportsFinalized: 164,
    monthlyRevenue: 2847500,
    accountsReceivable: 1230000,
    pendingPayments: 4,
    samplesByLab: [
        { labName: "Lab Central SRL", count: 64 },
        { labName: "Bioanalítica SA", count: 48 },
        { labName: "Lab del Sol", count: 35 },
        { labName: "Diagnos-Lab", count: 22 },
        { labName: "Lab Puente", count: 18 },
    ],
    revenueByMonth: [
        { month: "Sep", revenue: 1950000 },
        { month: "Oct", revenue: 2120000 },
        { month: "Nov", revenue: 2340000 },
        { month: "Dic", revenue: 2580000 },
        { month: "Ene", revenue: 2710000 },
        { month: "Feb", revenue: 2847500 },
    ],
};

// Lab client dashboard stats
export const mockLabStats: LabDashboardStats = {
    totalSamples: 64,
    pendingReception: 3,
    inProcess: 5,
    finalized: 56,
    currentDebt: 485750,
    pendingPayments: 1,
};

// Sample list
export const mockSamples: SampleListItem[] = [
    {
        id: "s-001",
        sampleCode: "BL-2602-0001",
        status: "REPORT_FINALIZED",
        patientInitials: "M.G.",
        sampleType: "ORINA",
        labName: "Lab Central SRL",
        createdAt: "2026-02-18T09:30:00",
        completedAt: "2026-02-19T14:20:00",
    },
    {
        id: "s-002",
        sampleCode: "BL-2602-0002",
        status: "IN_PROCESS",
        patientInitials: "R.L.",
        sampleType: "SANGRE_HEMOCULTIVO",
        labName: "Lab Central SRL",
        createdAt: "2026-02-19T08:15:00",
        completedAt: null,
    },
    {
        id: "s-003",
        sampleCode: "BL-2602-0003",
        status: "IN_PROCESS",
        patientInitials: "A.S.",
        sampleType: "ESPUTO",
        labName: "Bioanalítica SA",
        createdAt: "2026-02-19T10:00:00",
        completedAt: null,
    },
    {
        id: "s-004",
        sampleCode: "BL-2602-0004",
        status: "PENDING_RECEPTION",
        patientInitials: "J.P.",
        sampleType: "SECRECION_HERIDA",
        labName: "Lab del Sol",
        createdAt: "2026-02-20T07:45:00",
        completedAt: null,
    },
    {
        id: "s-005",
        sampleCode: "BL-2602-0005",
        status: "PENDING_RECEPTION",
        patientInitials: "C.D.",
        sampleType: "HISOPADO_FARINGEO",
        labName: "Lab Central SRL",
        createdAt: "2026-02-20T08:30:00",
        completedAt: null,
    },
    {
        id: "s-006",
        sampleCode: "BL-2602-0006",
        status: "REPORT_FINALIZED",
        patientInitials: "L.M.",
        sampleType: "ORINA",
        labName: "Diagnos-Lab",
        createdAt: "2026-02-17T11:00:00",
        completedAt: "2026-02-18T16:30:00",
    },
    {
        id: "s-007",
        sampleCode: "BL-2602-0007",
        status: "REPORT_FINALIZED",
        patientInitials: "F.R.",
        sampleType: "HISOPADO_VAGINAL",
        labName: "Lab Puente",
        createdAt: "2026-02-16T09:00:00",
        completedAt: "2026-02-17T13:00:00",
    },
    {
        id: "s-008",
        sampleCode: "BL-2602-0008",
        status: "IN_PROCESS",
        patientInitials: "E.T.",
        sampleType: "LCR",
        labName: "Bioanalítica SA",
        createdAt: "2026-02-20T06:30:00",
        completedAt: null,
    },
];

// Invoices
export const mockInvoices: InvoiceWithItems[] = [
    {
        id: "inv-001",
        invoiceNumber: "BL-F-2602-001",
        period: "2026-02",
        subtotal: 485750,
        tax: 0,
        total: 485750,
        paidAmount: 0,
        balance: 485750,
        status: "PENDING",
        dueDate: "2026-03-10",
        items: [
            {
                id: "ii-001",
                nbuCode: "660107",
                sampleCode: "BL-2602-0001",
                description: "Urocultivo con recuento de colonias",
                quantity: 1,
                unitPrice: 18500,
                totalPrice: 18500,
            },
            {
                id: "ii-002",
                nbuCode: "660104",
                sampleCode: "BL-2602-0001",
                description: "Examen directo y coloración de Gram",
                quantity: 1,
                unitPrice: 9200,
                totalPrice: 9200,
            },
            {
                id: "ii-003",
                nbuCode: "660035",
                sampleCode: "BL-2602-0001",
                description: "Antibiograma por difusión en disco",
                quantity: 1,
                unitPrice: 14800,
                totalPrice: 14800,
            },
            {
                id: "ii-004",
                nbuCode: "660106",
                sampleCode: "BL-2602-0002",
                description: "Hemocultivo (cada muestra)",
                quantity: 2,
                unitPrice: 22000,
                totalPrice: 44000,
            },
            {
                id: "ii-005",
                nbuCode: "660112",
                sampleCode: "BL-2602-0003",
                description: "Cultivo de esputo",
                quantity: 1,
                unitPrice: 16500,
                totalPrice: 16500,
            },
        ],
    },
    {
        id: "inv-002",
        invoiceNumber: "BL-F-2601-001",
        period: "2026-01",
        subtotal: 432000,
        tax: 0,
        total: 432000,
        paidAmount: 432000,
        balance: 0,
        status: "PAID",
        dueDate: "2026-02-10",
        items: [],
    },
];

// Mock payments
export const mockPayments = [
    {
        id: "pay-001",
        labName: "Lab Central SRL",
        amount: 432000,
        paymentDate: "2026-02-05",
        receiptFilename: "comprobante_feb2026.pdf",
        status: "APPROVED" as const,
        reviewedAt: "2026-02-06T10:30:00",
    },
    {
        id: "pay-002",
        labName: "Bioanalítica SA",
        amount: 285000,
        paymentDate: "2026-02-18",
        receiptFilename: "transferencia_bio.jpg",
        status: "PENDING_REVIEW" as const,
        reviewedAt: null,
    },
    {
        id: "pay-003",
        labName: "Lab del Sol",
        amount: 156000,
        paymentDate: "2026-02-15",
        receiptFilename: "pago_labdelsol.png",
        status: "PENDING_REVIEW" as const,
        reviewedAt: null,
    },
    {
        id: "pay-004",
        labName: "Diagnos-Lab",
        amount: 98000,
        paymentDate: "2026-02-12",
        receiptFilename: "comprobante_diagnoslab.pdf",
        status: "REJECTED" as const,
        reviewedAt: "2026-02-13T11:00:00",
    },
];

// Admin Mercado Pago info
export const mockMPInfo = {
    alias: "bacteriolims.mp",
    cvu: "0000003100092810000001",
    holder: "Dra. Lucía Martínez",
};
