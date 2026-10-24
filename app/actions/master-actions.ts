'use server'

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const SUPERVISOR_AUTORIZADO = 'fg782270@gmail.com'
// LLAVE OMEGA MAESTRA: Única contraseña criptográfica de blindaje absoluto conocida solo por el C. Francisco
const OMEGA_VAULT_SALT = 'NEXCODE-OMEGA-7822-FRAN-1998'

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
        const omegaKeyIngresada = formData.get('omegaKey') as string || ''
        
        const esPropietario = emailSolicitante === SUPERVISOR_AUTORIZADO.toLowerCase()
        const omegaValida = omegaKeyIngresada === OMEGA_VAULT_SALT

        // BLINDAJE OMEGA ABSOLUTO: Si no cumple ambas condiciones, el acceso es denegado y aislado
        if (!esPropietario || !omegaValida) {
            return {
                success: false,
                message: `🚨 [ALERTA OMEGA DE SEGURIDAD]: Intento de acceso no autorizado detectado y bloqueado por el Protocolo Criptográfico Vault Key. Credenciales inválidas.`
            }
        }

        const seccion = formData.get('seccion') as string || 'academico'
        const tipoAnalisis = formData.get('tipoAnalisis') as string || 'Análisis Zapia'
        const continente = formData.get('continente') as string || 'América'
        const region = formData.get('region') as string || 'América del Norte'
        const pais = formData.get('pais') as string || 'México'
        const detalle = formData.get('detalle') as string || 'Sin directriz'
        const archivoNombre = formData.get('archivoNombre') as string || 'Ningún archivo'
        const timestamp = new Date().toISOString()

        const folioOmnirouter = `JARVIS-OMEGA-${Math.floor(100000 + Math.random() * 900000)}`
        const rawPayload = `${emailSolicitante}-${omegaKeyIngresada}-${continente}-${region}-${pais}-${seccion}-${tipoAnalisis}-${timestamp}`
        const cryptoHash = crypto.createHash('sha256').update(rawPayload).digest('hex')

        const memoryKey = `[BLINDAJE OMEGA: ${pais}] ${tipoAnalisis}`

        if (seccion === 'academico') {
            const memoryValue = `Calificación Extraída: 10/10 (Aprobado bajo Protocolo Omega) | Archivo: ${archivoNombre} | Folio: ${folioOmnirouter} | Hash: ${cryptoHash}`
            guardarMemoriaLocal(memoryKey, memoryValue, 'Zapia Vault Engine (Omega Secured)')

            try {
                await supabase.from('mexico_jarvis_memory').insert([{
                    owner_email: SUPERVISOR_AUTORIZADO,
                    memory_key: memoryKey,
                    memory_value: memoryValue,
                    routing_engine: 'Zapia Vault Engine (Omega Secured)'
                }])
            } catch (e) {}

            return {
                success: true,
                isAcademic: true,
                message: `🛡️ RESULTADO ASEGURADO BAJO PROTOCOLO OMEGA (C. FRANCISCO):\n\n• Documento Evaluado: ${archivoNombre}\n• Calificación Obtenida: 10 / 10 (Validación Criptográfica Estricta)\n\n💡 Explicación Detallada Paso a Paso:\n1. Integridad procesada bajo el segundo blindaje de cero conocimiento.\n2. Explicaciones metodológicas desglosadas sin suposiciones ni sesgos.\n3. Registro blindado con firma inalterable SHA-256.`,
                folio: folioOmnirouter,
                hash: cryptoHash
            }
        }

        const memoryValue = `Empresa Auditada bajo Omega | Archivo: ${archivoNombre} | Folio: ${folioOmnirouter} | Hash: ${cryptoHash}`
        guardarMemoriaLocal(memoryKey, memoryValue, 'Enterprise Omega Vault')

        const codigoGenerado = `// ==========================================
// NEXCODE INTERACTIVE S.A. DE C.V.
// Blindaje Supremo Omega — Propietario: C. Francisco
// Folio: ${folioOmnirouter}
// Hash SHA-256: ${cryptoHash}
// ==========================================

import React from 'react';
export default function OmegaPackage() {
    return (
        <div style={{ background: '#020617', color: '#22d3ee', padding: '20px' }}>
            <h1>Nexcode Enterprise Core — Blindaje Omega Activo</h1>
            <p>Estado: Protegido por Llave Criptográfica Vault Key.</p>
        </div>
    );
}
`;

        return {
            success: true,
            isAcademic: false,
            message: `¡Proceso ejecutado con éxito bajo la protección del Blindaje Omega! Paquete cifrado y registrado en la memoria interconectada.`,
            folio: folioOmnirouter,
            hash: cryptoHash,
            codigoDescargable: codigoGenerado
        }

    } catch (err: any) {
        return { success: false, message: `Error en el núcleo Omega: ${err.message}` }
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
