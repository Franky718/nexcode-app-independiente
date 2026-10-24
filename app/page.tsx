'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { ejecutarJarvisCore, obtenerMemoriaJarvis } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)
    const [memoriasEstado, setMemoriasEstado] = useState<any[]>([])
    
    const [seccionActiva, setSeccionActiva] = useState<'academico' | 'empresa'>('academico')
    const [subTabAcademico, setSubTabAcademico] = useState<'calificar' | 'editor'>('editor')
    
    const [tipoAnalisisAcademico, setTipoAnalisisAcademico] = useState('Revisión y Calificación Estilo Classroom')
    const [tipoAnalisisEmpresa, setTipoAnalisisEmpresa] = useState('Arquitectura Full-Stack & Auditoría')
    const [modeloIA, setModeloIA] = useState('Sistema Autónomo de Investigación Documental')
    
    const [detalleAcademico, setDetalleAcademico] = useState('Análisis metodológico y jurídico completado con excelencia.')
    const [calificacionAcademica, setCalificacionAcademica] = useState('10 / 10 (Aprobado con Excelencia)')
    
    // Contenido del documento limpio estilo Word
    const [tituloDocumento, setTituloDocumento] = useState('Proyecto de Investigación y Caso Práctico Jurídico')
    const [contenidoDocumento, setContenidoDocumento] = useState(
`UNIVERSIDAD ABIERTA Y A DISTANCIA DE MÉXICO (UnADM)
LICENCIATURA EN DERECHO

TÍTULO DEL TRABAJO: 
Proyecto de Investigación y Análisis Jurídico Aplicado

1. INTRODUCCIÓN Y MARCO TEÓRICO
El presente documento constituye el desarrollo formal del caso práctico y marco metodológico, estructurado conforme a los estándares institucionales más rigurosos. 

2. DESARROLLO DEL CASO PRÁCTICO
[Comience a redactar, analizar o pegar aquí el contenido íntegro de su trabajo académico, ensayo o tesis de manera limpia y profesional, exactamente como en un procesador de textos tipo Word...]

3. CONCLUSIONES Y FUENTES DE CONSULTA
- Conclusiones derivadas del análisis normativo.
- Referencias bibliográficas integradas de forma contextual y orgánica.`
    )

    const [continente, setContinente] = useState('América')
    const [region, setRegion] = useState('América del Norte / LATAM')
    const [pais, setPais] = useState('México (Reynosa, Tamaulipas)')

    const [accesoConcedido, setAccesoConcedido] = useState(false)
    const [modoAcceso, setModoAcceso] = useState<'pin'>('pin')
    const [pinIngresado, setPinIngresado] = useState('')
    const [estadoSeguridad, setEstadoSeguridad] = useState('Ingrese su PIN ejecutivo para acceder al gabinete...')
    
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
            setEstadoSeguridad('✔ PIN verificado con éxito.')
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
                hablarJarvis("Calificación y documento procesados y registrados correctamente.")
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
                            <label className="block text-xs text-cyan-300 mb-2 font-bold">Ingrese PIN de Acceso (7822, 1998, 2026):</label>
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
                                    <span>📄</span> Procesador de Textos Académico — <span className="text-cyan-300">Formato Word Profesional</span>
                                </h1>
                                <p className="text-xs text-slate-400">Investigador Titular: fg782270@gmail.com (C. Francisco)</p>
                            </div>
                            <button onClick={() => setAccesoConcedido(false)} className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold">🔒 Bloquear Sesión</button>
                        </header>

                        {/* SELECTOR DE MÓDULO */}
                        <div className="mb-6 p-4 bg-slate-950 border-2 border-cyan-500/50 rounded-lg flex gap-3">
                            <button type="button" onClick={() => setSeccionActiva('academico')} className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold transition-all ${seccionActiva === 'academico' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-amber-300'}`}>
                                🎓 Módulo Académico & Editor Word
                            </button>
                            <button type="button" onClick={() => setSeccionActiva('empresa')} className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold transition-all ${seccionActiva === 'empresa' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-cyan-300'}`}>
                                🏢 Módulo Corporativo & APK
                            </button>
                        </div>

                        {/* SUB-PESTAÑAS */}
                        {seccionActiva === 'academico' && (
                            <div className="flex gap-2 mb-4 border-b border-amber-500/30 pb-3">
                                <button type="button" onClick={() => setSubTabAcademico('editor')} className={`py-1.5 px-4 rounded text-xs font-bold transition-all ${subTabAcademico === 'editor' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-amber-300 border border-amber-500/30'}`}>
                                    📝 Procesador de Documento (Estilo Word)
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
                                        <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wide">📄 Editor de Documento Institucional (Formato Word)</h3>
                                        <div className="flex gap-2 items-center">
                                            <button type="button" onClick={descargarDocumentoWord} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1.5 px-4 rounded text-xs shadow-lg flex items-center gap-1">
                                                📥 Descargar Archivo Word (.doc)
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-amber-300 mb-1">Título del Documento o Tesis:</label>
                                        <input 
                                            type="text" 
                                            value={tituloDocumento} 
                                            onChange={(e) => setTituloDocumento(e.target.value)} 
                                            className="w-full bg-slate-900 border border-amber-500/40 rounded p-2 text-white text-xs font-bold" 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-amber-300 mb-1">Contenido del Documento (Procesador de Textos):</label>
                                        <textarea 
                                            value={contenidoDocumento} 
                                            onChange={(e) => setContenidoDocumento(e.target.value)}
                                            rows={12}
                                            className="w-full bg-slate-900 border border-amber-500/40 rounded p-4 text-xs text-slate-100 font-sans outline-none focus:border-amber-400 leading-relaxed shadow-inner"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {seccionActiva === 'academico' && subTabAcademico === 'calificar' && (
                                <div className="space-y-4 p-4 bg-slate-950 rounded border border-amber-500/40 animate-fadeIn">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-slate-300 mb-1">Calificación Asignada:</label>
                                            <input 
                                                type="text" 
                                                value={calificacionAcademica}
                                                onChange={(e) => setCalificacionAcademica(e.target.value)}
                                                className="w-full bg-slate-900 border border-amber-500/40 rounded p-2 text-white text-xs" 
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-300 mb-1">Retroalimentación Académica:</label>
                                            <textarea 
                                                name="detalle" 
                                                value={detalleAcademico} 
                                                onChange={(e) => setDetalleAcademico(e.target.value)} 
                                                className="w-full bg-slate-900 border border-amber-500/40 rounded p-2 text-white text-xs h-20 outline-none" 
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button type="submit" disabled={isPending} className="w-full bg-amber-500 hover:bg-amber-400 font-bold py-3 px-4 rounded text-slate-950 shadow-lg">
                                {isPending ? 'Procesando Documento...' : 'Registrar y Guardar en el Expediente Institucional'}
                            </button>
                        </form>

                        {mensajeRespuesta && (
                            <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative space-y-2">
                                <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">ESTADO: DOCUMENTO REGISTRADO</div>
                                <div className="text-white font-medium whitespace-pre-line leading-relaxed">{mensajeRespuesta}</div>
                                {folioUltimo && <p className="text-xs text-cyan-300"><span className="font-bold">Folio de Expediente:</span> {folioUltimo}</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
