import React, { useState } from 'react';
import { 
  Brain, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Database,
  Sparkles,
  Zap,
  Play,
  Layers,
  AlertOctagon,
  ShieldAlert,
  Info
} from 'lucide-react';
import { INCIDENTS_DATA } from './data/mockData';
import RecallChat from './components/RecallChat';
import MemoryCompareModal from './components/MemoryCompareModal';
import MemoryInspectorDrawer from './components/MemoryInspectorDrawer';
import './index.css';

export default function App() {
  const [incidentKey, setIncidentKey] = useState('incident1'); // 'incident1' | 'incident2'
  const [isQueried, setIsQueried] = useState(false);
  const [isFixStarted, setIsFixStarted] = useState(false);
  const [feedbackState, setFeedbackState] = useState(null); // null | 'worked' | 'failed' | 'wrong_cause'
  const [wrongCauseChoice, setWrongCauseChoice] = useState('Configuration mismatch');
  const [showBadFixDetail, setShowBadFixDetail] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  const incident = INCIDENTS_DATA[incidentKey];
  const { hindsight } = incident;
  const isSecondIncident = incidentKey === 'incident2';

  // Demo Actions
  const handleAskRecall = () => {
    setIsQueried(true);
  };

  const handleStartFix = () => {
    setIsFixStarted(true);
  };

  const handleFeedback = (type) => {
    setFeedbackState(type);
  };

  const handleTrySimilarIncident = () => {
    setIncidentKey('incident2');
    setIsQueried(true); // Automatically recognizes it!
    setIsFixStarted(false);
    setFeedbackState(null);
    setShowBadFixDetail(false);
  };

  const handleReset = () => {
    setIncidentKey('incident1');
    setIsQueried(false);
    setIsFixStarted(false);
    setFeedbackState(null);
    setShowBadFixDetail(false);
    setIsCompareOpen(false);
    setIsInspectorOpen(false);
  };

  return (
    <div className="recall-app">
      {/* ── TOP HEADER ────────────────────────────────────────────────────── */}
      <header className="recall-header">
        <div className="header-brand-group">
          <div className="header-logo-badge">
            <Brain size={22} className="text-emerald-700" />
          </div>
          <div>
            <div className="header-title-row">
              <span className="header-title">RECALL</span>
              <span className="header-badge">HINDSIGHT MEMORY AGENT</span>
            </div>
            <p className="header-subtitle">
              Don't debug from zero. RECALL remembers what happened, what worked, what failed, and what the team learned.
            </p>
          </div>
        </div>

        <div className="header-actions">
          {/* Memory ON + Compare Button */}
          <div className="memory-toggle-pill">
            <span className="memory-status-dot" />
            <span className="memory-label">Memory: <strong>ON</strong></span>
            <button 
              id="btn-compare-memory"
              className="compare-btn"
              onClick={() => setIsCompareOpen(true)}
              title="Compare With Memory vs Without Memory"
            >
              <Layers size={13} />
              <span>Compare</span>
            </button>
          </div>

          {/* Past Incidents Drawer Trigger */}
          <button 
            id="btn-view-past-incidents"
            className="header-action-btn"
            onClick={() => setIsInspectorOpen(true)}
            title="View Grounded Past Incidents"
          >
            <Database size={14} className="text-emerald-700" />
            <span>View Past Incidents</span>
          </button>

          {/* Reset Demo */}
          <button 
            id="btn-reset-demo"
            className="reset-btn"
            onClick={handleReset}
            title="Reset to beginning"
          >
            <RotateCcw size={13} />
            <span>Reset Demo</span>
          </button>
        </div>
      </header>

      {/* ── MAIN 3-COLUMN LAYOUT ─────────────────────────────────────────── */}
      <div className="recall-workspace-grid">
        {/* ── LEFT COLUMN: SECTION 1 (Current Incident) ── */}
        <div className="column-left">
          <div className="column-label-row">
            <span className="column-section-tag">SECTION 1</span>
            <span className="column-header-title">Active Incident</span>
          </div>

          <div className="card incident-card">
            <div className="incident-card-header">
              <span className="tag-pill">{incident.tag}</span>
              {feedbackState === 'worked' && (
                <span className="status-pill resolved">✓ Resolved</span>
              )}
            </div>

            <div className="incident-text-group">
              <h2 className="incident-title">
                {feedbackState === 'worked' ? '🟢 ' : '🔴 '}{incident.title}
              </h2>
              <p className="incident-sub">{incident.subtitle}</p>
              <span className="incident-impact">{incident.impact}</span>
            </div>

            {/* Small Log Box */}
            <div className="log-box">
              {incident.logs.map((log, i) => (
                <div key={i} className="log-line">
                  <span>{log}</span>
                </div>
              ))}
            </div>

            {/* Primary Action Button */}
            {!isQueried ? (
              <button 
                id="btn-ask-recall"
                className="ask-recall-btn"
                onClick={handleAskRecall}
              >
                <Brain size={18} />
                <span>🧠 ASK RECALL</span>
              </button>
            ) : (
              <div className="recall-engaged-banner">
                <CheckCircle2 size={16} />
                <span>
                  {isSecondIncident 
                    ? "RECALL recognized the pattern from your last incident!" 
                    : "RECALL matched 2 past incidents in memory"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── CENTER COLUMN: SECTIONS 2, 3, 4, 5, 6 (Hindsight & Recommendations) ── */}
        <div className="column-center">
          <div className="column-label-row">
            <span className="column-section-tag">SECTIONS 2–6</span>
            <span className="column-header-title">Hindsight & Recommendation</span>
          </div>

          {!isQueried ? (
            /* Standby State */
            <div className="card empty-hindsight-card">
              <div className="empty-hindsight-icon">
                <Brain size={32} />
              </div>
              <h3 className="empty-hindsight-title">🧠 Hindsight</h3>
              <p className="empty-hindsight-text">
                "Ask RECALL what happened last time."
              </p>
            </div>
          ) : (
            /* Active Hindsight & Recommendation Stack */
            <div className="center-stack">
              {/* SECTION 10: I'VE SEEN THIS BEFORE (Shown when continuous learning is triggered) */}
              {isSecondIncident && (
                <div className="card seen-before-card">
                  <div className="seen-before-header">
                    <Brain size={18} className="text-emerald-700" />
                    <span className="seen-before-title">🧠 I'VE SEEN THIS BEFORE</span>
                  </div>
                  <p className="seen-before-text">"This looks like the incident you just resolved."</p>
                </div>
              )}

              {/* SECTION 2 & 3: HINDSIGHT MEMORY */}
              <div className="card hindsight-card">
                <div className="card-top-row">
                  <div className="flex-align gap-2">
                    <Brain size={18} className="text-emerald-700" />
                    <span className="hindsight-main-title">🧠 Hindsight</span>
                  </div>
                  <span className="similarity-badge">{hindsight.similarity}</span>
                </div>

                {/* Past Incident Found Banner */}
                <div className="past-incident-banner">
                  <div>
                    <span className="past-sub">PAST INCIDENT FOUND</span>
                    <h3 className="past-id">{hindsight.pastIncidentId}</h3>
                    <span className="past-service">{hindsight.pastService}</span>
                  </div>
                </div>

                {/* Why This Looks Similar */}
                <div className="why-similar-box">
                  <span className="field-label-sm">WHY THIS LOOKS SIMILAR</span>
                  <div className="similar-reasons-list">
                    {hindsight.whySimilar.map((reason, i) => (
                      <span key={i} className="similar-reason-item">✓ {reason}</span>
                    ))}
                  </div>
                </div>

                {/* SECTION 3: WHAT HAPPENED BEFORE */}
                <div className="cause-box">
                  <span className="field-label-sm">Likely cause</span>
                  <p className="cause-text">{hindsight.likelyCause}</p>
                </div>

                <div className="worked-failed-grid">
                  {/* WORKED BEFORE */}
                  <div className="worked-col">
                    <span className="worked-heading">
                      <CheckCircle2 size={13} />
                      <span>✓ WORKED BEFORE</span>
                    </span>
                    <ul className="clean-list green">
                      {hindsight.workedBefore.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* FAILED BEFORE */}
                  <div className="failed-col">
                    <span className="failed-heading">
                      <XCircle size={13} />
                      <span>✕ FAILED BEFORE</span>
                    </span>
                    <ul className="clean-list red">
                      {hindsight.failedBefore.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 4: KNOWN-BAD FIX */}
              <div className="card bad-fix-card">
                <div className="bad-fix-header">
                  <div className="flex-align gap-2">
                    <AlertOctagon size={16} className="text-amber-700" />
                    <span className="bad-fix-tag">🚫 DON'T TRY THIS FIRST</span>
                  </div>
                </div>

                <div className="bad-fix-content">
                  <div className="bad-fix-main">
                    <strong className="bad-fix-action">{hindsight.dontTryFirst.action}</strong>
                    <span className="bad-fix-reason">Why? "{hindsight.dontTryFirst.reason}"</span>
                  </div>

                  <button 
                    className="why-toggle-btn"
                    onClick={() => setShowBadFixDetail(!showBadFixDetail)}
                  >
                    <span>{showBadFixDetail ? 'Hide detail ▲' : 'Why? ▼'}</span>
                  </button>
                </div>

                {showBadFixDetail && (
                  <div className="bad-fix-expanded">
                    <span>{hindsight.dontTryFirst.detail}</span>
                  </div>
                )}
              </div>

              {/* SECTION 5: OUTDATED MEMORY (Shown conditionally) */}
              {hindsight.outdatedWarning && (
                <div className="card outdated-card">
                  <div className="outdated-header">
                    <AlertTriangle size={15} className="text-amber-800" />
                    <span className="outdated-title">⚠ {hindsight.outdatedWarning.title}</span>
                  </div>
                  <p className="outdated-text">"{hindsight.outdatedWarning.text}"</p>
                  <span className="outdated-advice">{hindsight.outdatedWarning.advice}</span>
                </div>
              )}

              {/* SECTION 6: RECOMMENDATION */}
              <div className="card recommendation-card">
                <div className="rec-header">
                  <div className="flex-align gap-2">
                    <Sparkles size={16} className="text-emerald-700" />
                    <span className="rec-title">🎯 TRY THIS FIRST</span>
                  </div>
                  <span className="confidence-pill">Confidence: <strong>{hindsight.recommendation.confidence}</strong></span>
                </div>

                <div className="rec-action-row">
                  <h3 className="rec-action-text">{hindsight.recommendation.action}</h3>
                </div>

                <p className="rec-why-text">
                  Why? "{hindsight.recommendation.why}"
                </p>

                <div className="rec-footer-row">
                  <span className="rec-based-on">
                    Based on: <strong>{hindsight.recommendation.basedOn.join(', ')}</strong>
                  </span>

                  {!isFixStarted ? (
                    <button 
                      id="btn-start-fix"
                      className="start-fix-btn"
                      onClick={handleStartFix}
                    >
                      <Play size={14} />
                      <span>START FIX</span>
                    </button>
                  ) : (
                    <span className="fix-running-badge">Fix Applied · Awaiting Verification</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN: SECTION 7 (RECALL Chat) ── */}
        <div className="column-right">
          <div className="column-label-row">
            <span className="column-section-tag">SECTION 7</span>
            <span className="column-header-title">Interactive Investigation</span>
          </div>

          <RecallChat 
            incident={incident}
            isSecondIncident={isSecondIncident}
            onSelectIncidentRef={() => setIsInspectorOpen(true)}
          />
        </div>
      </div>

      {/* ── BOTTOM SECTION: SECTIONS 8, 9, 10 (Engineer Feedback & Memory Updated) ── */}
      {isFixStarted && (
        <div className="bottom-feedback-section animate-slide-up">
          <div className="bottom-container">
            {/* SECTION 8: ENGINEER FEEDBACK */}
            {!feedbackState ? (
              <div className="feedback-card">
                <h3 className="feedback-title">Did the fix work?</h3>

                <div className="feedback-buttons-row">
                  <button 
                    id="btn-feedback-worked"
                    className="fb-btn worked"
                    onClick={() => handleFeedback('worked')}
                  >
                    <span>[ ✓ Fix Worked ]</span>
                  </button>

                  <button 
                    id="btn-feedback-failed"
                    className="fb-btn failed"
                    onClick={() => handleFeedback('failed')}
                  >
                    <span>[ ✕ Fix Failed ]</span>
                  </button>

                  <button 
                    id="btn-feedback-wrong-cause"
                    className="fb-btn wrong-cause"
                    onClick={() => handleFeedback('wrong_cause')}
                  >
                    <span>[ ↻ Wrong Cause ]</span>
                  </button>
                </div>
              </div>
            ) : (
              /* SECTIONS 8 & 9: OUTCOME & MEMORY UPDATED */
              <div className="feedback-result-stack">
                {/* SECTION 8: FEEDBACK OUTCOMES */}
                {feedbackState === 'worked' && (
                  <div className="outcome-card success">
                    <div className="outcome-header">
                      <CheckCircle2 size={18} className="text-emerald-700" />
                      <span className="outcome-title font-bold text-emerald-900">✓ Incident fixed</span>
                    </div>
                    <div className="remembered-section">
                      <span className="remembered-badge">🧠 REMEMBERED</span>
                      <p className="remembered-quote">"RECALL saved this successful fix for future incidents."</p>
                      <div className="learning-flow-line">
                        <span className="node">Payment API</span>
                        <span className="operator">+</span>
                        <span className="node">Redis authentication</span>
                        <span className="operator">→</span>
                        <span className="node highlight">Credential check worked</span>
                      </div>
                    </div>
                  </div>
                )}

                {feedbackState === 'failed' && (
                  <div className="outcome-card failure">
                    <div className="outcome-header">
                      <XCircle size={18} className="text-red-700" />
                      <span className="outcome-title font-bold text-red-900">✕ Failure remembered</span>
                    </div>
                    <p className="remembered-quote">"RECALL will avoid recommending this fix for similar incidents."</p>
                  </div>
                )}

                {feedbackState === 'wrong_cause' && (
                  <div className="outcome-card correction">
                    <div className="outcome-header">
                      <Info size={18} className="text-amber-800" />
                      <span className="outcome-title font-bold text-amber-950">What was the actual cause?</span>
                    </div>
                    <div className="cause-options-row">
                      {['Expired credential', 'Network issue', 'Configuration mismatch'].map(choice => (
                        <label key={choice} className="radio-label">
                          <input 
                            type="radio" 
                            name="actual_cause" 
                            checked={wrongCauseChoice === choice}
                            onChange={() => setWrongCauseChoice(choice)}
                          />
                          <span>{choice}</span>
                        </label>
                      ))}
                    </div>
                    <div className="correction-result">
                      <span className="font-semibold text-emerald-800">✓ Correction remembered</span>
                      <p className="remembered-quote">"RECALL will use this correction in future incidents."</p>
                    </div>
                  </div>
                )}

                {/* SECTION 9: MEMORY UPDATED */}
                <div className="memory-updated-card">
                  <div className="memory-updated-header">
                    <Brain size={16} className="text-emerald-700" />
                    <span className="memory-updated-title">🧠 MEMORY UPDATED</span>
                  </div>

                  <div className="memory-updated-details">
                    <div className="mu-item">
                      <span className="mu-label">New experience:</span>
                      <span className="mu-val">Redis authentication issue</span>
                    </div>
                    <div className="mu-item">
                      <span className="mu-label">Outcome:</span>
                      <span className="mu-val font-bold">
                        {feedbackState === 'worked' && 'Credential check → successful'}
                        {feedbackState === 'failed' && 'Restart API → failed'}
                        {feedbackState === 'wrong_cause' && 'Previous diagnosis → corrected'}
                      </span>
                    </div>
                  </div>

                  {/* SECTION 10: TRY SIMILAR INCIDENT */}
                  {!isSecondIncident ? (
                    <button 
                      id="btn-try-similar-incident"
                      className="try-similar-btn"
                      onClick={handleTrySimilarIncident}
                    >
                      <Zap size={15} />
                      <span>[ TRY SIMILAR INCIDENT ]</span>
                    </button>
                  ) : (
                    <div className="learning-confirmed-badge">
                      <CheckCircle2 size={15} className="text-emerald-700" />
                      <span>Continuous Learning Verified: Pattern recognized across different wording!</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── SECTION 11: MEMORY ON / OFF COMPARISON MODAL ── */}
      <MemoryCompareModal 
        isOpen={isCompareOpen} 
        onClose={() => setIsCompareOpen(false)} 
      />

      {/* ── SECTION 12: MEMORY INSPECTOR DRAWER ── */}
      <MemoryInspectorDrawer 
        isOpen={isInspectorOpen} 
        onClose={() => setIsInspectorOpen(false)} 
      />
    </div>
  );
}
