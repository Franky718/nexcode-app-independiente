(()=>{"use strict";module.exports = [
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
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://tu-proyecto.supabase.co") || '';
const supabaseAnonKey = ("TURBOPACK compile-time value", "tu-anon-key-de-ejemplo") || '';
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
const SUPERVISOR_AUTORIZADO = process.env.NEXT_PUBLIC_SUPERVISOR_EMAIL || 'fg782270@gmail.com';
async function ejecutarJarvisCore(formData) {
    try {
        const emailSolicitante = formData.get('emailSolicitante');
        if (!emailSolicitante || emailSolicitante.trim().toLowerCase() !== SUPERVISOR_AUTORIZADO.toLowerCase()) {
            return {
                success: false,
                message: '[ACCESO DENEGADO]: Jarvis IA está vinculado exclusivamente al C. Francisco (fg782270@gmail.com).'
            };
        }
        const accion = formData.get('accion');
        const tipoSoftware = formData.get('tipoSoftware')// 'Open Source' o 'Software Privado'
        ;
        const detalleSoftware = formData.get('detalleSoftware');
        const timestamp = new Date().toISOString();
        const folioOmnirouter = `NEX-MOD-${Math.floor(100000 + Math.random() * 900000)}`;
        const rawPayload = `${SUPERVISOR_AUTORIZADO}-${accion}-${tipoSoftware}-${detalleSoftware}-${timestamp}-UNLIMITED-TOKENS`;
        const cryptoHash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha256').update(rawPayload).digest('hex');
        // Registrar operación en Supabase
        await supabase.from('mexico_public_governance_logs').insert([
            {
                supervisor_email: SUPERVISOR_AUTORIZADO,
                module_operation: `Gestión de Software [${tipoSoftware}]`,
                ai_engine: 'Jarvis AI Core (Omnirouter Unlimited)',
                instruction_param: `[ACCIÓN: ${accion}] ${detalleSoftware}`,
                crypto_hash: cryptoHash,
                created_at: timestamp
            }
        ]);
        return {
            success: true,
            message: `¡Gestión de ${tipoSoftware} ejecutada y blindada con éxito por Jarvis!`,
            folio: folioOmnirouter,
            hash: cryptoHash
        };
    } catch (err) {
        return {
            success: false,
            message: `Error en el núcleo Jarvis: ${err.message}`
        };
    }
}
async function obtenerMemoriaJarvis() {
    try {
        const { data } = await supabase.from('mexico_jarvis_memory').select('id, memory_key, memory_value, created_at').eq('owner_email', SUPERVISOR_AUTORIZADO).order('created_at', {
            ascending: false
        });
        return {
            success: true,
            memorias: data || []
        };
    } catch (err) {
        return {
            success: false,
            memorias: []
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    ejecutarJarvisCore,
    obtenerMemoriaJarvis
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(ejecutarJarvisCore, "405fd165c35f846c7782e6bc3be94b13d1e8bb8400", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(obtenerMemoriaJarvis, "00ffadf23df347596f98c57aa5ddfb83a2a34b169e", null);
}),
];})()

//# sourceMappingURL=_0ro7bm-36zdh9._.js.map