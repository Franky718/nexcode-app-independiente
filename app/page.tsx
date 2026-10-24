'use client'

import { useState, useTransition, useEffect } from 'react'
import { procesarConJarvis, obtenerRespaldosRecientes } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [sector, setSector] = useState<'publico' | 'privado'>('publico')
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)
    const [registros, setRegistros] = useState<any[]>([])

    async function cargarLogs() {
        const res = await obtenerRespaldosRecientes()
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
            const resultado = await procesarConJarvis(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            if (resultado.success) {
                cargarLogs()
            }
        })
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center">
            {/* Panel Principal Jarvis & Nexcode */}
            <div className="w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-8">
                <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                    <div>
                        <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                            <span>🤖</span> Nexcode Master Core — <span className="text-cyan-300">Jarvis AI Security</span>
                        </h1>
                        <p className="text-xs text-slate-400">Antivirus Integrado, Cifrado SHA-256 y Respaldo Dual en Tiempo Real</p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded border border-cyan-500/20">fg782270@gmail.com</span>
                </header>

                <div className="flex gap-4 mb-6">
                    <button
                        type="button"
                        onClick={() => setSector('publico')}
                        className={`flex-1 py-2 px-4 rounded font-bold text-sm transition-all ${sector === 'publico' ? 'bg-cyan-600 text-slate-950 shadow-lg' : 'bg-slate-950 text-slate-400 border border-cyan-500/20'}`}
                    >
                        Sector Público (Gobierno)
                    </button>
                    <button
                        type="button"
                        onClick={() => setSector('privado')}
                        className={`flex-1 py-2 px-4 rounded font-bold text-sm transition-all ${sector === 'privado' ? 'bg-cyan-600 text-slate-950 shadow-lg' : 'bg-slate-950 text-slate-400 border border-cyan-500/20'}`}
                    >
                        Sector Privado (Corporativo)
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-slate-300 mb-1">Motor de Inteligencia Artificial (Supervisor):</label>
                            <select 
                                name="motorIA" 
                                className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                            >
                                <option value="Jarvis AI Core">Jarvis AI Core (Seguridad Activa)</option>
                                <option value="Google Gemini">Google Gemini (Motor Secundario)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-slate-300 mb-1">Categoría / Nivel:</label>
                            <select 
                                name="categoria" 
                                className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                            >
                                {sector === 'publico' ? (
                                    <>
                                        <option value="Municipal">Municipal (Reynosa / Tránsito)</option>
                                        <option value="Estatal">Estatal (Tamaulipas)</option>
                                        <option value="Federal">Federal (México)</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="Corporativo">Corporativo / Contratos</option>
                                        <option value="B2B">Comercial / B2B</option>
                                        <option value="Financiero">Financiero (FreshControl / Sónica)</option>
                                    </>
                                )}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-1">Entidad, Empresa o Dependencia:</label>
                        <input 
                            type="text" 
                            name="entidadDependencia" 
                            placeholder="Ej. Nexcode Interactive S.A. de C.V."
                            className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-1">Instrucción u Operación a Respaldar:</label>
                        <textarea 
                            name="descripcion" 
                            placeholder="Detalle de la transacción, código o protocolo protegido..."
                            className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm h-24"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isPending}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-4 rounded transition-all duration-200 disabled:opacity-50"
                    >
                        {isPending ? 'Jarvis escaneando y respaldando...' : 'Ejecutar Escaneo Antivirus, Sellar y Respaldar en Supabase'}
                    </button>
                </form>

                {mensajeRespuesta && (
                    <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">
                            JARVIS SECURITY CERTIFIED
                        </div>
                        <p className="text-white font-bold mb-2">{mensajeRespuesta}</p>
                        {folioUltimo && (
                            <p className="text-xs text-cyan-300 mb-1">
                                <span className="font-bold">Folio de Respaldo:</span> {folioUltimo}
                            </p>
                        )}
                        {hashGenerado && (
                            <p className="text-[11px] font-mono text-slate-300 mb-3 break-all">
                                <span className="font-bold text-cyan-400">Firma Antivirus & SHA-256:</span> {hashGenerado}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Panel de Historial de Respaldos */}
            <div className="w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl">
                <h2 className="text-lg font-bold mb-4 text-cyan-300 border-b border-cyan-500/20 pb-2">Historial de Respaldos Seguros (Supabase)</h2>
                {registros.length === 0 ? (
                    <p className="text-xs text-slate-400">No hay respaldos activos registrados.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-cyan-500/20 text-cyan-400">
                                    <th className="pb-2">Módulo / IA</th>
                                    <th className="pb-2">Detalle Protegido</th>
                                    <th className="pb-2">Firma Criptográfica</th>
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
