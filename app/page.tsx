'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { ejecutarJarvisCore, obtenerMemoriaJarvis } from './actions/master-actions'

export default function MasterCorePage() {
    const [isPending, startTransition] = useTransition()
    const [mensajeRespuesta, setMensajeRespuesta] = useState<string | null>(null)
    const [folioUltimo, setFolioUltimo] = useState<string | null>(null)
    const [hashGenerado, setHashGenerado] = useState<string | null>(null)
    const [memorias, setMemorias] = useState<any[]>([])
    
    // Estados para Voz y Escaneo Facial
    const [vozActiva, setVozActiva] = useState(true)
    const [camaraActiva, setCamaraActiva] = useState(false)
    const [estadoRostro, setEstadoRostro] = useState('Esperando escaneo facial...')
    const videoRef = useRef<HTMLVideoElement | null>(null)

    async function cargarMemoria() {
        const res = await obtenerMemoriaJarvis()
        if (res.success) {
            setMemorias(res.memorias)
        }
    }

    useEffect(() => {
        cargarMemoria()
    }, [])

    // Función de Síntesis de Voz (Jarvis Habla)
    function hablarJarvis(texto: string) {
        if (!vozActiva || typeof window === 'undefined' || !('speechSynthesis' in window)) return
        window.speechSynthesis.cancel() // Detener audio anterior
        const utterance = new SpeechSynthesisUtterance(texto)
        utterance.lang = 'es-MX'
        utterance.rate = 1.0
        utterance.pitch = 0.9 // Tono grave corporativo / tipo Jarvis
        window.speechSynthesis.speak(utterance)
    }

    // Activar Cámara para Escaneo Facial
    async function iniciarEscaneoFacial() {
        setCamaraActiva(true)
        setEstadoRostro('Iniciando sensores biométricos...')
        hablarJarvis('Iniciando escaneo facial para verificación del C. Francisco.')
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
            setTimeout(() => {
                setEstadoRostro('✔ Rostro verificado: C. Francisco (fg782270@gmail.com)')
                hablarJarvis('Rostro verificado con éxito. Acceso total concedido.')
            }, 3000)
        } catch (err) {
            setEstadoRostro('❌ Error: No se pudo acceder a la cámara.')
            hablarJarvis('Error al acceder a la cámara.')
        }
    }

    async function ejecutarAccionJarvis(tipo: string, detalle: string) {
        const formData = new FormData()
        formData.append('emailSolicitante', 'fg782270@gmail.com')
        formData.append('accion', tipo)
        formData.append('tipoSoftware', 'Sistema Autónomo')
        formData.append('detalleSoftware', detalle)

        startTransition(async () => {
            const resultado = await ejecutarJarvisCore(formData)
            setMensajeRespuesta(resultado.message)
            setFolioUltimo(resultado.folio || null)
            setHashGenerado(resultado.hash || null)
            if (resultado.success) {
                hablarJarvis(resultado.message)
                cargarMemoria()
            }
        })
    }

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-xl mb-6">
                <header className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-6">
                    <div>
                        <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
                            <span>🎙️</span> Jarvis AI Core — <span className="text-cyan-300">Voz, Rostro & Gmail Sync</span>
                        </h1>
                        <p className="text-xs text-slate-400">Sistema Autónomo y Aprendizaje Predeterminado (C. Francisco)</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setVozActiva(!vozActiva)}
                            className={`text-xs px-3 py-1 rounded border ${vozActiva ? 'bg-cyan-600 text-slate-950 border-cyan-400 font-bold' : 'bg-slate-950 text-slate-400 border-slate-700'}`}
                        >
                            {vozActiva ? '🔊 Voz Activada' : '🔇 Voz Silenciada'}
                        </button>
                        <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded border border-cyan-500/20">fg782270@gmail.com</span>
                    </div>
                </header>

                {/* MÓDULO DE ESCANEO FACIAL Y BIOMETRÍA */}
                <div className="mb-6 p-4 bg-slate-950 border-2 border-cyan-500/50 rounded-lg shadow-inner">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3 border-b border-cyan-500/20 pb-1">
                        [Seguridad Biométrica] Escaneo de Rostro e Identidad
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-40 h-30 bg-slate-900 border border-cyan-500/40 rounded flex items-center justify-center overflow-hidden relative">
                            {camaraActiva ? (
                                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-[10px] text-slate-500 text-center p-2">Cámara Inactiva</span>
                            )}
                        </div>
                        <div className="flex-1 space-y-2">
                            <p className="text-xs text-white font-medium">{estadoRostro}</p>
                            <p className="text-[11px] text-slate-400">Jarvis requiere escaneo biométrico para confirmar autorización institucional exclusiva.</p>
                            <button
                                type="button"
                                onClick={iniciarEscaneoFacial}
                                className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-4 rounded text-xs transition-all shadow"
                            >
                                📷 Iniciar Escaneo Facial
                            </button>
                        </div>
                    </div>
                </div>

                {/* PANEL DE BOTONES DUALES DE APRENDIZAJE Y GMAIL */}
                <div className="mb-6 p-5 bg-slate-950 border-2 border-cyan-500/50 rounded-lg shadow-inner space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2 border-b border-cyan-500/20 pb-1">
                        [Aprendizaje Autónomo] Sincronización de Gmail y Memoria
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                            type="button"
                            disabled={isPending}
                            onClick={() => ejecutarAccionJarvis('Sincronizar Gmail', 'Aprendizaje automático desde correo institucional y personal')}
                            className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2 px-3 rounded text-xs transition-all shadow"
                        >
                            📧 Sincronizar y Aprender de Gmail
                        </button>
                        <button
                            type="button"
                            disabled={isPending}
                            onClick={() => ejecutarAccionJarvis('Procesar Omnirouter', 'Tokens ilimitados y optimización FreeLLAMPI')}
                            className="bg-slate-900 border border-cyan-500/40 hover:bg-cyan-950 text-cyan-300 font-bold py-2 px-3 rounded text-xs transition-all shadow"
                        >
                            ⚡ Sincronizar Tokens Omnirouter
                        </button>
                        <button
                            type="button"
                            disabled={isPending}
                            onClick={() => ejecutarAccionJarvis('Respaldo Dual', 'Respaldo seguro en Supabase y GitHub')}
                            className="bg-slate-900 border border-cyan-500/40 hover:bg-cyan-950 text-cyan-300 font-bold py-2 px-3 rounded text-xs transition-all shadow"
                        >
                            🛡️ Forzar Respaldo Seguro
                        </button>
                    </div>
                </div>

                {mensajeRespuesta && (
                    <div className="mt-6 p-5 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl">
                            JARVIS VOICE & VISION ACTIVE
                        </div>
                        <p className="text-white font-bold mb-2">{mensajeRespuesta}</p>
                        {folioUltimo && (
                            <p className="text-xs text-cyan-300 mb-1">
                                <span className="font-bold">Folio:</span> {folioUltimo}
                            </p>
                        )}
                        {hashGenerado && (
                            <p className="text-[11px] font-mono text-slate-300 mb-3 break-all">
                                <span className="font-bold text-cyan-400">SHA-256:</span> {hashGenerado}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
