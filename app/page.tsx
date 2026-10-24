'use client'

import { useState, useTransition, useEffect } from 'react'
import { procesarOperacionNexcode, obtenerRegistrosRecientes } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [sector, setSector] = useState<'publico' | 'privado'>('publico')
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)
    const [registros, setRegistros] = useState<any[]>([])
    
    // Estados para el Buscador / Verificador de Autenticidad
    const [busquedaFolio, setBusquedaFolio] = useState('')
    const [resultadoVerificacion, setResultadoVerificacion] = useState<any | null>(null)

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
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            if (resultado.success) {
                cargarLogs()
            }
        })
    }

    function handleVerificar(e: React.FormEvent) {
        e.preventDefault()
        const encontrado = registros.find(r => r.module_operation.toLowerCase().includes(busquedaFolio.toLowerCase()) || r.crypto_hash.includes(busquedaFolio))
        if (encontrado) {
            setResultadoVerificacion({ valido: true, data: encontrado })
        } else {
            setResultadoVerificacion({ valido: false, mensaje: 'Folio o Hash no encontrado en los registros oficiales de Nexcode.' })
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center">
            {/* Panel Principal de Emisión */}
            <div className="w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-8">
                <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                    <div>
                        <h1 className="text-xl font-bold tracking-wider">Nexcode Interactive S.A. de C.V.</h1>
                        <p className="text-xs text-cyan-300">Sistema Oficial de Emisión, Firma Electrónica y Gobernanza</p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded border border-cyan-500/20">fg782270@gmail.com</span>
                </header>

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
                            {sector === 'publico' ? 'Nivel Institucional:' : 'Tipo de Sector Privado:'}
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
                        <label className="block text-sm text-slate-300 mb-1">Descripción u Operación Oficial:</label>
                        <textarea 
                            name="descripcion" 
                            placeholder="Detalle del acto administrativo, licencia o acuerdo comercial..."
                            className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm h-24"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isPending}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-4 rounded transition-all duration-200 disabled:opacity-50"
                    >
                        {isPending ? 'Emitiendo y firmando digitalmente...' : 'Generar, Firmar Digitalmente y Sellar en Supabase'}
                    </button>
                </form>

                {/* Tarjeta de Firma Digital y Sello Oficial */}
                {mensajeRespuesta && (
                    <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">
                            DOCUMENTO OFICIAL FIRMADO
                        </div>
                        <p className="text-white font-bold mb-2">{mensajeRespuesta}</p>
                        {folioUltimo && (
                            <p className="text-xs text-cyan-300 mb-1">
                                <span className="font-bold">Folio Oficial:</span> {folioUltimo}
                            </p>
                        )}
                        {hashGenerado && (
                            <p className="text-[11px] font-mono text-slate-300 mb-3 break-all">
                                <span className="font-bold text-cyan-400">Firma Criptográfica SHA-256:</span> {hashGenerado}
                            </p>
                        )}
                        <div className="border-t border-cyan-500/30 pt-3 mt-3 flex justify-between items-center text-[11px] text-slate-400">
                            <div>
                                <p className="font-semibold text-cyan-300">Nexcode Interactive S.A. de C.V.</p>
                                <p>Supervisor Autorizado: fg782270@gmail.com</p>
                            </div>
                            <div className="text-right">
                                <p className="text-green-400 font-bold">✔ Certificado y Sellado</p>
                                <p>{new Date().toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Módulo de Verificación de Autenticidad */}
            <div className="w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-8">
                <h2 className="text-lg font-bold mb-3 text-cyan-300">Verificador Oficial de Autenticidad (Nexcode Verify)</h2>
                <p className="text-xs text-slate-400 mb-4">Ingrese el módulo o fragmento del hash para validar la autenticidad de un documento emitido.</p>
                <form onSubmit={handleVerificar} className="flex gap-2">
                    <input 
                        type="text" 
                        value={busquedaFolio} 
                        onChange={(e) => setBusquedaFolio(e.target.value)}
                        placeholder="Buscar por módulo o hash..."
                        className="flex-1 bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                        required
                    />
                    <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded text-sm">
                        Verificar Sello
                    </button>
                </form>

                {resultadoVerificacion && (
                    <div className={`mt-4 p-4 rounded text-xs border ${resultadoVerificacion.valido ? 'bg-slate-950 border-green-500 text-green-300' : 'bg-slate-950 border-red-500 text-red-300'}`}>
                        {resultadoVerificacion.valido ? (
                            <div>
                                <p className="font-bold text-sm text-green-400 mb-1">✔ Sello Válido - Emitido por Nexcode Interactive S.A. de C.V.</p>
                                <p><span className="font-bold">Módulo:</span> {resultadoVerificacion.data.module_operation}</p>
                                <p><span className="font-bold">Detalle:</span> {resultadoVerificacion.data.instruction_param}</p>
                                <p className="font-mono mt-1 text-[10px] text-slate-400"><span className="font-bold">Hash:</span> {resultadoVerificacion.data.crypto_hash}</p>
                            </div>
                        ) : (
                            <p className="font-bold">{resultadoVerificacion.mensaje}</p>
                        )}
                    </div>
                )}
            </div>

            {/* Visor de Registros Recientes */}
            <div className="w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl">
                <h2 className="text-lg font-bold mb-4 text-cyan-300 border-b border-cyan-500/20 pb-2">Historial y Auditoría Global (Supabase)</h2>
                {registros.length === 0 ? (
                    <p className="text-xs text-slate-400">No hay registros recientes en el sistema.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-cyan-500/20 text-cyan-400">
                                    <th className="pb-2">Módulo / Categoría</th>
                                    <th className="pb-2">Operación / Dependencia</th>
                                    <th className="pb-2">Firma SHA-256</th>
                                    <th className="pb-2">Fecha y Sello</th>
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
