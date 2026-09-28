import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Activity, 
  Server, 
  Zap, 
  TrendingUp, 
  Gauge, 
  Cpu, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function ActiveIncidentCard({ 
  incident, 
  isQueried, 
  onAskRecall, 
  currentStep,
  isResolved
}) {
  const { metrics } = incident;

  return (
    <div className="sre-panel active-incident-panel">
      {/* Panel Header */}
      <div className="sre-panel-header">
        <div className="sre-panel-title-wrap">
          <div className="sre-panel-icon red">
            {isResolved ? <CheckCircle2 size={16} className="text-emerald-400" /> : <AlertTriangle size={16} />}
          </div>
          <div>
            <span className="sre-section-num">SECTION 1</span>
            <h2 className="sre-panel-title">Active Incident</h2>
          </div>
        </div>
        <div className="sre-panel-tags">
          <span className={`sre-sev-badge ${isResolved ? 'resolved' : 'p1'}`}>
            {isResolved ? 'P1 · RESOLVED' : incident.severity}
          </span>
          <span className="sre-id-badge">{incident.id}</span>
        </div>
      </div>

      {/* Incident Core Info */}
      <div className="sre-incident-body">
        <h3 className="sre-incident-headline">{incident.title}</h3>
        
        <div className="sre-meta-grid">
          <div className="sre-meta-item">
            <span className="sre-meta-label">TARGET SERVICE</span>
            <span className="sre-meta-value code">{incident.service}</span>
          </div>
          <div className="sre-meta-item">
            <span className="sre-meta-label">ENVIRONMENT</span>
            <span className="sre-meta-value">{incident.cluster} · {incident.namespace}</span>
          </div>
          <div className="sre-meta-item">
            <span className="sre-meta-label">FIRST DETECTED</span>
            <span className="sre-meta-value flex-align">
              <Clock size={12} className="text-slate-400" />
              {incident.detectedAt} ({incident.elapsedTime} ago)
            </span>
          </div>
        </div>

        {/* Impact Warning Banner */}
        <div className={`sre-impact-banner ${isResolved ? 'resolved-banner' : ''}`}>
          <div className="sre-impact-icon">
            {isResolved ? '✅' : '💥'}
          </div>
          <div className="sre-impact-content">
            <span className="sre-impact-label">
              {isResolved ? 'INCIDENT RECOVERED' : 'BUSINESS IMPACT AT RISK'}
            </span>
            <p className="sre-impact-text">
              {isResolved 
                ? 'All transactions flowing normally. Error rate < 0.01%, p99 latency restored to 41ms.' 
                : incident.impact}
            </p>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="sre-telemetry-section">
          <div className="sre-telemetry-header">
            <span className="sre-telemetry-title">
              <Activity size={13} className="text-indigo-400" />
              LIVE TELEMETRY SPIKE
            </span>
            <span className="sre-telemetry-freq">Sampling: 1s intervals</span>
          </div>

          <div className="sre-metrics-cards">
            {/* Metric 1: Error Rate */}
            <div className={`sre-metric-card ${isResolved ? 'metric-good' : 'metric-danger'}`}>
              <div className="sre-metric-top">
                <span className="sre-metric-label">HTTP Error Rate</span>
                <span className="sre-metric-badge">
                  {isResolved ? '0.01% (Normal)' : `▲ ${(metrics.errorRate / metrics.errorRateBaseline).toFixed(0)}x baseline`}
                </span>
              </div>
              <div className="sre-metric-value">
                {isResolved ? '0.01%' : `${metrics.errorRate}%`}
              </div>
              <div className="sre-metric-bar">
                <div 
                  className={`sre-metric-fill ${isResolved ? 'fill-good' : 'fill-danger'}`} 
                  style={{ width: isResolved ? '2%' : `${metrics.errorRate}%` }} 
                />
              </div>
              <span className="sre-metric-baseline">Baseline: &lt; {metrics.errorRateBaseline}%</span>
            </div>

            {/* Metric 2: p99 Latency */}
            <div className={`sre-metric-card ${isResolved ? 'metric-good' : 'metric-warning'}`}>
              <div className="sre-metric-top">
                <span className="sre-metric-label">p99 Ingress Latency</span>
                <span className="sre-metric-badge">
                  {isResolved ? '41ms' : 'Critical Spike'}
                </span>
              </div>
              <div className="sre-metric-value">
                {isResolved ? '41 ms' : `${metrics.p99Latency.toLocaleString()} ms`}
              </div>
              <div className="sre-metric-bar">
                <div 
                  className={`sre-metric-fill ${isResolved ? 'fill-good' : 'fill-warning'}`} 
                  style={{ width: isResolved ? '5%' : '94%' }} 
                />
              </div>
              <span className="sre-metric-baseline">SLO Target: &lt; {metrics.p99Baseline} ms</span>
            </div>

            {/* Metric 3: DB Connection Saturation */}
            <div className={`sre-metric-card ${isResolved ? 'metric-good' : 'metric-critical'}`}>
              <div className="sre-metric-top">
                <span className="sre-metric-label">pgBouncer Client Pool</span>
                <span className="sre-metric-badge">
                  {isResolved ? '42/450 (9%)' : '100% SATURATED'}
                </span>
              </div>
              <div className="sre-metric-value">
                {isResolved ? '42 / 450' : `${metrics.activeConnections} / ${metrics.maxConnections}`}
              </div>
              <div className="sre-metric-bar">
                <div 
                  className={`sre-metric-fill ${isResolved ? 'fill-good' : 'fill-critical'}`} 
                  style={{ width: isResolved ? '9%' : '100%' }} 
                />
              </div>
              <span className="sre-metric-baseline">
                {isResolved ? 'New pool headroom: 408 slots' : 'Queue Depth: 380 waiting'}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Call to Action: ASK RECALL */}
        <div className="sre-ask-recall-box">
          {!isQueried ? (
            <button 
              id="btn-ask-recall"
              className="sre-hero-action-btn ask-recall-pulse"
              onClick={onAskRecall}
            >
              <Zap className="hero-btn-icon" size={18} />
              <div className="hero-btn-text">
                <span className="hero-btn-main">ASK RECALL — QUERY HINDSIGHT</span>
                <span className="hero-btn-sub">Search organizational memory for historical patterns & resolutions</span>
              </div>
            </button>
          ) : (
            <div className="sre-recalled-status">
              <div className="sre-recalled-left">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Hindsight Memory Activated · Vector Match Found</span>
              </div>
              <button 
                className="sre-re-query-btn"
                onClick={onAskRecall}
                title="Re-query memory bank"
              >
                Re-scan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
