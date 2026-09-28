import React from 'react';
import { 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  HelpCircle 
} from 'lucide-react';
import { DEMO_STEPS } from '../data/mockData';

export default function DemoControllerBar({ 
  currentStep, 
  onSetStep, 
  onNext, 
  onPrev, 
  onReset 
}) {
  const currentStepData = DEMO_STEPS.find(s => s.step === currentStep) || DEMO_STEPS[0];

  return (
    <div className="sre-demo-bar">
      <div className="sre-demo-bar-inner">
        {/* Left: Step label and narrative explanation */}
        <div className="sre-demo-info">
          <div className="sre-demo-tag">
            <span className="sre-demo-step-num">DEMO STORY · STEP {currentStep} OF 13</span>
            <span className="sre-demo-step-badge">{currentStepData.tag}</span>
          </div>
          <div className="sre-demo-headline">
            <span className="sre-demo-title">{currentStepData.title}:</span>
            <span className="sre-demo-desc">{currentStepData.desc}</span>
          </div>
        </div>

        {/* Center: Step indicators / quick jumps */}
        <div className="sre-demo-stepper-dots">
          {DEMO_STEPS.map((s) => {
            const isCompleted = s.step < currentStep;
            const isCurrent = s.step === currentStep;
            return (
              <button
                key={s.step}
                className={`sre-dot-step ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => onSetStep(s.step)}
                title={`Jump to Step ${s.step}: ${s.title}`}
              >
                <span className="sre-dot-num">{s.step}</span>
                {isCompleted && <span className="sre-dot-check">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Right: Navigation buttons */}
        <div className="sre-demo-nav-actions">
          <button 
            id="demo-prev-btn"
            className="sre-demo-btn prev"
            onClick={onPrev}
            disabled={currentStep === 1}
            title="Previous demo step"
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>

          <button 
            id="demo-next-btn"
            className="sre-demo-btn next"
            onClick={onNext}
            disabled={currentStep === DEMO_STEPS.length}
            title="Next demo step"
          >
            <span>Next Step</span>
            <ChevronRight size={16} />
          </button>

          <button 
            id="demo-reset-btn"
            className="sre-demo-btn reset"
            onClick={onReset}
            title="Reset demo simulation to Step 1"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
