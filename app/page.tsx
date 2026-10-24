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
    
    const [seccionActiva, setSeccionActiva] = useState<'empresa' | 'academico'>('academico')
    const [tipoAnalisisEmpresa, setTipoAnalisisEmpresa] = useState('Arquitectura Full-Stack & Auditoría')
    const [tipoAnalisisAcademico, setTipoAnalisisAcademico] = useState('Validación de Tesis & Caso Práctico')
    const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null)

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
                hablarJarvis("Acceso total concedido a la Matriz Interconectada.")
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
        formData.append('seccion', seccionActiva)
        formData.append('tipoAnalisis', seccionActiva === 'empresa' ? tipoAnalisisEmpresa : tipoAnalisisAcademico)
        if (archivoSeleccionado) {
            formData.append('archivoNombre', archivoSeleccionado.name)
        } else {
            formData.append('archivoNombre', 'Ningún documento adjunto')
        }

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            setCodigoPaquete(resultado.codigoDescargable || null)
            if (resultado.success) {
                hablarJarvis(`Procesamiento y compilación en ${seccionActiva} finalizados con éxito.`)
                cargarMemoria()
            }
        })
    }

    function descargarArchivo() {
        if (!codigoPaquete) return
        const blob = new Blob([codigoPaquete], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `Nexcode-Unified-${seccionActiva}-${folioUltimo || 'Package'}.tsx`
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
                        <h1 className="text-2xl font-bold tracking-wider text-white">⚡ Jarvis Unified Gate</h1>
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
                            🔓 Desbloquear Núcleo Interconectado
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-4xl flex flex-col items-center animate-fadeIn">
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-6">
                        <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                            <div>
                                <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                                    <span>⚡</span> Jarvis Core — <span className="text-cyan-300">Sistema Unificado & APK Builder</span>
                                </h1>
                                <p className="text-xs text-slate-400">Gestión Integral y Carga de Archivos (C. Francisco)</p>
                            </div>
                            <button 
                                onClick={() => setAccesoConcedido(false)}
                                className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold"
                            >
                                🔒 Bloquear
                            </button>
                        </header>

                        {/* SELECTOR DE NÚCLEO INDEPENDIENTE */}
                        <div className="mb-6 p-4 bg-slate-950 border-2 border-cyan-500/50 rounded-lg shadow-inner space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                                🔀 Selección de Núcleo Activo:
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => { setSeccionActiva('academico'); hablarJarvis("Núcleo Académico Activo", true); }}
                                    className={`py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${seccionActiva === 'academico' ? 'bg-amber-500 text-slate-950 shadow-lg border-2 border-white' : 'bg-slate-900 text-amber-300 border border-amber-500/30'}`}
                                >
                                    🎓 Núcleo Académico (Titulación Héctor Iván)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setSeccionActiva('empresa'); hablarJarvis("Núcleo Empresa Activo"); }}
                                    className={`py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${seccionActiva === 'empresa' ? 'bg-cyan-500 text-slate-950 shadow-lg border-2 border-white' : 'bg-slate-900 text-cyan-300 border border-cyan-500/30'}`}
                                >
                                    🏢 Núcleo Empresa (Nexcode Interactive)
                                </button>
                            </div>
                        </div>

                        {/* FORMULARIO PRINCIPAL CON CARGA DE PDF/WORD Y COMPILACIÓN APK */}
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

                            {seccionActiva === 'academico' ? (
                                <div className="space-y-4 p-4 bg-slate-950/60 rounded border border-amber-500/30">
                                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">🎓 Parámetros Académicos & Titulación (Prof. Héctor Iván)</h4>
                                    <div>
                                        <label className="block text-xs text-slate-300 mb-1">Modo de Análisis Académico:</label>
                                        <select 
                                            value={tipoAnalisisAcademico}
                                            onChange={(e) => setTipoAnalisisAcademico(e.target.value)}
                                            className="w-full bg-slate-900 border border-amber-500/40 rounded p-2 text-white text-sm"
                                        >
                                            <option value="Validación de Tesis & Caso Práctico">Asesor de Caso Práctico & Validación de Tesis</option>
                                            <option value="Humanizador Neutral e Indetectable">Humanizador Neutral e Indetectable (Bypass IA)</option>
                                        </select>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 p-4 bg-slate-950/60 rounded border border-cyan-500/30">
                                    <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wide">🏢 Parámetros Corporativos & APK Builder</h4>
                                    <div>
                                        <label className="block text-xs text-slate-300 mb-1">Modo de Operación Empresarial:</label>
                                        <select 
                                            value={tipoAnalisisEmpresa}
                                            onChange={(e) => setTipoAnalisisEmpresa(e.target.value)}
                                            className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-sm"
                                        >
                                            <option value="Arquitectura Full-Stack & Auditoría">Auditoría Full-Stack & Reingeniería</option>
                                            <option value="Compilación Automática APK Android">Generador Automático de APKs (Android)</option>
                                            <option value="Despliegue Multiplataforma Global">Despliegue Global (Play Store / Consolas)</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* SELECTOR DE ARCHIVO (PDF, WORD, TXT) */}
                            <div className="p-4 bg-slate-950 border border-cyan-500/30 rounded">
                                <label className="block text-xs font-bold text-cyan-300 mb-2">📁 Inserción de Documento Compatible (PDF, Word, TXT):</label>
                                <input 
                                    type="file" 
                                    accept=".pdf,.doc,.docx,.txt"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setArchivoSeleccionado(e.target.files[0])
                                            hablarJarvis(`Documento ${e.target.files[0].name} adjuntado correctamente.`)
                                        }
                                    }}
                                    className="w-full text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-cyan-650 file:text-slate-950 hover:file:bg-cyan-500 cursor-pointer"
                                />
                                {archivoSeleccionado && (
                                    <p className="text-[11px] text-green-400 mt-2 font-mono">✔ Archivo listo para análisis: {archivoSeleccionado.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-slate-300 mb-1">Directriz, Comentario o Descripción del Archivo:</label>
                                <textarea 
                                    name="detalle" 
                                    placeholder="Ingrese las instrucciones para procesar el documento o ejecutar la compilación..."
                                    className="w-full bg-slate-950 border border-cyan-500/40 rounded p-3 text-white text-sm h-28 focus:border-cyan-400 outline-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button 
                                    type="submit" 
                                    disabled={isPending}
                                    className={`font-bold py-3 px-4 rounded transition-all duration-200 disabled:opacity-50 shadow-lg text-slate-950 ${seccionActiva === 'academico' ? 'bg-amber-500 hover:bg-amber-400' : 'bg-cyan-500 hover:bg-cyan-400'}`}
                                >
                                    {isPending ? 'Procesando...' : `Ejecutar Análisis [${seccionActiva.toUpperCase()}]`}
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isPending}
                                    onClick={() => {
                                        const input = document.createElement('input');
                                        input.name = 'tipoAnalisis';
                                        input.value = 'Compilación Automática APK';
                                    }}
                                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded transition-all shadow-lg"
                                >
                                    🤖 Compilar y Generar APK Automático
                                </button>
                            </div>
                        </form>

                        {mensajeRespuesta && (
                            <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative space-y-3">
                                <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">
                                    NÚCLEO UNIFICADO ACTIVO
                                </div>
                                <p className="text-white font-bold">{mensajeRespuesta}</p>
                                {folioUltimo && (
                                    <p className="text-xs text-cyan-300"><span className="font-bold">Folio:</span> {folioUltimo}</p>
                                )}
                                {hashGenerado && (
                                    <p className="text-[11px] font-mono text-slate-300 break-all"><span className="font-bold text-cyan-400">SHA-256:</span> {hashGenerado}</p>
                                )}

                                {codigoPaquete && (
                                    <div className="pt-2 border-t border-cyan-500/30 flex items-center justify-between">
                                        <span className="text-xs text-cyan-300 font-semibold">Paquete de código / APK listo para descarga:</span>
                                        <button
                                            type="button"
                                            onClick={descargarArchivo}
                                            className="bg-green-500 hover:bg-green-400 text-slate-950 font-bold py-2 px-4 rounded text-xs transition-all shadow-lg flex items-center gap-1"
                                        >
                                            📥 Descargar Paquete Compilado (.tsx / .apk)
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* BANCO DE MEMORIA INTERCONECTADO (DEEP SCAN LOG) */}
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl">
                        <h2 className="text-lg font-bold mb-4 text-cyan-300 border-b border-cyan-500/20 pb-2">Banco de Memoria y Registros Interconectados (Deep Scan Log)</h2>
                        {memoriasEstado.length === 0 ? (
                            <p className="text-xs text-slate-400">No hay registros almacenados todavía.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-cyan-500/20 text-cyan-400">
                                            <th className="pb-2">Clave / Núcleo</th>
                                            <th className="pb-2">Información / Detalle</th>
                                            <th className="pb-2">Motor Unificado</th>
                                            <th className="pb-2">Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800 text-slate-300">
                                        {memoriasEstado.map((mem) => (
                                            <tr key={mem.id} className="hover:bg-slate-950/50">
                                                <td className="py-2 font-bold text-cyan-300">{mem.memory_key}</td>
                                                <td className="py-2 max-w-xs truncate">{mem.memory_value}</td>
                                                <td className="py-2 font-mono text-[10px] text-cyan-400">{mem.routing_engine || 'Unified Engine'}</td>
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
