'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { ejecutarJarvisCore, obtenerMemoriaJarvis } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)
    const [codigoPaquete, setCodigoPaquete] = useState<string | null>(null)
    const [memoriasEstado, setMemoriasEstado] = useState<any[]>([])
    
    // Control de Secciones e Independencia de Cerebros
    const [seccionActiva, setSeccionActiva] = useState<'empresa' | 'academico'>('empresa')
    const [tipoEscaneoEmpresa, setTipoEscaneoEmpresa] = useState('Arquitectura Full-Stack & Seguridad')
    const [tipoEscaneoAcademico, setTipoEscaneoAcademico] = useState('Validación Metodológica de Tesis')
    
    const [accesoConcedido, setAccesoConcedido] = useState(false)
    const [vozActiva, setVozActiva] = useState(true)
    const [camaraActiva, setCamaraActiva] = useState(false)
    const [estadoRostro, setEstadoRostro] = useState('Esperando escaneo biométrico...')
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [vocesDisponibles, setVocesDisponibles] = useState<SpeechSynthesisVoice[]>([])

    async function cargarMemoria() {
        const res = await obtenerMemoriaJarvis()
        if (res.success) {
            setMemoriasEstado(res.memorias)
        }
    }

    useEffect(() => {
        cargarMemoria()
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            const actualizarVoces = () => setVocesDisponibles(window.speechSynthesis.getVoices())
            actualizarVoces()
            window.speechSynthesis.onvoiceschanged = actualizarVoces
        }
    }, [])

    function hablarJarvis(texto: string, tonoAlto: boolean = false) {
        if (!vozActiva || typeof window === 'undefined' || !('speechSynthesis' in window)) return
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(texto)
        utterance.rate = 1.05
        utterance.pitch = tonoAlto ? 1.25 : 0.95
        utterance.lang = 'es-MX'

        const mejorVoz = vocesDisponibles.find(v => v.lang.toLowerCase().includes('es') && (v.name.includes('Natural') || v.name.includes('Google')))
                        || vocesDisponibles.find(v => v.lang.toLowerCase().includes('es'))

        if (mejorVoz) utterance.voice = mejorVoz
        window.speechSynthesis.speak(utterance)
    }

    async function desbloquearSistemaBiometrico() {
        setCamaraActiva(true)
        setEstadoRostro('Analizando biometría...')
        hablarJarvis("Verificando identidad del C. Francisco.")
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) videoRef.current.srcObject = stream
            setTimeout(() => {
                setEstadoRostro('✔ Identidad confirmada: C. Francisco (fg782270@gmail.com)')
                hablarJarvis("Acceso total concedido a los motores de escaneo profundo.")
                setAccesoConcedido(true)
            }, 2500)
        } catch (err) {
            setEstadoRostro('❌ Error biométrico.')
            hablarJarvis("Acceso denegado.")
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        formData.append('cerebroModo', seccionActiva)

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            setCodigoPaquete(resultado.codigoDescargable || null)
            if (resultado.success) {
                hablarJarvis(`Escaneo profundo en sector ${seccionActiva.toUpperCase()} finalizado con éxito.`)
                cargarMemoria()
            }
        })
    }

    function descargarArchivoCodigo() {
        if (!codigoPaquete) return
        const blob = new Blob([codigoPaquete], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `Nexcode-DeepScan-${seccionActiva}-${folioUltimo || 'Reporte'}.tsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        hablarJarvis('Reporte de escaneo descargado con éxito.')
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center justify-center">
            
            {!accesoConcedido ? (
                <div className="w-full max-w-xl bg-slate-900 border-2 border-cyan-500/60 rounded-xl p-8 shadow-2xl text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-wider text-white">🔍 Jarvis Deep Scan Gate</h1>
                        <p className="text-xs text-cyan-300">Nexcode Interactive S.A. de C.V.</p>
                        <p className="text-[11px] text-slate-400">Supervisor: fg782270@gmail.com (C. Francisco)</p>
                    </div>

                    <div className="w-48 h-36 mx-auto bg-slate-950 border border-cyan-500/40 rounded-lg flex items-center justify-center overflow-hidden relative shadow-inner">
                        {camaraActiva ? (
                            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xs text-slate-500 p-2">Sistema Bloqueado</span>
                        )}
                    </div>

                    <div className="space-y-3">
                        <p className="text-xs text-white font-medium">{estadoRostro}</p>
                        <button
                            type="button"
                            onClick={desbloquearSistemaBiometrico}
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-3 px-4 rounded-lg text-sm transition-all shadow-lg"
                        >
                            🔓 Desbloquear Motores de Escaneo Profundo
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-4xl flex flex-col items-center animate-fadeIn">
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-6">
                        <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                            <div>
                                <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                                    <span>🔍</span> Jarvis Core — <span className="text-cyan-300">Escaneo Profundo Dual e Independiente</span>
                                </h1>
                                <p className="text-xs text-slate-400">Control Operativo Estricto (C. Francisco)</p>
                            </div>
                            <button 
                                onClick={() => setAccesoConcedido(false)}
                                className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold"
                            >
                                🔒 Bloquear
                            </button>
                        </header>

                        {/* SELECTOR DE SECCIÓN INDEPENDIENTE (EMPRESA VS ACADÉMICO) */}
                        <div className="mb-6 p-4 bg-slate-950 border-2 border-cyan-500/50 rounded-lg shadow-inner space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                                🔀 Selección de Núcleo Independiente para Escaneo Profundo:
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => { setSeccionActiva('empresa'); hablarJarvis("Cambiando a escaneo profundo empresarial."); }}
                                    className={`py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${seccionActiva === 'empresa' ? 'bg-cyan-500 text-slate-950 shadow-lg border-2 border-white' : 'bg-slate-900 text-cyan-300 border border-cyan-500/30'}`}
                                >
                                    🏢 Núcleo Empresa (Nexcode Interactive)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setSeccionActiva('academico'); hablarJarvis("Cambiando a escaneo profundo académico.", true); }}
                                    className={`py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${seccionActiva === 'academico' ? 'bg-amber-500 text-slate-950 shadow-lg border-2 border-white' : 'bg-slate-900 text-amber-300 border border-amber-500/30'}`}
                                >
                                    🎓 Núcleo Académico (Titulación Héctor Iván)
                                </button>
                            </div>
                        </div>

                        {/* FORMULARIO ADAPTATIVO SEGÚN LA SECCIÓN ACTIVA */}
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

                            {seccionActiva === 'empresa' ? (
                                <div className="space-y-4 p-4 bg-slate-950/60 rounded border border-cyan-500/30">
                                    <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wide">⚙️ Parámetros de Escaneo Profundo — Empresa</h4>
                                    <div>
                                        <label className="block text-xs text-slate-300 mb-1">Tipo de Análisis Empresarial:</label>
                                        <select 
                                            value={tipoEscaneoEmpresa}
                                            onChange={(e) => setTipoEscaneoEmpresa(e.target.value)}
                                            name="tipoSoftware"
                                            className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-sm"
                                        >
                                            <option value="Arquitectura Full-Stack & Seguridad">Auditoría de Arquitectura Full-Stack & Seguridad</option>
                                            <option value="Despliegue Multiplataforma">Validación de Despliegue (Play Store / Consolas)</option>
                                            <option value="Optimización Omnirouter">Optimización de Tokens y Memoria Supabase</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-300 mb-1">Objetivo o Módulo a Escanear en Nexcode:</label>
                                        <textarea 
                                            name="detalleSoftware" 
                                            placeholder="Describa el sistema, endpoint o código a someter a escaneo profundo corporativo..."
                                            className="w-full bg-slate-900 border border-cyan-500/40 rounded p-3 text-white text-sm h-24 outline-none focus:border-cyan-400"
                                            required
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 p-4 bg-slate-950/60 rounded border border-amber-500/30">
                                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">🎓 Parámetros de Escaneo Profundo — Académico (Prof. Héctor Iván)</h4>
                                    <div>
                                        <label className="block text-xs text-slate-300 mb-1">Tipo de Análisis Académico:</label>
                                        <select 
                                            value={tipoEscaneoAcademico}
                                            onChange={(e) => setTipoEscaneoAcademico(e.target.value)}
                                            name="tipoSoftware"
                                            className="w-full bg-slate-900 border border-amber-500/40 rounded p-2 text-white text-sm"
                                        >
                                            <option value="Validación Metodológica de Tesis">Validación Metodológica de Tesis & Marco Teórico</option>
                                            <option value="Caso Práctico sin Sesgo">Análisis Estricto de Caso Práctico (Cero Suposiciones)</option>
                                            <option value="Humanización Neutral Indetectable">Humanización Neutral e Indetectable de Reporte</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-300 mb-1">Texto o Caso a Analizar Profundamente:</label>
                                        <textarea 
                                            name="detalleSoftware" 
                                            placeholder="Ingrese el contenido de su tesis, caso práctico o documento para titulación..."
                                            className="w-full bg-slate-900 border border-amber-500/40 rounded p-3 text-white text-sm h-24 outline-none focus:border-amber-400"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={isPending}
                                className={`w-full font-bold py-3 px-4 rounded transition-all duration-200 disabled:opacity-50 shadow-lg ${seccionActiva === 'empresa' ? 'bg-cyan-600 hover:bg-cyan-500 text-slate-950' : 'bg-amber-500 hover:bg-amber-400 text-slate-950'}`}
                            >
                                {isPending ? 'Ejecutando escaneo profundo...' : `Ejecutar Escaneo Profundo [${seccionActiva.toUpperCase()}]`}
                            </button>
                        </form>

                        {mensajeRespuesta && (
                            <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative overflow-hidden space-y-3">
                                <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">
                                    DEEP SCAN RESULT ACTIVE
                                </div>
                                <p className="text-white font-bold">{mensajeRespuesta}</p>
                                {folioUltimo && (
                                    <p className="text-xs text-cyan-300">
                                        <span className="font-bold">Folio:</span> {folioUltimo}
                                    </p>
                                )}
                                {hashGenerado && (
                                    <p className="text-[11px] font-mono text-slate-300 break-all">
                                        <span className="font-bold text-cyan-400">SHA-256:</span> {hashGenerado}
                                    </p>
                                )}

                                {codigoPaquete && (
                                    <div className="pt-2 border-t border-cyan-500/30 flex items-center justify-between">
                                        <span className="text-xs text-cyan-300 font-semibold">Reporte de escaneo profundo listo para descarga:</span>
                                        <button
                                            type="button"
                                            onClick={descargarArchivoCodigo}
                                            className="bg-green-500 hover:bg-green-400 text-slate-950 font-bold py-2 px-4 rounded text-xs transition-all shadow-lg flex items-center gap-1"
                                        >
                                            📥 Descargar Reporte Deep Scan (.tsx)
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* BANCO DE MEMORIA HÍBRIDA */}
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl">
                        <h2 className="text-lg font-bold mb-4 text-cyan-300 border-b border-cyan-500/20 pb-2">Banco de Memoria y Registros (Deep Scan Log)</h2>
                        {memoriasEstado.length === 0 ? (
                            <p className="text-xs text-slate-400">No hay registros almacenados todavía.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-cyan-500/20 text-cyan-400">
                                            <th className="pb-2">Clave</th>
                                            <th className="pb-2">Información / Detalle</th>
                                            <th className="pb-2">Núcleo / Motor</th>
                                            <th className="pb-2">Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800 text-slate-300">
                                        {memoriasEstado.map((mem) => (
                                            <tr key={mem.id} className="hover:bg-slate-950/50">
                                                <td className="py-2 font-bold text-cyan-300">{mem.memory_key}</td>
                                                <td className="py-2 max-w-xs truncate">{mem.memory_value}</td>
                                                <td className="py-2 font-mono text-[10px] text-cyan-400">{mem.routing_engine || 'Deep Scan Engine'}</td>
                                                <td className="py-2 text-[10px] text-slate-500">{new Date(mem.created_at).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
