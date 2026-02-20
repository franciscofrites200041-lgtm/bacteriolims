"use client";

import { useState, useCallback } from "react";
import {
    mockLabStats,
    mockInvoices,
    mockMPInfo,
} from "@/lib/mock-data";
import {
    formatCurrency,
    getStatusColor,
    getStatusLabel,
} from "@/lib/utils";
import {
    CreditCard,
    Upload,
    FileText,
    CheckCircle2,
    XCircle,
    Clock,
    Copy,
    Check,
    AlertCircle,
    Download,
    Image as ImageIcon,
    X,
    ChevronDown,
    ChevronUp,
    DollarSign,
    ArrowUpRight,
    Receipt,
    Banknote,
} from "lucide-react";

export default function LabPaymentsPage() {
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-clinical-900 tracking-tight">
                    Finanzas y Pagos
                </h1>
                <p className="text-clinical-500 text-sm mt-1">
                    Estado de cuenta y gestión de comprobantes de pago
                </p>
            </div>

            {/* Finance Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="stat-card">
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-4.5 h-4.5 text-red-600" />
                        </div>
                    </div>
                    <p className="text-xl font-bold text-clinical-900 tracking-tight">
                        {formatCurrency(mockLabStats.currentDebt)}
                    </p>
                    <p className="text-xs text-clinical-500 mt-1.5 font-medium">
                        Saldo Deudor Actual
                    </p>
                </div>

                <div className="stat-card">
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center">
                            <Clock className="w-4.5 h-4.5 text-amber-600" />
                        </div>
                    </div>
                    <p className="text-xl font-bold text-clinical-900 tracking-tight">
                        {mockLabStats.pendingPayments}
                    </p>
                    <p className="text-xs text-clinical-500 mt-1.5 font-medium">
                        Pagos en Revisión
                    </p>
                </div>

                <div className="stat-card">
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center">
                            <Banknote className="w-4.5 h-4.5 text-emerald-600" />
                        </div>
                    </div>
                    <p className="text-xl font-bold text-clinical-900 tracking-tight">
                        {mockLabStats.totalSamples}
                    </p>
                    <p className="text-xs text-clinical-500 mt-1.5 font-medium">
                        Análisis del Período
                    </p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left: Invoices & Payment History */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Current Invoices */}
                    <div className="card-clinical overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-clinical-100">
                            <div className="flex items-center gap-2">
                                <Receipt className="w-4 h-4 text-clinical-500" />
                                <h2 className="text-sm font-semibold text-clinical-800">
                                    Estado de Cuenta
                                </h2>
                            </div>
                        </div>

                        <div className="divide-y divide-clinical-100">
                            {mockInvoices.map((invoice) => (
                                <div key={invoice.id} className="px-6 py-4">
                                    <div
                                        className="flex items-center justify-between cursor-pointer group"
                                        onClick={() =>
                                            setExpandedInvoice(
                                                expandedInvoice === invoice.id ? null : invoice.id
                                            )
                                        }
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-clinical-50 rounded-lg flex items-center justify-center border border-clinical-200">
                                                <FileText className="w-4.5 h-4.5 text-clinical-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-clinical-800">
                                                    {invoice.invoiceNumber}
                                                </p>
                                                <p className="text-xs text-clinical-400 mt-0.5">
                                                    Período:{" "}
                                                    {new Date(invoice.period + "-01").toLocaleDateString(
                                                        "es-AR",
                                                        { month: "long", year: "numeric" }
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-clinical-900 tabular-nums">
                                                    {formatCurrency(invoice.total)}
                                                </p>
                                                {invoice.balance > 0 && (
                                                    <p className="text-[11px] text-red-600 font-medium mt-0.5">
                                                        Saldo: {formatCurrency(invoice.balance)}
                                                    </p>
                                                )}
                                            </div>
                                            <span
                                                className={`status-badge ${getStatusColor(invoice.status)}`}
                                            >
                                                {getStatusLabel(invoice.status)}
                                            </span>
                                            {expandedInvoice === invoice.id ? (
                                                <ChevronUp className="w-4 h-4 text-clinical-400" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4 text-clinical-400" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Expanded Invoice Detail */}
                                    {expandedInvoice === invoice.id &&
                                        invoice.items.length > 0 && (
                                            <div className="mt-4 animate-fadeIn">
                                                <div className="bg-clinical-50 rounded-xl overflow-hidden border border-clinical-200">
                                                    <table className="data-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Código NBU</th>
                                                                <th>Muestra</th>
                                                                <th>Descripción</th>
                                                                <th className="text-right">Cant.</th>
                                                                <th className="text-right">P. Unitario</th>
                                                                <th className="text-right">Subtotal</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {invoice.items.map((item) => (
                                                                <tr key={item.id}>
                                                                    <td>
                                                                        <span className="font-mono text-xs font-semibold text-corp-600">
                                                                            {item.nbuCode}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="font-mono text-xs text-clinical-500">
                                                                            {item.sampleCode}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs">
                                                                        {item.description}
                                                                    </td>
                                                                    <td className="text-right tabular-nums">
                                                                        {item.quantity}
                                                                    </td>
                                                                    <td className="text-right tabular-nums">
                                                                        {formatCurrency(item.unitPrice)}
                                                                    </td>
                                                                    <td className="text-right tabular-nums font-semibold">
                                                                        {formatCurrency(item.totalPrice)}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td
                                                                    colSpan={5}
                                                                    className="text-right font-semibold text-sm text-clinical-800 border-t border-clinical-200 pt-3"
                                                                >
                                                                    Total
                                                                </td>
                                                                <td className="text-right font-bold text-sm text-clinical-900 border-t border-clinical-200 pt-3 tabular-nums">
                                                                    {formatCurrency(invoice.total)}
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Payment Panel */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Mercado Pago Info Card */}
                    <div className="card-clinical p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-8 h-8 bg-[#009ee3]/10 rounded-lg flex items-center justify-center">
                                <CreditCard className="w-4 h-4 text-[#009ee3]" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-clinical-800">
                                    Datos de Pago
                                </h3>
                                <p className="text-[11px] text-clinical-400">Mercado Pago</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Alias */}
                            <div className="bg-clinical-50 rounded-xl p-4 border border-clinical-200">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-clinical-400 mb-1.5">
                                    Alias
                                </p>
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-bold text-clinical-800 font-mono tracking-wide">
                                        {mockMPInfo.alias}
                                    </p>
                                    <button
                                        onClick={() =>
                                            copyToClipboard(mockMPInfo.alias, "alias")
                                        }
                                        className="btn btn-ghost btn-sm"
                                        title="Copiar alias"
                                    >
                                        {copiedField === "alias" ? (
                                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* CVU */}
                            <div className="bg-clinical-50 rounded-xl p-4 border border-clinical-200">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-clinical-400 mb-1.5">
                                    CVU
                                </p>
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-bold text-clinical-800 font-mono tracking-wide break-all">
                                        {mockMPInfo.cvu}
                                    </p>
                                    <button
                                        onClick={() => copyToClipboard(mockMPInfo.cvu, "cvu")}
                                        className="btn btn-ghost btn-sm flex-shrink-0"
                                        title="Copiar CVU"
                                    >
                                        {copiedField === "cvu" ? (
                                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Holder */}
                            <div className="bg-clinical-50 rounded-xl p-4 border border-clinical-200">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-clinical-400 mb-1.5">
                                    Titular
                                </p>
                                <p className="text-sm font-semibold text-clinical-700">
                                    {mockMPInfo.holder}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 p-3 bg-blue-50 rounded-xl border border-blue-100">
                            <div className="flex gap-2">
                                <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                <p className="text-[11px] text-blue-700 leading-relaxed">
                                    Realice la transferencia desde su app bancaria y luego suba el
                                    comprobante en el formulario inferior.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Upload Receipt Form */}
                    <div className="card-clinical p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <Upload className="w-4 h-4 text-clinical-500" />
                                <h3 className="text-sm font-semibold text-clinical-800">
                                    Subir Comprobante
                                </h3>
                            </div>
                        </div>

                        <PaymentUploadForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// Payment Upload Form with Drag & Drop
// =============================================================================
function PaymentUploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [amount, setAmount] = useState("");
    const [paymentDate, setPaymentDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileSelect(droppedFile);
        }
    }, []);

    const handleFileSelect = (selectedFile: File) => {
        const validTypes = [
            "application/pdf",
            "image/jpeg",
            "image/jpg",
            "image/png",
        ];
        if (!validTypes.includes(selectedFile.type)) {
            alert("Solo se aceptan archivos PDF, JPG o PNG.");
            return;
        }
        if (selectedFile.size > 10 * 1024 * 1024) {
            alert("El archivo no debe superar los 10 MB.");
            return;
        }

        setFile(selectedFile);

        if (selectedFile.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFilePreview(e.target?.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setFilePreview(null);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            handleFileSelect(selectedFile);
        }
    };

    const removeFile = () => {
        setFile(null);
        setFilePreview(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !amount) return;

        setIsSubmitting(true);
        // Simular envío
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset después de 3 segundos
        setTimeout(() => {
            setIsSubmitted(false);
            setFile(null);
            setFilePreview(null);
            setAmount("");
            setNotes("");
        }, 3000);
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-8 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                </div>
                <h4 className="text-base font-bold text-clinical-800">
                    ¡Comprobante enviado!
                </h4>
                <p className="text-sm text-clinical-500 mt-1.5 max-w-[260px] mx-auto">
                    Su pago será revisado por el equipo administrativo en las próximas
                    horas.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount */}
            <div>
                <label htmlFor="payment-amount" className="form-label">
                    Monto transferido (ARS)
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-clinical-400 text-sm font-semibold">
                        $
                    </span>
                    <input
                        id="payment-amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="form-input pl-7 tabular-nums"
                        placeholder="0.00"
                        required
                        min="1"
                        step="0.01"
                    />
                </div>
            </div>

            {/* Date */}
            <div>
                <label htmlFor="payment-date" className="form-label">
                    Fecha de la transferencia
                </label>
                <input
                    id="payment-date"
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="form-input tabular-nums"
                    required
                />
            </div>

            {/* Dropzone */}
            <div>
                <label className="form-label">Comprobante de pago</label>
                {!file ? (
                    <div
                        className={`dropzone ${isDragging ? "active" : ""}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() =>
                            document.getElementById("receipt-file-input")?.click()
                        }
                    >
                        <input
                            id="receipt-file-input"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileInput}
                            className="hidden"
                        />
                        <div className="space-y-3">
                            <div className="w-12 h-12 bg-clinical-100 rounded-xl flex items-center justify-center mx-auto">
                                <Upload className="w-5 h-5 text-clinical-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-clinical-700">
                                    Arrastre el comprobante aquí
                                </p>
                                <p className="text-xs text-clinical-400 mt-1">
                                    o haga clic para seleccionar · PDF, JPG, PNG · Máx. 10 MB
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="dropzone accepted relative">
                        <button
                            type="button"
                            onClick={removeFile}
                            className="absolute top-3 right-3 w-7 h-7 bg-white rounded-lg shadow-sm border border-clinical-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors group"
                        >
                            <X className="w-3.5 h-3.5 text-clinical-400 group-hover:text-red-500" />
                        </button>

                        {filePreview ? (
                            <div className="space-y-3">
                                <img
                                    src={filePreview}
                                    alt="Preview del comprobante"
                                    className="max-h-[160px] rounded-lg mx-auto border border-clinical-200 shadow-sm"
                                />
                                <p className="text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    {file.name}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto">
                                    <FileText className="w-5 h-5 text-emerald-600" />
                                </div>
                                <p className="text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    {file.name}
                                </p>
                                <p className="text-[11px] text-clinical-400">
                                    {(file.size / 1024).toFixed(0)} KB
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Notes */}
            <div>
                <label htmlFor="payment-notes" className="form-label">
                    Observaciones{" "}
                    <span className="text-clinical-400 font-normal">(opcional)</span>
                </label>
                <textarea
                    id="payment-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="form-input resize-none"
                    rows={2}
                    placeholder="Ej: Pago parcial correspondiente a febrero"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={!file || !amount || isSubmitting}
                className="btn btn-primary w-full"
            >
                {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <Upload className="w-4 h-4" />
                        Enviar Comprobante a Revisión
                    </>
                )}
            </button>
        </form>
    );
}
