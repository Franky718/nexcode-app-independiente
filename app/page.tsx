"use client";
import React, { useState, useTransition } from "react";
import { executeMasterAction } from "./actions/master-actions";

export default function MasterTemplatePage() {
  const [subsidiary, setSubsidiary] = useState("Nexcode Interactive S.A. de C.V.");
  const [moduleName, setModuleName] = useState("Core-Module-Governance");
  const [provider, setProvider] = useState("google");
  const [inputData, setInputData] = useState("");
  const [auditResult, setAuditResult] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputData.trim()) return;

    startTransition(async () => {
      try {
        const res = await executeMasterAction(moduleName, provider, inputData, subsidiary);
        if (res.success) {
          setAuditResult(res.data);
        }
      } catch (error) {
        console.error("Error en la ejecución:", error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-3 font-sans flex flex-col items-center">
      <div className="w-full max-w-xl mx-auto space-y-2.5 mt-1">
        <header className="flex justify-between items-center border border-slate-800 bg-slate-900 px-3 py-1.5 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-cyan-600 rounded flex items-center justify-center font-bold text-xs text-white shadow">NX</div>
            <div>
              <h1 className="text-xs font-bold text-white tracking-wide">Nexcode Master Core</h1>
              <p className="text-[9px] text-cyan-400 font-mono">Supabase & Cloud Gateway Enabled</p>
            </div>
          </div>
          <span className="text-[9px] text-emerald-400 font-mono">fg782270@gmail.com</span>
        </header>

        <main className="bg-slate-900 border border-slate-800 rounded-lg p-3 shadow-xl space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h2 className="text-[11px] font-semibold text-cyan-400 uppercase font-mono tracking-wider">
              Panel de Gobernanza y Persistencia Supabase
            </h2>
            <span className="text-[9px] px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-300 rounded font-mono">
              Live DB Sync
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div>
              <label className="block text-[9px] text-slate-400 font-mono mb-0.5">Subsidiaria del Holding:</label>
              <select value={subsidiary} onChange={(e) => setSubsidiary(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500">
                <option value="Nexcode Interactive S.A. de C.V.">Nexcode Interactive S.A. de C.V.</option>
                <option value="Macaly Cloud Enterprise">Macaly Cloud Enterprise</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] text-slate-400 font-mono mb-0.5">Módulo de Operación:</label>
                <input type="text" value={moduleName} onChange={(e) => setModuleName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500" required />
              </div>
              <div>
                <label className="block text-[9px] text-slate-400 font-mono mb-0.5">Motor de IA:</label>
                <select value={provider} onChange={(e) => setProvider(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500">
                  <option value="google">Google Gemini</option>
                  <option value="openai">OpenAI GPT-4</option>
                  <option value="anthropic">Anthropic Claude</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[9px] text-slate-400 font-mono mb-0.5">Instrucción o Parámetro Institucional:</label>
              <textarea value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder="Escribe la consulta para sincronización y auditoría..." className="w-full h-16 bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 resize-none" required />
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={isPending} className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold rounded text-xs shadow transition">
                {isPending ? "Sincronizando y Sellando..." : "Ejecutar, Sellar y Guardar en Supabase"}
              </button>
            </div>
          </form>

          {auditResult && (
            <div className="space-y-1.5 border-t border-slate-800 pt-2.5 text-[11px] animate-fadeIn">
              <div className="p-2 bg-slate-950 border border-emerald-900/50 rounded text-emerald-300">
                <strong className="text-slate-400 uppercase text-[9px] block">Respuesta de {auditResult.subsidiary}:</strong> {auditResult.ai_response}
              </div>
              <div className="p-2 bg-slate-950 border border-cyan-900/60 rounded font-mono text-[9px] text-cyan-300 break-all">
                <strong className="text-slate-400 uppercase text-[8px] block">Hash SHA-256 Inmutable (DB Synced):</strong> {auditResult.blockchain_hash}
                <span className="block text-slate-500 mt-1 text-[8px]">Supervisor Autorizado: {auditResult.supervised_by} | Sincronizado a Cloud</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}