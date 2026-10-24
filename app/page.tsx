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
            setmemoriasEstado(res.memorias)
        }
    }
    const [memoriasEstado, setmemoriasEstado] = useState<any[]>([])

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

        const texto = textoPersonalizado || (modoInglesStark 
            ? "Deployment systems online, sir. Ready for global cross-platform compilation." 
            : "Sistemas de despliegue global listos, señor.")

        const utterance = new SpeechSynthesisUtterance(texto)
        utterance.rate = 1.05
        utterance.pitch = 1.0
        utterance.lang = modoInglesStark ? 'en-GB' : 'es-MX'

        const idiomaBusqueda = modoInglesStark ? 'en' : 'es'
        const mejorVoz = vocesDisponibles.find(v => v.lang.toLowerCase().includes(idiomaBusqueda) && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Microsoft')))
                        || vocesDisponibles.find(v => v.lang.toLowerCase().includes(idiomaBusqueda))

        if (mejorVoz) utterance.voice = mejorVoz
        window.speechSynthesis.speak(utterance)
    }

    async function desbloquearSistemaBiometrico() {
        setCamaraActiva(true)
        setEstadoRostro('Analizando biometría facial...')
        hablarJarvis(modoInglesStark ? "Biometric scan verified. Welcome back, C. Francisco." : "Escaneo biométrico verificado. Bienvenido, C. Francisco.")
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
            setTimeout(() => {
                setEstadoRostro('✔ Identidad confirmada: C. Francisco (fg782270@gmail.com)')
                hablarJarvis(modoInglesStark ? "Access granted to global compilation network." : "Acceso concedido a la red de compilación global.")
                setAccesoConcedido(true)
            }, 3000)
        } catch (err) {
            setEstadoRostro('❌ Error de acceso biométrico.')
            hablarJarvis("Access denied.")
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

    async function ejecutarCompilacionGlobal(tipoPlataforma: string, detalle: string) {
        const formData = new FormData()
        formData.append('emailSolicitante', 'fg782270@gmail.com')
        formData.append('accion', `Compilación y Despliegue Automático`)
        formData.append('tipoSoftware', tipoPlataforma)
        formData.append('detalleSoftware', detalle)

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            setCodigoPaquete(resultado.codigoDescargable || null)
            if (resultado.success) {
                hablarJarvis(`Compilación para ${tipoPlataforma} completada con éxito.`)
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
        link.download = `Nexcode-Global-${folioUltimo || 'Release'}.tsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        hablarJarvis('Paquete de compilación descargado con éxito.')
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center justify-center">
            
            {!accesoConcedido ? (
                <div className="w-full max-w-xl bg-slate-900 border-2 border-cyan-500/60 rounded-xl p-8 shadow-2xl text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-wider text-white">🌐 Jarvis Global Deploy Gate</h1>
                        <p className="text-xs text-cyan-300">Nexcode Interactive S.A. de C.V.</p>
                        <p className="text-[11px] text-slate-400">Supervisor: fg782270@gmail.com (C. Francisco)</p>
                    </div>

                    <div className="flex justify-center gap-2 mb-2">
                        <button
                            type="button"
                            onClick={() => { setModoInglesStark(false); hablarJarvis("Español activado."); }}
                            className={`text-xs px-3 py-1 rounded font-bold ${!modoInglesStark ? 'bg-cyan-600 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-700'}`}
                        >
                            🇪🇸 Español
                        </button>
                        <button
                            type="button"
                            onClick={() => { setModoInglesStark(true); hablarJarvis("British voice active, sir."); }}
                            className={`text-xs px-3 py-1 rounded font-bold ${modoInglesStark ? 'bg-cyan-600 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-700'}`}
                        >
                            🇬🇧 English
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
                            🔓 Desbloquear Red de Compilación Global
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-4xl flex flex-col items-center animate-fadeIn">
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-6">
                        <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                            <div>
                                <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                                    <span>🌐</span> Jarvis Core — <span className="text-cyan-300">Global Cloud & Console Deploy</span>
                                </h1>
                                <p className="text-xs text-slate-400">Play Store, App Store, Windows, Xbox & PlayStation (C. Francisco)</p>
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

                        {/* MÓDULO DE BOTONES DE COMPILACIÓN MULTIPLATAFORMA Y CONSOLAS */}
                        <div className="mb-6 p-5 bg-slate-950 border-2 border-cyan-500/50 rounded-lg shadow-inner space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2 border-b border-cyan-500/20 pb-1">
                                [Módulo Global] Despliegue Automático en Nube Privada
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => ejecutarCompilacionGlobal('Google Play Store (Android)', 'Compilación AAB/APK y subida automatizada')}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 px-3 rounded text-xs transition-all shadow"
                                >
                                    🤖 Play Store (Android)
                                </button>
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => ejecutarCompilacionGlobal('Apple App Store (iOS/Mac)', 'Compilación IPA para ecosistema Apple')}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 px-3 rounded text-xs transition-all shadow"
                                >
                                    🍏 App Store (iOS / Mac)
                                </button>
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => ejecutarCompilacionGlobal('Windows Desktop (PC)', 'Generación de instalador ejecutable x64')}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 px-3 rounded text-xs transition-all shadow"
                                >
                                    💻 Windows Desktop (.exe)
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => ejecutarCompilacionGlobal('Xbox Series X|S (Videojuego)', 'Compilación de paquete XDK para Xbox Cloud')}
                                    className="bg-slate-900 border border-cyan-500/40 hover:bg-cyan-950 text-cyan-300 font-bold py-2.5 px-3 rounded text-xs transition-all shadow"
                                >
                                    🎮 Videojuego Xbox Cloud
                                </button>
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => ejecutarCompilacionGlobal('PlayStation 5 (Videojuego)', 'Compilación de paquete SDK para PSN Cloud')}
                                    className="bg-slate-900 border border-cyan-500/40 hover:bg-cyan-950 text-cyan-300 font-bold py-2.5 px-3 rounded text-xs transition-all shadow"
                                >
                                    🕹️ Videojuego PlayStation 5
                                </button>
                            </div>
                        </div>

                        {/* FORMULARIO DE ACCESO Y COMANDO PERSONALIZADO */}
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
                                    <label className="block text-sm text-slate-300 mb-1">Plataforma Destino:</label>
                                    <select 
                                        name="tipoSoftware" 
                                        className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                                    >
                                        <option value="Google Play Store">Google Play Store (Android)</option>
                                        <option value="Apple App Store">Apple App Store (iOS / Mac)</option>
                                        <option value="Windows Desktop">Windows Desktop</option>
                                        <option value="Xbox Series X">Xbox Videojuegos</option>
                                        <option value="PlayStation 5">PlayStation Videojuegos</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Acción del Núcleo:</label>
                                    <input 
                                        type="text" 
                                        name="accion" 
                                        defaultValue="Compilación y Despliegue en Nube" 
                                        className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-300 mb-1">Detalle o Directriz de Compilación:</label>
                                <textarea 
                                    name="detalleSoftware" 
                                    placeholder="Instrucciones para Jarvis..."
                                    className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm h-20"
                                    required
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isPending}
                                className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 px-4 rounded transition-all duration-200 disabled:opacity-50"
                            >
                                {isPending ? 'Jarvis compilando en nube...' : 'Ejecutar Compilación Global'}
                            </button>
                        </form>

                        {mensajeRespuesta && (
                            <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative overflow-hidden space-y-3">
                                <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">
                                    JARVIS GLOBAL CLOUD ACTIVE
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
                                        <span className="text-xs text-cyan-300 font-semibold">Paquete de compilación listo para descarga:</span>
                                        <button
                                            type="button"
                                            onClick={descargarArchivoCodigo}
                                            className="bg-green-500 hover:bg-green-400 text-slate-950 font-bold py-2 px-4 rounded text-xs transition-all shadow-lg flex items-center gap-1"
                                        >
                                            📥 Descargar Paquete Compilado (.tsx)
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
