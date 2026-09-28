import React, { useState } from 'react';
import { Terminal, Filter, Search, Copy, Check, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function IncidentLogsCard({ logs, incidentId }) {
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const filteredLogs = logs.filter(log => {
    const matchesLevel = filterLevel === 'ALL' || log.level === filterLevel;
    const matchesSearch = searchQuery === '' || 
      log.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const handleCopy = (text, idx) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  return (
    <div className="sre-panel logs-panel">
      {/* Panel Header */}
      <div className="sre-panel-header">
        <div className="sre-panel-title-wrap">
          <div className="sre-panel-icon amber">
            <Terminal size={15} />
          </div>
          <div>
            <span className="sre-section-num">SECTION 2</span>
            <h2 className="sre-panel-title">Incident Evidence & Logs</h2>
          </div>
        </div>
        <div className="flex-align gap-2">
          <div className="sre-log-live-badge">
            <span className="sre-log-live-dot" />
            <span>LIVE</span>
          </div>
          <button 
            className="sre-collapse-toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Collapse logs" : "Expand logs"}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Filter / Search Bar */}
          <div className="sre-logs-toolbar">
            <div className="sre-logs-search">
              <Search size={13} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Filter logs (PSQLException, 504)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sre-logs-input"
              />
            </div>
            <div className="sre-logs-filters">
              {['ALL', 'ERROR', 'WARN'].map((lvl) => (
                <button
                  key={lvl}
                  className={`sre-log-filter-btn ${filterLevel === lvl ? 'active' : ''}`}
                  onClick={() => setFilterLevel(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Log Console */}
          <div className="sre-terminal-container">
            <div className="sre-terminal-bar">
              <div className="sre-terminal-dots">
                <span className="term-dot red" />
                <span className="term-dot yellow" />
                <span className="term-dot green" />
              </div>
              <span className="sre-terminal-title">{incidentId} · container stream</span>
              <span className="sre-terminal-count">{filteredLogs.length} events</span>
            </div>

            <div className="sre-terminal-body">
              {filteredLogs.map((log, idx) => {
                const isHighlight = log.text.includes('PSQLException') || log.text.includes('max_client_conn');
                return (
                  <div 
                    key={idx} 
                    className={`sre-log-line ${log.level.toLowerCase()} ${isHighlight ? 'log-highlight' : ''}`}
                  >
                    <span className="sre-log-time">{log.time}</span>
                    <span className={`sre-log-level ${log.level.toLowerCase()}`}>{log.level}</span>
                    <span className="sre-log-source">[{log.source}]</span>
                    <span className="sre-log-msg">{log.text}</span>
                    
                    <button 
                      className="sre-log-copy-btn"
                      onClick={() => handleCopy(log.text, idx)}
                      title="Copy log line"
                    >
                      {copiedIndex === idx ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SRE Key Insight */}
          <div className="sre-logs-insight-footer">
            <AlertCircle size={14} className="text-amber-600 shrink-0" />
            <span className="sre-logs-insight-text">
              <strong>Key Symptom:</strong> <code className="sre-code-inline">max_client_conn (100)</code> on proxy port 6432 directly precedes downstream 504 timeouts.
            </span>
          </div>
        </>
      )}
    </div>
  );
}
