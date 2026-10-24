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

// Función de respaldo en archivo local si Supabase no responde
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
        const tipoSoftware = formData.get('tipoSoftware') as string || 'Sistema Autónomo'
        const detalleSoftware = formData.get('detalleSoftware') as string || 'Operación general'
        const timestamp = new Date().toISOString()

        const folioOmnirouter = `JARVIS-SECURE-${Math.floor(100000 + Math.random() * 900000)}`
        const rawPayload = `${SUPERVISOR_AUTORIZADO}-${accion}-${tipoSoftware}-${detalleSoftware}-${timestamp}-UNLIMITED-TOKENS`
        const cryptoHash = crypto.createHash('sha256').update(rawPayload).digest('hex')

        const memoryKey = `[${tipoSoftware}] ${accion}`
        const memoryValue = `Detalle: ${detalleSoftware} | Folio: ${folioOmnirouter} | Hash: ${cryptoHash}`

        // Intentar guardar en Supabase (Nube)
        let guardadoExitoso = false
        try {
            const { error: errorMemoria } = await supabase.from('mexico_jarvis_memory').insert([
                {
                    owner_email: SUPERVISOR_AUTORIZADO,
                    memory_key: memoryKey,
                    memory_value: memoryValue,
                    routing_engine: 'Jarvis Omnirouter Unlimited'
                }
            ])
            if (!errorMemoria) guardadoExitoso = true
        } catch (err) {
            // Si falla la red, se usa la memoria local
        }

        // Si Supabase falla, guardamos en el respaldo local automáticamente
        if (!guardadoExitoso) {
            guardarMemoriaLocal(memoryKey, memoryValue, 'Jarvis Local Secure Engine')
        }

        // Generar código descargable de respaldo
        const codigoGenerado = `// ==========================================
// NEXCODE INTERACTIVE S.A. DE C.V.
// Módulo Procesado por Jarvis AI Core
// Propietario: C. Francisco (fg782270@gmail.com)
// Folio: ${folioOmnirouter}
// Hash SHA-256: ${cryptoHash}
// ==========================================

import React from 'react';

export default function JarvisModuleComponent() {
    return (
        <div style={{ background: '#020617', color: '#22d3ee', padding: '20px', fontFamily: 'monospace' }}>
            <h1>Nexcode Master Core — Módulo Blindado</h1>
            <p>Operación: ${tipoSoftware} - ${accion}</p>
            <p>Directriz: ${detalleSoftware}</p>
            <p>Estado: Memoria Híbrida Activa y Sincronizada.</p>
        </div>
    );
}
`;

        return {
            success: true,
            message: `¡Comando ejecutado con éxito y registrado en la memoria permanente de Jarvis!`,
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
        // Intentar leer de Supabase primero
        const { data, error } = await supabase
            .from('mexico_jarvis_memory')
            .select('id, memory_key, memory_value, routing_engine, created_at')
            .eq('owner_email', SUPERVISOR_AUTORIZADO)
            .order('created_at', { ascending: false })

        if (!error && data && data.length > 0) {
            return { success: true, memorias: data }
        }
    } catch (err) {}

    // Si Supabase no responde o está vacío, cargamos los registros locales
    const localData = leerMemoriaLocal()
    return { success: true, memorias: localData }
}
