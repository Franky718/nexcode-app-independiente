'use client'

import { useState, useTransition, useEffect } from 'react'
import { ejecutarJarvisCore, obtenerMemoriaJarvis } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)
    const [memorias, setMemorias] = useState<any[]>([])

    // Estado para controlar la visibilidad del panel desplegable por separado
    const [panelDesplegado, setPanelDesplegado] = useState(false)

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

    // Función para ejecutar acciones rápidas desde los botones separados
    async function ejecutarAccionRapida(accionTipo: string, clave: string, valor: string) {
        const formData = new FormData()
        formData.append('emailSolicitante', 'fg782270@gmail.com')
        formData.append('accion', accionTipo)
        formData.append('claveMemoria', clave)
        formData.append('valorMemoria', valor)

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
            {/* Panel Principal Jarvis Omnirouter */}
            <div className="w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-6">
                <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                    <div>
                        <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                            <span>⚡</span> Jarvis AI Core — <span className="text-cyan-300">Omnirouter & FreeLLAMPI</span>
                        </h1>
                        <p className="text-xs text-slate-400">Tokens Ilimitados, Memoria Integrada y Control de Propietario (C. Francisco)</p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded border border-cyan-500/20">fg782270@gmail.com</span>
                </header>

                {/* BOTÓN PARA DESPLEGAR EL PANEL SECUNDARIO DE BOTONES SEPARADOS */}
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() => setPanelDesplegado(!panelDesplegado)}
                        className="w-full bg-slate-950 border-2 border-cyan-500/60 hover:bg-cyan-950/30 text-cyan-300 font-bold py-3 px-4 rounded-lg transition-all duration-200 flex justify-between items-center shadow-lg"
                    >
                        <span>📂 Panel Desplegable de Botones Independientes (Acciones Rápidas Jarvis)</span>
                        <span className="text-xs bg-cyan-600 text-slate-950 px-2 py-1 rounded">
                            {panelDesplegado ? 'Ocultar Panel ▲' : 'Desplegar Panel ▼'}
                        </span>
                    </button>
                </div>

                {/* PANEL DESPLEGABLE CON BOTONES POR SEPARADO */}
                {panelDesplegado && (
                    <div className="mb-6 p-4 bg-slate-950 border border-cyan-500/50 rounded-lg animate-fadeIn shadow-inner">
                        <h3 className="text-sm font-bold text-cyan-300 mb-3 border-b border-cyan-500/20 pb-2">
                            Módulo de Acciones Modulares (Ejecución Independiente)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <button
                                type="button"
                                disabled={isPending}
                                onClick={() => ejecutarAccionRapida('guardar_memoria', 'estado_sistema', 'Operativo y Sincronizado')}
                                className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-3 rounded text-xs transition-all disabled:opacity-50 shadow"
                            >
                                💾 Guardar Estado Operativo
                            </button>
                            <button
                                type="button"
                                disabled={isPending}
                                onClick={() => ejecutarAccionRapida('procesar_ilimitado', 'token_sync', 'Sincronizacion Omnirouter FreeLLAMPI')}
                                className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-3 rounded text-xs transition-all disabled:opacity-50 shadow"
                            >
                                ⚡ Sincronizar Tokens Ilimitados
                            </button>
                            <button
                                type="button"
                                disabled={isPending}
                                onClick={() => ejecutarAccionRapida('guardar_memoria', 'respaldo_automatico', 'Respaldo Dual GitHub & Supabase')}
                                className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-3 rounded text-xs transition-all disabled:opacity-50 shadow"
                            >
                                🛡️ Forzar Respaldo Seguro
                            </button>
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
                            <label className="block text-sm text-slate-300 mb-1">Modo de Operación:</label>
                            <select 
                                name="accion" 
                                className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                            >
                                <option value="guardar_memoria">Guardar en Memoria Integrada</option>
                                <option value="procesar_ilimitado">Procesamiento Omnirouter Ilimitado</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-slate-300 mb-1">Clave de Memoria:</label>
                            <input 
                                type="text" 
                                name="claveMemoria" 
                                placeholder="Ej. proyecto_activo"
                                className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-1">Información o Directriz para Jarvis:</label>
                        <textarea 
                            name="valorMemoria" 
                            placeholder="Escriba la directriz que Jarvis debe recordar..."
                            className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm h-24"
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
                            OMNIROUTER FREELLAMPI ACTIVE
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

            {/* Banco de Memoria Integrada */}
            <div className="w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl">
                <h2 className="text-lg font-bold mb-4 text-cyan-300 border-b border-cyan-500/20 pb-2">Banco de Memoria Integrada (Exclusivo C. Francisco)</h2>
                {memorias.length === 0 ? (
                    <p className="text-xs text-slate-400">No hay registros almacenados en la memoria de Jarvis.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-cyan-500/20 text-cyan-400">
                                    <th className="pb-2">Clave</th>
                                    <th className="pb-2">Información Guardada</th>
                                    <th className="pb-2">Enrutamiento</th>
                                    <th className="pb-2">Fecha</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-slate-300">
                                {memorias.map((mem) => (
                                    <tr key={mem.id} className="hover:bg-slate-950/50">
                                        <td className="py-2 font-bold text-cyan-300">{mem.memory_key}</td>
                                        <td className="py-2 max-w-xs truncate">{mem.memory_value}</td>
                                        <td className="py-2 font-mono text-[10px] text-cyan-400">Omnirouter [Unlimited]</td>
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
