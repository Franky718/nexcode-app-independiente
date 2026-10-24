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
const SUPERVISOR_AUTORIZADO = process.env.NEXT_PUBLIC_SUPERVISOR_EMAIL || 'fg782270@gmail.com';
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
        const emailSolicitante = formData.get('emailSolicitante');
        if (!emailSolicitante || emailSolicitante.trim().toLowerCase() !== SUPERVISOR_AUTORIZADO.toLowerCase()) {
            return {
                success: false,
                message: '[ACCESO DENEGADO]: Jarvis IA está vinculado exclusivamente al C. Francisco.'
            };
        }
        const seccion = formData.get('seccion') || 'Empresa';
        const tipoAnalisis = formData.get('tipoAnalisis') || 'Análisis General';
        const detalle = formData.get('detalle') || 'Sin detalles';
        const archivoNombre = formData.get('archivoNombre') || 'Ninguno';
        const timestamp = new Date().toISOString();
        const folioOmnirouter = `JARVIS-UNIFIED-${Math.floor(100000 + Math.random() * 900000)}`;
        const rawPayload = `${SUPERVISOR_AUTORIZADO}-${seccion}-${tipoAnalisis}-${detalle}-${archivoNombre}-${timestamp}`;
        const cryptoHash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha256').update(rawPayload).digest('hex');
        const memoryKey = `[${seccion.toUpperCase()}] ${tipoAnalisis}`;
        const memoryValue = `Archivo: ${archivoNombre} | Detalle: ${detalle} | Folio: ${folioOmnirouter} | Hash: ${cryptoHash}`;
        // Guardar en memoria híbrida local y Supabase unificada
        guardarMemoriaLocal(memoryKey, memoryValue, `Jarvis Unified Engine (${seccion})`);
        try {
            await supabase.from('mexico_jarvis_memory').insert([
                {
                    owner_email: SUPERVISOR_AUTORIZADO,
                    memory_key: memoryKey,
                    memory_value: memoryValue,
                    routing_engine: `Jarvis Unified (${seccion})`
                }
            ]);
        } catch (e) {}
        const codigoGenerado = `// ==========================================
// NEXCODE INTERACTIVE S.A. DE C.V.
// Módulo Compilado y Generado Automáticamente
// Núcleo: ${seccion} | Análisis: ${tipoAnalisis}
// Supervisor: C. Francisco (fg782270@gmail.com)
// Archivo Adjunto: ${archivoNombre}
// Folio Oficial: ${folioOmnirouter}
// Hash SHA-256: ${cryptoHash}
// ==========================================

import React from 'react';

export default function NexcodeAutoPackage() {
    return (
        <div style={{ background: '#020617', color: '#22d3ee', padding: '20px', fontFamily: 'monospace' }}>
            <h1>Nexcode Master Core — Paquete Autónomo</h1>
            <p>Sección: ${seccion}</p>
            <p>Tipo: ${tipoAnalisis}</p>
            <p>Documento procesado: ${archivoNombre}</p>
            <p>Estado: Compilado, Humanizado y Sincronizado en Banco de Memoria Interconectado.</p>
        </div>
    );
}
`;
        return {
            success: true,
            message: `¡Proceso ejecutado con éxito en el Núcleo [${seccion.toUpperCase()}]! Documento e información indexados en el Banco de Memoria Interconectado.`,
            folio: folioOmnirouter,
            hash: cryptoHash,
            codigoDescargable: codigoGenerado
        };
    } catch (err) {
        return {
            success: false,
            message: `Error en el núcleo unificado: ${err.message}`
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