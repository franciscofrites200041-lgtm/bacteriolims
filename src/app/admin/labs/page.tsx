"use client";

import { useState } from "react";
import { Building2, Plus, Edit2, Trash2, Search, Phone, Mail, MapPin } from "lucide-react";

const initialLabs = [
    { id: "lp-001", name: "Lab Central SRL", cuit: "30-71234567-8", city: "Córdoba", province: "Córdoba", contact: "Dr. Ramírez", email: "contacto@labcentral.com.ar", phone: "0351-4567890", isActive: true },
    { id: "lp-002", name: "Bioanalítica SA", cuit: "30-70987654-3", city: "Rosario", province: "Santa Fe", contact: "Lic. Fernández", email: "info@bioanalitica.com.ar", phone: "0341-5678901", isActive: true },
    { id: "lp-003", name: "Lab del Sol", cuit: "20-34567890-1", city: "Mendoza", province: "Mendoza", contact: "Dra. López", email: "admin@labdelsol.com.ar", phone: "0261-6789012", isActive: true },
    { id: "lp-004", name: "Diagnos-Lab", cuit: "30-71122334-5", city: "San Miguel de Tucumán", province: "Tucumán", contact: "Bioq. Torres", email: "contacto@diagnoslab.com.ar", phone: "0381-7890123", isActive: true },
    { id: "lp-005", name: "Lab Puente", cuit: "27-28901234-6", city: "Buenos Aires", province: "Buenos Aires", contact: "Dr. García", email: "info@labpuente.com.ar", phone: "011-8901234", isActive: false },
];

export default function AdminLabsPage() {
    const [labs, setLabs] = useState(initialLabs);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: "", cuit: "", city: "", province: "", contact: "", email: "", phone: "" });

    const filtered = labs.filter(
        (l) =>
            !search ||
            l.name.toLowerCase().includes(search.toLowerCase()) ||
            l.cuit.includes(search) ||
            l.city.toLowerCase().includes(search.toLowerCase())
    );

    const openNew = () => {
        setFormData({ name: "", cuit: "", city: "", province: "", contact: "", email: "", phone: "" });
        setEditingId(null);
        setShowForm(true);
    };

    const openEdit = (lab: typeof initialLabs[0]) => {
        setFormData({ name: lab.name, cuit: lab.cuit, city: lab.city, province: lab.province, contact: lab.contact, email: lab.email, phone: lab.phone });
        setEditingId(lab.id);
        setShowForm(true);
    };

    const handleSave = () => {
        if (editingId) {
            setLabs((prev) => prev.map((l) => (l.id === editingId ? { ...l, ...formData } : l)));
        } else {
            setLabs((prev) => [...prev, { id: `lp-${Date.now()}`, ...formData, isActive: true }]);
        }
        setShowForm(false);
    };

    const toggleActive = (id: string) => {
        setLabs((prev) => prev.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l)));
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-clinical-900 tracking-tight">Laboratorios Clientes</h1>
                    <p className="text-clinical-500 text-sm mt-1">Gestión de entidades derivadoras</p>
                </div>
                <button onClick={openNew} className="btn btn-primary">
                    <Plus className="w-4 h-4" /> Nuevo Laboratorio
                </button>
            </div>

            {/* Search */}
            <div className="card-clinical p-4">
                <div className="relative">
                    <Search className="w-4 h-4 text-clinical-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="form-input pl-9" placeholder="Buscar por nombre, CUIT o ciudad..." />
                </div>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="card-clinical p-6 border-corp-200 animate-fadeIn">
                    <h2 className="text-base font-bold text-clinical-900 mb-4">
                        {editingId ? "Editar Laboratorio" : "Nuevo Laboratorio"}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="form-label">Nombre / Razón Social</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="form-input" placeholder="Lab Ejemplo SRL" />
                        </div>
                        <div>
                            <label className="form-label">CUIT</label>
                            <input type="text" value={formData.cuit} onChange={(e) => setFormData({ ...formData, cuit: e.target.value })} className="form-input" placeholder="30-12345678-9" />
                        </div>
                        <div>
                            <label className="form-label">Ciudad</label>
                            <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="form-input" placeholder="Córdoba" />
                        </div>
                        <div>
                            <label className="form-label">Provincia</label>
                            <input type="text" value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} className="form-input" />
                        </div>
                        <div>
                            <label className="form-label">Contacto</label>
                            <input type="text" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} className="form-input" placeholder="Dr./Dra./Bioq." />
                        </div>
                        <div>
                            <label className="form-label">Email</label>
                            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="form-input" />
                        </div>
                        <div>
                            <label className="form-label">Teléfono</label>
                            <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="form-input" />
                        </div>
                    </div>
                    <div className="flex gap-2 mt-5">
                        <button onClick={handleSave} className="btn btn-primary">{editingId ? "Guardar Cambios" : "Crear Laboratorio"}</button>
                        <button onClick={() => setShowForm(false)} className="btn btn-secondary">Cancelar</button>
                    </div>
                </div>
            )}

            {/* Labs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((lab) => (
                    <div key={lab.id} className={`card-clinical p-5 ${!lab.isActive ? "opacity-50" : ""}`}>
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-corp-50 rounded-xl flex items-center justify-center border border-corp-100">
                                    <Building2 className="w-5 h-5 text-corp-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-clinical-800">{lab.name}</h3>
                                    <p className="text-[11px] text-clinical-400 font-mono">{lab.cuit}</p>
                                </div>
                            </div>
                            <span className={`status-badge ${lab.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-600 border-red-200"}`}>
                                {lab.isActive ? "Activo" : "Inactivo"}
                            </span>
                        </div>

                        <div className="space-y-1.5 mb-4">
                            <div className="flex items-center gap-2 text-xs text-clinical-500">
                                <MapPin className="w-3 h-3" /> {lab.city}, {lab.province}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-clinical-500">
                                <Mail className="w-3 h-3" /> {lab.email}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-clinical-500">
                                <Phone className="w-3 h-3" /> {lab.phone}
                            </div>
                        </div>

                        <div className="flex gap-2 pt-3 border-t border-clinical-100">
                            <button onClick={() => openEdit(lab)} className="btn btn-ghost btn-sm flex-1 text-xs">
                                <Edit2 className="w-3 h-3" /> Editar
                            </button>
                            <button onClick={() => toggleActive(lab.id)} className={`btn btn-sm flex-1 text-xs ${lab.isActive ? "btn-ghost text-red-600" : "btn-ghost text-emerald-600"}`}>
                                {lab.isActive ? "Desactivar" : "Activar"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
