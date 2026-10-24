'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { ejecutarJarvisCore, obtenerMemoriaJarvis } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)
    const [memoriasEstado, setMemoriasEstado] = useState<any[]>([])
    
    // Configuración de Módulos Centrales bajo Instrucción Maestra
    const [seccionActiva, setSeccionActiva] = useState<'academico' | 'empresa'>('academico')
    const [subTabAcademico, setSubTabAcademico] = useState<'editor' | 'calificar'>('editor')
    
    const [tipoAnalisisAcademico, setTipoAnalisisAcademico] = useState('Instrucción Maestra: Procesamiento Word & Tesis')
    const [tipoAnalisisEmpresa, setTipoAnalisisEmpresa] = useState('Matriz Global Unificada & APK Builder')
    const [modeloIA, setModeloIA] = useState('Jarvis AI Autonomous Core')
    
    const [detalleAcademico, setDetalleAcademico] = useState('Evaluación metodológica completada bajo los estándares institucionales.')
    const [calificacionAcademica, setCalificacionAcademica] = useState('10 / 10 (Aprobado con Excelencia)')
    const [detalleEmpresa, setDetalleEmpresa] = useState('')
    
    // Procesador de Textos Institucional (Estilo Word / Tesis)
    const [tituloDocumento, setTituloDocumento] = useState('Proyecto de Investigación y Titulación')
    const [contenidoDocumento, setContenidoDocumento] = useState(
`UNIVERSIDAD ABIERTA Y A DISTANCIA DE MÉXICO (UnADM)
FACULTAD DE CIENCIAS SOCIALES Y ADMINISTRATIVAS
LICENCIATURA EN DERECHO

TÍTULO DEL TRABAJO:
Proyecto de Investigación y Análisis Jurídico Aplicado

1. INTRODUCCIÓN Y MARCO TEÓRICO
El presente trabajo de investigación se desarrolla bajo la instrucción maestra del sistema autónomo, cumpliendo con los estándares metodológicos internacionales.

2. DESARROLLO DEL CASO PRÁCTICO
[Redacte o pegue aquí el contenido formal de su tesis, ensayo o análisis normativo, estructurado de forma limpia y profesional para su exportación a Word...]

3. CONCLUSIONES Y FUENTES DE CONSULTA
- Conclusiones formales de la investigación jurídica.
- Referencias bibliográficas integradas de manera orgánica.`
    )

    // Contexto Geopolítico Institucional
    const [continente, setContinente] = useState('América')
    const [region, setRegion] = useState('América del Norte / LATAM')
    const [pais, setPais] = useState('México (Reynosa, Tamaulipas)')

    // Seguridad y Bloqueo (Protocolo Omega / PINs: 7822, 1998, 2026)
    const [accesoConcedido, setAccesoConcedido] = useState(false)
    const [pinIngresado, setPinIngresado] = useState('')
    const [estadoSeguridad, setEstadoSeguridad] = useState('Ingrese PIN ejecutivo autorizado...')
    const omegaKeyInput = 'NEXCODE-OMEGA-7822-FRAN-1998'

    const [vozActiva, setVozActiva] = useState(true)
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

    function hablarJarvis(texto: string) {
        if (!vozActiva || typeof window === 'undefined' || !('speechSynthesis' in window)) return
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(texto)
        utterance.rate = 1.05
        utterance.lang = 'es-MX'
        window.speechSynthesis.speak(utterance)
    }

    function verificarPinMaestro(e: React.FormEvent) {
        e.preventDefault()
        if (pinIngresado === '7822' || pinIngresado === '1998' || pinIngresado === '2026') {
            setEstadoSeguridad('✔ PIN verificado correctamente.')
            hablarJarvis("Acceso autorizado, C. Francisco.")
            setAccesoConcedido(true)
        } else {
            alert("PIN incorrecto.")
            hablarJarvis("PIN incorrecto.")
        }
    }

    function descargarDocumentoWord() {
        const textoCompleto = `${tituloDocumento.toUpperCase()}\n\n${contenidoDocumento}`
        const blob = new Blob([textoCompleto], { type: 'application/msword;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${tituloDocumento.replace(/\s+/g, '-')}.doc`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        hablarJarvis('Documento exportado en formato Word con éxito.')
    }

    function descargarBancoMemoria() {
        const contenidoJson = JSON.stringify(memoriasEstado, null, 2)
        const blob = new Blob([contenidoJson], { type: 'application/json;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `Nexcode-Expediente-Institucional.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        hablarJarvis('Expediente institucional exportado correctamente.')
    }

    function formatearActividad(clave: string) {
        if (!clave) return 'Expediente Institucional'
        const lower = clave.toLowerCase()
        if (lower.includes('academico') || lower.includes('zapia') || lower.includes('evaluacion') || lower.includes('word')) {
            return 'Procesamiento Documental & Formato Word'
        }
        if (lower.includes('empresa') || lower.includes('apk') || lower.includes('auditoria')) {
            return 'Auditoría y Desarrollo Corporativo'
        }
        return 'Bitácora y Registro Institucional'
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        formData.append('seccion', seccionActiva)
        formData.append('tipoAnalisis', seccionActiva === 'empresa' ? tipoAnalisisEmpresa : tipoAnalisisAcademico)
        formData.append('modeloIASeleccionado', modeloIA)
        formData.append('continente', continente)
        formData.append('region', region)
        formData.append('pais', pais)
        formData.append('omegaKey', omegaKeyInput)
        formData.append('archivoNombre', `${tituloDocumento}.doc`)

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            if (resultado.success) {
                hablarJarvis("Operación registrada bajo instrucción maestra.")
                cargarMemoria()
            }
        })
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center justify-center">
            
            {!accesoConcedido ? (
                <div className="w-full max-w-xl bg-slate-900 border-2 border-cyan-500/60 rounded-xl p-8 shadow-2xl text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-wider text-white">⚖️ Gabinete Bloqueado — Seguridad Activa</h1>
                        <p className="text-xs text-cyan-300">Nexcode Interactive S.A. de C.V.</p>
                        <p className="text-[11px] text-slate-400">Investigador Titular: fg782270@gmail.com (C. Francisco)</p>
                    </div>

                    <form onSubmit={verificarPinMaestro} className="space-y-4 p-4 bg-slate-950 rounded-lg border border-cyan-500/30">
                        <div>
                            <label className="block text-xs text-cyan-300 mb-2 font-bold">Ingrese PIN Ejecutivo (7822, 1998, 2026):</label>
                            <input type="password" maxLength={6} value={pinIngresado} onChange={(e) => setPinIngresado(e.target.value)} placeholder="••••" className="w-full bg-slate-900 border border-cyan-500/50 rounded p-3 text-center text-white text-lg tracking-widest outline-none focus:border-cyan-400" required />
                        </div>
                        <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-xs transition-all shadow">Desbloquear Gabinete</button>
                    </form>
                    <p className="text-xs text-white font-medium pt-2">{estadoSeguridad}</p>
                </div>
            ) : (
                <div className="w-full max-w-5xl flex flex-col items-center animate-fadeIn">
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-6">
                        <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                            <div>
                                <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                                    <span>🛡️</span> Jarvis Master Core — <span className="text-cyan-300">Instrucción Maestra Activa</span>
                                </h1>
                                <p className="text-xs text-slate-400">Investigador Titular: fg782270@gmail.com (C. Francisco)</p>
                            </div>
                            <button onClick={() => setAccesoConcedido(false)} className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold">🔒 Bloquear Sesión</button>
                        </header>

                        {/* SELECTOR GEOPOLÍTICO INSTITUCIONAL */}
                        <div className="mb-6 p-4 bg-slate-950 border border-cyan-500/40 rounded-lg space-y-3">
                            <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wide">🌍 Marco Geopolítico y Normativo</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-[11px] text-slate-300 mb-1">Continente:</label>
                                    <select value={continente} onChange={(e) => setContinente(e.target.value)} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-xs">
                                        <option value="América">América</option>
                                        <option value="Europa">Europa</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-300 mb-1">Región de Estudio:</label>
                                    <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-xs">
                                        <option value="América del Norte / LATAM">América del Norte / LATAM</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-300 mb-1">Jurisdicción:</label>
                                    <input type="text" value={pais} onChange={(e) => setPais(e.target.value)} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-xs" />
                                </div>
                            </div>
                        </div>

                        {/* SELECTOR DE MÓDULO INDEPENDIENTE */}
                        <div className="mb-6 p-4 bg-slate-950 border-2 border-cyan-500/50 rounded-lg flex gap-3">
                            <button type="button" onClick={() => setSeccionActiva('academico')} className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold transition-all ${seccionActiva === 'academico' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-amber-300'}`}>
                                🎓 Módulo Académico (Procesador Word & Classroom)
                            </button>
                            <button type="button" onClick={() => setSeccionActiva('empresa')} className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold transition-all ${seccionActiva === 'empresa' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-cyan-300'}`}>
                                🏢 Módulo Corporativo (APK Builder & Auditoría)
                            </button>
                        </div>

                        {/* SUB-PESTAÑAS EN MÓDULO ACADÉMICO */}
                        {seccionActiva === 'academico' && (
                            <div className="flex gap-2 mb-4 border-b border-amber-500/30 pb-3">
                                <button type="button" onClick={() => setSubTabAcademico('editor')} className={`py-1.5 px-4 rounded text-xs font-bold transition-all ${subTabAcademico === 'editor' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-amber-300 border border-amber-500/30'}`}>
                                    📝 Procesador de Textos (Estilo Word)
                                </button>
                                <button type="button" onClick={() => setSubTabAcademico('calificar')} className={`py-1.5 px-4 rounded text-xs font-bold transition-all ${subTabAcademico === 'calificar' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-amber-300 border border-amber-500/30'}`}>
                                    ✍️ Panel de Calificación y Retroalimentación
                                </button>
                            </div>
                        )}

                        {/* FORMULARIO PRINCIPAL */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="hidden">
                                <input type="email" name="emailSolicitante" defaultValue="fg782270@gmail.com" />
                            </div>

                            {seccionActiva === 'academico' && subTabAcademico === 'editor' && (
                                <div className="space-y-4 p-5 bg-slate-950 rounded border-2 border-amber-500/60 animate-fadeIn shadow-inner">
                                    <div className="flex justify-between items-center border-b border-amber-500/30 pb-3">
                                        <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wide">📄 Procesador de Documento Institucional (Formato Word)</h3>
                                        <button type="button" onClick={descargarDocumentoWord} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1.5 px-4 rounded text-xs shadow-lg flex items-center gap-1">
                                            📥 Descargar Archivo Word (.doc)
                                        </button>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-amber-300 mb-1">Título del Documento o Tesis:</label>
                                        <input type="text" value={tituloDocumento} onChange={(e) => setTituloDocumento(e.target.value)} className="w-full bg-slate-900 border border-amber-500/40 rounded p-2 text-white text-xs font-bold" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-amber-300 mb-1">Contenido del Documento (Procesador de Textos):</label>
                                        <textarea value={contenidoDocumento} onChange={(e) => setContenidoDocumento(e.target.value)} rows={12} className="w-full bg-slate-900 border border-amber-500/40 rounded p-4 text-xs text-slate-100 font-sans outline-none focus:border-amber-400 leading-relaxed shadow-inner" required />
                                    </div>
                                </div>
                            )}

                            {seccionActiva === 'academico' && subTabAcademico === 'calificar' && (
                                <div className="space-y-4 p-4 bg-slate-950 rounded border border-amber-500/40 animate-fadeIn">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-slate-300 mb-1">Calificación Asignada:</label>
                                            <input type="text" value={calificacionAcademica} onChange={(e) => setCalificacionAcademica(e.target.value)} className="w-full bg-slate-900 border border-amber-500/40 rounded p-2 text-white text-xs" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-300 mb-1">Retroalimentación Académica:</label>
                                            <textarea name="detalle" value={detalleAcademico} onChange={(e) => setDetalleAcademico(e.target.value)} className="w-full bg-slate-900 border border-amber-500/40 rounded p-2 text-white text-xs h-20 outline-none" required />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {seccionActiva === 'empresa' && (
                                <div className="space-y-4 p-4 bg-cyan-950/20 rounded border border-cyan-500/40 animate-fadeIn">
                                    <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wide">🏢 Módulo Corporativo — APK Builder & Auditoría Full-Stack</h4>
                                    <div>
                                        <label className="block text-xs text-slate-300 mb-1">Matriz de IA:</label>
                                        <select value={modeloIA} onChange={(e) => setModeloIA(e.target.value)} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-xs">
                                            <option value="Matriz Global Unificada">Matriz Global Unificada (Todas las IAs)</option>
                                            <option value="OpenAI GPT-6">OpenAI GPT-6</option>
                                            <option value="Anthropic Claude 5.5">Anthropic Claude 5.5</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-300 mb-1">Instrucción Corporativa / Compilación APK:</label>
                                        <textarea name="detalle" value={detalleEmpresa} onChange={(e) => setDetalleEmpresa(e.target.value)} placeholder="Ej: Compilar APK automático para Android o auditar endpoint..." className="w-full bg-slate-950 border border-cyan-500/40 rounded p-3 text-sm h-28 outline-none text-white" required />
                                    </div>
                                </div>
                            )}

                            <button type="submit" disabled={isPending} className={`w-full font-bold py-3 px-4 rounded text-slate-950 shadow-lg ${seccionActiva === 'academico' ? 'bg-amber-500 hover:bg-amber-400' : 'bg-cyan-500 hover:bg-cyan-400'}`}>
                                {isPending ? 'Procesando Operación...' : `Ejecutar Operación en [${seccionActiva.toUpperCase()}]`}
                            </button>
                        </form>

                        {mensajeRespuesta && (
                            <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative space-y-2">
                                <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">ESTADO: REGISTRADO</div>
                                <div className="text-white font-medium whitespace-pre-line leading-relaxed">{mensajeRespuesta}</div>
                                {folioUltimo && <p className="text-xs text-cyan-300"><span className="font-bold">Folio:</span> {folioUltimo}</p>}
                            </div>
                        )}
                    </div>

                    {/* BANCO DE MEMORIA Y REGISTROS OFICIALES */}
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl space-y-4">
                        <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
                            <h2 className="text-lg font-bold text-cyan-300">Expediente y Registros Institucionales</h2>
                            <button type="button" onClick={descargarBancoMemoria} className="bg-green-500 hover:bg-green-400 text-slate-950 font-bold py-2 px-4 rounded text-xs transition-all shadow-lg flex items-center gap-1">
                                📥 Exportar Expediente (.json)
                            </button>
                        </div>

                        {memoriasEstado.length === 0 ? (
                            <p className="text-xs text-slate-400">No hay registros almacenados todavía.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-cyan-500/20 text-cyan-400">
                                            <th className="pb-2">Expediente / Actividad</th>
                                            <th className="pb-2">Detalle Analítico</th>
                                            <th className="pb-2">Subsistema</th>
                                            <th className="pb-2">Fecha y Hora</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800 text-slate-300">
                                        {memoriasEstado.map((mem) => (
                                            <tr key={mem.id} className="hover:bg-slate-950/50">
                                                <td className="py-2 font-bold text-cyan-300">{formatearActividad(mem.memory_key)}</td>
                                                <td className="py-2 max-w-xs truncate">{mem.memory_value}</td>
                                                <td className="py-2 font-mono text-[10px] text-cyan-400">{mem.routing_engine || 'Core'}</td>
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
