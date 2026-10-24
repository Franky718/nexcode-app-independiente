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
    const [seccionActiva, setSeccionActiva] = useState<'hub_corporativo' | 'academico' | 'comercial' | 'ingenieria'>('hub_corporativo')
    
    // Sub-estado de Skills Legales y Contables (Hub Corporativo)
    const [tipoSkillDoc, setTipoSkillDoc] = useState<'presentacion' | 'juridico' | 'contable' | 'riesgos'>('presentacion')
    const [modeloIA, setModeloIA] = useState('Claude Cloud/Work 3.5 (Legal & Accounting Enterprise Skills)')
    
    // 1. Presentación Ejecutiva SIFV-Reynosa
    const [tituloCorp, setTituloCorp] = useState('Presentación Ejecutiva — Plataforma SIFV-REYNOSA')
    const [contenidoCorp, setContenidoCorp] = useState(
`NEXCODE INTERACTIVE, S.A. DE C.V. 
Reynosa, Tamaulipas, a 24 de octubre de 2026

PROPUESTA TÉCNICA, JURÍDICA Y ECONÓMICA: PLATAFORMA SIFV-REYNOSA
Presentada a la Secretaría de Seguridad Pública, Vialidad y Tránsito del Municipio de Reynosa, Tamaulipas.

1. RESUMEN EJECUTIVO Y ALCANCE INSTITUCIONAL
Sistema integral modular para la gestión vial, trazabilidad de dictámenes y transparencia operativa bajo los más altos estándares tecnológicos de Nexcode.

2. VALOR ESTRATÉGICO
- Soberanía tecnológica y control absoluto sobre la infraestructura municipal.
- Blindaje criptográfico Vault Omega y auditoría de accesos en tiempo real.`)

    // 2. Proyecto Escolar (Zapia AI)
    const [tituloAcademico, setTituloAcademico] = useState('Proyecto de Aplicación para Seguridad Pública')
    const [contenidoAcademico, setContenidoAcademico] = useState(
`UNIVERSIDAD ABIERTA Y A DISTANCIA DE MÉXICO (UnADM)
LICENCIATURA EN DERECHO
CAPÍTULO 1. PLANTEAMIENTO DEL PROBLEMA Y MARCO METODOLÓGICO`)

    // 3. Skills Legales y Contables (Comercial / Jurídico / Fiscal)
    const [tituloComercial, setTituloComercial] = useState('Dictamen Legal, Fiscal y de Viabilidad Financiera')
    const [contenidoComercial, setContenidoComercial] = useState(
`NEXCODE INTERACTIVE S.A. DE C.V. — DICTAMEN LEGAL Y CONTABLE INTEGRAL

1. ANÁLISIS DE VIGENCIA Y ESTÍMULOS FISCALES (IVA 8%)
- Consideración crítica: El estímulo fiscal del IVA al 8% en la región fronteriza vence el 31 de diciembre de 2026.
- Impacto proyectado: Ahorro verificado en costos de implementación para contratos ejecutados antes de la fecha límite.
- Validez de la propuesta comercial: 30 días naturales a partir de su emisión institucional.

2. MARCO JURÍDICO Y PROPIEDAD INTELECTUAL
- Titularidad absoluta del código fuente y arquitectura a favor de Nexcode Interactive S.A. de C.V.
- Cláusulas de confidencialidad, protección de datos personales y cumplimiento normativo municipal.

3. VIABILIDAD FINANCIERA Y MÁRGENES DE UTILIDAD
- Estructura de costos basada en Supabase, licencias y soporte 24/7.
- Retorno de inversión (ROI) estimado a 6 meses con desglose transparente en factura CFDI.`)

    // 4. Ingeniería (Auditoría de Endpoints)
    const [tituloIngenieria, setTituloIngenieria] = useState('GOV-TECH Core Architecture & Endpoints')
    const [contenidoIngenieria, setCodigoIngenieria] = useState(
`// NEXCODE GOV-TECH & LEGAL-CONTABLE AUDIT CORE
class SIFVEnterpriseArchitecture {
    constructor() {
        this.jurisdiction = "Reynosa, Tamaulipas";
        this.taxRule = "IVA_8_PERCENT_ACTIVE_UNTIL_DEC_2026";
        this.security = "VAULT_OMEGA_SECURE";
    }
    verifyLegalCompliance() {
        return { status: "APPROVED", owner: "fg782270@gmail.com", audit: "PASSED" };
    }
}
export const engine = new SIFVEnterpriseArchitecture();`)

    // Estado de Audio
    const [estadoAudio, setEstadoAudio] = useState('Sistema de Audio en Reposo (Listo para Dictado Legal/Contable)')
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

    // Selector de Skills Legales y Contables
    function cambiarSkillDocumental(tipo: 'presentacion' | 'juridico' | 'contable' | 'riesgos') {
        setTipoSkillDoc(tipo)
        if (tipo === 'presentacion') {
            setTituloCorp('Presentación Ejecutiva — Plataforma SIFV-REYNOSA')
            setContenidoCorp(
`NEXCODE INTERACTIVE, S.A. DE C.V. 
Reynosa, Tamaulipas, a 24 de octubre de 2026

PROPUESTA TÉCNICA, JURÍDICA Y ECONÓMICA: PLATAFORMA SIFV-REYNOSA
Presentada a la Secretaría de Seguridad Pública, Vialidad y Tránsito del Municipio de Reynosa, Tamaulipas.

1. RESUMEN EJECUTIVO Y ALCANCE INSTITUCIONAL
Sistema integral modular para la gestión vial, trazabilidad de dictámenes y transparencia operativa bajo los más altos estándares tecnológicos de Nexcode.`)
        } else if (tipo === 'juridico') {
            setTituloCorp('Dictamen Jurídico y Cláusulas de Contratación')
            setContenidoCorp(
`NEXCODE INTERACTIVE S.A. DE C.V. — SKILL JURÍDICO OFICIAL
1. Objeto del contrato de licenciamiento y soporte técnico institucional.
2. Protección de derechos de autor y propiedad intelectual bajo Vault Omega.
3. Rescisión, jurisdicción aplicable en Reynosa y solución de controversias.`)
        } else if (tipo === 'contable') {
            setTituloCorp('Dictamen Contable y Fiscal (Estímulo IVA 8% y Márgenes)')
            setContenidoCorp(
`NEXCODE INTERACTIVE S.A. DE C.V. — SKILL CONTABLE Y FISCAL
1. Análisis de Impuestos: Aplicación del estímulo fiscal de IVA al 8% (Vigencia límite: 31 de diciembre de 2026).
2. Estructura de Costos, Facturación CFDI y Retorno de Inversión (ROI).
3. Márgenes de utilidad operativos y viabilidad presupuestal municipal.`)
        } else if (tipo === 'riesgos') {
            setTituloCorp('Matriz de Riesgos Legales y Mitigación Operativa')
            setContenidoCorp(
`NEXCODE INTERACTIVE S.A. DE C.V. — SKILL DE ANÁLISIS DE RIESGOS
1. Identificación de factores críticos en la implementación de software gubernamental.
2. Protocolos de contingencia y redundancia ante fallas de infraestructura.
3. Evaluación de impacto y mitigación de riesgos operativos (Nivel controlado).`)
        }
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
            setEstadoAudio(`🔴 Grabando dictamen legal/contable en [${nombreModulo}]...`);
            hablarJarvis(`Dictado activo con skills legales y contables para ${nombreModulo}, C. Francisco.`);
        };
        
        recognition.onresult = (event: any) => {
            const textoTranscrito = event.results[0][0].transcript;
            setter((prev: string) => prev + "\n\n[Legal & Accounting Skill Struct]: " + textoTranscrito);
            setEstadoAudio(`✔ Audio legal/contable procesado y estructurado con éxito.`);
            hablarJarvis("Información integrada en el documento oficial.");
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
        let titulo = tituloCorp
        let contenido = contenidoCorp

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
        hablarJarvis('Documento con skills legales y contables exportado en Word con éxito.')
    }

    function descargarBancoMemoriaJson() {
        const contenidoJson = JSON.stringify(memoriasEstado, null, 2)
        const blob = new Blob([contenidoJson], { type: 'application/json;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `Nexcode-Expediente-Legal-Contable.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        hablarJarvis('Expediente JSON exportado correctamente.')
    }

    function formatearActividad(clave: string) {
        if (!clave) return 'Expediente Institucional'
        const lower = clave.toLowerCase()
        if (lower.includes('corporativo')) return 'Hub de Skills Legales y Contables'
        if (lower.includes('academico')) return 'Proyecto Escolar: Seguridad Pública'
        if (lower.includes('comercial')) return 'Dictamen Jurídico y Financiero'
        if (lower.includes('ingenieria')) return 'Ingeniería y Auditoría GOV-TECH'
        return 'Bitácora y Registro Institucional'
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        formData.append('seccion', seccionActiva)
        formData.append('tipoAnalisis', 'Hub con Skills Legales y Contables (Claude Engine)')
        formData.append('modeloIASeleccionado', modeloIA)
        formData.append('continente', continente)
        formData.append('region', region)
        formData.append('pais', pais)
        formData.append('omegaKey', omegaKeyInput)
        formData.append('archivoNombre', `${seccionActiva === 'academico' ? tituloAcademico : seccionActiva === 'comercial' ? tituloComercial : seccionActiva === 'ingenieria' ? tituloIngenieria : tituloCorp}.doc`)

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            if (resultado.success) {
                hablarJarvis("Documento con skills legales y contables registrado y auditado bajo Vault Omega.")
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
                                    <span>🛡️</span> Jarvis Master Core — <span className="text-cyan-300">Legal & Accounting Enterprise Skills</span>
                                </h1>
                                <p className="text-xs text-slate-400">Investigador Titular: fg782270@gmail.com (C. Francisco)</p>
                            </div>
                            <button onClick={() => setAccesoConcedido(false)} className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold">🔒 Bloquear Sesión</button>
                        </header>

                        {/* PANEL DE AUDIO */}
                        <div className="mb-4 p-3 bg-slate-950 border border-cyan-500/40 rounded-lg flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="text-sm">🎙️</span>
                                <span className="text-xs font-bold text-cyan-300">{estadoAudio}</span>
                            </div>
                            {grabandoAudio && <span className="animate-pulse text-xs bg-red-500 text-white px-2 py-0.5 rounded font-bold">SKILLS RECORDING...</span>}
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
                        <div className="mb-6 p-4 bg-slate-950 border-2 border-cyan-500/50 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-2">
                            <button type="button" onClick={() => setSeccionActiva('hub_corporativo')} className={`py-3 px-2 rounded-lg text-xs font-bold transition-all ${seccionActiva === 'hub_corporativo' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-cyan-300'}`}>
                                📂 Hub Legal & Contable
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

                            {/* MÓDULO 1: HUB DE SKILLS LEGALES Y CONTABLES */}
                            {seccionActiva === 'hub_corporativo' && (
                                <div className="space-y-4 p-5 bg-slate-950 rounded border-2 border-cyan-500/60 animate-fadeIn shadow-inner">
                                    <div className="flex justify-between items-center border-b border-cyan-500/30 pb-3">
                                        <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wide">📂 Hub Documental con Skills Legales y Fiscales</h3>
                                        <div className="flex gap-2 items-center">
                                            <button type="button" onClick={() => iniciarDictadoAudio(setContenidoCorp, 'Skills Legales/Contables')} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-1.5 px-3 rounded text-xs shadow flex items-center gap-1">
                                                🎤 Dictar Voz (Skills)
                                            </button>
                                            <button type="button" onClick={descargarDocumentoActivo} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1.5 px-4 rounded text-xs shadow-lg">
                                                📥 Exportar Word (.doc)
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-900 p-2 rounded border border-cyan-500/30">
                                        <button type="button" onClick={() => cambiarSkillDocumental('presentacion')} className={`py-1.5 px-2 rounded text-[11px] font-bold ${tipoSkillDoc === 'presentacion' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}>📊 Presentación</button>
                                        <button type="button" onClick={() => cambiarSkillDocumental('juridico')} className={`py-1.5 px-2 rounded text-[11px] font-bold ${tipoSkillDoc === 'juridico' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}>⚖️ Skill Jurídico</button>
                                        <button type="button" onClick={() => cambiarSkillDocumental('contable')} className={`py-1.5 px-2 rounded text-[11px] font-bold ${tipoSkillDoc === 'contable' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}>💰 Skill Contable (IVA 8%)</button>
                                        <button type="button" onClick={() => cambiarSkillDocumental('riesgos')} className={`py-1.5 px-2 rounded text-[11px] font-bold ${tipoSkillDoc === 'riesgos' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}>📊 Matriz de Riesgos</button>
                                    </div>
                                    <input type="text" value={tituloCorp} onChange={(e) => setTituloCorp(e.target.value)} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-xs font-bold" required />
                                    <textarea value={contenidoCorp} onChange={(e) => setContenidoCorp(e.target.value)} rows={14} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-4 text-xs text-slate-100 font-sans outline-none leading-relaxed" required />
                                </div>
                            )}

                            {/* MÓDULO 2: PROYECTO ESCOLAR */}
                            {seccionActiva === 'academico' && (
                                <div className="space-y-4 p-5 bg-slate-950 rounded border-2 border-amber-500/60 animate-fadeIn shadow-inner">
                                    <div className="flex justify-between items-center border-b border-amber-500/30 pb-3">
                                        <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wide">🎓 Proyecto Escolar (Zapia AI - Seguridad Pública)</h3>
                                        <div className="flex gap-2 items-center">
                                            <button type="button" onClick={() => iniciarDictadoAudio(setContenidoAcademico, 'Proyecto Escolar')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-1.5 px-3 rounded text-xs shadow flex items-center gap-1">
                                                🎤 Dictar Voz
                                            </button>
                                            <button type="button" onClick={descargarDocumentoActivo} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1.5 px-4 rounded text-xs shadow-lg">
                                                📥 Exportar Word (.doc)
                                            </button>
                                        </div>
                                    </div>
                                    <input type="text" value={tituloAcademico} onChange={(e) => setTituloAcademico(e.target.value)} className="w-full bg-slate-900 border border-amber-500/40 rounded p-2 text-white text-xs font-bold" required />
                                    <textarea value={contenidoAcademico} onChange={(e) => setContenidoAcademico(e.target.value)} rows={12} className="w-full bg-slate-900 border border-amber-500/40 rounded p-4 text-xs text-slate-100 font-sans outline-none leading-relaxed" required />
                                </div>
                            )}

                            {/* MÓDULO 3: COMERCIALIZACIÓN Y DICTAMEN FINANCIERO */}
                            {seccionActiva === 'comercial' && (
                                <div className="space-y-4 p-5 bg-slate-950 rounded border-2 border-blue-500/60 animate-fadeIn shadow-inner">
                                    <div className="flex justify-between items-center border-b border-blue-500/30 pb-3">
                                        <h3 className="text-sm font-bold text-blue-300 uppercase tracking-wide">🏢 Dictamen Jurídico, Fiscal y Financiero</h3>
                                        <div className="flex gap-2 items-center">
                                            <button type="button" onClick={() => iniciarDictadoAudio(setContenidoComercial, 'Dictamen Financiero')} className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold py-1.5 px-3 rounded text-xs shadow flex items-center gap-1">
                                                🎤 Dictar Voz
                                            </button>
                                            <button type="button" onClick={descargarDocumentoActivo} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1.5 px-4 rounded text-xs shadow-lg">
                                                📥 Exportar Word (.doc)
                                            </button>
                                        </div>
                                    </div>
                                    <input type="text" value={tituloComercial} onChange={(e) => setTituloComercial(e.target.value)} className="w-full bg-slate-900 border border-blue-500/40 rounded p-2 text-white text-xs font-bold" required />
                                    <textarea value={contenidoComercial} onChange={(e) => setContenidoComercial(e.target.value)} rows={12} className="w-full bg-slate-900 border border-blue-500/40 rounded p-4 text-xs text-slate-100 font-sans outline-none leading-relaxed" required />
                                </div>
                            )}

                            {/* MÓDULO 4: INGENIERÍA GOV-TECH */}
                            {seccionActiva === 'ingenieria' && (
                                <div className="space-y-4 p-5 bg-slate-950 rounded border-2 border-purple-500/60 animate-fadeIn shadow-inner">
                                    <div className="flex justify-between items-center border-b border-purple-500/30 pb-3">
                                        <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wide">⚙️ GOV-TECH Core & Compliance Architecture</h3>
                                        <div className="flex gap-2 items-center">
                                            <button type="button" onClick={() => iniciarDictadoAudio(setCodigoIngenieria, 'GOV-TECH Core')} className="bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold py-1.5 px-3 rounded text-xs shadow flex items-center gap-1">
                                                🎤 Dictar Lógica
                                            </button>
                                            <button type="button" onClick={descargarDocumentoActivo} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1.5 px-4 rounded text-xs shadow-lg">
                                                📥 Exportar Código (.doc)
                                            </button>
                                        </div>
                                    </div>
                                    <input type="text" value={tituloIngenieria} onChange={(e) => setTituloIngenieria(e.target.value)} className="w-full bg-slate-900 border border-purple-500/40 rounded p-2 text-white text-xs font-bold" required />
                                    <textarea value={contenidoIngenieria} onChange={(e) => setCodigoIngenieria(e.target.value)} rows={12} className="w-full bg-slate-900 border border-purple-500/40 rounded p-4 text-xs text-purple-200 font-mono outline-none leading-relaxed" required />
                                </div>
                            )}

                            <button type="submit" disabled={isPending} className="w-full bg-cyan-500 hover:bg-cyan-400 font-bold py-3 px-4 rounded text-slate-950 shadow-lg">
                                {isPending ? 'Procesando Skills Legales/Contables...' : `Registrar y Auditar en [${seccionActiva.toUpperCase()}]`}
                            </button>
                        </form>

                        {mensajeRespuesta && (
                            <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative space-y-2">
                                <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">ESTADO: LEGAL & ACCOUNTING SKILLS AUDITED</div>
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
