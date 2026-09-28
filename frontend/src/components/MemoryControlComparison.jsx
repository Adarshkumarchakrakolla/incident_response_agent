import React from 'react';
import { 
  Layers, 
  X, 
  Brain, 
  Bot, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  ShieldAlert, 
  Sparkles,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

export default function MemoryControlComparison({ 
  isOpen, 
  onClose, 
  incident,
  memoryMode,
  setMemoryMode
}) {
  if (!isOpen) return null;

  const { withoutMemory, withMemory } = incident.controlComparison;

  return (
    <div className="sre-modal-overlay animate-fade-in" onClick={onClose}>
      <div className="sre-modal-dialog comparison-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="sre-modal-header">
          <div className="flex-align gap-3">
            <div className="sre-modal-icon-wrap indigo">
              <Layers size={20} />
            </div>
            <div>
              <div className="flex-align gap-2">
                <span className="sre-section-num">SECTION 15</span>
                <span className="sre-proof-badge">THE CORE VALUE PROOF</span>
              </div>
              <h2 className="sre-modal-title">Memory ON vs CONTROL Comparison</h2>
              <p className="sre-modal-sub">
                Proving the difference between "AI generated an answer" and "AI used organizational memory"
              </p>
            </div>
          </div>

          <button className="sre-modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="comparison-grid">
          {/* ── LEFT: WITHOUT MEMORY (GENERIC AI) ── */}
          <div className="comparison-column control-col">
            <div className="column-top-header control-header">
              <div className="flex-align gap-2">
                <Bot size={20} className="text-amber-400" />
                <div>
                  <span className="col-type-tag">CONTROL VIEW</span>
                  <h3 className="col-main-title">WITHOUT MEMORY</h3>
                </div>
              </div>
              <span className="col-sub-pill text-amber-300">Generic LLM Guesswork</span>
            </div>

            <div className="comparison-cards-stack">
              {/* Hypothesis */}
              <div className="comp-card">
                <span className="comp-card-label">Hypothesis</span>
                <p className="comp-card-text">
                  {withoutMemory.hypothesis}
                </p>
              </div>

              {/* Recommendation */}
              <div className="comp-card danger-outline">
                <span className="comp-card-label text-red-400">Generated Recommendation</span>
                <p className="comp-card-text font-mono text-sm text-red-300">
                  {withoutMemory.recommendation}
                </p>
              </div>

              {/* Catastrophic Hazard Alert */}
              <div className="comp-card catastrophe-box">
                <div className="flex-align gap-2 text-red-400 font-bold mb-1">
                  <Flame size={16} />
                  <span>DANGEROUS CONSEQUENCE</span>
                </div>
                <p className="comp-card-text text-red-200">
                  {withoutMemory.failureRisk}
                </p>
              </div>

              {/* Historical Evidence */}
              <div className="comp-card">
                <span className="comp-card-label">Historical Evidence</span>
                <p className="comp-card-text text-slate-400 italic">
                  {withoutMemory.evidence}
                </p>
              </div>

              {/* Known-Bad Fixes */}
              <div className="comp-card">
                <span className="comp-card-label">Known-Bad Fixes Flagged</span>
                <p className="comp-card-text text-slate-400">
                  {withoutMemory.whatFailedKnown}
                </p>
              </div>

              {/* Confidence */}
              <div className="comp-card">
                <span className="comp-card-label">Confidence Assessment</span>
                <div className="flex-align gap-2">
                  <span className="comp-badge-amber">{withoutMemory.confidence}</span>
                </div>
              </div>
            </div>

            <div className="col-verdict-box control-verdict">
              <span className="verdict-title">⚠️ SRE VERDICT:</span>
              <span>Generic AI advises rebooting pods, causing a catastrophic 42-minute cascade outage.</span>
            </div>
          </div>

          {/* ── RIGHT: WITH MEMORY (HINDSIGHT RECALL) ── */}
          <div className="comparison-column memory-col">
            <div className="column-top-header memory-header">
              <div className="flex-align gap-2">
                <Brain size={20} className="text-emerald-400" />
                <div>
                  <span className="col-type-tag text-emerald-300">RECOMMENDED PRODUCTION SRE</span>
                  <h3 className="col-main-title text-emerald-200">WITH HINDSIGHT MEMORY</h3>
                </div>
              </div>
              <span className="col-sub-pill text-emerald-300">Organizational Memory Active</span>
            </div>

            <div className="comparison-cards-stack">
              {/* Hypothesis */}
              <div className="comp-card">
                <span className="comp-card-label">Evidence-Backed Root Cause</span>
                <p className="comp-card-text">
                  {withMemory.hypothesis}
                </p>
              </div>

              {/* Recommendation */}
              <div className="comp-card success-outline">
                <span className="comp-card-label text-emerald-400">Proven Historical Fix</span>
                <p className="comp-card-text font-mono text-sm text-emerald-300">
                  {withMemory.recommendation}
                </p>
              </div>

              {/* Proactive Safeguard */}
              <div className="comp-card safeguard-box">
                <div className="flex-align gap-2 text-emerald-400 font-bold mb-1">
                  <ShieldAlert size={16} />
                  <span>PROACTIVE FAILURE SAFEGUARD</span>
                </div>
                <p className="comp-card-text text-emerald-200">
                  <strong>Explicitly forbids:</strong> "kubectl rollout restart". Identifies that restarting pods triggered the 42-minute disaster in INC-8422.
                </p>
              </div>

              {/* Historical Evidence */}
              <div className="comp-card">
                <span className="comp-card-label">Historical Evidence & Citations</span>
                <p className="comp-card-text text-slate-300">
                  {withMemory.evidence}
                </p>
              </div>

              {/* Known-Bad Fixes */}
              <div className="comp-card">
                <span className="comp-card-label">Known-Bad Fixes Flagged</span>
                <p className="comp-card-text text-red-300">
                  {withMemory.whatFailedKnown}
                </p>
              </div>

              {/* Confidence */}
              <div className="comp-card">
                <span className="comp-card-label">Confidence Assessment</span>
                <div className="flex-align gap-2">
                  <span className="comp-badge-emerald">{withMemory.confidence}</span>
                </div>
              </div>
            </div>

            <div className="col-verdict-box memory-verdict">
              <span className="verdict-title text-emerald-300">✅ SRE VERDICT:</span>
              <span className="text-emerald-200">Hindsight preserves institutional lessons, intercepts dangerous advice, and recovers in 2.1 minutes.</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sre-modal-footer">
          <div className="modal-footer-left">
            <span>Currently Active Workspace Mode: <strong>{memoryMode === 'with-memory' ? 'Memory ON (Hindsight)' : 'CONTROL (Generic AI)'}</strong></span>
          </div>
          <div className="modal-footer-right">
            <button 
              className="sre-btn-primary"
              onClick={() => {
                setMemoryMode(prev => prev === 'with-memory' ? 'control' : 'with-memory');
              }}
            >
              <span>Toggle Mode: Switch to {memoryMode === 'with-memory' ? 'CONTROL' : 'MEMORY ON'}</span>
            </button>
            <button className="sre-btn-secondary" onClick={onClose}>
              Close Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
