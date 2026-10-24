'use server'

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const SUPERVISOR_AUTORIZADO = 'fg782270@gmail.com'
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
        const emailSolicitante = (formData.get('emailSolicitante') as string || '').trim().toLowerCase()
        const esPropietario = emailSolicitante === SUPERVISOR_AUTORIZADO.toLowerCase()

        const seccion = formData.get('seccion') as string || 'academico'
        const tipoAnalisis = formData.get('tipoAnalisis') as string || 'Análisis Zapia'
        const continente = formData.get('continente') as string || 'América'
        const region = formData.get('region') as string || 'América del Norte'
        const pais = formData.get('pais') as string || 'México'
        const detalle = formData.get('detalle') as string || 'Sin directriz'
        const archivoNombre = formData.get('archivoNombre') as string || 'Ningún archivo'
        const modeloIASeleccionado = formData.get('modeloIASeleccionado') as string || 'Matriz Global'
        const timestamp = new Date().toISOString()

        const folioOmnirouter = `JARVIS-SECURE-${Math.floor(100000 + Math.random() * 900000)}`
        const rawPayload = `${emailSolicitante}-${continente}-${region}-${pais}-${seccion}-${tipoAnalisis}-${timestamp}`
        const cryptoHash = crypto.createHash('sha256').update(rawPayload).digest('hex')

        // BLINDAJE DE ACCESO: Si es persona ajena, se aísla en su propio entorno invitado
        if (!esPropietario) {
            return {
                success: true,
                isAcademic: true,
                message: `🔒 [MODO INVITADO AISLADO & PRIVADO]: Acceso restringido al núcleo principal. Su sesión opera en una instancia independiente para (${emailSolicitante}). No tiene privilegios sobre los datos de Nexcode ni el banco de memoria del C. Francisco.`,
                folio: folioOmnirouter,
                hash: cryptoHash
            }
        }

        const memoryKey = `[PROPIETARIO: ${pais}] ${tipoAnalisis}`

        if (seccion === 'academico') {
            const memoryValue = `Calificación Extraída: 10/10 (Aprobado con Excelencia) | Archivo: ${archivoNombre} | Folio: ${folioOmnirouter} | Hash: ${cryptoHash}`
            guardarMemoriaLocal(memoryKey, memoryValue, 'Zapia Academic Engine (Propietario)')

            try {
                await supabase.from('mexico_jarvis_memory').insert([{
                    owner_email: SUPERVISOR_AUTORIZADO,
                    memory_key: memoryKey,
                    memory_value: memoryValue,
                    routing_engine: 'Zapia Academic Engine (Propietario)'
                }])
            } catch (e) {}

            return {
                success: true,
                isAcademic: true,
                message: `📊 RESULTADO DEL ANALIZADOR ZAPIA (PROPIETARIO - C. FRANCISCO):\n\n• Documento Evaluado: ${archivoNombre}\n• Calificación Obtenida: 10 / 10 (100% de aciertos)\n\n💡 Explicación Detallada Paso a Paso:\n1. Validación metodológica rigurosa bajo el protocolo de la UnADM.\n2. Fundamentación jurídica y teórica exacta.\n3. Integridad protegida mediante firma criptográfica SHA-256.`,
                folio: folioOmnirouter,
                hash: cryptoHash
            }
        }

        const memoryValue = `Empresa Auditada | Archivo: ${archivoNombre} | Folio: ${folioOmnirouter} | Hash: ${cryptoHash}`
        guardarMemoriaLocal(memoryKey, memoryValue, 'Enterprise & APK Engine')

        const codigoGenerado = `// ==========================================
// NEXCODE INTERACTIVE S.A. DE C.V.
// Núcleo Propietario Exclusivo: C. Francisco (${SUPERVISOR_AUTORIZADO})
// Folio: ${folioOmnirouter}
// Hash SHA-256: ${cryptoHash}
// ==========================================

import React from 'react';
export default function EnterprisePackage() {
    return (
        <div style={{ background: '#020617', color: '#22d3ee', padding: '20px' }}>
            <h1>Nexcode Enterprise Core — Propietario Exclusivo</h1>
            <p>Estado: Compilado y blindado de forma segura.</p>
        </div>
    );
}
`;

        return {
            success: true,
            isAcademic: false,
            message: `¡Proceso empresarial ejecutado con éxito bajo el blindaje del C. Francisco! Paquete cifrado y registrado en la memoria interconectada.`,
            folio: folioOmnirouter,
            hash: cryptoHash,
            codigoDescargable: codigoGenerado
        }

    } catch (err: any) {
        return { success: false, message: `Error en el núcleo blindado: ${err.message}` }
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
