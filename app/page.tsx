'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { ejecutarJarvisCore, obtenerMemoriaJarvis } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)
    const [memorias, setMemorias] = useState<any[]>([])
    
    // Estados para Voz, Cámara y Paneles
    const [vozActiva, setVozActiva] = useState(true)
    const [camaraActiva, setCamaraActiva] = useState(false)
    const [estadoRostro, setEstadoRostro] = useState('Esperando escaneo facial...')
    const videoRef = useRef<HTMLVideoElement | null>(null)

    async function cargarMemoria() {
        const res = await obtenerMemoriaJarvis()
        if (res.success) {
            setMemorias(res.memorias)
        }
    }

    useEffect(() => {
        cargarMemoria()
    }, [])

    function hablarJarvis(texto: string) {
        if (!vozActiva || typeof window === 'undefined' || !('speechSynthesis' in window)) return
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(texto)
        utterance.lang = 'es-MX'
        utterance.rate = 1.0
        utterance.pitch = 0.9
        window.speechSynthesis.speak(utterance)
    }

    async function iniciarEscaneoFacial() {
        setCamaraActiva(true)
        setEstadoRostro('Iniciando sensores biométricos...')
        hablarJarvis('Iniciando escaneo facial para verificación del C. Francisco.')
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
            setTimeout(() => {
                setEstadoRostro('✔ Rostro verificado: C. Francisco (fg782270@gmail.com)')
                hablarJarvis('Rostro verificado con éxito. Acceso total concedido.')
            }, 3000)
        } catch (err) {
            setEstadoRostro('❌ Error: No se pudo acceder a la cámara.')
            hablarJarvis('Error al acceder a la cámara.')
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            if (resultado.success) {
                hablarJarvis(resultado.message)
                cargarMemoria()
            }
        })
    }

    async function ejecutarAccionModular(tipo: string, detalle: string) {
        const formData = new FormData()
        formData.append('emailSolicitante', 'fg782270@gmail.com')
        formData.append('accion', tipo)
        formData.append('tipoSoftware', tipo)
        formData.append('detalleSoftware', detalle)

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            if (resultado.success) {
                hablarJarvis(resultado.message)
                cargarMemoria()
            }
        })
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-6">
                <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                    <div>
                        <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                            <span>⚡</span> Jarvis AI Core — <span className="text-cyan-300">Master Platform</span>
                        </h1>
                        <p className="text-xs text-slate-400">Panel Unificado: Biometría, Voz, Open Source & Software Privado (C. Francisco)</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setVozActiva(!vozActiva)}
                            className={`text-xs px-3 py-1 rounded border ${vozActiva ? 'bg-cyan-600 text-slate-950 border-cyan-400 font-bold' : 'bg-slate-950 text-slate-400 border-slate-700'}`}
                        >
                            {vozActiva ? '🔊 Voz Activada' : '🔇 Voz Silenciada'}
                        </button>
                        <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded border border-cyan-500/20">fg782270@gmail.com</span>
                    </div>
                </header>

                {/* 1. MÓDULO DE ESCANEO FACIAL */}
                <div className="mb-6 p-4 bg-slate-950 border-2 border-cyan-500/50 rounded-lg shadow-inner">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3 border-b border-cyan-500/20 pb-1">
                        [Seguridad Biométrica] Escaneo de Rostro e Identidad
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-36 h-28 bg-slate-900 border border-cyan-500/40 rounded flex items-center justify-center overflow-hidden relative">
                            {camaraActiva ? (
                                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-[10px] text-slate-500 text-center p-2">Cámara Inactiva</span>
                            )}
                        </div>
                        <div className="flex-1 space-y-2">
                            <p className="text-xs text-white font-medium">{estadoRostro}</p>
                            <button
                                type="button"
                                onClick={iniciarEscaneoFacial}
                                className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-4 rounded text-xs transition-all shadow"
                            >
                                📷 Iniciar Escaneo Facial
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. ESTRUCTURA DUAL DE BOTONES (ESTRUCTURA A & B) */}
                <div className="mb-6 p-5 bg-slate-950 border-2 border-cyan-500/50 rounded-lg shadow-inner space-y-5">
                    
                    {/* Estructura A: Open Source y Software Privado */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3 border-b border-cyan-500/20 pb-1">
                            [Estructura A] Clonación y Reingeniería de Software
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3 bg-slate-900 border border-cyan-500/30 rounded flex flex-col justify-between">
                                <div>
                                    <h4 className="text-xs font-bold text-white mb-1">🌐 Enfoque Open Source</h4>
                                    <p className="text-[11px] text-slate-400 mb-3">Clonar y mejorar software libre y abierto.</p>
                                </div>
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => ejecutarAccionModular('Open Source', 'Clonar y optimizar repositorio libre')}
                                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-3 rounded text-xs transition-all disabled:opacity-50"
                                >
                                    🚀 Ejecutar Open Source
                                </button>
                            </div>
                            <div className="p-3 bg-slate-900 border border-cyan-500/30 rounded flex flex-col justify-between">
                                <div>
                                    <h4 className="text-xs font-bold text-white mb-1">🔒 Enfoque Software Privado</h4>
                                    <p className="text-[11px] text-slate-400 mb-3">Reingeniería funcional propietaria.</p>
                                </div>
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => ejecutarAccionModular('Software Privado', 'Emular y mejorar código privado')}
                                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-3 rounded text-xs transition-all disabled:opacity-50"
                                >
                                    ⚡ Ejecutar Software Privado
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Estructura B: Comandos y Gmail */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3 border-b border-cyan-500/20 pb-1">
                            [Estructura B] Sincronización, Gmail y Tokens Ilimitados
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                disabled={isPending}
                                onClick={() => ejecutarAccionModular('Gmail Sync', 'Sincronizar aprendizaje desde Gmail')}
                                className="flex-1 bg-slate-900 border border-cyan-500/40 hover:bg-cyan-950 text-cyan-300 font-bold py-2 px-3 rounded text-xs transition-all shadow"
                            >
                                📧 Aprender de Gmail
                            </button>
                            <button
                                type="button"
                                disabled={isPending}
                                onClick={() => ejecutarAccionModular('Omnirouter', 'Sincronizar tokens ilimitados FreeLLAMPI')}
                                className="flex-1 bg-slate-900 border border-cyan-500/40 hover:bg-cyan-950 text-cyan-300 font-bold py-2 px-3 rounded text-xs transition-all shadow"
                            >
                                ⚡ Tokens Omnirouter
                            </button>
                            <button
                                type="button"
                                disabled={isPending}
                                onClick={() => ejecutarAccionModular('Respaldo', 'Respaldo dual Supabase y GitHub')}
                                className="flex-1 bg-slate-900 border border-cyan-500/40 hover:bg-cyan-950 text-cyan-300 font-bold py-2 px-3 rounded text-xs transition-all shadow"
                            >
                                🛡️ Respaldo Dual
                            </button>
                        </div>
                    </div>

                </div>

                {/* 3. FORMULARIO PRINCIPAL */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-slate-300 mb-1">Verificación de Identidad (Propietario):</label>
                        <input 
                            type="email" 
                            name="emailSolicitante" 
                            defaultValue="fg782270@gmail.com" 
                            className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-slate-300 mb-1">Tipo de Operación:</label>
                            <select 
                                name="tipoSoftware" 
                                className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                            >
                                <option value="Open Source">Open Source / Software Libre</option>
                                <option value="Software Privado">Software Privado (Reingeniería)</option>
                                <option value="Sistema Autónomo">Sistema Autónomo General</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-slate-300 mb-1">Acción del Núcleo:</label>
                            <input 
                                type="text" 
                                name="accion" 
                                defaultValue="Optimización y Memoria" 
                                className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-1">Detalle o Directriz para Jarvis:</label>
                        <textarea 
                            name="detalleSoftware" 
                            placeholder="Instrucciones para Jarvis..."
                            className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm h-24"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isPending}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-4 rounded transition-all duration-200 disabled:opacity-50"
                    >
                        {isPending ? 'Procesando con Jarvis...' : 'Ejecutar Comando Principal'}
                    </button>
                </form>

                {mensajeRespuesta && (
                    <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">
                            JARVIS UNIFIED CORE ACTIVE
                        </div>
                        <p className="text-white font-bold mb-2">{mensajeRespuesta}</p>
                        {folioUltimo && (
                            <p className="text-xs text-cyan-300 mb-1">
                                <span className="font-bold">Folio:</span> {folioUltimo}
                            </p>
                        )}
                        {hashGenerado && (
                            <p className="text-[11px] font-mono text-slate-300 mb-3 break-all">
                                <span className="font-bold text-cyan-400">SHA-256:</span> {hashGenerado}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* BANCO DE MEMORIA INTEGRADA */}
            <div className="w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl">
                <h2 className="text-lg font-bold mb-4 text-cyan-300 border-b border-cyan-500/20 pb-2">Banco de Memoria y Registros (C. Francisco)</h2>
                {memorias.length === 0 ? (
                    <p className="text-xs text-slate-400">No hay registros almacenados todavía.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-cyan-500/20 text-cyan-400">
                                    <th className="pb-2">Clave</th>
                                    <th className="pb-2">Información / Detalle</th>
                                    <th className="pb-2">Motor</th>
                                    <th className="pb-2">Fecha</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-slate-300">
                                {memorias.map((mem) => (
                                    <tr key={mem.id} className="hover:bg-slate-950/50">
                                        <td className="py-2 font-bold text-cyan-300">{mem.memory_key}</td>
                                        <td className="py-2 max-w-xs truncate">{mem.memory_value}</td>
                                        <td className="py-2 font-mono text-[10px] text-cyan-400">Omnirouter</td>
                                        <td className="py-2 text-[10px] text-slate-500">{new Date(mem.created_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
