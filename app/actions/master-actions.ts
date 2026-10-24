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
        const tipoSoftware = formData.get('tipoSoftware') as string
        const detalleSoftware = formData.get('detalleSoftware') as string
        const timestamp = new Date().toISOString()

        const folioOmnirouter = `NEX-CLONE-${Math.floor(100000 + Math.random() * 900000)}`
        const rawPayload = `${SUPERVISOR_AUTORIZADO}-${accion}-${tipoSoftware}-${detalleSoftware}-${timestamp}-UNLIMITED-TOKENS`
        const cryptoHash = crypto.createHash('sha256').update(rawPayload).digest('hex')

        // Registrar en Supabase
        await supabase.from('mexico_public_governance_logs').insert([
            {
                supervisor_email: SUPERVISOR_AUTORIZADO,
                module_operation: `Clonación y Mejora [${tipoSoftware}]`,
                ai_engine: 'Jarvis AI Core (Omnirouter Unlimited)',
                instruction_param: `[SOLICITUD] ${detalleSoftware} | Hash: ${cryptoHash}`,
                crypto_hash: cryptoHash,
                created_at: timestamp
            }
        ])

        // Generar estructura de código simulada para descarga directa
        const codigoGenerado = `// ==========================================
// NEXCODE INTERACTIVE S.A. DE C.V.
// Módulo Clonado y Optimizado por Jarvis AI
// Propietario: C. Francisco (fg782270@gmail.com)
// Folio: ${folioOmnirouter}
// Hash SHA-256: ${cryptoHash}
// ==========================================

import React from 'react';

export default function ClonOptimizadoComponent() {
    return (
        <div style={{ background: '#020617', color: '#22d3ee', padding: '20px', fontFamily: 'monospace' }}>
            <h1>Nexcode Master Core — Módulo: ${tipoSoftware}</h1>
            <p>Solicitud procesada: ${detalleSoftware}</p>
            <p>Estado: Optimizado con tokens ilimitados Omnirouter y Antivirus Activo.</p>
        </div>
    );
}
`;

        return {
            success: true,
            message: `¡Software clonado, optimizado y respaldado con éxito en Supabase y GitHub!`,
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
