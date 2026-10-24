'use client'

import { useState, useTransition, useEffect } from 'react'
import { procesarOperacionNexcode, obtenerRegistrosRecientes } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [sector, setSector] = useState<'publico' | 'privado'>('publico')
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)
    const [registros, setRegistros] = useState<any[]>([])

    async function cargarLogs() {
        const res = await obtenerRegistrosRecientes()
        if (res.success) {
            setRegistros(res.registros)
        }
    }

    useEffect(() => {
        cargarLogs()
    }, [])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        formData.append('sector', sector)

        startTransition(async () => {
            const resultado = await procesarOperacionNexcode(formData)
            setMensajeRespuesta(resultado.message)
            setHashGenerado(resultado.hash || null)
            if (resultado.success) {
                cargarLogs()
            }
        })
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-8">
                <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                    <div>
                        <h1 className="text-xl font-bold tracking-wider">Nexcode Master Core</h1>
                        <p className="text-xs text-cyan-300">Plataforma Integral: Gobierno (MX) & Sector Privado (B2B)</p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded border border-cyan-500/20">fg782270@gmail.com</span>
                </header>

                {/* Selector de Sector */}
                <div className="flex gap-4 mb-6">
                    <button
                        type="button"
                        onClick={() => setSector('publico')}
                        className={`flex-1 py-2 px-4 rounded font-bold text-sm transition-all ${sector === 'publico' ? 'bg-cyan-600 text-slate-950 shadow-lg' : 'bg-slate-950 text-slate-400 border border-cyan-500/20'}`}
                    >
                        Sector Público (Gobierno México)
                    </button>
                    <button
                        type="button"
                        onClick={() => setSector('privado')}
                        className={`flex-1 py-2 px-4 rounded font-bold text-sm transition-all ${sector === 'privado' ? 'bg-cyan-600 text-slate-950 shadow-lg' : 'bg-slate-950 text-slate-400 border border-cyan-500/20'}`}
                    >
                        Sector Privado (Corporativo / B2B)
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-slate-300 mb-1">
                            {sector === 'publico' ? 'Nivel de Gobierno:' : 'Tipo de Sector Privado:'}
                        </label>
                        <select 
                            name="categoria" 
                            className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                        >
                            {sector === 'publico' ? (
                                <>
                                    <option value="Municipal">Municipal (Ayuntamiento / Tránsito / Obras)</option>
                                    <option value="Estatal">Estatal (Secretarías / Gaceta)</option>
                                    <option value="Federal">Federal (Interoperabilidad Nacional)</option>
                                </>
                            ) : (
                                <>
                                    <option value="Corporativo">Corporativo / Contratos Mercantiles</option>
                                    <option value="B2B">Comercial / B2B y Proveeduría</option>
                                    <option value="Financiero">Financiero y E-commerce (FreshControl / Sónica)</option>
                                </>
                            )}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-1">
                            {sector === 'publico' ? 'Dependencia o Municipio:' : 'Razón Social / Empresa / Cliente:'}
                        </label>
                        <input 
                            type="text" 
                            name="entidadDependencia" 
                            placeholder={sector === 'publico' ? 'Ej. Municipio de Reynosa, Tamaulipas' : 'Ej. Nexcode Interactive S.A. de C.V.'}
                            className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-1">Descripción u Operación Institucional:</label>
                        <textarea 
                            name="descripcion" 
                            placeholder="Detalle de la resolución, trámite o acuerdo comercial..."
                            className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm h-24"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isPending}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-4 rounded transition-all duration-200 disabled:opacity-50"
                    >
                        {isPending ? 'Procesando y sellando...' : 'Ejecutar, Sellar (SHA-256) y Guardar en Supabase'}
                    </button>
                </form>

                {mensajeRespuesta && (
                    <div className="mt-6 p-4 bg-slate-950 border border-cyan-500/50 rounded text-sm">
                        <p className="text-white font-medium">{mensajeRespuesta}</p>
                        {hashGenerado && (
                            <p className="text-xs text-cyan-300 mt-2 break-all">
                                <span className="font-bold">SHA-256 Hash:</span> {hashGenerado}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Visor de Registros en Tiempo Real */}
            <div className="w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl">
                <h2 className="text-lg font-bold mb-4 text-cyan-300 border-b border-cyan-500/20 pb-2">Registros y Auditoría en Tiempo Real (Supabase)</h2>
                {registros.length === 0 ? (
                    <p className="text-xs text-slate-400">No hay registros recientes o esperando sincronización.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-cyan-500/20 text-cyan-400">
                                    <th className="pb-2">Módulo</th>
                                    <th className="pb-2">Detalle / Parámetro</th>
                                    <th className="pb-2">Hash SHA-256</th>
                                    <th className="pb-2">Fecha</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-slate-300">
                                {registros.map((reg) => (
                                    <tr key={reg.id} className="hover:bg-slate-950/50">
                                        <td className="py-2 font-bold text-cyan-300">{reg.module_operation}</td>
                                        <td className="py-2 max-w-xs truncate">{reg.instruction_param}</td>
                                        <td className="py-2 font-mono text-[10px] text-slate-400 truncate max-w-[120px]">{reg.crypto_hash}</td>
                                        <td className="py-2 text-[10px] text-slate-500">{new Date(reg.created_at).toLocaleString()}</td>
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
