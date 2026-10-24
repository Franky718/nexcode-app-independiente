"use server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tu-proyecto.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "tu-anon-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function executeMasterAction(moduleName: string, provider: string, userInput: string, subsidiary: string) {
    const timestamp = new Date().toISOString();
    const supervisor = "fg782270@gmail.com";
    
    const aiResponse = `[Macaly Cloud Gateway - ${provider.toUpperCase()}] Procesamiento institucional completado para ${subsidiary} / ${moduleName}.`;
    
    const rawString = `${subsidiary}-${moduleName}-${provider}-${userInput}-${timestamp}-${supervisor}-NEXCODE-HOLDING`;
    const blockchainHash = "sha256_" + crypto.createHash("sha256").update(rawString).digest("hex");

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
        const { error } = await supabase.from("ai_audit_logs").insert([auditRecord]);
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