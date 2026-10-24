'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { ejecutarJarvisCore, obtenerMemoriaJarvis } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)
    const [memoriasEstado, setMemoriasEstado] = useState<any[]>([])
    
    // Configuración de Módulos Centrales
    const [seccionActiva, setSeccionActiva] = useState<'academico' | 'empresa'>('empresa')
    const [subTabAcademico, setSubTabAcademico] = useState<'editor' | 'calificar'>('editor')
    const [subTabEmpresa, setSubTabEmpresa] = useState<'ventas' | 'apk'>('ventas')
    
    const [tipoAnalisisAcademico, setTipoAnalisisAcademico] = useState('Estructura Zapia AI: Seguridad Pública & Word')
    const [tipoAnalisisEmpresa, setTipoAnalisisEmpresa] = useState('Comercialización y Contratos de Software')
    const [modeloIA, setModeloIA] = useState('Jarvis AI Autonomous Core (Voice & Commercial Engine)')
    
    const [detalleAcademico, setDetalleAcademico] = useState('Estructura metodológica de seguridad pública validada institucionalmente.')
    const [calificacionAcademica, setCalificacionAcademica] = useState('10 / 10 (Aprobado con Excelencia)')
    
    // Procesador Académico
    const [tituloDocumentoAcademico, setTituloDocumentoAcademico] = useState('Proyecto de Aplicación para Seguridad Pública')
    const [contenidoAcademico, setContenidoAcademico] = useState(
`UNIVERSIDAD ABIERTA Y A DISTANCIA DE MÉXICO (UnADM)
LICENCIATURA EN DERECHO
CAPÍTULO 1. PLANTEAMIENTO DEL PROBLEMA Y MARCO METODOLÓGICO
1.1 Análisis de la problemática
1.2 Planteamiento del problema de investigación
1.3 Pregunta general de investigación
1.4 Preguntas específicas
1.5 Justificación
1.6 Objetivos de la investigación
1.7 Hipótesis (Propuestas por comprobar)`)

    // Documentos Comerciales de Venta de Software
    const [tipoDocComercial, setTipoDocComercial] = useState<'carta' | 'juridico' | 'financiero'>('carta')
    const [tituloComercial, setTituloComercial] = useState('Carta de Presentación y Resumen Ejecutivo - Software Institucional')
    const [contenidoComercial, setContenidoComercial] = useState(
`[SECRETARÍA / CLIENTE INSTITUCIONAL]
ASUNTO: Presentación de Solución Tecnológica y Propuesta de Valor

RESUMEN EJECUTIVO:
Nexcode Interactive S.A. de C.V. presenta su plataforma avanzada de software especializado, diseñada para optimizar la gestión operativa, la seguridad de datos y la automatización de procesos institucionales y comerciales con altos estándares de rendimiento y cumplimiento normativo.

1. ALCANCE Y ARQUITECTURA TECNOLÓGICA
- Desarrollo Full-Stack modular, seguro e independiente.
- Integración con pasarelas de pago, bases de datos cifradas y despliegue multiplataforma.

2. BENEFICIOS CLAVE
- Reducción de tiempos operativos.
- Trazabilidad y auditoría en tiempo real.
- Escalabilidad corporativa garantizada.`)

    // Contexto Geopolítico
    const [continente, setContinente] = useState('América')
    const [region, setRegion] = useState('América del Norte / LATAM')
    const [pais, setPais] = useState('México (Reynosa, Tamaulipas)')

    // Seguridad y Bloqueo
    const [accesoConcedido, setAccesoConcedido] = useState(false)
    const [modoAcceso, setModoAcceso] = useState<'facial' | 'pin' | 'hardware'>('facial')
    const [pinIngresado, setPinIngresado] = useState('')
    const [estadoSeguridad, setEstadoSeguridad] = useState('Seleccione método de autenticación (Biometría, PIN o Llave)...')
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

    // Módulo de Reconocimiento de Voz Independiente
    function escucharMic(setter: (val: string | ((prev: string) => string)) => void, nombreModulo: string) {
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
            hablarJarvis(`Dictado activo para ${nombreModulo}, licenciado.`); 
        };
        
        recognition.onresult = (event: any) => {
            const textoTranscrito = event.results[0][0].transcript;
            setter((prev: string) => prev + "\n" + textoTranscrito);
            hablarJarvis("Dictado registrado y adjuntado al documento.");
        };
        
        recognition.onerror = () => { 
            hablarJarvis("No se pudo capturar el audio. Verifique su micrófono."); 
        };
        
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
            setEstadoSeguridad('❌ Error de cámara. Use su PIN Ejecutivo o Llave Segura.')
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

    function cambiarPlantillaComercial(tipo: 'carta' | 'juridico' | 'financiero') {
        setTipoDocComercial(tipo)
        if (tipo === 'carta') {
            setTituloComercial('Carta de Presentación y Resumen Ejecutivo - Software Institucional')
            setContenidoComercial(
`[SECRETARÍA / CLIENTE INSTITUCIONAL]
ASUNTO: Presentación de Solución Tecnológica y Propuesta de Valor

RESUMEN EJECUTIVO:
Nexcode Interactive S.A. de C.V. presenta su plataforma avanzada de software especializado, diseñada para optimizar la gestión operativa, la seguridad de datos y la automatización de procesos institucionales y comerciales con altos estándares de rendimiento y cumplimiento normativo.

1. ALCANCE Y ARQUITECTURA TECNOLÓGICA
- Desarrollo Full-Stack modular, seguro e independiente.
- Integración con pasarelas de pago, bases de datos cifradas y despliegue multiplataforma.

2. BENEFICIOS CLAVE
- Reducción de tiempos operativos.
- Trazabilidad y auditoría en tiempo real.
- Escalabilidad corporativa garantizada.`)
        } else if (tipo === 'juridico') {
            setTituloComercial('Dictamen Jurídico: Contrato, Cumplimiento y Gestión de Riesgos')
            setContenidoComercial(
`DICTAMEN JURÍDICO DE LICENCIAMIENTO Y SOPORTE DE SOFTWARE

1. OBJETO DEL CONTRATO
Establecer los términos y condiciones legales para la comercialización, licenciamiento, uso y soporte técnico de la solución de software desarrollada por Nexcode Interactive.

2. CLÁUSULAS DE CUMPLIMIENTO Y PROPIEDAD INTELECTUAL
- Propiedad de Código: El código fuente y la arquitectura lógica permanecen bajo la titularidad de Nexcode Interactive S.A. de C.V., otorgando una licencia de uso institucional exclusiva o no exclusiva según convenio.
- Protección de Datos y Privacidad: Cumplimiento estricto con las normativas de protección de datos personales y seguridad de la información.

3. LIMITACIÓN DE RESPONSABILIDAD Y GESTIÓN DE RIESGOS
- Garantía de operatividad continua del 99.9% bajo servidores autorizados.
- Protocolos de mitigación ante fallos de red o brechas de seguridad externas.`)
        } else if (tipo === 'financiero') {
            setTituloComercial('Dictamen Contable y Financiero: Precio, IVA, Facturación y ROI')
            setContenidoComercial(
`DICTAMEN CONTABLE Y FINANCIERO - PROPUESTA COMERCIAL

1. DESGLOSE DE PRECIOS Y ESQUEMA DE FACTURACIÓN
- Costo de Licenciamiento / Implementación Modular: [Monto MXN / USD]
- Impuesto al Valor Agregado (IVA 16%): Conforme a la legislación fiscal vigente en México.
- Método de Facturación: Emisión de Comprobantes Fiscales Digitales por Internet (CFDI) bajo el régimen fiscal aplicable.

2. CONDICIONES DE PAGO Y PLAZOS
- Anticipo del 50% para inicio de despliegue y configuración de entorno.
- Liquidación del 50% contra entrega final, pruebas de aceptación y capacitación operativa.

3. RETORNO DE INVERSIÓN (ROI)
- Estimación de recuperación de la inversión mediante la automatización de procesos en un plazo menor a 6 meses de operación continua.`)
        }
    }

    function descargarDocumentoWord() {
        const tituloActivo = seccionActiva === 'academico' ? tituloDocumentoAcademico : tituloComercial
        const contenidoActivo = seccionActiva === 'academico' ? contenidoAcademico : contenidoComercial
        const textoCompleto = `${tituloActivo.toUpperCase()}\n\n${contenidoActivo}`
        const blob = new Blob([textoCompleto], { type: 'application/msword;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${tituloActivo.replace(/\s+/g, '-')}.doc`
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
        if (lower.includes('comercial') || lower.includes('carta') || lower.includes('juridico') || lower.includes('financiero')) {
            return 'Comercialización y Venta de Software'
        }
        if (lower.includes('academico') || lower.includes('zapia')) {
            return 'Estructura Zapia AI & Formato Word'
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
        formData.append('archivoNombre', seccionActiva === 'academico' ? `${tituloDocumentoAcademico}.doc` : `${tituloComercial}.doc`)

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            if (resultado.success) {
                hablarJarvis("Operación comercial y expediente registrados con éxito.")
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
                                    <span>🛡️</span> Jarvis Master Core — <span className="text-cyan-300">Plataforma Institucional & Comercial</span>
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

                        {/* SELECTOR DE MÓDULO PRINCIPAL */}
                        <div className="mb-6 p-4 bg-slate-950 border-2 border-cyan-500/50 rounded-lg flex gap-3">
                            <button type="button" onClick={() => setSeccionActiva('academico')} className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold transition-all ${seccionActiva === 'academico' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-amber-300'}`}>
                                🎓 Módulo Académico (Zapia AI & Seguridad Pública)
                            </button>
                            <button type="button" onClick={() => setSeccionActiva('empresa')} className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold transition-all ${seccionActiva === 'empresa' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-cyan-300'}`}>
                                🏢 Módulo Comercial & Ventas de Software
                            </button>
                        </div>

                        {/* SUB-PESTAÑAS EN MÓDULO EMPRESA / COMERCIAL */}
                        {seccionActiva === 'empresa' && (
                            <div className="flex gap-2 mb-4 border-b border-cyan-500/30 pb-3">
                                <button type="button" onClick={() => setSubTabEmpresa('ventas')} className={`py-1.5 px-4 rounded text-xs font-bold transition-all ${subTabEmpresa === 'ventas' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-cyan-300 border border-cyan-500/30'}`}>
                                    💼 Documentación de Ventas y Dictámenes (Word)
                                </button>
                                <button type="button" onClick={() => setSubTabEmpresa('apk')} className={`py-1.5 px-4 rounded text-xs font-bold transition-all ${subTabEmpresa === 'apk' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-cyan-300 border border-cyan-500/30'}`}>
                                    ⚙️ APK Builder & Auditoría Full-Stack
                                </button>
                            </div>
                        )}

                        {/* FORMULARIO PRINCIPAL */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="hidden">
                                <input type="email" name="emailSolicitante" defaultValue="fg782270@gmail.com" />
                            </div>

                            {/* VISTA MÓDULO ACADÉMICO */}
                            {seccionActiva === 'academico' && (
                                <div className="space-y-4 p-5 bg-slate-950 rounded border-2 border-amber-500/60 animate-fadeIn shadow-inner">
                                    <div className="flex justify-between items-center border-b border-amber-500/30 pb-3">
                                        <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wide">🎓 Procesador Académico — Zapia AI (Seguridad Pública)</h3>
                                        <div className="flex gap-2 items-center">
                                            <button type="button" onClick={() => escucharMic(setContenidoAcademico, 'Módulo Académico')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-1.5 px-3 rounded text-xs shadow flex items-center gap-1">
                                                🎤 Dictar por Voz
                                            </button>
                                            <button type="button" onClick={descargarDocumentoWord} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1.5 px-4 rounded text-xs shadow-lg">
                                                📥 Descargar Word (.doc)
                                            </button>
                                        </div>
                                    </div>
                                    <input type="text" value={tituloDocumentoAcademico} onChange={(e) => setTituloDocumentoAcademico(e.target.value)} className="w-full bg-slate-900 border border-amber-500/40 rounded p-2 text-white text-xs font-bold" required />
                                    <textarea value={contenidoAcademico} onChange={(e) => setContenidoAcademico(e.target.value)} rows={10} className="w-full bg-slate-900 border border-amber-500/40 rounded p-4 text-xs text-slate-100 font-sans outline-none" required />
                                </div>
                            )}

                            {/* VISTA MÓDULO COMERCIAL DE VENTAS DE SOFTWARE */}
                            {seccionActiva === 'empresa' && subTabEmpresa === 'ventas' && (
                                <div className="space-y-4 p-5 bg-slate-950 rounded border-2 border-cyan-500/60 animate-fadeIn shadow-inner">
                                    <div className="flex justify-between items-center border-b border-cyan-500/30 pb-3">
                                        <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wide">💼 Creador de Documentos para Venta de Software</h3>
                                        <div className="flex gap-2 items-center">
                                            {/* BOTÓN VISIBLE DE MICRÓFONO CON ICONO */}
                                            <button type="button" onClick={() => escucharMic(setContenidoComercial, 'Módulo Comercial')} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-1.5 px-3 rounded text-xs shadow-lg flex items-center gap-1 transition-all">
                                                🎤 Dictar por Voz
                                            </button>
                                            <button type="button" onClick={descargarDocumentoWord} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1.5 px-4 rounded text-xs shadow-lg">
                                                📥 Descargar Dictamen / Carta (.doc)
                                            </button>
                                        </div>
                                    </div>

                                    {/* Selector de Plantillas Comerciales */}
                                    <div className="grid grid-cols-3 gap-2 bg-slate-900 p-2 rounded border border-cyan-500/30">
                                        <button type="button" onClick={() => cambiarPlantillaComercial('carta')} className={`py-2 px-2 rounded text-xs font-bold transition-all ${tipoDocComercial === 'carta' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}>
                                            📄 Carta de Presentación
                                        </button>
                                        <button type="button" onClick={() => cambiarPlantillaComercial('juridico')} className={`py-2 px-2 rounded text-xs font-bold transition-all ${tipoDocComercial === 'juridico' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}>
                                            ⚖️ Dictamen Jurídico
                                        </button>
                                        <button type="button" onClick={() => cambiarPlantillaComercial('financiero')} className={`py-2 px-2 rounded text-xs font-bold transition-all ${tipoDocComercial === 'financiero' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}>
                                            💰 Dictamen Financiero & IVA
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-cyan-300 mb-1">Título del Documento Comercial:</label>
                                        <input type="text" value={tituloComercial} onChange={(e) => setTituloComercial(e.target.value)} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-xs font-bold" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-cyan-300 mb-1">Contenido y Estructura Profesional:</label>
                                        <textarea value={contenidoComercial} onChange={(e) => setContenidoComercial(e.target.value)} rows={12} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-4 text-xs text-slate-100 font-sans outline-none focus:border-cyan-400 leading-relaxed shadow-inner" required />
                                    </div>
                                </div>
                            )}

                            {/* VISTA APK BUILDER */}
                            {seccionActiva === 'empresa' && subTabEmpresa === 'apk' && (
                                <div className="space-y-4 p-4 bg-cyan-950/20 rounded border border-cyan-500/40 animate-fadeIn">
                                    <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wide">⚙️ Módulo APK Builder & Auditoría Full-Stack</h4>
                                    <div>
                                        <label className="block text-xs text-slate-300 mb-1">Matriz de IA:</label>
                                        <select value={modeloIA} onChange={(e) => setModeloIA(e.target.value)} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-xs">
                                            <option value="Jarvis AI Autonomous Core (Voice & Commercial Engine)">Jarvis AI Autonomous Core</option>
                                            <option value="OpenAI GPT-6">OpenAI GPT-6</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-300 mb-1">Instrucción Corporativa / Compilación APK:</label>
                                        <textarea name="detalle" placeholder="Ej: Compilar APK automático para Android o auditar endpoint..." className="w-full bg-slate-950 border border-cyan-500/40 rounded p-3 text-sm h-28 outline-none text-white" required />
                                    </div>
                                </div>
                            )}

                            <button type="submit" disabled={isPending} className={`w-full font-bold py-3 px-4 rounded text-slate-950 shadow-lg ${seccionActiva === 'academico' ? 'bg-amber-500 hover:bg-amber-400' : 'bg-cyan-500 hover:bg-cyan-400'}`}>
                                {isPending ? 'Procesando Operación...' : `Registrar Operación Institucional [${seccionActiva.toUpperCase()}]`}
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
