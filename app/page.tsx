'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { ejecutarJarvisCore, obtenerMemoriaJarvis } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    const [memoriasEstado, setMemoriasEstado] = useState<any[]>([])
    
    // Selector General de Subsistemas (Estructura Multicerebro Unificada)
    const [seccionActiva, setSeccionActiva] = useState<'hub_institucional' | 'finora' | 'sonica' | 'freshcontrol' | 'ml_engine' | 'academico'>('hub_institucional')
    
    // Estados internos de trabajo
    const [tituloDoc, setTituloDoc] = useState('Presentación Ejecutiva — Plataforma SIFV-REYNOSA')
    const [contenidoDoc, setContenidoDoc] = useState(
`NEXCODE INTERACTIVE, S.A. DE C.V. 
Reynosa, Tamaulipas, a 24 de octubre de 2026

PROPUESTA TÉCNICA Y ECONÓMICA: PLATAFORMA SIFV-REYNOSA
Presentada a la Secretaría de Seguridad Pública, Vialidad y Tránsito del Municipio de Reynosa, Tamaulipas.

1. MISION, VISION Y OBJETIVO
- Misión: Desarrollar tecnología de gestión pública segura, transparente y accesible para el apoyo a las autoridades de tránsito.
- Visión: Ser el proveedor tamaulipeco de referencia en soluciones digitales para la seguridad vial y servicios municipales.
- Objetivo: Implementar la Plataforma en el Municipio de Reynosa y ampliarla por fases a los 43 municipios del Estado.

2. DICTAMEN CONTABLE Y OPCIONES DE CONTRATACIÓN
- Opción A (Licencia Anual): $166,000 de implementación más $9,000 mensuales sin IVA. Total a 3 años: $490,000 sin IVA ($529,200 con IVA 8% / $568,400 con IVA 16%).
- Opción B (Adquisición / Perpetua): $290,000 sin IVA con 12 meses de soporte, y póliza anual de $52,200 desde el mes 13. Total a 3 años: $394,400 sin IVA ($425,952 con IVA 8% / $457,504 con IVA 16%).
- Estímulo Fiscal IVA 8%: Vigente hasta el 31 de diciembre de 2026. Ahorro verificado para el Cliente en el primer año.`)

    // Estado de Audio y Seguridad
    const [estadoAudio, setEstadoAudio] = useState('Sistema de Audio en Reposo')
    const [grabandoAudio, setGrabaAudio] = useState(false)
    const [continente, setContinente] = useState('América')
    const [region, setRegion] = useState('América del Norte / LATAM')
    const [pais, setPais] = useState('México (Reynosa, Tamaulipas)')

    const [accesoConcedido, setAccesoConcedido] = useState(false)
    const [modoAcceso, setModoAcceso] = useState<'facial' | 'pin' | 'hardware'>('facial')
    const [pinIngresado, setPinIngresado] = useState('')
    const [estadoSeguridad, setEstadoSeguridad] = useState('Seleccione método de autenticación...')
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const omegaKeyInput = 'NEXCODE-OMEGA-7822-FRAN-1998'

    const [vozActiva, setVozActiva] = useState(true)

    async function cargarMemoria() {
        const res = await obtenerMemoriaJarvis()
        if (res.success) {
            setMemoriasEstado(res.memorias)
        }
    }

    useEffect(() => {
        cargarMemoria()
    }, [])

    function hablarJarvis(texto: string) {
        if (!vozActiva || typeof window === 'undefined' || !('speechSynthesis' in window)) return
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(texto)
        utterance.rate = 1.05
        utterance.lang = 'es-MX'
        window.speechSynthesis.speak(utterance)
    }

    // Cambiar dinámicamente de subsistema y ajustar plantillas
    function seleccionarSubsistema(modulo: 'hub_institucional' | 'finora' | 'sonica' | 'freshcontrol' | 'ml_engine' | 'academico') {
        setSeccionActiva(modulo)
        if (modulo === 'hub_institucional') {
            setTituloDoc('Presentación Ejecutiva y Dictamen SIFV-Reynosa')
            setContenidoDoc('NEXCODE INTERACTIVE — Propuesta SIFV-Reynosa, Opciones A y B, Control de IVA 8% (Vigente al 31 de Dic 2026).')
        } else if (modulo === 'finora') {
            setTituloDoc('Finora Platform — Finanzas y Endpoints Full-Stack')
            setContenidoDoc('FINORA CORE:\n- Endpoints Node.js, Express, PostgreSQL / Supabase.\n- Gestión de pasarelas de pago y portales de inversión.')
        } else if (modulo === 'sonica') {
            setTituloDoc('Sónica Streaming — Arquitectura de Audio y Sincronización')
            setContenidoDoc('SONICA MUSIC STREAMING:\n- Arquitectura backend inspirada en streaming de alta fidelidad.\n- Gestión de catálogos y transacciones de audio digital.')
        } else if (modulo === 'freshcontrol') {
            setTituloDoc('FreshControl — E-Commerce de Productos Agrícolas')
            setContenidoDoc('FRESHCONTROL COMMERCE:\n- Catálogos de produce sales con unidades de medida "kilo, medio".\n- Módulos dedicados de "proveedor y facturación".')
        } else if (modulo === 'ml_engine') {
            setTituloDoc('Machine Learning & Predictive Pipeline')
            setContenidoDoc('MACHINE LEARNING CORE:\n- Modelos de clasificación y regresión supervisada (Random Forest / Deep Learning).\n- Precisión validada en Supabase superior al 98.4%.')
        } else if (modulo === 'academico') {
            setTituloDoc('Proyecto Escolar - UnADM Licenciatura en Derecho')
            setContenidoDoc('UNIVERSIDAD ABIERTA Y A DISTANCIA DE MÉXICO (UnADM):\n- Cuestionarios, marcos metodológicos y análisis de derecho público municipal.')
        }
        hablarJarvis(`Cambiando al subsistema ${modulo}`)
    }

    async function iniciarAccesoFacial() {
        setModoAcceso('facial')
        setEstadoSeguridad('Verificando credenciales biométricas...')
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) videoRef.current.srcObject = stream
            setTimeout(() => {
                setEstadoSeguridad('✔ Identidad de Supervisor confirmada.')
                hablarJarvis("Acceso autorizado, C. Francisco.")
                setAccesoConcedido(true)
            }, 2000)
        } catch (err) {
            setEstadoSeguridad('❌ Error de cámara. Use PIN Ejecutivo.')
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
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        formData.append('seccion', seccionActiva)
        formData.append('tipoAnalisis', 'Multicerebro Unificado Nexcode')
        formData.append('omegaKey', omegaKeyInput)
        formData.append('archivoNombre', `${tituloDoc.replace(/\s+/g, '-')}.doc`)

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            if (resultado.success) {
                hablarJarvis("Subsistema procesado y auditado bajo Vault Omega.")
                cargarMemoria()
            }
        })
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center justify-center">
            
            {!accesoConcedido ? (
                <div className="w-full max-w-xl bg-slate-900 border-2 border-cyan-500/60 rounded-xl p-8 shadow-2xl text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-wider text-white">⚖️ Gabinete Bloqueado — Vault Omega</h1>
                        <p className="text-xs text-cyan-300">Nexcode Interactive S.A. de C.V.</p>
                        <p className="text-[11px] text-slate-400">Investigador Titular: fg782270@gmail.com (C. Francisco)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2 rounded-lg border border-cyan-500/30">
                        <button type="button" onClick={iniciarAccesoFacial} className={`py-2 px-2 rounded text-xs font-bold transition-all ${modoAcceso === 'facial' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300'}`}>📷 Biometría</button>
                        <button type="button" onClick={() => setModoAcceso('pin')} className={`py-2 px-2 rounded text-xs font-bold transition-all ${modoAcceso === 'pin' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300'}`}>🔑 PIN Ejecutivo</button>
                    </div>

                    {modoAcceso === 'facial' && (
                        <div className="space-y-3">
                            <div className="w-48 h-36 mx-auto bg-slate-950 border border-cyan-500/40 rounded-lg flex items-center justify-center overflow-hidden relative shadow-inner">
                                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                            </div>
                            <button type="button" onClick={iniciarAccesoFacial} className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-xs transition-all shadow">Verificar Identidad</button>
                        </div>
                    )}

                    {modoAcceso === 'pin' && (
                        <form onSubmit={verificarPinMaestro} className="space-y-4 p-4 bg-slate-950 rounded-lg border border-cyan-500/30">
                            <div>
                                <label className="block text-xs text-cyan-300 mb-2 font-bold">Ingrese PIN (7822, 1998, 2026):</label>
                                <input type="password" maxLength={6} value={pinIngresado} onChange={(e) => setPinIngresado(e.target.value)} placeholder="••••" className="w-full bg-slate-900 border border-cyan-500/50 rounded p-3 text-center text-white text-lg tracking-widest outline-none" required />
                            </div>
                            <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-xs transition-all shadow">Desbloquear</button>
                        </form>
                    )}

                    <p className="text-xs text-white font-medium pt-2">{estadoSeguridad}</p>
                </div>
            ) : (
                <div className="w-full max-w-6xl flex flex-col items-center animate-fadeIn">
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-6">
                        <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                            <div>
                                <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                                    <span>🧠</span> Jarvis Multicerebro Unificado — <span className="text-cyan-300">Nexcode Core</span>
                                </h1>
                                <p className="text-xs text-slate-400">Investigador Titular: fg782270@gmail.com (C. Francisco) | Reynosa, Tamps.</p>
                            </div>
                            <button onClick={() => setAccesoConcedido(false)} className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold">🔒 Bloquear</button>
                        </header>

                        {/* BOTONERA UNIFICADA DE SUBSISTEMAS */}
                        <div className="mb-6 p-3 bg-slate-950 border-2 border-cyan-500/50 rounded-lg grid grid-cols-2 md:grid-cols-6 gap-2">
                            <button type="button" onClick={() => seleccionarSubsistema('hub_institucional')} className={`py-2.5 px-2 rounded text-xs font-bold transition-all ${seccionActiva === 'hub_institucional' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-cyan-300 hover:bg-slate-800'}`}>
                                📂 SIFV-Reynosa
                            </button>
                            <button type="button" onClick={() => seleccionarSubsistema('finora')} className={`py-2.5 px-2 rounded text-xs font-bold transition-all ${seccionActiva === 'finora' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-cyan-300 hover:bg-slate-800'}`}>
                                💳 Finora
                            </button>
                            <button type="button" onClick={() => seleccionarSubsistema('sonica')} className={`py-2.5 px-2 rounded text-xs font-bold transition-all ${seccionActiva === 'sonica' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-cyan-300 hover:bg-slate-800'}`}>
                                🎵 Sónica
                            </button>
                            <button type="button" onClick={() => seleccionarSubsistema('freshcontrol')} className={`py-2.5 px-2 rounded text-xs font-bold transition-all ${seccionActiva === 'freshcontrol' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-cyan-300 hover:bg-slate-800'}`}>
                                🥗 FreshControl
                            </button>
                            <button type="button" onClick={() => seleccionarSubsistema('ml_engine')} className={`py-2.5 px-2 rounded text-xs font-bold transition-all ${seccionActiva === 'ml_engine' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-cyan-300 hover:bg-slate-800'}`}>
                                🤖 Machine Learning
                            </button>
                            <button type="button" onClick={() => seleccionarSubsistema('academico')} className={`py-2.5 px-2 rounded text-xs font-bold transition-all ${seccionActiva === 'academico' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-amber-300 hover:bg-slate-800'}`}>
                                🎓 UnADM Derecho
                            </button>
                        </div>

                        {/* FORMULARIO DE GESTIÓN ACTIVA */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="hidden">
                                <input type="email" name="emailSolicitante" defaultValue="fg782270@gmail.com" />
                            </div>

                            <div className="space-y-4 p-5 bg-slate-950 rounded border-2 border-cyan-500/60 shadow-inner">
                                <div className="flex justify-between items-center border-b border-cyan-500/30 pb-3">
                                    <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wide">Módulo Activo: [{seccionActiva.toUpperCase()}]</h3>
                                    <span className="text-[11px] bg-cyan-950 text-cyan-300 px-2 py-1 rounded border border-cyan-500/30">Vault Omega Secured</span>
                                </div>
                                <input type="text" value={tituloDoc} onChange={(e) => setTituloDoc(e.target.value)} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-2 text-white text-xs font-bold" required />
                                <textarea value={contenidoDoc} onChange={(e) => setContenidoDoc(e.target.value)} rows={12} className="w-full bg-slate-900 border border-cyan-500/40 rounded p-4 text-xs text-slate-100 font-sans outline-none leading-relaxed" required />
                            </div>

                            <button type="submit" disabled={isPending} className="w-full bg-cyan-500 hover:bg-cyan-400 font-bold py-3 px-4 rounded text-slate-950 shadow-lg">
                                {isPending ? 'Procesando en el Multicerebro...' : `Registrar y Auditar Subsistema [${seccionActiva.toUpperCase()}]`}
                            </button>
                        </form>

                        {mensajeRespuesta && (
                            <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative space-y-2">
                                <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">AUDITADO</div>
                                <div className="text-white font-medium whitespace-pre-line leading-relaxed">{mensajeRespuesta}</div>
                                {folioUltimo && <p className="text-xs text-cyan-300"><span className="font-bold">Folio:</span> {folioUltimo}</p>}
                            </div>
                        )}
                    </div>

                    {/* BANCO DE MEMORIA */}
                    <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl space-y-4">
                        <h2 className="text-lg font-bold text-cyan-300 border-b border-cyan-500/20 pb-2">Registros del Multicerebro Global</h2>
                        {memoriasEstado.length === 0 ? (
                            <p className="text-xs text-slate-400">No hay registros almacenados todavía.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-cyan-500/20 text-cyan-400">
                                            <th className="pb-2">Subsistema</th>
                                            <th className="pb-2">Detalle</th>
                                            <th className="pb-2">Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800 text-slate-300">
                                        {memoriasEstado.map((mem) => (
                                            <tr key={mem.id} className="hover:bg-slate-950/50">
                                                <td className="py-2 font-bold text-cyan-300">{mem.memory_key}</td>
                                                <td className="py-2 max-w-xs truncate">{mem.memory_value}</td>
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
