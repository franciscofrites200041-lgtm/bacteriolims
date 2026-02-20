import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BacterioLIMS — Sistema de Gestión de Laboratorio",
  description:
    "Plataforma LIMS de alta complejidad para gestión de diagnósticos bacteriológicos tercerizados. Diseñado para profesionales bacteriólogos en Argentina.",
  keywords: ["LIMS", "bacteriología", "laboratorio", "diagnóstico", "Argentina", "NBU"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
