'use server'

import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const SUPERVISOR_AUTORIZADO = process.env.NEXT_PUBLIC_SUPERVISOR_EMAIL || 'fg782270@gmail.com'

export async function ejecutarJarvisCore(formData: FormData) {
    try {
        const emailSolicitante = formData.get('emailSolicitante') as string
        
        // 1. Validar Autoridad Absoluta (Solo obedece a C. Francisco / fg782270@gmail.com)
        if (!emailSolicitante || emailSolicitante.trim().toLowerCase() !== SUPERVISOR_AUTORIZADO.toLowerCase()) {
            return { 
                success: false, 
                message: '[ACCESO DENEGADO]: Jarvis IA está vinculado exclusivamente al C. Francisco (fg782270@gmail.com). Comando rechazado por seguridad corporativa.' 
            }
        }

        const accion = formData.get('accion') as string
        const claveMemoria = formData.get('claveMemoria') as string
        const valorMemoria = formData.get('valorMemoria') as string
        const timestamp = new Date().toISOString()

        // 2. Si es una instrucción para guardar en la Memoria Integrada
        if (accion === 'guardar_memoria' && claveMemoria && valorMemoria) {
            await supabase.from('mexico_jarvis_memory').insert([
                {
                    owner_email: SUPERVISOR_AUTORIZADO,
                    memory_key: claveMemoria,
                    memory_value: valorMemoria,
                    routing_engine: 'Omnirouter-FreeLLAMPI-Unlimited'
                }
            ])
        }

        // 3. Generar token ilimitado mediante Omnirouter & FreeLLAMPI Mock Engine
        const folioOmnirouter = `JARVIS-OMNI-${Math.floor(100000 + Math.random() * 900000)}`
        const rawPayload = `${SUPERVISOR_AUTORIZADO}-${accion}-${claveMemoria || 'general'}-${timestamp}-UNLIMITED-TOKENS`
        const cryptoHash = crypto.createHash('sha256').update(rawPayload).digest('hex')

        // 4. Registrar en Supabase bajo el canal seguro
        await supabase.from('mexico_public_governance_logs').insert([
            {
                supervisor_email: SUPERVISOR_AUTORIZADO,
                module_operation: 'Jarvis AI Core [Omnirouter & FreeLLAMPI]',
                ai_engine: 'Omnirouter Unlimited (FreeLLAMPI Pipeline)',
                instruction_param: `[MEMORIA INTEGRADA ACTIVA] Acción: ${accion} | Dato: ${valorMemoria || 'Sincronización'}`,
                crypto_hash: cryptoHash,
                created_at: timestamp
            }
        ])

        return {
            success: true,
            message: '¡Comando ejecutado con tokens ilimitados vía Omnirouter y FreeLLAMPI!',
            folio: folioOmnirouter,
            hash: cryptoHash
        }

    } catch (err: any) {
        return { success: false, message: `Error en el núcleo Jarvis: ${err.message}` }
    }
}

export async function obtenerMemoriaJarvis() {
    try {
        const { data } = await supabase
            .from('mexico_jarvis_memory')
            .select('id, memory_key, memory_value, created_at')
            .eq('owner_email', SUPERVISOR_AUTORIZADO)
            .order('created_at', { ascending: false })

        return { success: true, memorias: data || [] }
    } catch (err) {
        return { success: false, memorias: [] }
    }
}
