'use server'

import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Módulo Antivirus / Escaneo de Seguridad de Entradas
function esSeguroPayload(input: string): boolean {
    const patronesMaliciosos = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|DROP TABLE|DELETE FROM|exec\s*\(|union\s+select/i;
    return !patronesMaliciosos.test(input);
}

export async function procesarConJarvis(formData: FormData) {
    try {
        const sector = formData.get('sector') as string
        const categoria = formData.get('categoria') as string
        const entidad = formData.get('entidadDependencia') as string
        const descripcion = formData.get('descripcion') as string
        const motorIA = formData.get('motorIA') as string // 'Jarvis AI Core' o 'Google Gemini'
        const supervisor = process.env.NEXT_PUBLIC_SUPERVISOR_EMAIL || 'fg782270@gmail.com'
        const timestamp = new Date().toISOString()

        // 1. Ejecutar Antivirus / Escaneo de Seguridad
        if (!esSeguroPayload(descripcion) || !esSeguroPayload(entidad)) {
            return { 
                success: false, 
                message: '[Alerta Antivirus Nexcode]: Se detectaron patrones sospechosos o maliciosos en la entrada. Operación bloqueada por seguridad.' 
            }
        }

        const folioUnico = `NEX-JARVIS-${Math.floor(100000 + Math.random() * 900000)}`

        // 2. Sellado Criptográfico SHA-256 con firma de Jarvis
        const rawPayload = `${supervisor}-${motorIA}-${sector}-${categoria}-${entidad}-${descripcion}-${folioUnico}-${timestamp}`
        const sha256Hash = crypto
            .createHash('sha256')
            .update(rawPayload)
            .digest('hex')

        const tablaDestino = sector === 'publico' ? 'mexico_public_governance_logs' : 'mexico_private_enterprise_logs'

        const insertData = {
            supervisor_email: supervisor,
            module_operation: `${categoria} [${motorIA}]`,
            ai_engine: motorIA,
            instruction_param: `[RESPALDO Y SEGURIDAD VERIFICADA] ${entidad}: ${descripcion}`,
            crypto_hash: sha256Hash,
            created_at: timestamp
        }

        const { error } = await supabase.from(tablaDestino).insert([insertData])

        if (error) {
            return { success: false, message: `Error al respaldar en Supabase: ${error.message}` }
        }

        return { 
            success: true, 
            message: `¡Operación validada por Antivirus, sellada y respaldada con éxito por ${motorIA}!`,
            folio: folioUnico,
            hash: sha256Hash 
        }

    } catch (err: any) {
        return { success: false, message: `Error interno de Jarvis: ${err.message}` }
    }
}

export async function obtenerRespaldosRecientes() {
    try {
        const { data } = await supabase
            .from('mexico_public_governance_logs')
            .select('id, module_operation, crypto_hash, created_at, instruction_param')
            .order('created_at', { ascending: false })
            .limit(5)

        return { success: true, registros: data || [] }
    } catch (err) {
        return { success: false, registros: [] }
    }
}
