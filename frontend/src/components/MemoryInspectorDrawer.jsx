import React from 'react';
import { X, Database, CheckCircle2, AlertOctagon } from 'lucide-react';
import { PAST_INCIDENTS_INSPECTOR } from '../data/mockData';

export default function MemoryInspectorDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="drawer-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-align gap-2">
            <Database size={18} className="text-emerald-700" />
            <div>
              <span className="modal-tag">GROUNDED MEMORY</span>
              <h2 className="modal-title">Past Incidents Influencing RECALL</h2>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          <p className="drawer-intro">
            These historical incidents directly grounded RECALL's recommendation and allowed it to avoid known failed fixes:
          </p>

          <div className="drawer-list">
            {PAST_INCIDENTS_INSPECTOR.map((inc) => (
              <div key={inc.id} className={`drawer-item ${inc.type}`}>
                <div className="drawer-item-top">
                  <span className="drawer-item-id">{inc.id}</span>
                  <span className={`drawer-item-role ${inc.type}`}>
                    {inc.type === 'success' ? <CheckCircle2 size={12} /> : <AlertOctagon size={12} />}
                    <span>{inc.role}</span>
                  </span>
                </div>
                <h4 className="drawer-item-title">{inc.title}</h4>
                <p className="drawer-item-desc">{inc.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="drawer-footer">
          <span>Proves that answers are grounded in organizational memory.</span>
        </div>
      </div>
    </div>
  );
}
