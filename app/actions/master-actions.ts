'use server'

import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function ejecutarYGuardarEnSupabase(formData: FormData) {
    try {
        const modulo = formData.get('modulo') as string
        const motorIA = formData.get('motorIA') as string
        const instruccion = formData.get('instruccion') as string
        const supervisor = process.env.NEXT_PUBLIC_SUPERVISOR_EMAIL || 'fg782270@gmail.com'
        const timestamp = new Date().toISOString()

        // Generar sellado criptográfico SHA-256 institucional
        const rawPayload = ${supervisor}----
        const sha256Hash = crypto
            .createHash('sha256')
            .update(rawPayload)
            .digest('hex')

        console.log([SHA-256 Sello Generado]: )

        // Persistir en Supabase (Live DB Sync)
        const { data, error } = await supabase
            .from('nexcode_governance_logs')
            .insert([
                {
                    supervisor_email: supervisor,
                    module_operation: modulo,
                    ai_engine: motorIA,
                    instruction_param: instruccion,
                    crypto_hash: sha256Hash,
                    created_at: timestamp
                }
            ])

        if (error) {
            console.error('[Error Supabase]:', error.message)
            return { success: false, message: Error al sincronizar con Supabase:  }
        }

        return { 
            success: true, 
            message: '¡Ejecución exitosa, sellado SHA-256 completado y guardado en Supabase!',
            hash: sha256Hash 
        }

    } catch (err: any) {
        console.error('[Error de Servidor]:', err)
        return { success: false, message: Error interno:  }
    }
}
