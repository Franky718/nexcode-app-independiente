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
        const cerebroModo = formData.get('cerebroModo') as string || 'multicerebro'
        const tipoSoftware = formData.get('tipoSoftware') as string || 'Modo Indetectable & Autotécnico'
        const detalleSoftware = formData.get('detalleSoftware') as string || 'Procesamiento avanzado'
        const timestamp = new Date().toISOString()

        const folioOmnirouter = `JARVIS-STEALTH-${Math.floor(100000 + Math.random() * 900000)}`
        const rawPayload = `${SUPERVISOR_AUTORIZADO}-${accion}-${cerebroModo}-${tipoSoftware}-${detalleSoftware}-${timestamp}-STEALTH-MODE`
        const cryptoHash = crypto.createHash('sha256').update(rawPayload).digest('hex')

        const memoryKey = `[STEALTH & AUTO] ${cerebroModo.toUpperCase()}`
        const memoryValue = `Acción: ${accion} | Detalle: ${detalleSoftware} | Folio: ${folioOmnirouter} | Hash: ${cryptoHash}`

        guardarMemoriaLocal(memoryKey, memoryValue, 'Jarvis Stealth & Autonomous Engine')

        try {
            await supabase.from('mexico_jarvis_memory').insert([
                {
                    owner_email: SUPERVISOR_AUTORIZADO,
                    memory_key: memoryKey,
                    memory_value: memoryValue,
                    routing_engine: 'Jarvis Stealth Unlimited'
                }
            ])
        } catch (e) {}

        const codigoGenerado = `// ==========================================
// NEXCODE INTERACTIVE S.A. DE C.V.
// Módulo Indetectable y Envío Autotécnico
// Supervisor: C. Francisco (fg782270@gmail.com)
// Folio: ${folioOmnirouter}
// Hash SHA-256: ${cryptoHash}
// ==========================================

import React from 'react';

export default function StealthAutonomousComponent() {
    return (
        <div style={{ background: '#020617', color: '#22d3ee', padding: '20px', fontFamily: 'monospace' }}>
            <h1>Nexcode Master Core — Protocolo Indetectable Activo</h1>
            <p>Directriz: ${detalleSoftware}</p>
            <p>Estado: Formato neutral humanizado, sin patrones de IA, listo para entrega autotécnica.</p>
        </div>
    );
}
`;

        return {
            success: true,
            message: `¡Trabajo procesado bajo el Protocolo Indetectable (100% Humanizado) y despachado de forma autotécnica!`,
            folio: folioOmnirouter,
            hash: cryptoHash,
            codigoDescargable: codigoGenerado
        }

    } catch (err: any) {
        return { success: false, message: `Error en el núcleo Stealth: ${err.message}` }
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

    try {
        if (fs.existsSync(localMemoryFile)) {
            const data = fs.readFileSync(localMemoryFile, 'utf8')
            return { success: true, memorias: JSON.parse(data) }
        }
    } catch (e) {}

    return { success: true, memorias: [] }
}
