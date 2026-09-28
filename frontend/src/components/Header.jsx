import React from 'react';
import { 
  Zap, 
  Brain, 
  ShieldAlert, 
  Database, 
  Layers, 
  SlidersHorizontal, 
  CheckCircle2, 
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Eye
} from 'lucide-react';

export default function Header({ 
  activeIncident, 
  memoryMode, 
  setMemoryMode, 
  memoriesCount, 
  onOpenInspector, 
  onOpenComparison,
  isResolved
}) {
  return (
    <header className="sre-header">
      {/* Brand & System identity */}
      <div className="sre-brand-group">
        <div className="sre-logo-mark">
          <div className="sre-logo-glow" />
          <Brain className="sre-logo-icon" size={22} />
        </div>
        <div>
          <div className="sre-brand-title-row">
            <span className="sre-brand-name">RECALL</span>
            <span className="sre-brand-badge">HINDSIGHT MEMORY ENGINE</span>
            <span className="sre-layer-pill">LAYER 1 · SIMULATION</span>
          </div>
          <div className="sre-brand-subtitle">
            Autonomous Incident Memory & Experience-Backed Diagnosis
          </div>
        </div>
      </div>

      {/* Center status pill */}
      <div className="sre-header-center">
        <div className={`sre-incident-status-pill ${isResolved ? 'resolved' : 'active'}`}>
          <span className="sre-pulse-dot" />
          <span className="sre-status-text">
            {isResolved ? 'INCIDENT RESOLVED · SYSTEM RECOVERED' : `ACTIVE ALERT: ${activeIncident.id}`}
          </span>
          <span className="sre-status-sep">|</span>
          <span className="sre-status-service">{activeIncident.service}</span>
        </div>
      </div>

      {/* Right controls: Memory Bank, Toggle Mode, Inspector */}
      <div className="sre-header-actions">
        {/* Memory Inspector Button */}
        <button 
          id="btn-open-memory-inspector"
          className="sre-action-btn inspector-btn"
          onClick={onOpenInspector}
          title="Open Hindsight Memory Bank Inspector"
        >
          <Database size={15} className="text-emerald-600" />
          <span>Memory Bank</span>
          <span className="sre-memory-count-badge">{memoriesCount}</span>
        </button>

        {/* Memory ON vs CONTROL toggle */}
        <div className="sre-toggle-wrapper" title="Switch between Hindsight Organizational Memory and Generic LLM Control">
          <button 
            id="toggle-memory-mode"
            className={`sre-mode-toggle-btn ${memoryMode === 'with-memory' ? 'active-memory' : 'active-control'}`}
            onClick={() => setMemoryMode(prev => prev === 'with-memory' ? 'control' : 'with-memory')}
          >
            {memoryMode === 'with-memory' ? (
              <>
                <ToggleRight size={18} className="text-emerald-600" />
                <span className="sre-toggle-label">
                  <span className="font-semibold text-emerald-800">MEMORY ON</span>
                  <span className="sre-toggle-sub">Hindsight</span>
                </span>
              </>
            ) : (
              <>
                <ToggleLeft size={18} className="text-amber-600" />
                <span className="sre-toggle-label">
                  <span className="font-semibold text-amber-800">CONTROL</span>
                  <span className="sre-toggle-sub">No Memory</span>
                </span>
              </>
            )}
          </button>
        </div>

        {/* Comparison Modal Button */}
        <button 
          id="btn-compare-modes"
          className="sre-action-btn compare-btn"
          onClick={onOpenComparison}
          title="Compare With-Memory vs Without-Memory side by side"
        >
          <Layers size={15} />
          <span>Proof Comparison</span>
        </button>
      </div>
    </header>
  );
}
