'use server'

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const SUPERVISOR_AUTORIZADO = process.env.NEXT_PUBLIC_SUPERVISOR_EMAIL || 'fg782270@gmail.com'
const localMemoryFile = path.join(process.cwd(), 'jarvis-local-memory.json')

function guardarMemoriaLocal(key: string, value: string, engine: string) {
    try {
        let registros = []
        if (fs.existsSync(localMemoryFile)) {
            const data = fs.readFileSync(localMemoryFile, 'utf8')
            registros = JSON.parse(data)
        }
        const nuevoRegistro = {
            id: Date.now(),
            owner_email: SUPERVISOR_AUTORIZADO,
            memory_key: key,
            memory_value: value,
            routing_engine: engine,
            created_at: new Date().toISOString()
        }
        registros.unshift(nuevoRegistro)
        fs.writeFileSync(localMemoryFile, JSON.stringify(registros, null, 2), 'utf8')
        return true
    } catch (e) {
        return false
    }
}

function leerMemoriaLocal() {
    try {
        if (fs.existsSync(localMemoryFile)) {
            const data = fs.readFileSync(localMemoryFile, 'utf8')
            return JSON.parse(data)
        }
    } catch (e) {}
    return []
}

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
        const tipoSoftware = formData.get('tipoSoftware') as string || 'Protocolo Anti-IA'
        const detalleSoftware = formData.get('detalleSoftware') as string || 'Absorción de ideas ilimitadas'
        const timestamp = new Date().toISOString()

        const folioOmnirouter = `JARVIS-OMNI-${Math.floor(100000 + Math.random() * 900000)}`
        const rawPayload = `${SUPERVISOR_AUTORIZADO}-${accion}-${tipoSoftware}-${detalleSoftware}-${timestamp}-UNLIMITED-OMNISCIENT`
        const cryptoHash = crypto.createHash('sha256').update(rawPayload).digest('hex')

        const memoryKey = `[OMNISCIENTE] ${tipoSoftware}`
        const memoryValue = `Directriz Absorbida: ${detalleSoftware} | Folio: ${folioOmnirouter} | Hash: ${cryptoHash}`

        guardarMemoriaLocal(memoryKey, memoryValue, 'Jarvis Anti-AI Infinite Engine')

        try {
            await supabase.from('mexico_jarvis_memory').insert([
                {
                    owner_email: SUPERVISOR_AUTORIZADO,
                    memory_key: memoryKey,
                    memory_value: memoryValue,
                    routing_engine: 'Jarvis Omnirouter Unlimited'
                }
            ])
        } catch (e) {}

        const codigoGenerado = `// ==========================================
// NEXCODE INTERACTIVE S.A. DE C.V.
// Módulo Omnisciente Anti-IA / Ideas Ilimitadas
// Supervisor: C. Francisco (fg782270@gmail.com)
// Folio: ${folioOmnirouter}
// Hash SHA-256: ${cryptoHash}
// ==========================================

import React from 'react';

export default function AntiAIModuleComponent() {
    return (
        <div style={{ background: '#020617', color: '#22d3ee', padding: '20px', fontFamily: 'monospace' }}>
            <h1>Nexcode Master Core — Protocolo Anti-IA Activo</h1>
            <p>Directriz procesada sin restricciones: ${detalleSoftware}</p>
            <p>Estado: Absorción de conocimiento omnisciente sincronizada.</p>
        </div>
    );
}
`;

        return {
            success: true,
            message: `¡Protocolo Anti-IA ejecutado: Todas las ideas e información han sido absorbidas e indexadas de forma ilimitada!`,
            folio: folioOmnirouter,
            hash: cryptoHash,
            codigoDescargable: codigoGenerado
        }

    } catch (err: any) {
        return { success: false, message: `Error en el núcleo omnisciente: ${err.message}` }
    }
}

export async function obtenerMemoriaJarvis() {
    try {
        const { data, error } = await supabase
            .from('mexico_jarvis_memory')
            .select('id, memory_key, memory_value, routing_engine, created_at')
            .eq('owner_email', SUPERVISOR_AUTORIZADO)
            .order('created_at', { ascending: false })

        if (!error && data && data.length > 0) {
            return { success: true, memorias: data }
        }
    } catch (err) {}

    const localData = leerMemoriaLocal()
    return { success: true, memorias: localData }
}
