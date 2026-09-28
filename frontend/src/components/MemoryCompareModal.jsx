import React from 'react';
import { X, Brain, Bot, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import { COMPARISON_DATA } from '../data/mockData';

export default function MemoryCompareModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { withoutMemory, withRecall } = COMPARISON_DATA;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card compare-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className="modal-tag">BENCHMARK COMPARISON</span>
            <h2 className="modal-title">Does memory actually help?</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={18} />
          </button>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="compare-grid">
          {/* WITHOUT MEMORY */}
          <div className="compare-col without-memory">
            <div className="compare-col-header">
              <Bot size={18} className="text-amber-600" />
              <div>
                <h3 className="col-title">WITHOUT MEMORY</h3>
              </div>
            </div>

            <div className="compare-fields">
              <div className="compare-field">
                <span className="field-label">Likely cause:</span>
                <p className="field-value italic text-dim">"Could be Redis, network, or configuration."</p>
              </div>

              <div className="compare-field">
                <span className="field-label">Recommendation:</span>
                <p className="field-value">"Check service configuration."</p>
              </div>

              <div className="compare-field">
                <span className="field-label">Evidence:</span>
                <p className="field-value text-dim">None</p>
              </div>
            </div>
          </div>

          {/* WITH RECALL */}
          <div className="compare-col with-recall">
            <div className="compare-col-header">
              <Brain size={18} className="text-emerald-700" />
              <div>
                <h3 className="col-title text-emerald-900">WITH RECALL</h3>
              </div>
            </div>

            <div className="compare-fields">
              <div className="compare-field">
                <span className="field-label">Likely cause:</span>
                <p className="field-value font-bold text-emerald-950">"Expired Redis credential."</p>
              </div>

              <div className="compare-field success-highlight">
                <span className="field-label text-emerald-800">Recommendation:</span>
                <p className="field-value font-bold text-emerald-900">"Check Redis credential first."</p>
              </div>

              <div className="compare-field">
                <span className="field-label">Evidence:</span>
                <p className="field-value font-mono font-bold text-emerald-800">
                  INC-1842<br />INC-1911
                </p>
              </div>

              <div className="compare-field safeguard-highlight">
                <span className="field-label text-amber-900">Known failed fix:</span>
                <p className="field-value font-bold text-amber-900">Restart API</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Takeaway */}
        <div className="compare-footer-note">
          <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
          <span>
            Memory gives the agent specific experience instead of a generic answer.
          </span>
        </div>
      </div>
    </div>
  );
}
