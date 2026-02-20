"use client";

import { useState } from "react";
import { Settings, Save, Microscope, CreditCard, Shield, Bell } from "lucide-react";

export default function AdminSettingsPage() {
    const [saved, setSaved] = useState(false);
    const [settings, setSettings] = useState({
        fullName: "Dra. Lucía Martínez",
        matricula: "MP 12345",
        email: "dra.martinez@bacteriolims.com",
        phone: "+54 351 456-7890",
        mpAlias: "bacteriolims.mp",
        mpCvu: "0000003100092810000001",
        defaultClsi: "M100-Ed34",
        autoInvoice: true,
        emailNotifications: true,
    });

    const update = (field: string, value: unknown) => {
        setSettings((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-6 animate-fadeIn max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold text-clinical-900 tracking-tight">Configuración</h1>
                <p className="text-clinical-500 text-sm mt-1">Datos profesionales y preferencias del sistema</p>
            </div>

            {/* Profile */}
            <div className="card-clinical p-6">
                <h2 className="text-sm font-bold text-clinical-800 flex items-center gap-2 mb-4">
                    <Microscope className="w-4 h-4 text-corp-600" /> Datos Profesionales
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="form-label">Nombre Completo</label>
                        <input type="text" value={settings.fullName} onChange={(e) => update("fullName", e.target.value)} className="form-input" />
                    </div>
                    <div>
                        <label className="form-label">Matrícula Profesional</label>
                        <input type="text" value={settings.matricula} onChange={(e) => update("matricula", e.target.value)} className="form-input" />
                    </div>
                    <div>
                        <label className="form-label">Email</label>
                        <input type="email" value={settings.email} onChange={(e) => update("email", e.target.value)} className="form-input" />
                    </div>
                    <div>
                        <label className="form-label">Teléfono</label>
                        <input type="text" value={settings.phone} onChange={(e) => update("phone", e.target.value)} className="form-input" />
                    </div>
                </div>
            </div>

            {/* Mercado Pago */}
            <div className="card-clinical p-6">
                <h2 className="text-sm font-bold text-clinical-800 flex items-center gap-2 mb-4">
                    <CreditCard className="w-4 h-4 text-[#009ee3]" /> Mercado Pago
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="form-label">Alias</label>
                        <input type="text" value={settings.mpAlias} onChange={(e) => update("mpAlias", e.target.value)} className="form-input font-mono" />
                    </div>
                    <div>
                        <label className="form-label">CVU</label>
                        <input type="text" value={settings.mpCvu} onChange={(e) => update("mpCvu", e.target.value)} className="form-input font-mono" />
                    </div>
                </div>
            </div>

            {/* Preferences */}
            <div className="card-clinical p-6">
                <h2 className="text-sm font-bold text-clinical-800 flex items-center gap-2 mb-4">
                    <Shield className="w-4 h-4 text-clinical-500" /> Preferencias
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="form-label">Versión CLSI por defecto</label>
                        <input type="text" value={settings.defaultClsi} onChange={(e) => update("defaultClsi", e.target.value)} className="form-input max-w-xs" />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${settings.autoInvoice ? "bg-corp-600 border-corp-600" : "border-clinical-300"}`}>
                            {settings.autoInvoice && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                        <span className="text-sm text-clinical-700" onClick={() => update("autoInvoice", !settings.autoInvoice)}>Facturación automática al firmar informe</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${settings.emailNotifications ? "bg-corp-600 border-corp-600" : "border-clinical-300"}`}>
                            {settings.emailNotifications && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                        <span className="text-sm text-clinical-700" onClick={() => update("emailNotifications", !settings.emailNotifications)}>Notificaciones por email al recibir comprobantes</span>
                    </label>
                </div>
            </div>

            <button onClick={handleSave} className={`btn ${saved ? "btn-success" : "btn-primary"} btn-lg`}>
                {saved ? (<><Save className="w-4 h-4" /> ¡Guardado!</>) : (<><Save className="w-4 h-4" /> Guardar Configuración</>)}
            </button>
        </div>
    );
}
