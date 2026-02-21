"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/store";
import {
  Microscope,
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  Activity,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const login = useAuthStore((s) => s.login);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  // If already authenticated, redirect
  if (isAuthenticated && user) {
    if (typeof window !== "undefined") {
      window.location.href =
        user.role === "ADMIN" ? "/admin" : "/lab";
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Determine redirect based on email
        const isAdmin = email.includes("admin");
        window.location.href = isAdmin ? "/admin" : "/lab";
      } else {
        setError("Credenciales inválidas. Verifique su email y contraseña.");
        setIsLoading(false);
      }
    } catch {
      setError("Error de conexión. Intente nuevamente.");
      setIsLoading(false);
    }
  };

  const quickLogin = async (role: "ADMIN" | "LAB_CLIENT") => {
    setIsLoading(true);
    const demoEmail = role === "ADMIN" ? "admin@bacteriolims.com" : "lab@labcentral.com";
    const success = await login(demoEmail, role === "ADMIN" ? "admin123" : "lab123");
    if (success) {
      window.location.href = role === "ADMIN" ? "/admin" : "/lab";
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0c4a6e] flex-col justify-between p-12">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-16 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-blue-300/5 rounded-full blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
              <Microscope className="w-5 h-5 text-cyan-300" />
            </div>
            <span className="text-white/90 font-semibold text-lg tracking-tight">
              BacterioLIMS
            </span>
          </div>
          <p className="text-white/40 text-sm mt-1">
            Sistema de Gestión de Laboratorio v1.0
          </p>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold text-white leading-tight mb-6">
            Diagnósticos bacteriológicos
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              de alta complejidad
            </span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed mb-8">
            Plataforma integral para la gestión de muestras microbiológicas,
            informes clínicos y facturación automatizada con nomenclador NBU.
            Diseñado para bacteriólogos especialistas en Argentina.
          </p>

          <div className="space-y-4">
            {[
              {
                icon: Activity,
                title: "Trazabilidad completa",
                desc: "Seguimiento en tiempo real del estado de cada muestra",
              },
              {
                icon: Shield,
                title: "Normativas CLSI M100",
                desc: "Antibiogramas alineados a estándares internacionales",
              },
              {
                icon: Microscope,
                title: "Nomenclador NBU dinámico",
                desc: "Facturación automática con aranceles actualizables",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <p className="text-white/90 text-sm font-semibold">
                    {item.title}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/25 text-xs">
            © 2026 BacterioLIMS — Software de uso profesional exclusivo
          </p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 bg-[#1e3a5f] rounded-xl flex items-center justify-center">
              <Microscope className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-clinical-800 font-bold text-lg tracking-tight">
              BacterioLIMS
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-clinical-900 tracking-tight">
              Iniciar sesión
            </h2>
            <p className="text-clinical-500 text-sm mt-1.5">
              Ingrese sus credenciales para acceder al sistema
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium animate-fadeIn">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="profesional@laboratorio.com.ar"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pr-11"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-clinical-400 hover:text-clinical-600 transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full btn-lg group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Acceder al sistema
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Demo Quick Access */}
          <div className="mt-8 pt-6 border-t border-clinical-200">
            <p className="text-clinical-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Acceso demo rápido
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => quickLogin("ADMIN")}
                disabled={isLoading}
                className="btn btn-secondary btn-sm text-xs group"
              >
                <Shield className="w-3.5 h-3.5 text-corp-600" />
                Administrador
              </button>
              <button
                onClick={() => quickLogin("LAB_CLIENT")}
                disabled={isLoading}
                className="btn btn-secondary btn-sm text-xs group"
              >
                <Microscope className="w-3.5 h-3.5 text-emerald-600" />
                Laboratorio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
