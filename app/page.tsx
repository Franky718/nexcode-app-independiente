'use client'

import { useState, useTransition } from 'react'
import { ejecutarYGuardarEnSupabase } from '@/app/actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        startTransition(async () => {
            const resultado = await ejecutarYGuardarEnSupabase(formData)
            if (resultado.success) {
                setMensajeRespuesta(resultado.message)
                setHashGenerado(resultado.hash || null)
            } else {
                setMensajeRespuesta(resultado.message)
                setHashGenerado(null)
            }
        })
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl">
                <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                    <h1 className="text-xl font-bold tracking-wider">Nexcode Master Core</h1>
                    <span className="text-xs text-slate-400">fg782270@gmail.com</span>
                </header>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-slate-300 mb-1">Módulo de Operación:</label>
                        <input 
                            type="text" 
                            name="modulo" 
                            defaultValue="Core-Module-Governance" 
                            className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-1">Motor de IA:</label>
                        <select 
                            name="motorIA" 
                            className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                        >
                            <option value="Google Gemini">Google Gemini</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-1">Instrucción o Parámetro Institucional:</label>
                        <textarea 
                            name="instruccion" 
                            placeholder="Escribe la consulta para sincronización y auditoría..."
                            className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm h-24"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isPending}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-4 rounded transition-all duration-200 disabled:opacity-50"
                    >
                        {isPending ? 'Procesando y sellando...' : 'Ejecutar, Sellar y Guardar en Supabase'}
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
        </div>
    )
}
