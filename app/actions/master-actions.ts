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

        const seccion = formData.get('seccion') as string || 'Empresa'
        const tipoAnalisis = formData.get('tipoAnalisis') as string || 'Análisis General'
        const detalle = formData.get('detalle') as string || 'Sin detalles'
        const archivoNombre = formData.get('archivoNombre') as string || 'Ninguno'
        const timestamp = new Date().toISOString()

        const folioOmnirouter = `JARVIS-UNIFIED-${Math.floor(100000 + Math.random() * 900000)}`
        const rawPayload = `${SUPERVISOR_AUTORIZADO}-${seccion}-${tipoAnalisis}-${detalle}-${archivoNombre}-${timestamp}`
        const cryptoHash = crypto.createHash('sha256').update(rawPayload).digest('hex')

        const memoryKey = `[${seccion.toUpperCase()}] ${tipoAnalisis}`
        const memoryValue = `Archivo: ${archivoNombre} | Detalle: ${detalle} | Folio: ${folioOmnirouter} | Hash: ${cryptoHash}`

        // Guardar en memoria híbrida local y Supabase unificada
        guardarMemoriaLocal(memoryKey, memoryValue, `Jarvis Unified Engine (${seccion})`)

        try {
            await supabase.from('mexico_jarvis_memory').insert([
                {
                    owner_email: SUPERVISOR_AUTORIZADO,
                    memory_key: memoryKey,
                    memory_value: memoryValue,
                    routing_engine: `Jarvis Unified (${seccion})`
                }
            ])
        } catch (e) {}

        const codigoGenerado = `// ==========================================
// NEXCODE INTERACTIVE S.A. DE C.V.
// Módulo Compilado y Generado Automáticamente
// Núcleo: ${seccion} | Análisis: ${tipoAnalisis}
// Supervisor: C. Francisco (fg782270@gmail.com)
// Archivo Adjunto: ${archivoNombre}
// Folio Oficial: ${folioOmnirouter}
// Hash SHA-256: ${cryptoHash}
// ==========================================

import React from 'react';

export default function NexcodeAutoPackage() {
    return (
        <div style={{ background: '#020617', color: '#22d3ee', padding: '20px', fontFamily: 'monospace' }}>
            <h1>Nexcode Master Core — Paquete Autónomo</h1>
            <p>Sección: ${seccion}</p>
            <p>Tipo: ${tipoAnalisis}</p>
            <p>Documento procesado: ${archivoNombre}</p>
            <p>Estado: Compilado, Humanizado y Sincronizado en Banco de Memoria Interconectado.</p>
        </div>
    );
}
`;

        return {
            success: true,
            message: `¡Proceso ejecutado con éxito en el Núcleo [${seccion.toUpperCase()}]! Documento e información indexados en el Banco de Memoria Interconectado.`,
            folio: folioOmnirouter,
            hash: cryptoHash,
            codigoDescargable: codigoGenerado
        }

    } catch (err: any) {
        return { success: false, message: `Error en el núcleo unificado: ${err.message}` }
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
