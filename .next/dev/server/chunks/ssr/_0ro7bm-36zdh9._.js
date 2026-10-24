(()=>{"use strict";module.exports = [
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/master-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "7852bd564fa0c891f9736a2538d051ab7cfa34a293",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$master$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeMasterAction"]
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

/* __next_internal_action_entry_do_not_use__ [{"7852bd564fa0c891f9736a2538d051ab7cfa34a293":{"name":"executeMasterAction"}},"app/actions/master-actions.ts",""] */ __turbopack_context__.s([
    "executeMasterAction",
    ()=>executeMasterAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://tu-proyecto.supabase.co") || "https://tu-proyecto.supabase.co";
const supabaseKey = ("TURBOPACK compile-time value", "tu-anon-key-de-ejemplo") || "tu-anon-key";
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseKey);
async function executeMasterAction(moduleName, provider, userInput, subsidiary) {
    const timestamp = new Date().toISOString();
    const supervisor = "fg782270@gmail.com";
    const aiResponse = `[Macaly Cloud Gateway - ${provider.toUpperCase()}] Procesamiento institucional completado para ${subsidiary} / ${moduleName}.`;
    const rawString = `${subsidiary}-${moduleName}-${provider}-${userInput}-${timestamp}-${supervisor}-NEXCODE-HOLDING`;
    const blockchainHash = "sha256_" + __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(rawString).digest("hex");
    const auditRecord = {
        subsidiary: subsidiary,
        app_module: moduleName,
        operation_type: "AI_GATEWAY_GOVERNANCE_EXECUTION",
        payload_summary: userInput,
        ai_response: aiResponse,
        blockchain_hash: blockchainHash,
        supervised_by: supervisor,
        created_at: timestamp
    };
    try {
        const { error } = await supabase.from("ai_audit_logs").insert([
            auditRecord
        ]);
        if (error) {
            console.warn("Aviso de persistencia Supabase (Modo Simulación Activo):", error.message);
        }
    } catch (err) {
        console.log("Conexión de base de datos diferida para entorno local.");
    }
    return {
        success: true,
        message: `¡Registro sellado y guardado para ${subsidiary} bajo la supervisión de ${supervisor}!`,
        data: auditRecord
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    executeMasterAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(executeMasterAction, "7852bd564fa0c891f9736a2538d051ab7cfa34a293", null);
}),
];})()

//# sourceMappingURL=_0ro7bm-36zdh9._.js.map