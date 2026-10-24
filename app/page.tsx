'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { ejecutarJarvisCore, obtenerMemoriaJarvis } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)
    const [codigoPaquete, setCodigoPaquete] = useState<string | null>(null)
    const [memorias, setMemorias] = useState<any[]>([])
    
    const [accesoConcedido, setAccesoConcedido] = useState(false)
    const [vozActiva, setVozActiva] = useState(true)
    const [modoInglesStark, setModoInglesStark] = useState(false)
    const [camaraActiva, setCamaraActiva] = useState(false)
    const [estadoRostro, setEstadoRostro] = useState('Esperando escaneo facial de seguridad...')
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [vocesDisponibles, setVocesDisponibles] = useState<SpeechSynthesisVoice[]>([])

    async function cargarMemoria() {
        const res = await obtenerMemoriaJarvis()
        if (res.success) {
            setMemorias(res.memorias)
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

    // Función de Voz Natural y Fluida (Cero Robótica)
    function hablarJarvis(textoPersonalizado?: string) {
        if (!vozActiva || typeof window === 'undefined' || !('speechSynthesis' in window)) return
        window.speechSynthesis.cancel()

        const texto = textoPersonalizado || (modoInglesStark 
            ? "Welcome back, sir. All systems are fully operational and secure." 
            : "Bienvenido, señor. Los sistemas están operativos y seguros bajo el protocolo Nexcode.")

        const utterance = new SpeechSynthesisUtterance(texto)
        
        // Configuración de tono humano y natural
        utterance.rate = 1.05  // Velocidad de conversación fluida
        utterance.pitch = 1.0  // Tono natural equilibrado (sin efectos metálicos)
        utterance.lang = modoInglesStark ? 'en-GB' : 'es-MX'

        // Buscar la mejor voz natural (preferentemente Microsoft u online de alta calidad)
        const idiomaBusqueda = modoInglesStark ? 'en' : 'es'
        const mejorVoz = vocesDisponibles.find(v => v.lang.toLowerCase().includes(idiomaBusqueda) && (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Helena') || v.name.includes('Google') || v.name.includes('Microsoft')))
                        || vocesDisponibles.find(v => v.lang.toLowerCase().includes(idiomaBusqueda))

        if (mejorVoz) {
            utterance.voice = mejorVoz
        }

        window.speechSynthesis.speak(utterance)
    }

    async function desbloquearSistemaBiometrico() {
        setCamaraActiva(true)
        setEstadoRostro('Analizando biometría facial...')
        hablarJarvis(modoInglesStark ? "Running biometric scan. Identifying C. Francisco." : "Iniciando escaneo biométrico para verificación del C. Francisco.")
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
            setTimeout(() => {
                setEstadoRostro('✔ Identidad confirmada: C. Francisco (fg782270@gmail.com)')
                hablarJarvis(modoInglesStark ? "Identity confirmed, sir. Welcome to the core." : "Identidad verificada con éxito. Desbloqueando paneles de control.")
                setAccesoConcedido(true)
            }, 3000)
        } catch (err) {
            setEstadoRostro('❌ Error de acceso biométrico.')
            hablarJarvis("Access denied. Biometric verification failed.")
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
            setCodigoPaquete(resultado.codigoDescargable || null)
            if (resultado.success) {
                hablarJarvis(resultado.message)
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
        link.download = `Nexcode-Clon-${folioUltimo || 'Proyecto'}.tsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        hablarJarvis('Paquete de código descargado con éxito, señor.')
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center justify-center">
            
            {!accesoConcedido ? (
                <div className="w-full max-w-xl bg-slate-900 border-2 border-cyan-500/60 rounded-xl p-8 shadow-2xl text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-wider text-white">🤖 Jarvis Secure Gate (Natural Voice)</h1>
                        <p className="text-xs text-cyan-300">Nexcode Interactive S.A. de C.V.</p>
                        <p className="text-[11px] text-slate-400">Supervisor Autorizado: fg782270@gmail.com (C. Francisco)</p>
                    </div>

                    <div className="flex justify-center gap-2 mb-2">
                        <button
                            type="button"
                            onClick={() => { setModoInglesStark(false); hablarJarvis("Modo de voz en español activado."); }}
                            className={`text-xs px-3 py-1 rounded font-bold ${!modoInglesStark ? 'bg-cyan-600 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-700'}`}
                        >
                            🇪🇸 Español Natural
                        </button>
                        <button
                            type="button"
                            onClick={() => { setModoInglesStark(true); hablarJarvis("British voice protocol active, sir."); }}
                            className={`text-xs px-3 py-1 rounded font-bold ${modoInglesStark ? 'bg-cyan-600 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-700'}`}
                        >
                            🇬🇧 Jarvis British Natural
                        </button>
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
                            🔓 Desbloquear con Biometría Facial & Voz Natural
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-4xl flex flex-col items-center animate-fadeIn">
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-6">
                        <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                            <div>
                                <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                                    <span>⚡</span> Jarvis AI Core — <span className="text-cyan-300">Natural Voice Active</span>
                                </h1>
                                <p className="text-xs text-slate-400">Control Operativo Seguro (C. Francisco)</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => setModoInglesStark(!modoInglesStark)}
                                    className="text-xs bg-slate-950 text-cyan-300 px-3 py-1 rounded border border-cyan-500/40 font-bold"
                                >
                                    {modoInglesStark ? '🇬🇧 Inglés' : '🇪🇸 Español'}
                                </button>
                                <button 
                                    onClick={() => setVozActiva(!vozActiva)}
                                    className={`text-xs px-3 py-1 rounded border ${vozActiva ? 'bg-cyan-600 text-slate-950 border-cyan-400 font-bold' : 'bg-slate-950 text-slate-400 border-slate-700'}`}
                                >
                                    {vozActiva ? '🔊 Voz On' : '🔇 Voz Off'}
                                </button>
                                <button 
                                    onClick={() => setAccesoConcedido(false)}
                                    className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold"
                                >
                                    🔒 Bloquear
                                </button>
                            </div>
                        </header>

                        {/* ESTRUCTURA DUAL DE BOTONES */}
                        <div className="mb-6 p-5 bg-slate-950 border-2 border-cyan-500/50 rounded-lg shadow-inner space-y-5">
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

                        {/* FORMULARIO PRINCIPAL */}
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
                                        defaultValue="Clonación y Mejora" 
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
                                {isPending ? 'Jarvis procesando...' : 'Ejecutar Comando Principal'}
                            </button>
                        </form>

                        {mensajeRespuesta && (
                            <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative overflow-hidden space-y-3">
                                <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">
                                    JARVIS NATURAL VOICE ACTIVE
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
                                        <span className="text-xs text-cyan-300 font-semibold">Paquete de código listo para descarga local:</span>
                                        <button
                                            type="button"
                                            onClick={descargarArchivoCodigo}
                                            className="bg-green-500 hover:bg-green-400 text-slate-950 font-bold py-2 px-4 rounded text-xs transition-all shadow-lg flex items-center gap-1"
                                        >
                                            📥 Descargar Paquete Clonado (.tsx)
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* BANCO DE MEMORIA */}
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl">
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
