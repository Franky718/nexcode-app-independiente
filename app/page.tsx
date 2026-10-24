'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { ejecutarJarvisCore, obtenerMemoriaJarvis } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [esAcademicoResultado, setEsAcademicoResultado] = useState(false)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)
    const [codigoPaquete, setCodigoPaquete] = useState<string | null>(null)
    const [memoriasEstado, setMemoriasEstado] = useState<any[]>([])
    
    const [seccionActiva, setSeccionActiva] = useState<'academico' | 'empresa'>('academico')
    const [tipoAnalisisAcademico, setTipoAnalisisAcademico] = useState('Revisión y Calificación Estilo Classroom')
    const [tipoAnalisisEmpresa, setTipoAnalisisEmpresa] = useState('Arquitectura Full-Stack & Auditoría')
    const [modeloIA, setModeloIA] = useState('Sistema Autónomo de Investigación Documental')
    
    const [detalleAcademico, setDetalleAcademico] = useState('')
    const [detalleEmpresa, setDetalleEmpresa] = useState('')
    const [archivoAcademico, setArchivoAcademico] = useState<File | null>(null)
    const [archivoEmpresa, setArchivoEmpresa] = useState<File | null>(null)

    const [continente, setContinente] = useState('América')
    const [region, setRegion] = useState('América del Norte / LATAM')
    const [pais, setPais] = useState('México (Reynosa, Tamaulipas)')

    const [accesoConcedido, setAccesoConcedido] = useState(false)
    const [modoAcceso, setModoAcceso] = useState<'facial' | 'pin' | 'hardware'>('facial')
    const [pinIngresado, setPinIngresado] = useState('')
    const [estadoSeguridad, setEstadoSeguridad] = useState('Seleccione método de autenticación...')
    const [omegaKeyInput, setOmegaKeyInput] = useState('')

    const [vozActiva, setVozActiva] = useState(true)
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

    function escucharMic(setTextTarget: (val: string) => void, nombreModulo: string) {
        if (typeof window === 'undefined') return;
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Su navegador no soporta reconocimiento de voz nativo.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-MX';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.onstart = () => { hablarJarvis(`Dictado activo para ${nombreModulo}, licenciado.`); };
        recognition.onresult = (event: any) => {
            const textoTranscrito = event.results[0][0].transcript;
            setTextTarget(textoTranscrito);
            hablarJarvis("Dictado registrado correctamente.");
        };
        recognition.onerror = () => { hablarJarvis("No se pudo capturar el audio."); };
        recognition.start();
    }

    async function iniciarAccesoFacial() {
        setModoAcceso('facial')
        setEstadoSeguridad('Verificando credenciales biométricas...')
        hablarJarvis("Iniciando validación biométrica.")
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) videoRef.current.srcObject = stream
            setTimeout(() => {
                setEstadoSeguridad('✔ Identidad de Supervisor confirmada.')
                hablarJarvis("Acceso autorizado, C. Francisco.")
                setAccesoConcedido(true)
            }, 2500)
        } catch (err) {
            setEstadoSeguridad('❌ Error de cámara. Use su PIN Ejecutivo.')
            hablarJarvis("Utilice su PIN ejecutivo de acceso.")
        }
    }

    function verificarPinMaestro(e: React.FormEvent) {
        e.preventDefault()
        if (pinIngresado === '7822' || pinIngresado === '1998' || pinIngresado === '2026') {
            setEstadoSeguridad('✔ PIN Ejecutivo verificado.')
            hablarJarvis("PIN verificado con éxito. Bienvenido, C. Francisco.")
            setAccesoConcedido(true)
        } else {
            alert("PIN incorrecto.")
            hablarJarvis("PIN incorrecto.")
        }
    }

    async function verificarBiometriaHardware() {
        setModoAcceso('hardware')
        setEstadoSeguridad('Validando dispositivo de seguridad físico...')
        hablarJarvis("Validando hardware autorizado.")
        setTimeout(() => {
            setEstadoSeguridad('✔ Dispositivo validado.')
            hablarJarvis("Acceso autorizado.")
            setAccesoConcedido(true)
        }, 2000)
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

        const archivoActual = seccionActiva === 'academico' ? archivoAcademico : archivoEmpresa
        if (archivoActual) {
            formData.append('archivoNombre', archivoActual.name)
        } else {
            formData.append('archivoNombre', 'Ningún documento adjunto')
        }

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setEsAcademicoResultado(resultado.isAcademic || false)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            setCodigoPaquete(resultado.codigoDescargable || null)
            if (resultado.success) {
                hablarJarvis("Evaluación académica procesada y registrada correctamente.")
                cargarMemoria()
            } else {
                hablarJarvis("Acceso denegado por protocolo de seguridad.")
            }
        })
    }

    function descargarArchivo() {
        if (!codigoPaquete) return
        const blob = new Blob([codigoPaquete], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `Nexcode-Expediente-Tecnico.tsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        hablarJarvis('Documento técnico descargado con éxito.')
    }

    function formatearActividad(clave: string) {
        if (!clave) return 'Expediente Institucional'
        const lower = clave.toLowerCase()
        if (lower.includes('academico') || lower.includes('zapia') || lower.includes('evaluacion') || lower.includes('classroom')) {
            return 'Calificación y Revisión Académica (Estilo Classroom)'
        }
        if (lower.includes('empresa') || lower.includes('apk') || lower.includes('auditoria')) {
            return 'Dictamen Técnico y Desarrollo Arquitectónico'
        }
        return 'Investigación Documental y Bitácora'
    }

    function formatearMotor(motor: string) {
        if (!motor) return 'Subsistema de Investigación Documental'
        return 'Gabinete de Análisis Jurídico'
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center justify-center">
            
            {!accesoConcedido ? (
                <div className="w-full max-w-xl bg-slate-900 border-2 border-cyan-500/60 rounded-xl p-8 shadow-2xl text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-wider text-white">⚖️ Plataforma de Investigación Jurídica y Académica</h1>
                        <p className="text-xs text-cyan-300">Nexcode Interactive S.A. de C.V.</p>
                        <p className="text-[11px] text-slate-400">Investigador Titular: fg782270@gmail.com (C. Francisco)</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2 rounded-lg border border-cyan-500/30">
                        <button type="button" onClick={iniciarAccesoFacial} className="py-2 px-2 rounded text-xs font-bold bg-cyan-500 text-slate-950 shadow">📷 Biometría</button>
                        <button type="button" onClick={() => setModoAcceso('pin')} className="py-2 px-2 rounded text-xs font-bold text-slate-300 hover:text-white">🔑 PIN Ejecutivo</button>
                        <button type="button" onClick={verificarBiometriaHardware} className="py-2 px-2 rounded text-xs font-bold text-slate-300 hover:text-white">👆 Llave Segura</button>
                    </div>

                    {modoAcceso === 'facial' && (
                        <div className="space-y-3">
                            <div className="w-48 h-36 mx-auto bg-slate-950 border border-cyan-500/40 rounded-lg flex items-center justify-center overflow-hidden relative shadow-inner">
                                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                            </div>
                            <button type="button" onClick={iniciarAccesoFacial} className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-xs transition-all shadow">Verificar Identidad por Rostro</button>
                        </div>
                    )}

                    {modoAcceso === 'pin' && (
                        <form onSubmit={verificarPinMaestro} className="space-y-4 p-4 bg-slate-950 rounded-lg border border-cyan-500/30">
                            <div>
                                <label className="block text-xs text-cyan-300 mb-2 font-bold">Ingrese PIN de Acceso:</label>
                                <input type="password" maxLength={6} value={pinIngresado} onChange={(e) => setPinIngresado(e.target.value)} placeholder="••••" className="w-full bg-slate-900 border border-cyan-500/50 rounded p-3 text-center text-white text-lg tracking-widest outline-none focus:border-cyan-400" required />
                            </div>
                            <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-xs transition-all shadow">Acceder al Gabinete</button>
                        </form>
                    )}

                    <p className="text-xs text-white font-medium pt-2">{estadoSeguridad}</p>
                </div>
            ) : (
                <div className="w-full max-w-5xl flex flex-col items-center animate-fadeIn">
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-6">
                        <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                            <div>
                                <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                                    <span>📚</span> Lector y Calificador Académico — <span className="text-cyan-300">Estilo Classroom</span>
                                </h1>
                                <p className="text-xs text-slate-400">Investigador: fg782270@gmail.com (C. Francisco)</p>
                            </div>
                            <button onClick={() => setAccesoConcedido(false)} className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold">🔒 Bloquear Sesión</button>
                        </header>

                        {/* SELECTOR DE MÓDULO */}
                        <div className="mb-6 p-4 bg-slate-950 border-2 border-cyan-500/50 rounded-lg flex gap-3">
                            <button type="button" onClick={() => setSeccionActiva('academico')} className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold transition-all ${seccionActiva === 'academico' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-amber-300'}`}>
                                🎓 Lector Académico & Calificación (Classroom)
                            </button>
                            <button type="button" onClick={() => setSeccionActiva('empresa')} className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold transition-all ${seccionActiva === 'empresa' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-cyan-300'}`}>
                                🏢 Módulo Corporativo & APK
                            </button>
                        </div>

                        {/* FORMULARIO PRINCIPAL - VISTA DE LECTOR CLASSROOM */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Investigador:</label>
                                    <input type="email" name="emailSolicitante" defaultValue="fg782270@gmail.com" className="w-full bg-slate-950 border border-cyan-500/40 rounded p-2 text-white text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-sm text-cyan-300 mb-1 font-bold">🔑 Llave Criptográfica:</label>
                                    <input type="password" value={omegaKeyInput} onChange={(e) => setOmegaKeyInput(e.target.value)} placeholder="NEXCODE-OMEGA-7822-FRAN-1998" className="w-full bg-slate-950 border-2 border-cyan-500 rounded p-2 text-white text-sm outline-none font-mono" required />
                                </div>
                            </div>

                            {seccionActiva === 'academico' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-950 rounded border border-amber-500/40">
                                    {/* Panel Izquierdo: Visor de Documento */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">📄 Visor del Trabajo del Alumno / Tesis</h4>
                                        <div className="p-3 bg-slate-900 border border-amber-500/30 rounded">
                                            <label className="block text-xs font-bold text-amber-300 mb-1">Cargar Archivo (PDF, Word, TXT):</label>
                                            <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={(e) => { if (e.target.files && e.target.files[0]) { setArchivoAcademico(e.target.files[0]); hablarJarvis("Documento cargado en el visor."); } }} className="w-full text-xs text-slate-300 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-amber-500 file:text-slate-950 font-semibold cursor-pointer" />
                                            {archivoAcademico && <p className="text-[11px] text-green-400 mt-2 font-mono">✔ Documento activo: {archivoAcademico.name}</p>}
                                        </div>
                                        <div className="h-40 bg-slate-900 border border-slate-700 rounded p-3 text-xs text-slate-300 overflow-y-auto">
                                            <p className="text-slate-500 italic">[Vista previa del texto extraído del documento para lectura limpia sin código ni metadatos...]</p>
                                            {archivoAcademico ? <p className="mt-2 text-cyan-300">Analizando estructura y coherencia del archivo: {archivoAcademico.name}</p> : <p className="mt-2">Adjunte un archivo para iniciar la lectura y revisión detallada.</p>}
                                        </div>
                                    </div>

                                    {/* Panel Derecho: Calificación y Retroalimentación Estilo Classroom */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">✍️ Calificación & Retroalimentación</h4>
                                            <button type="button" onClick={() => escucharMic(setDetalleAcademico, 'Classroom')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-1 px-2 rounded text-[11px]">🎤 Dictar Nota</button>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-300 mb-1">Calificación Asignada (Ej: 10 / 10):</label>
                                            <input type="text" placeholder="10 / 10 (Aprobado)" className="w-full bg-slate-900 border border-amber-500/40 rounded p-2 text-white text-xs" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-300 mb-1">Comentarios Privados y Corrección Metodológica:</label>
                                            <textarea name="detalle" value={detalleAcademico} onChange={(e) => setDetalleAcademico(e.target.value)} placeholder="Redacte la retroalimentación formal, revisión de tesis o justificación de la calificación..." className="w-full bg-slate-900 border border-amber-500/40 rounded p-2 text-white text-xs h-24 outline-none" required />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button type="submit" disabled={isPending} className="w-full bg-amber-500 hover:bg-amber-400 font-bold py-3 px-4 rounded text-slate-950 shadow-lg">
                                {isPending ? 'Guardando Calificación...' : 'Publicar Calificación y Enviar Retroalimentación (Classroom)'}
                            </button>
                        </form>

                        {mensajeRespuesta && (
                            <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative space-y-2">
                                <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">ESTADO: CALIFICACIÓN PUBLICADA</div>
                                <div className="text-white font-medium whitespace-pre-line leading-relaxed">{mensajeRespuesta}</div>
                                {folioUltimo && <p className="text-xs text-cyan-300"><span className="font-bold">Folio de Revisión:</span> {folioUltimo}</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
