import React, { useState } from 'react';
import { 
  Database, 
  X, 
  Search, 
  Tag, 
  User, 
  Calendar, 
  GitBranch, 
  CheckCircle2, 
  Flame, 
  AlertOctagon, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function MemoryInspectorModal({ 
  isOpen, 
  onClose, 
  memories, 
  activeIncident 
}) {
  const [search, setSearch] = useState('');
  const [selectedMemory, setSelectedMemory] = useState(memories[0]?.id || 'MEM-8422');

  if (!isOpen) return null;

  const filteredMemories = memories.filter(m => 
    m.id.toLowerCase().includes(search.toLowerCase()) ||
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
    m.service.toLowerCase().includes(search.toLowerCase())
  );

  const currentMem = memories.find(m => m.id === selectedMemory) || memories[0];

  return (
    <div className="sre-modal-overlay animate-fade-in" onClick={onClose}>
      <div className="sre-modal-dialog inspector-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="sre-modal-header">
          <div className="flex-align gap-3">
            <div className="sre-modal-icon-wrap emerald">
              <Database size={20} />
            </div>
            <div>
              <div className="flex-align gap-2">
                <span className="sre-section-num">SECTION 14</span>
                <span className="sre-verified-tag">VECTOR MEMORY BANK</span>
              </div>
              <h2 className="sre-modal-title">Hindsight Memory Inspector</h2>
              <p className="sre-modal-sub">
                Inspecting organizational memory nodes, vector distances, and historical post-mortem lineage
              </p>
            </div>
          </div>

          <button className="sre-modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Layout: Sidebar of memory nodes + Deep inspection viewer */}
        <div className="inspector-content-grid">
          {/* Left: Memory Nodes List */}
          <div className="inspector-sidebar">
            <div className="inspector-search-box">
              <Search size={13} className="text-slate-500" />
              <input 
                type="text"
                placeholder="Search memories or tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="inspector-search-input"
              />
            </div>

            <div className="inspector-memories-list">
              <div className="inspector-bank-meta">
                <span>Bank: <code>org-infra-incidents-prod</code></span>
                <span>{memories.length} Nodes</span>
              </div>

              {filteredMemories.map(mem => {
                const isSelected = mem.id === selectedMemory;
                const isNew = mem.id === 'MEM-2026-992';

                return (
                  <div 
                    key={mem.id}
                    className={`inspector-mem-card ${isSelected ? 'selected' : ''} ${isNew ? 'is-new' : ''}`}
                    onClick={() => setSelectedMemory(mem.id)}
                  >
                    <div className="mem-card-top">
                      <div className="flex-align gap-2">
                        <span className="mem-id-pill">{mem.id}</span>
                        {isNew && (
                          <span className="mem-new-tag">
                            <Sparkles size={10} />
                            <span>ADDED THIS SESSION</span>
                          </span>
                        )}
                      </div>
                      <span className="mem-sim-val">{(mem.similarity * 100).toFixed(1)}% match</span>
                    </div>

                    <h4 className="mem-card-title">{mem.title}</h4>

                    <div className="mem-card-foot">
                      <span className="mem-service-tag">{mem.service}</span>
                      <span className="mem-date-tag">{mem.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Deep Inspector Detail */}
          <div className="inspector-detail-panel">
            {currentMem ? (
              <div className="inspector-detail-body">
                {/* Node Header */}
                <div className="node-detail-header">
                  <div>
                    <div className="flex-align gap-2 mb-1">
                      <span className="node-id-large">{currentMem.id}</span>
                      <span className="sre-verified-tag">{currentMem.status}</span>
                      <span className="sre-sim-large">Similarity: {(currentMem.similarity * 100).toFixed(1)}%</span>
                    </div>
                    <h3 className="node-title-large">{currentMem.title}</h3>
                  </div>
                </div>

                <div className="node-meta-bar">
                  <div className="node-meta-item">
                    <User size={13} className="text-slate-400" />
                    <span>Author: <strong>{currentMem.author}</strong></span>
                  </div>
                  <div className="node-meta-item">
                    <Calendar size={13} className="text-slate-400" />
                    <span>Recorded: <strong>{currentMem.date}</strong></span>
                  </div>
                  <div className="node-meta-item">
                    <GitBranch size={13} className="text-slate-400" />
                    <span>Incident Ref: <strong>{currentMem.incidentRef}</strong></span>
                  </div>
                  <div className="node-meta-item">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    <span>Efficacy: <strong>{currentMem.resolutionEfficacy}</strong></span>
                  </div>
                </div>

                {/* Symptom Fingerprint */}
                <div className="inspector-section">
                  <span className="inspector-section-label">Vectorized Symptom Fingerprint</span>
                  <div className="inspector-code-box">
                    <code>{currentMem.symptomFingerprint}</code>
                  </div>
                </div>

                {/* Root Cause */}
                <div className="inspector-section">
                  <span className="inspector-section-label">Historical Root Cause</span>
                  <p className="inspector-text">{currentMem.rootCause}</p>
                </div>

                {/* What Worked & What Failed Grid */}
                <div className="inspector-grid-split">
                  <div className="inspector-box worked">
                    <div className="flex-align gap-2 text-emerald-400 font-bold mb-1">
                      <CheckCircle2 size={16} />
                      <span>HISTORICAL RESOLUTION</span>
                    </div>
                    <p className="inspector-text">{currentMem.whatWorked}</p>
                  </div>

                  <div className="inspector-box failed">
                    <div className="flex-align gap-2 text-red-400 font-bold mb-1">
                      <Flame size={16} />
                      <span>DOCUMENTED CATASTROPHIC FAILURE</span>
                    </div>
                    <p className="inspector-text">{currentMem.whatFailed}</p>
                  </div>
                </div>

                {/* Strict Guardrail */}
                <div className="inspector-box guardrail">
                  <div className="flex-align gap-2 text-amber-300 font-bold mb-1">
                    <AlertOctagon size={16} />
                    <span>OPERATIONAL GUARDRAIL (DO NOT TRY)</span>
                  </div>
                  <p className="inspector-text font-semibold text-amber-200">{currentMem.doNotTry}</p>
                </div>

                {/* Tags */}
                <div className="inspector-tags-row">
                  <Tag size={13} className="text-slate-400" />
                  <span className="text-xs text-slate-400">Indexed Tags:</span>
                  {currentMem.tags.map(tag => (
                    <span key={tag} className="sre-tag-pill">#{tag}</span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="empty-inspector">Select a memory node to inspect</div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sre-modal-footer">
          <div className="modal-footer-left">
            <span>Query Target: <strong>{activeIncident.id} ({activeIncident.service})</strong></span>
          </div>
          <button className="sre-btn-secondary" onClick={onClose}>
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
