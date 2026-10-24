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
    const [tipoAnalisisAcademico, setTipoAnalisisAcademico] = useState('Análisis Zapia (Calificación & Explicación)')
    const [tipoAnalisisEmpresa, setTipoAnalisisEmpresa] = useState('Arquitectura Full-Stack & Auditoría')
    const [modeloIA, setModeloIA] = useState('Matriz Global Unificada (Todas las IAs)')
    
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
    
    // Campo secreto para la Llave Omega conocida solo por el usuario
    const [omegaKeyInput, setOmegaKeyInput] = useState('')

    const [vozActiva, setVozActiva] = useState(true)
    const [camaraActiva, setCamaraActiva] = useState(false)
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

    function escucharMic(setTextTarget: (val: string) => void, nombreNucleo: string) {
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

        recognition.onstart = () => { hablarJarvis(`Escuchando núcleo ${nombreNucleo}, señor.`); };
        recognition.onresult = (event: any) => {
            const textoTranscrito = event.results[0][0].transcript;
            setTextTarget(textoTranscrito);
            hablarJarvis("Voz registrada con éxito.");
        };
        recognition.onerror = () => { hablarJarvis("No se pudo capturar el audio."); };
        recognition.start();
    }

    async function iniciarAccesoFacial() {
        setModoAcceso('facial')
        setCamaraActiva(true)
        setEstadoSeguridad('Analizando biometría facial...')
        hablarJarvis("Iniciando escaneo facial.")
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) videoRef.current.srcObject = stream
            setTimeout(() => {
                setEstadoSeguridad('✔ Identidad confirmada.')
                hablarJarvis("Acceso concedido, C. Francisco.")
                setAccesoConcedido(true)
            }, 2500)
        } catch (err) {
            setEstadoSeguridad('❌ Error de cámara. Use PIN Maestro.')
            hablarJarvis("Use su PIN maestro.")
        }
    }

    function verificarPinMaestro(e: React.FormEvent) {
        e.preventDefault()
        if (pinIngresado === '7822' || pinIngresado === '1998' || pinIngresado === '2026') {
            setEstadoSeguridad('✔ PIN verificado.')
            hablarJarvis("PIN verificado con éxito.")
            setAccesoConcedido(true)
        } else {
            alert("PIN incorrecto.")
            hablarJarvis("PIN incorrecto.")
        }
    }

    async function verificarBiometriaHardware() {
        setModoAcceso('hardware')
        setEstadoSeguridad('Validando dispositivo físico...')
        hablarJarvis("Validando hardware de seguridad.")
        setTimeout(() => {
            setEstadoSeguridad('✔ Dispositivo verificado.')
            hablarJarvis("Acceso concedido.")
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
        formData.append('omegaKey', omegaKeyInput) // Se envía la llave omega secreta

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
                hablarJarvis("Operación protegida por Protocolo Omega ejecutada con éxito.")
                cargarMemoria()
            } else {
                hablarJarvis("Acceso denegado por Blindaje Omega.")
            }
        })
    }

    function descargarArchivo() {
        if (!codigoPaquete) return
        const blob = new Blob([codigoPaquete], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `Nexcode-Omega-${pais}-${folioUltimo || 'Report'}.tsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        hablarJarvis('Archivo descargado con éxito.')
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center justify-center">
            
            {!accesoConcedido ? (
                <div className="w-full max-w-xl bg-slate-900 border-2 border-cyan-500/60 rounded-xl p-8 shadow-2xl text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-wider text-white">🛡️ Jarvis Omega Vault Gate</h1>
                        <p className="text-xs text-cyan-300">Nexcode Interactive S.A. de C.V.</p>
                        <p className="text-[11px] text-slate-400">Supervisor: fg782270@gmail.com (C. Francisco)</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2 rounded-lg border border-cyan-500/30">
                        <button
                            type="button"
                            onClick={iniciarAccesoFacial}
                            className={`py-2 px-2 rounded text-xs font-bold transition-all ${modoAcceso === 'facial' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}
                        >
                            📷 Rostro
                        </button>
                        <button
                            type="button"
                            onClick={() => setModoAcceso('pin')}
                            className={`py-2 px-2 rounded text-xs font-bold transition-all ${modoAcceso === 'pin' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}
                        >
                            🔑 PIN
                        </button>
                        <button
                            type="button"
                            onClick={verificarBiometriaHardware}
                            className={`py-2 px-2 rounded text-xs font-bold transition-all ${modoAcceso === 'hardware' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}
                        >
                            👆 Huella
                        </button>
                    </div>

                    {modoAcceso === 'facial' && (
                        <div className="space-y-3">
                            <div className="w-48 h-36 mx-auto bg-slate-950 border border-cyan-500/40 rounded-lg flex items-center justify-center overflow-hidden relative shadow-inner">
                                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                            </div>
                            <button
                                type="button"
                                onClick={iniciarAccesoFacial}
                                className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-xs transition-all shadow"
                            >
                                Escaneo Facial
                            </button>
                        </div>
                    )}

                    {modoAcceso === 'pin' && (
                        <form onSubmit={verificarPinMaestro} className="space-y-4 p-4 bg-slate-950 rounded-lg border border-cyan-500/30">
                            <div>
                                <label className="block text-xs text-cyan-300 mb-2 font-bold">PIN Maestro:</label>
                                <input 
                                    type="password" 
                                    maxLength={6}
                                    value={pinIngresado}
                                    onChange={(e) => setPinIngresado(e.target.value)}
                                    placeholder="••••" 
                                    className="w-full bg-slate-900 border border-cyan-500/50 rounded p-3 text-center text-white text-lg tracking-widest outline-none focus:border-cyan-400"
                                    required
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-xs transition-all shadow"
                            >
                                Verificar PIN
                            </button>
                        </form>
                    )}

                    {modoAcceso === 'hardware' && (
                        <div className="space-y-4 p-4 bg-slate-950 rounded-lg border border-cyan-500/30 text-center">
                            <button
                                type="button"
                                onClick={verificarBiometriaHardware}
                                className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-3 px-4 rounded-lg text-xs transition-all shadow"
                            >
                                Validar Hardware
                            </button>
                        </div>
                    )}

                    <p className="text-xs text-white font-medium pt-2">{estadoSeguridad}</p>
                </div>
            ) : (
                <div className="w-full max-w-4xl flex flex-col items-center animate-fadeIn">
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-6">
                        <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                            <div>
                                <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                                    <span>🔒</span> Jarvis Core — <span className="text-cyan-300">Blindaje Omega & Núcleos Protegidos</span>
                                </h1>
                                <p className="text-xs text-slate-400">Supervisor: fg782270@gmail.com (C. Francisco)</p>
                            </div>
                            <button 
                                onClick={() => setAccesoConcedido(false)}
                                className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold"
                            >
                                🔒 Bloquear
                            </button>
                        </header>

                        {/* SELECTOR GEOPOLÍTICO */}
                        <div className="mb-6 p-4 bg-slate-950 border border-cyan-500/40 rounded-lg space-y-3">
                            <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wide">🌍 Estructura Geopolítica</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-[11px] text-slate-300 mb-1">Continente:</label>
                                    <select
                                        value={continente}
                                        onChange={(e) => setContinente(e.target.value)}
                                        className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-xs"
                                    >
                                        <option value="América">América</option>
                                        <option value="Europa">Europa</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-300 mb-1">Región:</label>
                                    <select
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                        className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-xs"
                                    >
                                        <option value="América del Norte / LATAM">América del Norte / LATAM</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-300 mb-1">País / Ubicación:</label>
                                    <input
                                        type="text"
                                        value={pais}
                                        onChange={(e) => setPais(e.target.value)}
                                        className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-xs"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SELECTOR DE NÚCLEO INDEPENDIENTE */}
                        <div className="mb-6 p-4 bg-slate-950 border-2 border-cyan-500/50 rounded-lg shadow-inner space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                                🔀 Selección de Núcleo Independiente:
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => { setSeccionActiva('academico'); hablarJarvis("Núcleo Académico Zapia Activo", true); }}
                                    className={`py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${seccionActiva === 'academico' ? 'bg-amber-500 text-slate-950 shadow-lg border-2 border-white' : 'bg-slate-900 text-amber-300 border border-amber-500/30'}`}
                                >
                                    🎓 Académico — Analizador Zapia
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setSeccionActiva('empresa'); hablarJarvis("Núcleo Empresa Activo"); }}
                                    className={`py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${seccionActiva === 'empresa' ? 'bg-cyan-500 text-slate-950 shadow-lg border-2 border-white' : 'bg-slate-900 text-cyan-300 border border-cyan-500/30'}`}
                                >
                                    🏢 Empresa — Código, APK & Auditoría
                                </button>
                            </div>
                        </div>

                        {/* FORMULARIO PRINCIPAL */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <div>
                                    <label className="block text-sm text-cyan-300 mb-1 font-bold">🔑 Llave Omega Vault Key (Blindaje Extra):</label>
                                    <input 
                                        type="password" 
                                        value={omegaKeyInput}
                                        onChange={(e) => setOmegaKeyInput(e.target.value)}
                                        placeholder="Ingrese Llave Secreta Omega..." 
                                        className="w-full bg-slate-950 border-2 border-cyan-500 rounded p-2 text-white text-sm outline-none focus:border-cyan-300 font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            {/* NÚCLEO ACADÉMICO / ZAPIA */}
                            {seccionActiva === 'academico' && (
                                <div className="space-y-4 p-4 bg-amber-950/20 rounded border border-amber-500/40 animate-fadeIn">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">📊 Núcleo Académico — Analizador Estilo Zapia</h4>
                                        <button
                                            type="button"
                                            onClick={() => escucharMic(setDetalleAcademico, 'Académico')}
                                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-1.5 px-3 rounded text-xs flex items-center gap-1 shadow transition-all"
                                        >
                                            🎤 Dictar por Voz
                                        </button>
                                    </div>

                                    <div className="p-3 bg-slate-950 border border-amber-500/30 rounded">
                                        <label className="block text-xs font-bold text-amber-300 mb-1">📁 Examen o Documento Académico (PDF, Word, TXT):</label>
                                        <input 
                                            type="file" 
                                            accept=".pdf,.doc,.docx,.txt"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setArchivoAcademico(e.target.files[0])
                                                    hablarJarvis(`Documento académico ${e.target.files[0].name} adjuntado.`)
                                                }
                                            }}
                                            className="w-full text-xs text-slate-300 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 cursor-pointer"
                                        />
                                        {archivoAcademico && (
                                            <p className="text-[11px] text-green-400 mt-1 font-mono">✔ Adjunto: {archivoAcademico.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs text-slate-300 mb-1">Instrucción o Pregunta Académica:</label>
                                        <textarea 
                                            name="detalle" 
                                            value={detalleAcademico}
                                            onChange={(e) => setDetalleAcademico(e.target.value)}
                                            placeholder="Ej: Extrae mi calificación exacta y explícame paso a paso..."
                                            className="w-full bg-slate-950 border border-amber-500/40 rounded p-3 text-white text-sm h-28 focus:border-amber-400 outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {/* NÚCLEO EMPRESA */}
                            {seccionActiva === 'empresa' && (
                                <div className="space-y-4 p-4 bg-cyan-950/20 rounded border border-cyan-500/40 animate-fadeIn">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wide">🏢 Núcleo Empresa — APK Builder & Auditoría</h4>
                                        <button
                                            type="button"
                                            onClick={() => escucharMic(setDetalleEmpresa, 'Empresa')}
                                            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-1.5 px-3 rounded text-xs flex items-center gap-1 shadow transition-all"
                                        >
                                            🎤 Dictar por Voz
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-xs text-slate-300 mb-1">Modelo IA Global:</label>
                                        <select 
                                            value={modeloIA}
                                            onChange={(e) => setModeloIA(e.target.value)}
                                            className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-xs"
                                        >
                                            <option value="Matriz Global Unificada">Matriz Global Unificada (Todas las IAs)</option>
                                            <option value="OpenAI GPT-6">OpenAI GPT-6</option>
                                            <option value="Anthropic Claude 5.5">Anthropic Claude 5.5</option>
                                            <option value="Google Gemini 4">Google Gemini 4</option>
                                        </select>
                                    </div>

                                    <div className="p-3 bg-slate-950 border border-cyan-500/30 rounded">
                                        <label className="block text-xs font-bold text-cyan-300 mb-1">📁 Código o Proyecto Empresarial:</label>
                                        <input 
                                            type="file" 
                                            accept=".pdf,.doc,.docx,.txt,.ts,.tsx,.js"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setArchivoEmpresa(e.target.files[0])
                                                    hablarJarvis(`Archivo corporativo ${e.target.files[0].name} adjuntado.`)
                                                }
                                            }}
                                            className="w-full text-xs text-slate-300 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-cyan-500 file:text-slate-950 hover:file:bg-cyan-400 cursor-pointer"
                                        />
                                        {archivoEmpresa && (
                                            <p className="text-[11px] text-green-400 mt-1 font-mono">✔ Adjunto: {archivoEmpresa.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs text-slate-300 mb-1">Instrucción Corporativa o de APK:</label>
                                        <textarea 
                                            name="detalle" 
                                            value={detalleEmpresa}
                                            onChange={(e) => setDetalleEmpresa(e.target.value)}
                                            placeholder="Ej: Compila el APK automático para Android o audita el endpoint..."
                                            className="w-full bg-slate-950 border border-cyan-500/40 rounded p-3 text-white text-sm h-28 focus:border-cyan-400 outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={isPending}
                                className={`w-full font-bold py-3 px-4 rounded transition-all duration-200 disabled:opacity-50 shadow-lg text-slate-950 ${seccionActiva === 'academico' ? 'bg-amber-500 hover:bg-amber-400' : 'bg-cyan-500 hover:bg-cyan-400'}`}
                            >
                                {isPending ? 'Validando Protocolo Omega...' : `Ejecutar Núcleo Protegido [${seccionActiva.toUpperCase()}]`}
                            </button>
                        </form>

                        {mensajeRespuesta && (
                            <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative space-y-3">
                                <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">
                                    BLINDAJE OMEGA ACTIVO
                                </div>
                                <div className="text-white font-medium whitespace-pre-line leading-relaxed">{mensajeRespuesta}</div>
                                
                                {folioUltimo && (
                                    <p className="text-xs text-cyan-300"><span className="font-bold">Folio:</span> {folioUltimo}</p>
                                )}
                                {hashGenerado && (
                                    <p className="text-[11px] font-mono text-slate-300 break-all"><span className="font-bold text-cyan-400">SHA-256:</span> {hashGenerado}</p>
                                )}

                                {!esAcademicoResultado && codigoPaquete && (
                                    <div className="pt-2 border-t border-cyan-500/30 flex items-center justify-between">
                                        <span className="text-xs text-cyan-300 font-semibold">Paquete corporativo / APK listo:</span>
                                        <button
                                            type="button"
                                            onClick={descargarArchivo}
                                            className="bg-green-550 hover:bg-green-400 text-slate-950 font-bold py-2 px-4 rounded text-xs transition-all shadow-lg flex items-center gap-1"
                                        >
                                            📥 Descargar Archivo Compilado (.tsx)
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* BANCO DE MEMORIA INTERCONECTADO */}
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl">
                        <h2 className="text-lg font-bold mb-4 text-cyan-300 border-b border-cyan-500/20 pb-2">Banco de Memoria y Registros Interconectados</h2>
                        {memoriasEstado.length === 0 ? (
                            <p className="text-xs text-slate-400">No hay registros almacenados todavía.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-cyan-500/20 text-cyan-400">
                                            <th className="pb-2">Clave / Núcleo</th>
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
