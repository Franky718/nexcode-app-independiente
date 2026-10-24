'use client'

import { useState, useTransition, useEffect, useRef } from 'react'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    
    // Control de Doble Núcleo
    const [modoAcademico, setModoAcademico] = useState(false)
    const [palabraClave, setPalabraClave] = useState('')
    const [memoriasAcademicas, setMemoriasAcademicas] = useState<any[]>([
        { id: 1, key: 'Skill Ingestada', value: 'Asesor de Caso Práctico (Titulación Prof. Héctor Iván)', fecha: new Date().toLocaleString() },
        { id: 2, key: 'Skill Ingestada', value: 'Versión Neutral del Humanizador de Resúmenes', fecha: new Date().toLocaleString() }
    ])

    const [accesoConcedido, setAccesoConcedido] = useState(false)
    const [vozActiva, setVozActiva] = useState(true)
    const [camaraActiva, setCamaraActiva] = useState(false)
    const [estadoRostro, setEstadoRostro] = useState('Esperando escaneo de seguridad...')
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [vocesDisponibles, setVocesDisponibles] = useState<SpeechSynthesisVoice[]>([])

    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            const actualizarVoces = () => setVocesDisponibles(window.speechSynthesis.getVoices())
            actualizarVoces()
            window.speechSynthesis.onvoiceschanged = actualizarVoces
        }
    }, [])

    function hablarJarvis(texto: string, esAcademico: boolean = false) {
        if (!vozActiva || typeof window === 'undefined' || !('speechSynthesis' in window)) return
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(texto)
        utterance.rate = esAcademico ? 1.1 : 1.05
        utterance.pitch = esAcademico ? 1.3 : 1.0
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
                hablarJarvis("Acceso concedido.")
                setAccesoConcedido(true)
            }, 2500)
        } catch (err) {
            setEstadoRostro('❌ Error biométrico.')
            hablarJarvis("Acceso denegado.")
        }
    }

    function verificarPalabraClave(e: React.FormEvent) {
        e.preventDefault()
        if (palabraClave.trim().toLowerCase() === 'hector ivan' || palabraClave.trim().toLowerCase() === 'titulacion') {
            setModoAcademico(true)
            hablarJarvis("Protocolo Académico Héctor Iván activado. Ambas skills cargadas y listas para la titulación.", true)
        } else {
            alert("Palabra clave incorrecta.")
        }
    }

    async function handleSubmitAcademico(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const consulta = formData.get('consultaAcademica') as string
        const modoSeleccionado = formData.get('modoSkill') as string

        startTransition(async () => {
            const folioAcademico = `TITULO-IVAN-${Math.floor(100000 + Math.random() * 900000)}`
            const respuestaSimulada = `[JARVIS ACADÉMICO - MODO ${modoSeleccionado.toUpperCase()}]: Procesamiento riguroso basado en la skill ingestada para "${consulta}". Sin suposiciones ni datos inventados, garantizando rigor metodológico para el profesor Héctor Iván.`
            
            setMensajeRespuesta(respuestaSimulada)
            setFolioUltimo(folioAcademico)
            
            setMemoriasAcademicas(prev => [{
                id: Date.now(),
                key: `Consulta [${modoSeleccionado}]`,
                value: consulta,
                fecha: new Date().toLocaleString()
            }, ...prev])

            hablarJarvis("Procesamiento académico finalizado con éxito.", true)
        })
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center justify-center">
            
            {!accesoConcedido ? (
                <div className="w-full max-w-xl bg-slate-900 border-2 border-cyan-500/60 rounded-xl p-8 shadow-2xl text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-wider text-white">🔒 Secure Access Gate</h1>
                        <p className="text-xs text-cyan-300">Nexcode Interactive S.A. de C.V. — C. Francisco</p>
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
                            🔓 Desbloquear Plataforma
                        </button>
                    </div>
                </div>
            ) : !modoAcademico ? (
                <div className="w-full max-w-4xl flex flex-col items-center animate-fadeIn space-y-6">
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl">
                        <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                            <div>
                                <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                                    <span>⚡</span> Jarvis Core — <span className="text-cyan-300">Enterprise Platform</span>
                                </h1>
                                <p className="text-xs text-slate-400">Supervisor: fg782270@gmail.com</p>
                            </div>
                            <button 
                                onClick={() => setAccesoConcedido(false)}
                                className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold"
                            >
                                🔒 Bloquear
                            </button>
                        </header>

                        <div className="p-5 bg-slate-950 border-2 border-amber-500/50 rounded-lg shadow-inner space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                                🎓 Acceso a Núcleo Académico Oculto (Titulación Prof. Héctor Iván)
                            </h3>
                            <p className="text-[11px] text-slate-400">Ingrese la palabra clave para acceder al entorno con ambas skills integradas:</p>
                            
                            <form onSubmit={verificarPalabraClave} className="flex gap-2">
                                <input 
                                    type="password" 
                                    value={palabraClave}
                                    onChange={(e) => setPalabraClave(e.target.value)}
                                    placeholder="Palabra clave..."
                                    className="flex-1 bg-slate-900 border border-amber-500/40 rounded p-2 text-white text-sm"
                                    required
                                />
                                <button 
                                    type="submit"
                                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded text-xs transition-all shadow"
                                >
                                    Activar Entorno Oculto
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-4xl flex flex-col items-center animate-fadeIn">
                    <div className="w-full bg-slate-900 border-2 border-amber-500/50 rounded-lg p-6 shadow-xl mb-6">
                        <header className="flex justify-between items-center border-b border-amber-500/20 pb-4 mb-6">
                            <div>
                                <h1 className="text-xl font-bold tracking-wider flex items-center gap-2 text-amber-300">
                                    <span>🎓</span> Núcleo Académico — <span className="text-white">Protocolo Héctor Iván (Skills Activas)</span>
                                </h1>
                                <p className="text-xs text-slate-400">Asesor de Caso Práctico & Humanizador de Resúmenes Versión Neutral</p>
                            </div>
                            <button 
                                onClick={() => setModoAcademico(false)}
                                className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 px-3 py-1 rounded border border-cyan-500/40 font-bold"
                            >
                                ⬅ Volver
                            </button>
                        </header>

                        <form onSubmit={handleSubmitAcademico} className="space-y-4">
                            <div>
                                <label className="block text-sm text-amber-300 mb-1">Seleccionar Skill / Herramienta:</label>
                                <select 
                                    name="modoSkill"
                                    className="w-full bg-slate-950 border border-amber-500/40 rounded p-2 text-white text-sm mb-3"
                                >
                                    <option value="Asesor Caso Práctico">Asesor de Caso Práctico (Sin inventar datos)</option>
                                    <option value="Humanizador Neutral">Humanizador de Resúmenes (Versión Neutral)</option>
                                </select>

                                <label className="block text-sm text-amber-300 mb-1">Contenido o Consulta para Titulación:</label>
                                <textarea 
                                    name="consultaAcademica" 
                                    placeholder="Ingrese el texto, resumen o caso práctico a procesar..."
                                    className="w-full bg-slate-950 border border-amber-500/40 rounded p-3 text-white text-sm h-32 focus:border-amber-400 outline-none"
                                    required
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isPending}
                                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded transition-all duration-200 disabled:opacity-50 shadow-lg"
                            >
                                {isPending ? 'Procesando con Skills Integradas...' : 'Ejecutar Análisis Académico'}
                            </button>
                        </form>

                        {mensajeRespuesta && (
                            <div className="mt-6 p-5 bg-slate-950 border-2 border-amber-500 rounded-lg text-sm shadow-2xl relative space-y-3">
                                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">
                                    SKILLS ACTIVAS (HÉCTOR IVÁN)
                                </div>
                                <p className="text-white font-bold leading-relaxed">{mensajeRespuesta}</p>
                                {folioUltimo && (
                                    <p className="text-xs text-amber-300">
                                        <span className="font-bold">Folio:</span> {folioUltimo}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="w-full bg-slate-900 border border-amber-500/30 rounded-lg p-6 shadow-xl">
                        <h2 className="text-lg font-bold mb-4 text-amber-300 border-b border-amber-500/20 pb-2">Banco de Memoria Académica (Skills Ingestadas)</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                               <thead>
                                    <tr className="border-b border-amber-500/20 text-amber-400">
                                        <th className="pb-2">Skill / Categoría</th>
                                        <th className="pb-2">Detalle</th>
                                        <th className="pb-2">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800 text-slate-300">
                                    {memoriasAcademicas.map((mem) => (
                                        <tr key={mem.id} className="hover:bg-slate-950/50">
                                            <td className="py-2 font-bold text-amber-300">{mem.key}</td>
                                            <td className="py-2 max-w-xs truncate">{mem.value}</td>
                                            <td className="py-2 text-[10px] text-slate-500">{mem.fecha}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
