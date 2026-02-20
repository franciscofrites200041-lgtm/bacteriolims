// =============================================================================
// BacterioLIMS — Constantes del Sistema
// =============================================================================

export const APP_NAME = "BacterioLIMS";
export const APP_DESCRIPTION = "Sistema de Gestión de Laboratorio de Alta Complejidad";

// Tipos de muestra con labels legibles
export const SAMPLE_TYPES = [
    { value: "ORINA", label: "Orina" },
    { value: "SANGRE_HEMOCULTIVO", label: "Sangre / Hemocultivo" },
    { value: "ESPUTO", label: "Esputo" },
    { value: "SECRECION_HERIDA", label: "Secreción de Herida" },
    { value: "LCR", label: "Líquido Cefalorraquídeo (LCR)" },
    { value: "HISOPADO_FARINGEO", label: "Hisopado Faríngeo" },
    { value: "HISOPADO_NASAL", label: "Hisopado Nasal" },
    { value: "HISOPADO_VAGINAL", label: "Hisopado Vaginal" },
    { value: "HISOPADO_RECTAL", label: "Hisopado Rectal" },
    { value: "MATERIA_FECAL", label: "Materia Fecal" },
    { value: "LIQUIDO_PLEURAL", label: "Líquido Pleural" },
    { value: "LIQUIDO_ASCITICO", label: "Líquido Ascítico" },
    { value: "CATETER", label: "Catéter" },
    { value: "OTRO", label: "Otro" },
] as const;

// Leucocitos por campo
export const LEUKOCYTE_RANGES = [
    "0-5/campo",
    "5-10/campo",
    "10-20/campo",
    "20-50/campo",
    ">50/campo",
    "Incontables",
] as const;

// Reacción inflamatoria
export const INFLAMMATORY_REACTION = [
    "Ausente",
    "Leve",
    "Moderada",
    "Severa",
] as const;

// Criterios de Kass para UFC en orina
export const KASS_CRITERIA = [
    { value: "<10.000 UFC/ml", label: "<10.000 UFC/ml — No significativo" },
    { value: "10.000-100.000 UFC/ml", label: "10.000-100.000 UFC/ml — Dudoso" },
    { value: ">100.000 UFC/ml", label: ">100.000 UFC/ml — Significativo" },
] as const;

// Resultados Ziehl-Neelsen (BAAR)
export const BAAR_RESULTS = [
    "Negativo",
    "Positivo (+)",
    "Positivo (++)",
    "Positivo (+++)",
] as const;

// Antibióticos organizados por grupo farmacológico
export const ANTIBIOTIC_GROUPS = [
    {
        group: "Penicilinas",
        antibiotics: [
            { name: "Ampicilina", disk: "10 µg" },
            { name: "Amoxicilina/Ác. Clavulánico", disk: "20/10 µg" },
            { name: "Ampicilina/Sulbactam", disk: "10/10 µg" },
            { name: "Piperacilina/Tazobactam", disk: "100/10 µg" },
        ],
    },
    {
        group: "Cefalosporinas 1ra Gen",
        antibiotics: [
            { name: "Cefalotina", disk: "30 µg" },
            { name: "Cefalexina", disk: "30 µg" },
        ],
    },
    {
        group: "Cefalosporinas 2da Gen",
        antibiotics: [
            { name: "Cefuroxima", disk: "30 µg" },
            { name: "Cefoxitina*", disk: "30 µg" },
        ],
    },
    {
        group: "Cefalosporinas 3ra Gen",
        antibiotics: [
            { name: "Ceftriaxona", disk: "30 µg" },
            { name: "Ceftazidima", disk: "30 µg" },
            { name: "Cefotaxima", disk: "30 µg" },
        ],
    },
    {
        group: "Cefalosporinas 4ta Gen",
        antibiotics: [
            { name: "Cefepima", disk: "30 µg" },
        ],
    },
    {
        group: "Carbapenemes",
        antibiotics: [
            { name: "Imipenem", disk: "10 µg" },
            { name: "Meropenem", disk: "10 µg" },
            { name: "Ertapenem", disk: "10 µg" },
        ],
    },
    {
        group: "Aminoglucósidos",
        antibiotics: [
            { name: "Gentamicina", disk: "10 µg" },
            { name: "Amikacina", disk: "30 µg" },
            { name: "Tobramicina", disk: "10 µg" },
        ],
    },
    {
        group: "Fluoroquinolonas",
        antibiotics: [
            { name: "Ciprofloxacina", disk: "5 µg" },
            { name: "Levofloxacina", disk: "5 µg" },
            { name: "Norfloxacina", disk: "10 µg" },
        ],
    },
    {
        group: "Sulfonamidas",
        antibiotics: [
            { name: "Trimetoprima/Sulfametoxazol", disk: "1.25/23.75 µg" },
        ],
    },
    {
        group: "Tetraciclinas",
        antibiotics: [
            { name: "Tetraciclina", disk: "30 µg" },
            { name: "Minociclina", disk: "30 µg" },
            { name: "Tigeciclina", disk: "15 µg" },
        ],
    },
    {
        group: "Macrólidos",
        antibiotics: [
            { name: "Eritromicina", disk: "15 µg" },
            { name: "Azitromicina", disk: "15 µg" },
            { name: "Claritromicina", disk: "15 µg" },
        ],
    },
    {
        group: "Lincosamidas",
        antibiotics: [
            { name: "Clindamicina", disk: "2 µg" },
        ],
    },
    {
        group: "Glucopéptidos",
        antibiotics: [
            { name: "Vancomicina", disk: "30 µg" },
            { name: "Teicoplanina", disk: "30 µg" },
        ],
    },
    {
        group: "Polimixinas",
        antibiotics: [
            { name: "Colistina", disk: "CIM" },
        ],
    },
    {
        group: "Otros",
        antibiotics: [
            { name: "Nitrofurantoína", disk: "300 µg" },
            { name: "Fosfomicina", disk: "200 µg" },
            { name: "Rifampicina", disk: "5 µg" },
            { name: "Linezolid", disk: "30 µg" },
            { name: "Cloranfenicol", disk: "30 µg" },
        ],
    },
] as const;

// Interpretaciones CLSI
export const CLSI_INTERPRETATIONS = [
    { value: "S", label: "Sensible", color: "text-emerald-700 bg-emerald-50" },
    { value: "R", label: "Resistente", color: "text-red-700 bg-red-50" },
    { value: "I", label: "Intermedio", color: "text-amber-700 bg-amber-50" },
    { value: "SDD", label: "Sensible Dosis-Dep.", color: "text-blue-700 bg-blue-50" },
] as const;

// Mecanismos de Resistencia
export const CARBAPENEMASE_TYPES = ["KPC", "NDM", "OXA-48", "VIM", "IMP"] as const;
export const VRE_TYPES = ["VanA", "VanB"] as const;

export const RESISTANCE_DETECTION_METHODS = {
    blee: ["Doble disco (Jarlier)", "Tiras E-test BLEE", "Automatizado"],
    mrsa: ["Disco Cefoxitina 30µg", "Látex PBP2a", "PCR mecA"],
    carbapenemase: ["mCIM/eCIM", "CarbaNP", "Hodge modificado", "Blue-Carba", "Inmunocromatografía"],
    ampc: ["Disco Cefoxitina + Cloxacilina", "AmpC E-test"],
} as const;

// Códigos NBU argentinos más comunes en bacteriología
export const NBU_COMMON_CODES = [
    { code: "660104", description: "Examen directo y coloración de Gram", category: "Examen Directo" },
    { code: "660105", description: "Cultivo de gérmenes comunes", category: "Cultivo" },
    { code: "660035", description: "Antibiograma por difusión en disco", category: "Antibiograma" },
    { code: "660036", description: "CIM por método de dilución", category: "Antibiograma" },
    { code: "660106", description: "Hemocultivo (cada muestra)", category: "Cultivo" },
    { code: "660107", description: "Urocultivo con recuento de colonias", category: "Cultivo" },
    { code: "660108", description: "Coprocultivo", category: "Cultivo" },
    { code: "660110", description: "Cultivo de LCR", category: "Cultivo" },
    { code: "660112", description: "Cultivo de esputo", category: "Cultivo" },
    { code: "660113", description: "Cultivo de secreciones", category: "Cultivo" },
    { code: "660114", description: "Cultivo de catéter", category: "Cultivo" },
    { code: "660120", description: "Investigación de BAAR (Ziehl-Neelsen)", category: "Examen Directo" },
    { code: "660130", description: "Pruebas bioquímicas de identificación", category: "Identificación" },
    { code: "660140", description: "Detección de mecanismos de resistencia", category: "Resistencia" },
    { code: "660141", description: "Detección de BLEE", category: "Resistencia" },
    { code: "660142", description: "Detección de carbapenemasas", category: "Resistencia" },
    { code: "660143", description: "Detección de MRSA", category: "Resistencia" },
    { code: "660150", description: "Examen en fresco", category: "Examen Directo" },
] as const;
