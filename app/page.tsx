'use client'

import { useState, useTransition, useEffect } from 'react'
import { ejecutarJarvisCore, obtenerMemoriaJarvis } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)
    const [memorias, setMemorias] = useState<any[]>([])
    
    // Predeterminado en true para que aparezca abierto por sí solo al cargar
    const [panelDesplegado, setPanelDesplegado] = useState(true)

    async function cargarMemoria() {
        const res = await obtenerMemoriaJarvis()
        if (res.success) {
            setMemorias(res.memorias)
        }
    }

    useEffect(() => {
        cargarMemoria()
    }, [])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            if (resultado.success) {
                cargarMemoria()
            }
        })
    }

    async function ejecutarAccionSoftware(tipo: string, detalle: string) {
        const formData = new FormData()
        formData.append('emailSolicitante', 'fg782270@gmail.com')
        formData.append('accion', 'Optimización Modular')
        formData.append('tipoSoftware', tipo)
        formData.append('detalleSoftware', detalle)

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            if (resultado.success) {
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
                            <span>⚡</span> Jarvis AI Core — <span className="text-cyan-300">Omnirouter & FreeLLAMPI</span>
                        </h1>
                        <p className="text-xs text-slate-400">Estructura Dual Predeterminada — Gestión de Software (C. Francisco)</p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded border border-cyan-500/20">fg782270@gmail.com</span>
                </header>

                {/* BOTÓN DE CONTROL DEL PANEL */}
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() => setPanelDesplegado(!panelDesplegado)}
                        className="w-full bg-slate-950 border-2 border-cyan-500/60 hover:bg-cyan-950/30 text-cyan-300 font-bold py-3 px-4 rounded-lg transition-all duration-200 flex justify-between items-center shadow-lg"
                    >
                        <span>📂 Panel Principal: Estructura Dual de Botones Independientes</span>
                        <span className="text-xs bg-cyan-600 text-slate-950 px-2 py-1 rounded">
                            {panelDesplegado ? 'Ocultar Panel ▲' : 'Desplegar Panel ▼'}
                        </span>
                    </button>
                </div>

                {/* PANEL CON DOS ESTRUCTURAS DISTINTAS DE BOTONES (ABIERTO POR DEFECTO) */}
                {panelDesplegado && (
                    <div className="mb-6 p-5 bg-slate-950 border-2 border-cyan-500/50 rounded-lg shadow-inner space-y-6">
                        
                        {/* ESTRUCTURA A: Grid de Tarjetas (Open Source y Privado) */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3 border-b border-cyan-500/20 pb-1">
                                [Estructura A] Módulos de Clonación y Reingeniería
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3 bg-slate-900 border border-cyan-500/30 rounded flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-xs font-bold text-white mb-1">🌐 Enfoque Open Source</h4>
                                        <p className="text-[11px] text-slate-400 mb-3">Integración y mejora directa de repositorios libres.</p>
                                    </div>
                                    <button
                                        type="button"
                                        disabled={isPending}
                                        onClick={() => ejecutarAccionSoftware('Open Source', 'Clonar y mejorar software libre')}
                                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-3 rounded text-xs transition-all disabled:opacity-50"
                                    >
                                        🚀 Ejecutar Open Source
                                    </button>
                                </div>
                                <div className="p-3 bg-slate-900 border border-cyan-500/30 rounded flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-xs font-bold text-white mb-1">🔒 Enfoque Software Privado</h4>
                                        <p className="text-[11px] text-slate-400 mb-3">Reingeniería funcional y optimización propietaria.</p>
                                    </div>
                                    <button
                                        type="button"
                                        disabled={isPending}
                                        onClick={() => ejecutarAccionSoftware('Software Privado', 'Emular y mejorar software privado')}
                                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-3 rounded text-xs transition-all disabled:opacity-50"
                                    >
                                        ⚡ Ejecutar Software Privado
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ESTRUCTURA B: Barra de Acciones en Línea (Sistema y Memoria) */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3 border-b border-cyan-500/20 pb-1">
                                [Estructura B] Comandos Rápidos del Núcleo y Tokens Ilimitados
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => ejecutarAccionSoftware('Sistema', 'Sincronización de tokens ilimitados Omnirouter')}
                                    className="flex-1 bg-slate-900 border border-cyan-500/40 hover:bg-cyan-950 text-cyan-300 font-bold py-2 px-4 rounded text-xs transition-all shadow"
                                >
                                    ⚡ Sincronizar Tokens Omnirouter
                                </button>
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => ejecutarAccionSoftware('Memoria', 'Respaldo automático en Supabase y GitHub')}
                                    className="flex-1 bg-slate-900 border border-cyan-500/40 hover:bg-cyan-950 text-cyan-300 font-bold py-2 px-4 rounded text-xs transition-all shadow"
                                >
                                    🛡️ Forzar Respaldo Dual
                                </button>
                            </div>
                        </div>

                    </div>
                )}

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
                            <label className="block text-sm text-slate-300 mb-1">Tipo de Software:</label>
                            <select 
                                name="tipoSoftware" 
                                className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                            >
                                <option value="Open Source">Open Source / Software Libre</option>
                                <option value="Software Privado">Software Privado (Reingeniería)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-slate-300 mb-1">Acción del Núcleo:</label>
                            <input 
                                type="text" 
                                name="accion" 
                                defaultValue="Optimización Modular" 
                                className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-1">Detalle o Parámetro de Mejora:</label>
                        <textarea 
                            name="detalleSoftware" 
                            placeholder="Especificaciones adicionales..."
                            className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm h-24"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isPending}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-4 rounded transition-all duration-200 disabled:opacity-50"
                    >
                        {isPending ? 'Procesando...' : 'Ejecutar Comando Principal Jarvis'}
                    </button>
                </form>

                {mensajeRespuesta && (
                    <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">
                            OMNIROUTER ACTIVE
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
        </div>
    )
}
