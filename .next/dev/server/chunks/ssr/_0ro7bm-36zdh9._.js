(()=>{"use strict";module.exports = [
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/master-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40f605e3a1ecd36689778a64ebbd6f1646b08dda25",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$master$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ejecutarYGuardarEnSupabase"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$master$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/master-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$master$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/master-actions.ts [app-rsc] (ecmascript)");
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/master-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$master$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/master-actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/app/actions/master-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40f605e3a1ecd36689778a64ebbd6f1646b08dda25":{"name":"ejecutarYGuardarEnSupabase"}},"app/actions/master-actions.ts",""] */ __turbopack_context__.s([
    "ejecutarYGuardarEnSupabase",
    ()=>ejecutarYGuardarEnSupabase
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
async function ejecutarYGuardarEnSupabase(formData) {
    try {
        const modulo = formData.get('modulo');
        const motorIA = formData.get('motorIA');
        const instruccion = formData.get('instruccion');
        const supervisor = process.env.NEXT_PUBLIC_SUPERVISOR_EMAIL || 'fg782270@gmail.com';
        const timestamp = new Date().toISOString();
        // Generar sellado criptográfico SHA-256 institucional
        const rawPayload = `${supervisor}-${modulo}-${motorIA}-${instruccion}-${timestamp}`;
        const sha256Hash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha256').update(rawPayload).digest('hex');
        console.log(`[SHA-256 Sello Generado]: ${sha256Hash}`);
        // Persistir en Supabase (Live DB Sync)
        const { data, error } = await supabase.from('mexico_public_governance_logs').insert([
            {
                supervisor_email: supervisor,
                module_operation: modulo,
                ai_engine: motorIA,
                instruction_param: instruccion,
                crypto_hash: sha256Hash,
                created_at: timestamp
            }
        ]);
        if (error) {
            console.error('[Error Supabase]:', error.message);
            return {
                success: false,
                message: `Error al sincronizar con Supabase: ${error.message}`
            };
        }
        return {
            success: true,
            message: '¡Ejecución exitosa, sellado SHA-256 completado y guardado en Supabase!',
            hash: sha256Hash
        };
    } catch (err) {
        console.error('[Error de Servidor]:', err);
        return {
            success: false,
            message: `Error interno: ${err.message}`
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    ejecutarYGuardarEnSupabase
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(ejecutarYGuardarEnSupabase, "40f605e3a1ecd36689778a64ebbd6f1646b08dda25", null);
}),
];})()

//# sourceMappingURL=_0ro7bm-36zdh9._.js.map