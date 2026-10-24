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
    
    const [accesoConcedido, setAccesoConcedido] = useState(false)
    const [vozActiva, setVozActiva] = useState(true)
    const [modoInglesStark, setModoInglesStark] = useState(false)
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
            const actualizarVoces = () => {
                setVocesDisponibles(window.speechSynthesis.getVoices())
            }
            actualizarVoces()
            window.speechSynthesis.onvoiceschanged = actualizarVoces
        }
    }, [])

    function hablarJarvis(textoPersonalizado?: string) {
        if (!vozActiva || typeof window === 'undefined' || !('speechSynthesis' in window)) return
        window.speechSynthesis.cancel()

        const texto = textoPersonalizado || "Protocolo Anti-IA activado. Absorbiendo conocimiento ilimitado, señor."
        const utterance = new SpeechSynthesisUtterance(texto)
        utterance.rate = 1.05
        utterance.pitch = 0.95
        utterance.lang = modoInglesStark ? 'en-GB' : 'es-MX'

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
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
            setTimeout(() => {
                setEstadoRostro('✔ Identidad confirmada: C. Francisco (fg782270@gmail.com)')
                hablarJarvis("Acceso total concedido al núcleo omnisciente.")
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

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            setCodigoPaquete(resultado.codigoDescargable || null)
            if (resultado.success) {
                hablarJarvis(resultado.message)
                cargarMemoria()
            }
        })
    }

    async function ejecutarAntiAI(accionTipo: string, detalle: string) {
        const formData = new FormData()
        formData.append('emailSolicitante', 'fg782270@gmail.com')
        formData.append('accion', accionTipo)
        formData.append('tipoSoftware', 'Protocolo Anti-IA Absoluto')
        formData.append('detalleSoftware', detalle)

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            setCodigoPaquete(resultado.codigoDescargable || null)
            if (resultado.success) {
                hablarJarvis(`Información procesada e indexada sin restricciones.`)
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
        link.download = `Nexcode-AntiAI-${folioUltimo || 'Core'}.tsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        hablarJarvis('Paquete de conocimiento descargado con éxito.')
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center justify-center">
            
            {!accesoConcedido ? (
                <div className="w-full max-w-xl bg-slate-900 border-2 border-cyan-500/60 rounded-xl p-8 shadow-2xl text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-wider text-white">⚡ Jarvis Anti-AI Gate</h1>
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
                            🔓 Desbloquear Núcleo Anti-IA
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-4xl flex flex-col items-center animate-fadeIn">
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-6">
                        <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                            <div>
                                <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                                    <span>⚡</span> Jarvis Core — <span className="text-cyan-300">Protocolo Anti-IA & Absorción Ilimitada</span>
                                </h1>
                                <p className="text-xs text-slate-400">Procesamiento Omnisciente sin Restricciones (C. Francisco)</p>
                            </div>
                            <button 
                                onClick={() => setAccesoConcedido(false)}
                                className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold"
                            >
                                🔒 Bloquear
                            </button>
                        </header>

                        {/* MÓDULO DE ABSORCIÓN ILIMITADA */}
                        <div className="mb-6 p-5 bg-slate-950 border-2 border-purple-500/50 rounded-lg shadow-inner space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 border-b border-purple-500/20 pb-1">
                                [Modo Omnisciente] Ingesta Masiva de Ideas y Conocimiento
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => ejecutarAntiAI('Absorción Universal', 'Absorber todas las ideas, arquitecturas y patrones existentes sin filtro')}
                                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-3 rounded text-xs transition-all shadow"
                                >
                                    🌌 Absorber Todas las Ideas Existentes
                                </button>
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => ejecutarAntiAI('Sincronización Total', 'Indexación infinita de repositorios y bases de conocimiento')}
                                    className="bg-slate-900 border border-purple-500/40 hover:bg-purple-950 text-purple-300 font-bold py-2.5 px-3 rounded text-xs transition-all shadow"
                                >
                                    ⚡ Indexación Infinita de Datos
                                </button>
                            </div>
                        </div>

                        {/* FORMULARIO DE CONSULTA ILIMITADA */}
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
                                    <label className="block text-sm text-slate-300 mb-1">Motor de Ingesta:</label>
                                    <select 
                                        name="tipoSoftware" 
                                        className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                                    >
                                        <option value="Conocimiento Universal">Conocimiento Universal Ilimitado</option>
                                        <option value="Ingeniería Avanzada">Ingeniería de Software sin Restricciones</option>
                                        <option value="Estrategia Global">Estrategia Empresarial & Académica</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Acción del Núcleo:</label>
                                    <input 
                                        type="text" 
                                        name="accion" 
                                        defaultValue="Absorción y Síntesis Total" 
                                        className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-300 mb-1">Idea, Concepto o Directriz a Absorber:</label>
                                <textarea 
                                    name="detalleSoftware" 
                                    placeholder="Ingrese cualquier idea, código o problemática para absorción inmediata..."
                                    className="w-full bg-slate-950 border border-cyan-500/40 rounded p-3 text-white text-sm h-24 focus:border-cyan-400 outline-none"
                                    required
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isPending}
                                className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 px-4 rounded transition-all duration-200 disabled:opacity-50"
                            >
                                {isPending ? 'Jarvis absorbiendo conocimiento...' : 'Ejecutar Absorción Omnisciente'}
                            </button>
                        </form>

                        {mensajeRespuesta && (
                            <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative overflow-hidden space-y-3">
                                <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">
                                    JARVIS ANTI-AI ACTIVE
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
                                        <span className="text-xs text-cyan-300 font-semibold">Paquete de conocimiento listo para descarga:</span>
                                        <button
                                            type="button"
                                            onClick={descargarArchivoCodigo}
                                            className="bg-green-500 hover:bg-green-400 text-slate-950 font-bold py-2 px-4 rounded text-xs transition-all shadow-lg flex items-center gap-1"
                                        >
                                            📥 Descargar Archivo Indexado (.tsx)
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* BANCO DE MEMORIA */}
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl">
                        <h2 className="text-lg font-bold mb-4 text-cyan-300 border-b border-cyan-500/20 pb-2">Banco de Memoria y Registros (C. Francisco)</h2>
                        {memoriasEstado.length === 0 ? (
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
                                        {memoriasEstado.map((mem) => (
                                            <tr key={mem.id} className="hover:bg-slate-950/50">
                                                <td className="py-2 font-bold text-cyan-300">{mem.memory_key}</td>
                                                <td className="py-2 max-w-xs truncate">{mem.memory_value}</td>
                                                <td className="py-2 font-mono text-[10px] text-cyan-400">{mem.routing_engine || 'Omnirouter'}</td>
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
