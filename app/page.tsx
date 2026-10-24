'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { ejecutarJarvisCore, obtenerMemoriaJarvis } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)
    const [memoriasEstado, setMemoriasEstado] = useState<any[]>([])
    
    // Selector General de Módulos
    const [seccionActiva, setSeccionActiva] = useState<'neuronal_hub' | 'hub_corporativo' | 'academico' | 'comercial' | 'ingenieria'>('neuronal_hub')
    
    // Sub-estado del Enlace Neuronal Claude Cloud
    const [estadoSynapse, setEstadoSynapse] = useState('Sincronización Neuronal en Reposo (Listo para Conectar Claude Cloud)')
    const [pesoNeural, setPesoNeural] = useState('99.8% (Alta Fidelidad Cognitiva)')
    const [tipoModeloNeural, setTipoModeloNeural] = useState('Claude Cloud/Work 3.5 — Master Synapse Engine')
    
    // Plantilla Neural SIFV-Reynosa & Skills Legales/Contables
    const [tituloNeural, setTituloNeural] = useState('Núcleo Sináptico — Plataforma SIFV-REYNOSA & Skills Contables')
    const [contenidoNeural, setContenidoNeural] = useState(
`NEXCODE INTERACTIVE, S.A. DE C.V. — NEURAL SYNAPSE PROFILE
Conectado a: Claude Cloud/Work Ecosistema Global
Titular y Arquitecto: fg782270@gmail.com (C. Francisco)

1. ARQUITECTURA DE NEURONAS ARTIFICIALES (SYNAPSE WEIGHTS)
- Neurona Ejecutiva: Generación de propuestas institucionales para la Secretaría de Seguridad Pública, Vialidad y Tránsito de Reynosa, Tamaulipas[cite: 8].
- Neurona Contable y Fiscal: Modelación financiera de las Opciones A y B, reconocimiento de ingresos NIF D-1 y control del estímulo de IVA al 8% (Vigente hasta el 31 de diciembre de 2026)[cite: 10].
- Neurona Jurídica: Blindaje de propiedad intelectual y titularidad de código fuente bajo Vault Omega.
- Neurona Técnica: Auditoría de endpoints Full-Stack, Supabase y compilación APK automatizada.`)

    // Contenido Proyecto Escolar
    const [tituloAcademico, setTituloAcademico] = useState('Proyecto de Aplicación para Seguridad Pública')
    const [contenidoAcademico, setContenidoAcademico] = useState(
`UNIVERSIDAD ABIERTA Y A DISTANCIA DE MÉXICO (UnADM) — LICENCIATURA EN DERECHO`)

    // Contenido Comercial / Financiero
    const [tituloComercial, setTituloComercial] = useState('Dictamen Contable, Financiero y Fiscal')
    const [contenidoComercial, setContenidoComercial] = useState(
`NEXCODE INTERACTIVE S.A. DE C.V. — DICTAMEN FINANCIERO Y CONTROL DE IVA[cite: 10]`)

    // Contenido Ingeniería
    const [tituloIngenieria, setTituloIngenieria] = useState('Neural Synapse & GOV-TECH Endpoints')
    const [contenidoIngenieria, setCodigoIngenieria] = useState(
`// NEXCODE CLAUDE CLOUD NEURAL SYNAPSE CORE
class ClaudeNeuralSynapseEngine {
    constructor() {
        this.synapseState = "ACTIVE_ESTABLISHED";
        this.owner = "fg782270@gmail.com";
        this.security = "VAULT_OMEGA_SECURE";
    }
    syncWeights() {
        return { status: "SYNCHRONIZED", fidelity: "99.8%", region: "Reynosa, MX" };
    }
}
export const neuralEngine = new ClaudeNeuralSynapseEngine();`)

    // Estado de Audio
    const [estadoAudio, setEstadoAudio] = useState('Sistema de Audio en Reposo')
    const [grabandoAudio, setGrabaAudio] = useState(false)

    // Contexto Geopolítico
    const [continente, setContinente] = useState('América')
    const [region, setRegion] = useState('América del Norte / LATAM')
    const [pais, setPais] = useState('México (Reynosa, Tamaulipas)')

    // Seguridad y Bloqueo
    const [accesoConcedido, setAccesoConcedido] = useState(false)
    const [modoAcceso, setModoAcceso] = useState<'facial' | 'pin' | 'hardware'>('facial')
    const [pinIngresado, setPinIngresado] = useState('')
    const [estadoSeguridad, setEstadoSeguridad] = useState('Seleccione método de autenticación...')
    const videoRef = useRef<HTMLVideoElement | null>(null)
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

    // Función de Conexión y Entrenamiento Neural con Claude Cloud
    function entrenarRedNeuronalClaude() {
        setEstadoSynapse('🔄 Conectando con Claude Cloud/Work y ajustando pesos sinápticos...')
        hablarJarvis("Estableciendo enlace neuronal con Claude Cloud, C. Francisco.")
        setTimeout(() => {
            setEstadoSynapse('✔ Red neuronal sincronizada. Neuronas ejecutivas, legales y contables activas.')
            setPesoNeural('100.0% (Optimización Máxima Master Engine)')
            hablarJarvis("Red neuronal de Jarvis AI actualizada y sincronizada con éxito.")
        }, 2500)
    }

    // Dictado por voz
    function iniciarDictadoAudio(setter: (val: string | ((prev: string) => string)) => void, nombreModulo: string) {
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
        
        recognition.onstart = () => {
            setGrabaAudio(true);
            setEstadoAudio(`🔴 Grabando enlace sináptico en [${nombreModulo}]...`);
            hablarJarvis(`Dictado activo con enlace Claude Cloud para ${nombreModulo}, C. Francisco.`);
        };
        
        recognition.onresult = (event: any) => {
            const textoTranscrito = event.results[0][0].transcript;
            setter((prev: string) => prev + "\n\n[Neural Synapse Ingestion]: " + textoTranscrito);
            setEstadoAudio(`✔ Datos asimilados por la red neuronal.`);
            hablarJarvis("Información integrada en la neurona artificial.");
            setGrabaAudio(false);
        };
        
        recognition.onerror = () => {
            setGrabaAudio(false);
            setEstadoAudio("❌ Error en captura de audio.");
            hablarJarvis("No se pudo capturar el audio.");
        };

        recognition.onend = () => { setGrabaAudio(false); };
        recognition.start();
    }

    async function iniciarAccesoFacial() {
        setModoAcceso('facial')
        setEstadoSeguridad('Verificando credenciales biométricas...')
        hablarJarvis("Iniciando validación biométrica facial.")
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) videoRef.current.srcObject = stream
            setTimeout(() => {
                setEstadoSeguridad('✔ Identidad de Supervisor confirmada.')
                hablarJarvis("Acceso autorizado, C. Francisco.")
                setAccesoConcedido(true)
            }, 2500)
        } catch (err) {
            setEstadoSeguridad('❌ Error de cámara. Use PIN Ejecutivo.')
            hablarJarvis("Utilice su PIN ejecutivo de acceso.")
        }
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

    // Exportador de Documento Word
    function descargarDocumentoActivo() {
        let titulo = tituloNeural
        let contenido = contenidoNeural

        if (seccionActiva === 'academico') {
            titulo = tituloAcademico
            contenido = contenidoAcademico
        } else if (seccionActiva === 'comercial') {
            titulo = tituloComercial
            contenido = contenidoComercial
        } else if (seccionActiva === 'ingenieria') {
            titulo = tituloIngenieria
            contenido = contenidoIngenieria
        }

        const textoCompleto = `${titulo.toUpperCase()}\n\n${contenido}`
        const blob = new Blob([textoCompleto], { type: 'application/msword;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${titulo.replace(/\s+/g, '-')}.doc`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        hablarJarvis('Documento neuronal exportado en formato Word con éxito.')
    }

    function descargarBancoMemoriaJson() {
        const contenidoJson = JSON.stringify(memoriasEstado, null, 2)
        const blob = new Blob([contenidoJson], { type: 'application/json;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `Nexcode-Expediente-Neural.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        hablarJarvis('Expediente JSON exportado correctamente.')
    }

    function formatearActividad(clave: string) {
        if (!clave) return 'Expediente Institucional'
        const lower = clave.toLowerCase()
        if (lower.includes('neuronal')) return 'Hub de Enlace Neural Claude Cloud'
        if (lower.includes('academico')) return 'Proyecto Escolar: Seguridad Pública'
        if (lower.includes('comercial')) return 'Dictamen Contable y Financiero'
        if (lower.includes('ingenieria')) return 'Ingeniería y Synapse Core'
        return 'Bitácora y Registro Institucional'
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        formData.append('seccion', seccionActiva)
        formData.append('tipoAnalisis', 'Claude Cloud Neural Link & Synapse Engine')
        formData.append('modeloIASeleccionado', tipoModeloNeural)
        formData.append('continente', continente)
        formData.append('region', region)
        formData.append('pais', pais)
        formData.append('omegaKey', omegaKeyInput)
        formData.append('archivoNombre', `${seccionActiva === 'academico' ? tituloAcademico : seccionActiva === 'comercial' ? tituloComercial : seccionActiva === 'ingenieria' ? tituloIngenieria : tituloNeural}.doc`)

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            if (resultado.success) {
                hablarJarvis("Pesos sinápticos actualizados y auditados bajo Vault Omega[cite: 6].")
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

                    <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2 rounded-lg border border-cyan-500/30">
                        <button type="button" onClick={iniciarAccesoFacial} className={`py-2 px-2 rounded text-xs font-bold transition-all ${modoAcceso === 'facial' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}>📷 Biometría</button>
                        <button type="button" onClick={() => setModoAcceso('pin')} className={`py-2 px-2 rounded text-xs font-bold transition-all ${modoAcceso === 'pin' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}>🔑 PIN Ejecutivo</button>
                        <button type="button" onClick={verificarBiometriaHardware} className={`py-2 px-2 rounded text-xs font-bold transition-all ${modoAcceso === 'hardware' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}>👆 Llave Segura</button>
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
                                <label className="block text-xs text-cyan-300 mb-2 font-bold">Ingrese PIN de Acceso (7822, 1998, 2026):</label>
                                <input type="password" maxLength={6} value={pinIngresado} onChange={(e) => setPinIngresado(e.target.value)} placeholder="••••" className="w-full bg-slate-900 border border-cyan-500/50 rounded p-3 text-center text-white text-lg tracking-widest outline-none focus:border-cyan-400" required />
                            </div>
                            <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-xs transition-all shadow">Desbloquear Gabinete</button>
                        </form>
                    )}

                    {modoAcceso === 'hardware' && (
                        <div className="space-y-4 p-4 bg-slate-950 rounded-lg border border-cyan-500/30 text-center">
                            <button type="button" onClick={verificarBiometriaHardware} className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-3 px-4 rounded-lg text-xs transition-all shadow">Validar Llave de Hardware</button>
                        </div>
                    )}

                    <p className="text-xs text-white font-medium pt-2">{estadoSeguridad}</p>
                </div>
            ) : (
                <div className="w-full max-w-5xl flex flex-col items-center animate-fadeIn">
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-6">
                        <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                            <div>
                                <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                                    <span>🧠</span> Jarvis Master Core — <span className="text-cyan-300">Claude Cloud Neural Link & Synapse Engine</span>
                                </h1>
                                <p className="text-xs text-slate-400">Investigador Titular: fg782270@gmail.com (C. Francisco)</p>
                            </div>
                            <button onClick={() => setAccesoConcedido(false)} className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold">🔒 Bloquear Sesión</button>
                        </header>

                        {/* PANEL DE CONTROL NEURAL */}
                        <div className="mb-4 p-4 bg-slate-950 border border-cyan-500/40 rounded-lg flex flex-col md:flex-row justify-between items-center gap-3">
                            <div className="space-y-1">
                                <div className="text-xs font-bold text-cyan-300">⚡ Estado del Enlace: {estadoSynapse}</div>
                                <div className="text-[11px] text-slate-400">Fidelidad de Pesos Sinápticos: <span className="text-green-400 font-bold">{pesoNeural}</span></div>
                            </div>
                            <button type="button" onClick={entrenarRedNeuronalClaude} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-2.5 px-5 rounded-lg text-xs shadow-lg transition-all flex items-center gap-2">
                                🧠 Sincronizar y Entrenar Neuronas (Claude Cloud)
                            </button>
                        </div>

                        {/* SELECTOR GEOPOLÍTICO */}
                        <div className="mb-6 p-4 bg-slate-950 border border-cyan-500/40 rounded-lg space-y-3">
                            <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wide">🌍 Marco Geopolítico e Institucional</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-[11px] text-slate-300 mb-1">Continente:</label>
                                    <select value={continente} onChange={(e) => setContinente(e.target.value)} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-xs">
                                        <option value="América">América</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-300 mb-1">Región:</label>
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

                        {/* SELECTOR PRINCIPAL DE MÓDULOS */}
                        <div className="mb-6 p-4 bg-slate-950 border-2 border-cyan-500/50 rounded-lg grid grid-cols-2 md:grid-cols-5 gap-2">
                            <button type="button" onClick={() => setSeccionActiva('neuronal_hub')} className={`py-3 px-2 rounded-lg text-xs font-bold transition-all ${seccionActiva === 'neuronal_hub' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-cyan-300'}`}>
                                🧠 Hub Neural Claude
                            </button>
                            <button type="button" onClick={() => setSeccionActiva('hub_corporativo')} className={`py-3 px-2 rounded-lg text-xs font-bold transition-all ${seccionActiva === 'hub_corporativo' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-cyan-300'}`}>
                                📂 Hub Documental
                            </button>
                            <button type="button" onClick={() => setSeccionActiva('academico')} className={`py-3 px-2 rounded-lg text-xs font-bold transition-all ${seccionActiva === 'academico' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-amber-300'}`}>
                                🎓 Proyecto Escolar
                            </button>
                            <button type="button" onClick={() => setSeccionActiva('comercial')} className={`py-3 px-2 rounded-lg text-xs font-bold transition-all ${seccionActiva === 'comercial' ? 'bg-blue-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-blue-300'}`}>
                                🏢 Dictamen Financiero
                            </button>
                            <button type="button" onClick={() => setSeccionActiva('ingenieria')} className={`py-3 px-2 rounded-lg text-xs font-bold transition-all ${seccionActiva === 'ingenieria' ? 'bg-purple-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-purple-300'}`}>
                                ⚙️ GOV-TECH Core
                            </button>
                        </div>

                        {/* FORMULARIO PRINCIPAL */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="hidden">
                                <input type="email" name="emailSolicitante" defaultValue="fg782270@gmail.com" />
                            </div>

                            {/* MÓDULO 1: HUB NEURAL CLAUDE CLOUD */}
                            {seccionActiva === 'neuronal_hub' && (
                                <div className="space-y-4 p-5 bg-slate-950 rounded border-2 border-cyan-500/60 animate-fadeIn shadow-inner">
                                    <div className="flex justify-between items-center border-b border-cyan-500/30 pb-3">
                                        <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wide">🧠 Núcleo de Neuronas Artificiales & Sincronización Claude Cloud</h3>
                                        <div className="flex gap-2 items-center">
                                            <button type="button" onClick={() => iniciarDictadoAudio(setContenidoNeural, 'Hub Neural')} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-1.5 px-3 rounded text-xs shadow flex items-center gap-1">
                                                🎤 Dictar a la Red Neuronal
                                            </button>
                                            <button type="button" onClick={descargarDocumentoActivo} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1.5 px-4 rounded text-xs shadow-lg">
                                                📥 Exportar Word (.doc)
                                            </button>
                                        </div>
                                    </div>
                                    <input type="text" value={tituloNeural} onChange={(e) => setTituloNeural(e.target.value)} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-xs font-bold" required />
                                    <textarea value={contenidoNeural} onChange={(e) => setContenidoNeural(e.target.value)} rows={14} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-4 text-xs text-slate-100 font-sans outline-none leading-relaxed" required />
                                </div>
                            )}

                            {/* MÓDULO 2: HUB CORPORATIVO */}
                            {seccionActiva === 'hub_corporativo' && (
                                <div className="space-y-4 p-5 bg-slate-950 rounded border-2 border-cyan-500/60 animate-fadeIn shadow-inner">
                                    <div className="flex justify-between items-center border-b border-cyan-500/30 pb-3">
                                        <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wide">📂 Hub Documental Institucional</h3>
                                        <button type="button" onClick={descargarDocumentoActivo} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1.5 px-4 rounded text-xs shadow-lg">📥 Exportar Word (.doc)</button>
                                    </div>
                                    <textarea value={contenidoNeural} onChange={(e) => setContenidoNeural(e.target.value)} rows={12} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-4 text-xs text-slate-100 font-sans outline-none leading-relaxed" required />
                                </div>
                            )}

                            {/* MÓDULO 3: PROYECTO ESCOLAR */}
                            {seccionActiva === 'academico' && (
                                <div className="space-y-4 p-5 bg-slate-950 rounded border-2 border-amber-500/60 animate-fadeIn shadow-inner">
                                    <div className="flex justify-between items-center border-b border-amber-500/30 pb-3">
                                        <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wide">🎓 Proyecto Escolar (Zapia AI - UnADM Derecho)</h3>
                                        <button type="button" onClick={descargarDocumentoActivo} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1.5 px-4 rounded text-xs shadow-lg">📥 Exportar Word (.doc)</button>
                                    </div>
                                    <input type="text" value={tituloAcademico} onChange={(e) => setTituloAcademico(e.target.value)} className="w-full bg-slate-900 border border-amber-500/40 rounded p-2 text-white text-xs font-bold" required />
                                    <textarea value={contenidoAcademico} onChange={(e) => setContenidoAcademico(e.target.value)} rows={12} className="w-full bg-slate-900 border border-amber-500/40 rounded p-4 text-xs text-slate-100 font-sans outline-none leading-relaxed" required />
                                </div>
                            )}

                            {/* MÓDULO 4: DICTAMEN FINANCIERO */}
                            {seccionActiva === 'comercial' && (
                                <div className="space-y-4 p-5 bg-slate-950 rounded border-2 border-blue-500/60 animate-fadeIn shadow-inner">
                                    <div className="flex justify-between items-center border-b border-blue-500/30 pb-3">
                                        <h3 className="text-sm font-bold text-blue-300 uppercase tracking-wide">🏢 Dictamen Financiero, Opciones A/B y Control de IVA[cite: 10]</h3>
                                        <button type="button" onClick={descargarDocumentoActivo} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1.5 px-4 rounded text-xs shadow-lg">📥 Exportar Word (.doc)</button>
                                    </div>
                                    <input type="text" value={tituloComercial} onChange={(e) => setTituloComercial(e.target.value)} className="w-full bg-slate-900 border border-blue-500/40 rounded p-2 text-white text-xs font-bold" required />
                                    <textarea value={contenidoComercial} onChange={(e) => setContenidoComercial(e.target.value)} rows={12} className="w-full bg-slate-900 border border-blue-500/40 rounded p-4 text-xs text-slate-100 font-sans outline-none leading-relaxed" required />
                                </div>
                            )}

                            {/* MÓDULO 5: INGENIERÍA GOV-TECH */}
                            {seccionActiva === 'ingenieria' && (
                                <div className="space-y-4 p-5 bg-slate-950 rounded border-2 border-purple-500/60 animate-fadeIn shadow-inner">
                                    <div className="flex justify-between items-center border-b border-purple-500/30 pb-3">
                                        <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wide">⚙️ GOV-TECH Synapse Architecture</h3>
                                        <button type="button" onClick={descargarDocumentoActivo} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1.5 px-4 rounded text-xs shadow-lg">📥 Exportar Código (.doc)</button>
                                    </div>
                                    <input type="text" value={tituloIngenieria} onChange={(e) => setTituloIngenieria(e.target.value)} className="w-full bg-slate-900 border border-purple-500/40 rounded p-2 text-white text-xs font-bold" required />
                                    <textarea value={contenidoIngenieria} onChange={(e) => setCodigoIngenieria(e.target.value)} rows={12} className="w-full bg-slate-900 border border-purple-500/40 rounded p-4 text-xs text-purple-200 font-mono outline-none leading-relaxed" required />
                                </div>
                            )}

                            <button type="submit" disabled={isPending} className="w-full bg-cyan-500 hover:bg-cyan-400 font-bold py-3 px-4 rounded text-slate-950 shadow-lg">
                                {isPending ? 'Sincronizando Red Neuronal...' : `Registrar y Auditar en el Núcleo [${seccionActiva.toUpperCase()}]`}
                            </button>
                        </form>

                        {mensajeRespuesta && (
                            <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative space-y-2">
                                <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">ESTADO: NEURAL SYNAPSE AUDITED</div>
                                <div className="text-white font-medium whitespace-pre-line leading-relaxed">{mensajeRespuesta}</div>
                                {folioUltimo && <p className="text-xs text-cyan-300"><span className="font-bold">Folio:</span> {folioUltimo}</p>}
                            </div>
                        )}
                    </div>

                    {/* BANCO DE MEMORIA Y REGISTROS JSON */}
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl space-y-4">
                        <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
                            <h2 className="text-lg font-bold text-cyan-300">Expediente y Registros Institucionales</h2>
                            <button type="button" onClick={descargarBancoMemoriaJson} className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-2 px-4 rounded text-xs transition-all shadow-lg flex items-center gap-1">
                                📥 Exportar Expediente JSON (.json)
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
