import React, { useState } from 'react';
import { 
  Brain, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertOctagon, 
  ArrowRight, 
  Play, 
  Check, 
  Terminal, 
  ShieldAlert, 
  RotateCw, 
  ExternalLink,
  GitCommit,
  UserCheck,
  Send,
  Database,
  Flame,
  Zap
} from 'lucide-react';

export default function HindsightHeroCard({ 
  incident, 
  isQueried, 
  onAskRecall, 
  primaryMemory, 
  currentStep,
  onExecuteRecovery,
  recoveryProgress,
  isRecovered,
  onMarkSuccess,
  isMemoryUpdated,
  onTriggerSimilarIncident,
  isIncident2
}) {
  const [activeStepTab, setActiveStepTab] = useState(0);
  const [engineerNotes, setEngineerNotes] = useState(
    isIncident2
      ? "Applied fast-path patch from MEM-2026-992. Ingress latency dropped to 36ms in 42 seconds. Verified no thundering herd."
      : "Verified hot-patch on pgBouncer (auth_pool=450). Error rate dropped from 64.2% to 0.01%. Added keepalive_probes=3 to prevent socket leaks under sustained load."
  );

  const analysis = incident.hindsightAnalysis;

  if (!isQueried) {
    return (
      <div className="sre-panel hindsight-hero-panel standby-state">
        <div className="sre-hero-standby-card">
          <div className="standby-vortex">
            <div className="vortex-ring ring-1" />
            <div className="vortex-ring ring-2" />
            <Brain className="standby-brain-icon" size={48} />
          </div>

          <div className="standby-content">
            <div className="standby-badge">
              <Sparkles size={13} className="text-emerald-600" />
              <span>HINDSIGHT MEMORY READY</span>
            </div>
            <h2 className="standby-title">Hindsight Memory Engine</h2>
            <p className="standby-text">
              Organizational memory bank contains indexed vector embeddings of previous post-mortems, verified incident resolutions, and documented failed recovery attempts.
            </p>

            <div className="standby-highlights">
              <div className="standby-chip">
                <Database size={13} className="text-emerald-600" />
                <span>Bank: <code className="text-emerald-700">org-infra-incidents-prod</code></span>
              </div>
              <div className="standby-chip">
                <GitCommit size={13} className="text-indigo-600" />
                <span>Indexed Post-Mortems: <strong>48 verified incidents</strong></span>
              </div>
            </div>

            <button 
              id="standby-ask-recall-btn"
              className="sre-hero-action-btn ask-recall-pulse"
              onClick={onAskRecall}
            >
              <Zap size={18} />
              <div className="hero-btn-text">
                <span className="hero-btn-main">ASK RECALL — QUERY HINDSIGHT</span>
                <span className="hero-btn-sub">Retrieve evidence-backed historical matches & known-bad fixes</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sre-panel hindsight-hero-panel active-hero">
      {/* ── SECTION 3: Hindsight Memory Header ── */}
      <div className="sre-hero-header">
        <div className="sre-hero-title-group">
          <div className="sre-hero-icon-mark">
            <Brain size={22} className="text-emerald-600" />
            <Sparkles size={12} className="sparkle-accent" />
          </div>
          <div>
            <div className="sre-hero-badge-row">
              <span className="sre-hero-section-tag">SECTION 3</span>
              <span className="sre-hero-subtag">ORGANIZATIONAL MEMORY RETRIEVED</span>
              {isIncident2 && (
                <span className="sre-fresh-memory-pill">
                  <Sparkles size={11} />
                  <span>LEARNED FROM JUST-COMPLETED INCIDENT</span>
                </span>
              )}
            </div>
            <h2 className="sre-hero-title">Hindsight Memory Analysis</h2>
          </div>
        </div>

        {/* Primary Match Pill */}
        <div className="sre-match-score-pill">
          <div className="sre-score-val">
            {(analysis.confidence).toFixed(1)}%
          </div>
          <div className="sre-score-label">
            VECTOR SIMILARITY MATCH
          </div>
        </div>
      </div>

      <div className="sre-hero-body-scroll">
        {/* ── SECTION 4: Why This Match? ── */}
        <div className="sre-section-box why-match-box">
          <div className="sre-box-header">
            <div className="sre-box-title-row">
              <span className="sre-box-num">SECTION 4</span>
              <h3 className="sre-box-title">Why This Match?</h3>
            </div>
            <div className="sre-match-ref-pill">
              <span>Matched: <strong>{analysis.primaryMemoryId}</strong></span>
              <span className="text-slate-500">·</span>
              <span>{primaryMemory?.author || 'Incident Commander'}</span>
            </div>
          </div>
          <p className="sre-why-match-text">
            {analysis.whyThisMatch}
          </p>
          <div className="sre-fingerprint-tags">
            <span className="fingerprint-label">Matched Fingerprint Vectors:</span>
            <span className="sre-tag-pill">PSQLException slots reserved</span>
            <span className="sre-tag-pill">max_client_conn (100)</span>
            <span className="sre-tag-pill">Hystrix circuit trip</span>
            <span className="sre-tag-pill">Consul pgBouncer proxy</span>
          </div>
        </div>

        {/* ── SECTION 5 & 6: Root Cause & Evidence ── */}
        <div className="sre-grid-two">
          {/* SECTION 5: Root Cause */}
          <div className="sre-section-box root-cause-box">
            <div className="sre-box-header">
              <div className="sre-box-title-row">
                <span className="sre-box-num">SECTION 5</span>
                <h3 className="sre-box-title">Evidence-Backed Root Cause</h3>
              </div>
              <span className="sre-verified-tag">Validated Diagnosis</span>
            </div>
            <p className="sre-box-text">
              {analysis.rootCause}
            </p>
          </div>

          {/* SECTION 6: Evidence */}
          <div className="sre-section-box evidence-box">
            <div className="sre-box-header">
              <div className="sre-box-title-row">
                <span className="sre-box-num">SECTION 6</span>
                <h3 className="sre-box-title">Historical Telemetry Evidence</h3>
              </div>
              <span className="sre-verified-tag">Post-Mortem C89A</span>
            </div>
            <p className="sre-box-text">
              {analysis.evidence}
            </p>
          </div>
        </div>

        {/* ── SECTIONS 7, 8, 9: THE STORY TRINITY (WHAT WORKED / WHAT FAILED / DO NOT TRY) ── */}
        {/* Visual Prominence: WHAT FAILED and DO NOT TRY are as visually prominent as WHAT WORKED */}
        <div className="sre-trinity-container">
          {/* SECTION 7: WHAT WORKED */}
          <div className="sre-trinity-card what-worked-card">
            <div className="trinity-card-header green">
              <div className="trinity-icon-circle green">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <span className="trinity-sub">SECTION 7 · HISTORICAL RESOLUTION</span>
                <h4 className="trinity-title">WHAT WORKED</h4>
              </div>
            </div>
            <div className="trinity-card-body">
              <p className="trinity-text">
                {analysis.whatWorked}
              </p>
              <div className="trinity-footer-pill green-pill">
                <Check size={12} />
                <span>Verified Recovery: 2.1 minutes · Zero Downtime</span>
              </div>
            </div>
          </div>

          {/* SECTION 8: WHAT FAILED */}
          <div className="sre-trinity-card what-failed-card">
            <div className="trinity-card-header red">
              <div className="trinity-icon-circle red">
                <XCircle size={16} />
              </div>
              <div>
                <span className="trinity-sub">SECTION 8 · CATASTROPHIC ANTI-PATTERN</span>
                <h4 className="trinity-title">WHAT FAILED</h4>
              </div>
            </div>
            <div className="trinity-card-body">
              <p className="trinity-text">
                {analysis.whatFailed}
              </p>
              <div className="trinity-footer-pill red-pill">
                <Flame size={12} />
                <span>Triggered Thundering Herd · 42m Master Outage</span>
              </div>
            </div>
          </div>

          {/* SECTION 9: DO NOT TRY */}
          <div className="sre-trinity-card do-not-try-card">
            <div className="trinity-card-header hazard">
              <div className="trinity-icon-circle hazard">
                <AlertOctagon size={16} />
              </div>
              <div>
                <span className="trinity-sub">SECTION 9 · STRICT OPERATIONAL GUARDRAIL</span>
                <h4 className="trinity-title">DO NOT TRY</h4>
              </div>
            </div>
            <div className="trinity-card-body">
              <p className="trinity-text hazard-text">
                {analysis.doNotTry}
              </p>
              <div className="trinity-footer-pill hazard-pill">
                <ShieldAlert size={12} />
                <span>Automated Safeguard: Restart Commands Intercepted</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 10: Recommended Next Step ── */}
        <div className="sre-section-box recommendation-box">
          <div className="sre-box-header">
            <div className="sre-box-title-row">
              <span className="sre-box-num">SECTION 10</span>
              <h3 className="sre-box-title">Recommended Next Step</h3>
            </div>
            <div className="sre-confidence-badge">
              <Sparkles size={12} className="text-emerald-600" />
              <span>Confidence: {analysis.confidence}%</span>
            </div>
          </div>
          <div className="sre-rec-content">
            <div className="sre-rec-headline">
              <span className="sre-rec-bullet">▶</span>
              <span className="sre-rec-text">{analysis.recommendedFix}</span>
            </div>
          </div>
        </div>

        {/* ── SECTION 11: Guided Recovery ── */}
        <div className="sre-section-box recovery-box">
          <div className="sre-box-header">
            <div className="sre-box-title-row">
              <span className="sre-box-num">SECTION 11</span>
              <h3 className="sre-box-title">Guided Recovery Runbook</h3>
            </div>
            <div className="sre-recovery-status-pill">
              {isRecovered ? (
                <span className="text-emerald-700 font-semibold flex-align">
                  <CheckCircle2 size={13} />
                  <span>ALL STEPS COMPLETED</span>
                </span>
              ) : recoveryProgress > 0 ? (
                <span className="text-indigo-700 font-semibold flex-align">
                  <RotateCw size={13} className="spin-slow" />
                  <span>EXECUTING STEP {recoveryProgress} OF {analysis.recoverySteps.length}</span>
                </span>
              ) : (
                <span className="text-slate-500">Ready to execute</span>
              )}
            </div>
          </div>

          {/* Recovery Steps Accordion / Runner */}
          <div className="sre-recovery-steps-list">
            {analysis.recoverySteps.map((step, idx) => {
              const isDone = recoveryProgress > idx || isRecovered;
              const isRunning = recoveryProgress === idx && !isRecovered;
              const isSelected = activeStepTab === idx;

              return (
                <div 
                  key={step.id} 
                  className={`sre-recovery-step-item ${isDone ? 'step-done' : ''} ${isRunning ? 'step-running' : ''}`}
                  onClick={() => setActiveStepTab(idx)}
                >
                  <div className="step-item-top">
                    <div className="step-num-circle">
                      {isDone ? <Check size={12} /> : step.id}
                    </div>
                    <div className="step-item-info">
                      <span className="step-item-title">{step.title}</span>
                      <code className="step-item-cmd">{step.cmd}</code>
                    </div>
                    <div className="step-item-state">
                      {isDone && <span className="step-state-badge done">Passed</span>}
                      {isRunning && <span className="step-state-badge running">Running...</span>}
                      {!isDone && !isRunning && <span className="step-state-badge pending">Pending</span>}
                    </div>
                  </div>

                  {/* Execution Output (if completed or selected) */}
                  {(isDone || isRunning) && (
                    <div className="step-item-output">
                      <Terminal size={12} className="output-term-icon" />
                      <pre className="output-pre">{step.output}</pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Recovery Actions Toolbar */}
          <div className="sre-recovery-action-bar">
            {!isRecovered ? (
              <button 
                id="btn-start-guided-recovery"
                className="sre-execute-btn"
                onClick={onExecuteRecovery}
                disabled={recoveryProgress > 0 && !isRecovered}
              >
                <Play size={15} />
                <span>
                  {recoveryProgress === 0 ? "Start Guided Recovery (Auto-Run All)" : "Executing Live Hot-Patch..."}
                </span>
              </button>
            ) : (
              <div className="sre-recovery-success-box">
                <CheckCircle2 size={16} className="text-emerald-700" />
                <span>
                  Live hot-patch successfully applied. Ingress latency normalized. Error rate &lt; 0.01%.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── SECTION 12: Engineer Feedback (Visible after recovery) ── */}
        {isRecovered && (
          <div className="sre-section-box feedback-box animate-fade-in">
            <div className="sre-box-header">
              <div className="sre-box-title-row">
                <span className="sre-box-num">SECTION 12</span>
                <h3 className="sre-box-title">Engineer Feedback & Resolution Capture</h3>
              </div>
              <span className="sre-feedback-role-pill">Incident Commander: @you</span>
            </div>

            <div className="sre-feedback-form">
              <div className="sre-feedback-status-row">
                <span className="feedback-label">Resolution Outcome:</span>
                <div className="feedback-choice-pill selected">
                  <Check size={14} className="text-emerald-700" />
                  <span>Fix Succeeded Without Downtime</span>
                </div>
              </div>

              <div className="sre-feedback-input-group">
                <label className="feedback-label">
                  Operational Experience & Parameter Notes (Will be vectorized and written to Hindsight):
                </label>
                <textarea 
                  className="sre-feedback-textarea"
                  rows={3}
                  value={engineerNotes}
                  onChange={(e) => setEngineerNotes(e.target.value)}
                />
              </div>

              {!isMemoryUpdated ? (
                <button 
                  id="btn-mark-fix-successful"
                  className="sre-feedback-submit-btn"
                  onClick={() => onMarkSuccess(engineerNotes)}
                >
                  <Send size={15} />
                  <span>Mark Fix as Successful & Update Hindsight Memory</span>
                </button>
              ) : (
                <div className="sre-feedback-saved-indicator">
                  <CheckCircle2 size={16} className="text-emerald-700" />
                  <span>Feedback vector-indexed into organizational memory bank.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SECTION 13: Memory Updated Confirmation ── */}
        {isMemoryUpdated && (
          <div className="sre-section-box memory-updated-hero-box animate-fade-in">
            <div className="memory-updated-top">
              <div className="memory-updated-icon">
                <Sparkles size={22} className="text-emerald-700" />
              </div>
              <div>
                <div className="flex-align gap-2">
                  <span className="sre-box-num">SECTION 13</span>
                  <span className="memory-updated-badge">HINDSIGHT MEMORY UPDATED</span>
                </div>
                <h3 className="memory-updated-title">New Memory Committed: MEM-2026-992</h3>
              </div>
            </div>

            <div className="memory-updated-details">
              <div className="mem-detail-row">
                <span className="mem-detail-label">Vector Embedding:</span>
                <span className="mem-detail-val code">1,536 dimensions · bank 'org-infra-incidents-prod'</span>
              </div>
              <div className="mem-detail-row">
                <span className="mem-detail-label">Recorded Experience:</span>
                <span className="mem-detail-val">{engineerNotes}</span>
              </div>
              <div className="mem-detail-row">
                <span className="mem-detail-label">Confirmed Guardrail:</span>
                <span className="mem-detail-val text-red-700">"Pod restarts guarantee thundering herd. Hot-patch pool to 450."</span>
              </div>
            </div>

            {/* Next Story Step Trigger: Trigger Similar Incident */}
            {!isIncident2 ? (
              <div className="trigger-similar-cta">
                <div className="cta-explanation">
                  <strong>Next Phase of Demo:</strong> Prove that Recall now remembers this exact experience when a similar incident strikes.
                </div>
                <button 
                  id="btn-trigger-similar-incident"
                  className="sre-trigger-similar-btn"
                  onClick={onTriggerSimilarIncident}
                >
                  <Zap size={16} />
                  <span>Trigger Similar Incident (INC-2026-914: Checkout Surge)</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div className="demo-story-complete-banner">
                <CheckCircle2 size={20} className="text-emerald-700" />
                <div>
                  <strong>FULL DEMO STORY PROVEN:</strong> Recall remembered the experience from Incident 1, avoided the catastrophic pod restart, and solved Incident 2 in 42 seconds!
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
