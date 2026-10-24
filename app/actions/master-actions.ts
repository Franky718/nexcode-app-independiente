'use server'

import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function procesarOperacionNexcode(formData: FormData) {
    try {
        const sector = formData.get('sector') as string // 'publico' o 'privado'
        const categoria = formData.get('categoria') as string // Nivel de gobierno o tipo privado
        const entidadDependencia = formData.get('entidadDependencia') as string
        const descripcion = formData.get('descripcion') as string
        const supervisor = process.env.NEXT_PUBLIC_SUPERVISOR_EMAIL || 'fg782270@gmail.com'
        const timestamp = new Date().toISOString()
        
        const folioUnico = `NEX-${sector.toUpperCase().substring(0,3)}-${Math.floor(100000 + Math.random() * 900000)}`

        const rawPayload = `${supervisor}-${sector}-${categoria}-${entidadDependencia}-${descripcion}-${folioUnico}-${timestamp}`
        const sha256Hash = crypto
            .createHash('sha256')
            .update(rawPayload)
            .digest('hex')

        const tablaDestino = sector === 'publico' ? 'mexico_public_governance_logs' : 'mexico_private_enterprise_logs'

        const insertData = sector === 'publico' ? {
            supervisor_email: supervisor,
            module_operation: categoria,
            ai_engine: 'Google Gemini - Public Core',
            instruction_param: `[${entidadDependencia}] ${descripcion}`,
            crypto_hash: sha256Hash,
            created_at: timestamp
        } : {
            supervisor_email: supervisor,
            module_operation: categoria,
            ai_engine: 'Google Gemini - Enterprise Core',
            instruction_param: `[${entidadDependencia}] ${descripcion}`,
            crypto_hash: sha256Hash,
            created_at: timestamp
        }

        const { error } = await supabase.from(tablaDestino).insert([insertData])

        if (error) {
            return { success: false, message: `Error en base de datos: ${error.message}` }
        }

        return { 
            success: true, 
            message: `¡Operación ${sector.toUpperCase()} sellada y registrada con éxito!`,
            folio: folioUnico,
            hash: sha256Hash 
        }

    } catch (err: any) {
        return { success: false, message: `Error interno: ${err.message}` }
    }
}

export async function obtenerRegistrosRecientes() {
    try {
        const { data: publicos } = await supabase
            .from('mexico_public_governance_logs')
            .select('id, module_operation, crypto_hash, created_at, instruction_param')
            .order('created_at', { ascending: false })
            .limit(5)

        return { success: true, registros: publicos || [] }
    } catch (err) {
        return { success: false, registros: [] }
    }
}
