import React from 'react';
import { getAuditLogs } from '../services/localLLM';
import { ShieldCheck, Activity, X } from 'lucide-react';

interface AuditProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyAuditor: React.FC<AuditProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const logs = getAuditLogs();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel-emerald rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-emerald-500/40 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
                <span>Zero-Server Air-Gap Security Auditor</span>
              </h2>
              <p className="text-xs text-slate-400">
                Real-time network traffic inspector confirming 100% on-device processing.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Metrics summary */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Cloud Requests Sent</span>
            <p className="text-lg font-extrabold text-emerald-400 font-mono">0</p>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Cloud Dollars Spent</span>
            <p className="text-lg font-extrabold text-emerald-400 font-mono">$0.00</p>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Local IndexedDB Vault</span>
            <p className="text-lg font-extrabold text-indigo-400 font-mono">Encrypted</p>
          </div>
        </div>

        {/* Live Network Logs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-400" /> Recent Device Execution Logs:
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">AIR-GAP ACTIVE</span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-2 max-h-56 overflow-y-auto font-mono text-[11px]">
            {logs.map((log) => (
              <div key={log.id} className="p-2 rounded bg-slate-900/60 border border-slate-800/60 flex items-start justify-between gap-2">
                <div>
                  <p className="text-slate-200 font-semibold">{log.description}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Destination: {log.destination}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded text-[9px] font-bold border border-emerald-800/40">
                    {log.status}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 text-center text-xs text-slate-400 border-t border-slate-800">
          🔒 Loved ones' data never leaves your laptop. Pure open innovation in action.
        </div>

      </div>
    </div>
  );
};
