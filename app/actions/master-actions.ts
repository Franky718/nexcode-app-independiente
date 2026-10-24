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
        
        if (!emailSolicitante || emailSolicitante.trim().toLowerCase() !== SUPERVISOR_AUTORIZADO.toLowerCase()) {
            return { 
                success: false, 
                message: '[ACCESO DENEGADO]: Jarvis IA está vinculado exclusivamente al C. Francisco.' 
            }
        }

        const accion = formData.get('accion') as string
        const tipoSoftware = formData.get('tipoSoftware') as string || 'Sistema Autónomo'
        const detalleSoftware = formData.get('detalleSoftware') as string || 'Operación general'
        const timestamp = new Date().toISOString()

        const folioOmnirouter = `JARVIS-MEM-${Math.floor(100000 + Math.random() * 900000)}`
        const rawPayload = `${SUPERVISOR_AUTORIZADO}-${accion}-${tipoSoftware}-${detalleSoftware}-${timestamp}-UNLIMITED-TOKENS`
        const cryptoHash = crypto.createHash('sha256').update(rawPayload).digest('hex')

        // 1. Guardar en la Memoria Propia de Jarvis (mexico_jarvis_memory)
        const { error: errorMemoria } = await supabase.from('mexico_jarvis_memory').insert([
            {
                owner_email: SUPERVISOR_AUTORIZADO,
                memory_key: `[${tipoSoftware}] ${accion}`,
                memory_value: `Detalle: ${detalleSoftware} | Folio: ${folioOmnirouter} | Hash: ${cryptoHash}`,
                routing_engine: 'Jarvis Omnirouter Unlimited'
            }
        ])

        if (errorMemoria) {
            return { success: false, message: `Error al guardar en memoria: ${errorMemoria.message}` }
        }

        // 2. Registrar en la bitácora pública de gobernanza
        await supabase.from('mexico_public_governance_logs').insert([
            {
                supervisor_email: SUPERVISOR_AUTORIZADO,
                module_operation: `Memoria Jarvis [${tipoSoftware}]`,
                ai_engine: 'Jarvis AI Core (Omnirouter Unlimited)',
                instruction_param: `[REGISTRADO EN MEMORIA] ${detalleSoftware}`,
                crypto_hash: cryptoHash,
                created_at: timestamp
            }
        ])

        // 3. Generar código descargable de respaldo
        const codigoGenerado = `// ==========================================
// NEXCODE INTERACTIVE S.A. DE C.V.
// Módulo Registrado en Memoria por Jarvis AI
// Propietario: C. Francisco (fg782270@gmail.com)
// Folio: ${folioOmnirouter}
// Hash SHA-256: ${cryptoHash}
// ==========================================

import React from 'react';

export default function MemoriaJarvisComponent() {
    return (
        <div style={{ background: '#020617', color: '#22d3ee', padding: '20px', fontFamily: 'monospace' }}>
            <h1>Nexcode Master Core — Memoria Activa</h1>
            <p>Operación: ${tipoSoftware} - ${accion}</p>
            <p>Directriz: ${detalleSoftware}</p>
        </div>
    );
}
`;

        return {
            success: true,
            message: `¡Operación ejecutada y almacenada permanentemente en la memoria propia de Jarvis!`,
            folio: folioOmnirouter,
            hash: cryptoHash,
            codigoDescargable: codigoGenerado
        }

    } catch (err: any) {
        return { success: false, message: `Error en el núcleo Jarvis: ${err.message}` }
    }
}

export async function obtenerMemoriaJarvis() {
    try {
        const { data, error } = await supabase
            .from('mexico_jarvis_memory')
            .select('id, memory_key, memory_value, routing_engine, created_at')
            .eq('owner_email', SUPERVISOR_AUTORIZADO)
            .order('created_at', { ascending: false })

        if (error) {
            return { success: false, memorias: [] }
        }

        return { success: true, memorias: data || [] }
    } catch (err) {
        return { success: false, memorias: [] }
    }
}
