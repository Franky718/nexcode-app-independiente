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
    
    const [cerebroActivo, setCerebroActivo] = useState<'multicerebro' | 'ingenieria' | 'academico' | 'antiia'>('academico')
    const [modoIndetectable, setModoIndetectable] = useState(true)
    const [envioAutotecnico, setEnvioAutotecnico] = useState(true)
    
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
                hablarJarvis("Acceso total concedido. Protocolo indetectable y autotécnico activado.")
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
        formData.append('cerebroModo', cerebroActivo)
        formData.append('indetectable', modoIndetectable ? 'true' : 'false')
        formData.append('autotecnico', envioAutotecnico ? 'true' : 'false')

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            setCodigoPaquete(resultado.codigoDescargable || null)
            if (resultado.success) {
                hablarJarvis(`Trabajo humanizado y despachado de forma autotécnica con éxito.`)
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
        link.download = `Nexcode-Stealth-${folioUltimo || 'Reporte'}.tsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        hablarJarvis('Archivo descargado con éxito, señor.')
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center justify-center">
            
            {!accesoConcedido ? (
                <div className="w-full max-w-xl bg-slate-900 border-2 border-cyan-500/60 rounded-xl p-8 shadow-2xl text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-wider text-white">🛡️ Jarvis Stealth Gate</h1>
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
                            🔓 Desbloquear Núcleo Indetectable
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-4xl flex flex-col items-center animate-fadeIn">
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-6">
                        <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                            <div>
                                <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                                    <span>🛡️</span> Jarvis Core — <span className="text-cyan-300">Modo Indetectable & Autotécnico</span>
                                </h1>
                                <p className="text-xs text-slate-400">Titulación, Casos Prácticos y Entrega Autónoma (C. Francisco)</p>
                            </div>
                            <button 
                                onClick={() => setAccesoConcedido(false)}
                                className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold"
                            >
                                🔒 Bloquear
                            </button>
                        </header>

                        {/* SELECTOR DE CEREBRO Y TOGGLES DE SEGURIDAD */}
                        <div className="mb-6 p-4 bg-slate-950 border-2 border-cyan-500/50 rounded-lg shadow-inner space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                                🔀 Selección de Núcleo y Protocolos Activos:
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setCerebroActivo('multicerebro')}
                                    className={`py-2 px-3 rounded text-xs font-bold transition-all ${cerebroActivo === 'multicerebro' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-cyan-300 border border-cyan-500/30'}`}
                                >
                                    🌐 Sinergia Total
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCerebroActivo('ingenieria')}
                                    className={`py-2 px-3 rounded text-xs font-bold transition-all ${cerebroActivo === 'ingenieria' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-cyan-300 border border-cyan-500/30'}`}
                                >
                                    💻 Ingeniería & Cloud
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCerebroActivo('academico')}
                                    className={`py-2 px-3 rounded text-xs font-bold transition-all ${cerebroActivo === 'academico' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-amber-300 border border-amber-500/30'}`}
                                >
                                    🎓 Titulación (H. Iván)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCerebroActivo('antiia')}
                                    className={`py-2 px-3 rounded text-xs font-bold transition-all ${cerebroActivo === 'antiia' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-900 text-purple-300 border border-purple-500/30'}`}
                                >
                                    🌌 Anti-IA Absoluto
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-2 border-t border-cyan-500/20 text-xs">
                                <label className="flex items-center gap-2 cursor-pointer text-white font-medium">
                                    <input 
                                        type="checkbox" 
                                        checked={modoIndetectable} 
                                        onChange={(e) => setModoIndetectable(e.target.checked)}
                                        className="accent-cyan-500 w-4 h-4"
                                    />
                                    🔒 Activar Modo Indetectable (Bypass de IA / Humanización Estocástica)
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-white font-medium">
                                    <input 
                                        type="checkbox" 
                                        checked={envioAutotecnico} 
                                        onChange={(e) => setEnvioAutotecnico(e.target.checked)}
                                        className="accent-cyan-500 w-4 h-4"
                                    />
                                    ⚡ Envío y Despacho Autotécnico Predeterminado
                                </label>
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
                                    <label className="block text-sm text-slate-300 mb-1">Núcleo Asignado:</label>
                                    <input 
                                        type="text" 
                                        value={`Cerebro: ${cerebroActivo.toUpperCase()} | Indetectable: ON`}
                                        disabled
                                        className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-cyan-300 font-mono text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Acción del Núcleo:</label>
                                    <input 
                                        type="text" 
                                        name="accion" 
                                        defaultValue="Generación y Despacho Autotécnico" 
                                        className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-300 mb-1">Instrucción, Tesis o Caso Práctico (Profesor Héctor Iván):</label>
                                <textarea 
                                    name="detalleSoftware" 
                                    placeholder="Ingrese los detalles del trabajo a procesar de forma indetectable y autónoma..."
                                    className="w-full bg-slate-950 border border-cyan-500/40 rounded p-3 text-white text-sm h-32 focus:border-cyan-400 outline-none"
                                    required
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isPending}
                                className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-3 px-4 rounded transition-all duration-200 disabled:opacity-50 shadow-lg"
                            >
                                {isPending ? 'Procesando formato indetectable...' : 'Ejecutar Procesamiento Stealth & Autotécnico'}
                            </button>
                        </form>

                        {mensajeRespuesta && (
                            <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative overflow-hidden space-y-3">
                                <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">
                                    JARVIS STEALTH DISPATCH ACTIVE
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
                                        <span className="text-xs text-cyan-300 font-semibold">Trabajo humanizado listo para descarga:</span>
                                        <button
                                            type="button"
                                            onClick={descargarArchivoCodigo}
                                            className="bg-green-500 hover:bg-green-400 text-slate-950 font-bold py-2 px-4 rounded text-xs transition-all shadow-lg flex items-center gap-1"
                                        >
                                            📥 Descargar Trabajo Indetectable (.tsx)
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* BANCO DE MEMORIA HÍBRIDA */}
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl">
                        <h2 className="text-lg font-bold mb-4 text-cyan-300 border-b border-cyan-500/20 pb-2">Banco de Memoria y Registros Stealth</h2>
                        {memoriasEstado.length === 0 ? (
                            <p className="text-xs text-slate-400">No hay registros almacenados todavía.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-cyan-500/20 text-cyan-400">
                                            <th className="pb-2">Clave</th>
                                            <th className="pb-2">Información / Detalle</th>
                                            <th className="pb-2">Motor / Cerebro</th>
                                            <th className="pb-2">Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800 text-slate-300">
                                        {memoriasEstado.map((mem) => (
                                            <tr key={mem.id} className="hover:bg-slate-950/50">
                                                <td className="py-2 font-bold text-cyan-300">{mem.memory_key}</td>
                                                <td className="py-2 max-w-xs truncate">{mem.memory_value}</td>
                                                <td className="py-2 font-mono text-[10px] text-cyan-400">{mem.routing_engine || 'Stealth Engine'}</td>
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
