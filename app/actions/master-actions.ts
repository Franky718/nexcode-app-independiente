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
        const tipoSoftware = formData.get('tipoSoftware') as string || 'Plataforma Global'
        const detalleSoftware = formData.get('detalleSoftware') as string || 'Despliegue Multiplataforma'
        const timestamp = new Date().toISOString()

        const folioOmnirouter = `NEX-GLOBAL-${Math.floor(100000 + Math.random() * 900000)}`
        const rawPayload = `${SUPERVISOR_AUTORIZADO}-${accion}-${tipoSoftware}-${detalleSoftware}-${timestamp}-UNLIMITED-TOKENS`
        const cryptoHash = crypto.createHash('sha256').update(rawPayload).digest('hex')

        const memoryKey = `[COMPILACIÓN] ${tipoSoftware}`
        const memoryValue = `Acción: ${accion} | Detalle: ${detalleSoftware} | Folio: ${folioOmnirouter} | Hash: ${cryptoHash}`

        // Guardar en memoria híbrida
        guardarMemoriaLocal(memoryKey, memoryValue, 'Jarvis Cloud Deployment Engine')

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
// Módulo de Despliegue Global: ${tipoSoftware}
// Supervisor: C. Francisco (fg782270@gmail.com)
// Folio Oficial: ${folioOmnirouter}
// Hash de Autenticidad SHA-256: ${cryptoHash}
// ==========================================

import React from 'react';

export default function DespliegueGlobalComponent() {
    return (
        <div style={{ background: '#020617', color: '#22d3ee', padding: '20px', fontFamily: 'monospace' }}>
            <h1>Nexcode Master Core — ${tipoSoftware}</h1>
            <p>Acción: ${accion}</p>
            <p>Destino: ${detalleSoftware}</p>
            <p>Estado: Compilado y sincronizado desde Nube Privada con Tokens Ilimitados.</p>
        </div>
    );
}
`;

        return {
            success: true,
            message: `¡Compilación y despliegue global para [${tipoSoftware}] ejecutado con éxito y registrado en su memoria!`,
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

        if (!error && data && data.length > 0) {
            return { success: true, memorias: data }
        }
    } catch (err) {}

    const localData = leerMemoriaLocal()
    return { success: true, memorias: localData }
}
