import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function generateSampleCode(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `BL-${year}${month}-${random}`;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING_RECEPTION: "bg-amber-50 text-amber-700 border-amber-200",
    IN_PROCESS: "bg-blue-50 text-blue-700 border-blue-200",
    REPORT_FINALIZED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    DELIVERED: "bg-slate-50 text-slate-500 border-slate-200",
    PENDING_REVIEW: "bg-amber-50 text-amber-700 border-amber-200",
    APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    PARTIALLY_PAID: "bg-blue-50 text-blue-700 border-blue-200",
    PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
    OVERDUE: "bg-red-50 text-red-700 border-red-200",
    DRAFT: "bg-slate-50 text-slate-500 border-slate-200",
    CANCELLED: "bg-slate-50 text-slate-400 border-slate-200",
  };
  return colors[status] || "bg-slate-50 text-slate-500 border-slate-200";
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING_RECEPTION: "Pendiente de Recepción",
    IN_PROCESS: "En Proceso Analítico",
    REPORT_FINALIZED: "Informe Finalizado",
    DELIVERED: "Entregado",
    PENDING_REVIEW: "Pendiente de Revisión",
    APPROVED: "Aprobado",
    REJECTED: "Rechazado",
    PENDING: "Pendiente",
    PARTIALLY_PAID: "Parcialmente Pagado",
    PAID: "Pagado",
    OVERDUE: "Vencido",
    DRAFT: "Borrador",
    CANCELLED: "Cancelado",
  };
  return labels[status] || status;
}
