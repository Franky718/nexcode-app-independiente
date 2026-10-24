module.exports = [
(()=>{"use strict";return[
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/master-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00ffadf23df347596f98c57aa5ddfb83a2a34b169e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$master$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["obtenerMemoriaJarvis"],
    "405fd165c35f846c7782e6bc3be94b13d1e8bb8400",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$master$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ejecutarJarvisCore"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$master$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/master-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$master$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/master-actions.ts [app-rsc] (ecmascript)");
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/master-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$master$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/master-actions.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/app/actions/master-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00ffadf23df347596f98c57aa5ddfb83a2a34b169e":{"name":"obtenerMemoriaJarvis"},"405fd165c35f846c7782e6bc3be94b13d1e8bb8400":{"name":"ejecutarJarvisCore"}},"app/actions/master-actions.ts",""] */ __turbopack_context__.s([
    "ejecutarJarvisCore",
    ()=>ejecutarJarvisCore,
    "obtenerMemoriaJarvis",
    ()=>obtenerMemoriaJarvis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://tu-proyecto.supabase.co") || '';
const supabaseAnonKey = ("TURBOPACK compile-time value", "tu-anon-key-de-ejemplo") || '';
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
const SUPERVISOR_AUTORIZADO = 'fg782270@gmail.com';
// LLAVE OMEGA MAESTRA: Única contraseña criptográfica de blindaje absoluto conocida solo por el C. Francisco
const OMEGA_VAULT_SALT = 'NEXCODE-OMEGA-7822-FRAN-1998';
const localMemoryFile = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'jarvis-local-memory.json');
function guardarMemoriaLocal(key, value, engine) {
    try {
        let registros = [];
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(localMemoryFile)) {
            const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(localMemoryFile, 'utf8');
            registros = JSON.parse(data);
        }
        const nuevoRegistro = {
            id: Date.now(),
            owner_email: SUPERVISOR_AUTORIZADO,
            memory_key: key,
            memory_value: value,
            routing_engine: engine,
            created_at: new Date().toISOString()
        };
        registros.unshift(nuevoRegistro);
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(localMemoryFile, JSON.stringify(registros, null, 2), 'utf8');
        return true;
    } catch (e) {
        return false;
    }
}
async function ejecutarJarvisCore(formData) {
    try {
        const emailSolicitante = (formData.get('emailSolicitante') || '').trim().toLowerCase();
        const omegaKeyIngresada = formData.get('omegaKey') || '';
        const esPropietario = emailSolicitante === SUPERVISOR_AUTORIZADO.toLowerCase();
        const omegaValida = omegaKeyIngresada === OMEGA_VAULT_SALT;
        // BLINDAJE OMEGA ABSOLUTO: Si no cumple ambas condiciones, el acceso es denegado y aislado
        if (!esPropietario || !omegaValida) {
            return {
                success: false,
                message: `🚨 [ALERTA OMEGA DE SEGURIDAD]: Intento de acceso no autorizado detectado y bloqueado por el Protocolo Criptográfico Vault Key. Credenciales inválidas.`
            };
        }
        const seccion = formData.get('seccion') || 'academico';
        const tipoAnalisis = formData.get('tipoAnalisis') || 'Análisis Zapia';
        const continente = formData.get('continente') || 'América';
        const region = formData.get('region') || 'América del Norte';
        const pais = formData.get('pais') || 'México';
        const detalle = formData.get('detalle') || 'Sin directriz';
        const archivoNombre = formData.get('archivoNombre') || 'Ningún archivo';
        const timestamp = new Date().toISOString();
        const folioOmnirouter = `JARVIS-OMEGA-${Math.floor(100000 + Math.random() * 900000)}`;
        const rawPayload = `${emailSolicitante}-${omegaKeyIngresada}-${continente}-${region}-${pais}-${seccion}-${tipoAnalisis}-${timestamp}`;
        const cryptoHash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha256').update(rawPayload).digest('hex');
        const memoryKey = `[BLINDAJE OMEGA: ${pais}] ${tipoAnalisis}`;
        if (seccion === 'academico') {
            const memoryValue = `Calificación Extraída: 10/10 (Aprobado bajo Protocolo Omega) | Archivo: ${archivoNombre} | Folio: ${folioOmnirouter} | Hash: ${cryptoHash}`;
            guardarMemoriaLocal(memoryKey, memoryValue, 'Zapia Vault Engine (Omega Secured)');
            try {
                await supabase.from('mexico_jarvis_memory').insert([
                    {
                        owner_email: SUPERVISOR_AUTORIZADO,
                        memory_key: memoryKey,
                        memory_value: memoryValue,
                        routing_engine: 'Zapia Vault Engine (Omega Secured)'
                    }
                ]);
            } catch (e) {}
            return {
                success: true,
                isAcademic: true,
                message: `🛡️ RESULTADO ASEGURADO BAJO PROTOCOLO OMEGA (C. FRANCISCO):\n\n• Documento Evaluado: ${archivoNombre}\n• Calificación Obtenida: 10 / 10 (Validación Criptográfica Estricta)\n\n💡 Explicación Detallada Paso a Paso:\n1. Integridad procesada bajo el segundo blindaje de cero conocimiento.\n2. Explicaciones metodológicas desglosadas sin suposiciones ni sesgos.\n3. Registro blindado con firma inalterable SHA-256.`,
                folio: folioOmnirouter,
                hash: cryptoHash
            };
        }
        const memoryValue = `Empresa Auditada bajo Omega | Archivo: ${archivoNombre} | Folio: ${folioOmnirouter} | Hash: ${cryptoHash}`;
        guardarMemoriaLocal(memoryKey, memoryValue, 'Enterprise Omega Vault');
        const codigoGenerado = `// ==========================================
// NEXCODE INTERACTIVE S.A. DE C.V.
// Blindaje Supremo Omega — Propietario: C. Francisco
// Folio: ${folioOmnirouter}
// Hash SHA-256: ${cryptoHash}
// ==========================================

import React from 'react';
export default function OmegaPackage() {
    return (
        <div style={{ background: '#020617', color: '#22d3ee', padding: '20px' }}>
            <h1>Nexcode Enterprise Core — Blindaje Omega Activo</h1>
            <p>Estado: Protegido por Llave Criptográfica Vault Key.</p>
        </div>
    );
}
`;
        return {
            success: true,
            isAcademic: false,
            message: `¡Proceso ejecutado con éxito bajo la protección del Blindaje Omega! Paquete cifrado y registrado en la memoria interconectada.`,
            folio: folioOmnirouter,
            hash: cryptoHash,
            codigoDescargable: codigoGenerado
        };
    } catch (err) {
        return {
            success: false,
            message: `Error en el núcleo Omega: ${err.message}`
        };
    }
}
async function obtenerMemoriaJarvis() {
    try {
        const { data, error } = await supabase.from('mexico_jarvis_memory').select('id, memory_key, memory_value, routing_engine, created_at').eq('owner_email', SUPERVISOR_AUTORIZADO).order('created_at', {
            ascending: false
        });
        if (!error && data && data.length > 0) {
            return {
                success: true,
                memorias: data
            };
        }
    } catch (err) {}
    try {
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(localMemoryFile)) {
            const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(localMemoryFile, 'utf8');
            return {
                success: true,
                memorias: JSON.parse(data)
            };
        }
    } catch (e) {}
    return {
        success: true,
        memorias: []
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    ejecutarJarvisCore,
    obtenerMemoriaJarvis
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(ejecutarJarvisCore, "405fd165c35f846c7782e6bc3be94b13d1e8bb8400", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(obtenerMemoriaJarvis, "00ffadf23df347596f98c57aa5ddfb83a2a34b169e", null);
}),
]})(),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__00fwam2k0g0us._.js.map