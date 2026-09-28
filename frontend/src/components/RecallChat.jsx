import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, Sparkles } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "What happened before?",
  "What worked?",
  "What failed?",
  "Why this recommendation?",
  "Is the old fix still valid?"
];

export default function RecallChat({ incident, isSecondIncident, onSelectIncidentRef }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'recall',
      text: "I can help you investigate this incident using what your team learned from past incidents.",
      source: null
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isSecondIncident) {
      setMessages([
        {
          id: Date.now(),
          sender: 'recall',
          text: "I've seen this before! Even though the wording is different ('Payment service cannot authenticate with Redis'), this matches the Redis authentication issue you just resolved.",
          source: "Payment API (Just now)"
        }
      ]);
    } else {
      setMessages([
        {
          id: 1,
          sender: 'recall',
          text: "I can help you investigate this incident using what your team learned from past incidents.",
          source: null
        }
      ]);
    }
  }, [isSecondIncident]);

  const getRecallAnswer = (query) => {
    const q = query.toLowerCase().trim();

    // Incident 2 (Continuous learning queries)
    if (isSecondIncident) {
      if (q.includes('before') || q.includes('happened') || q.includes('past')) {
        return {
          text: "This matches the Redis authentication incident you resolved just now in Payment API.\n\nRotating the Redis credential resolved it.",
          source: "Payment API (Just resolved)"
        };
      }
      if (q.includes('work') || q.includes('fix')) {
        return {
          text: "Checking and rotating the Redis credential worked in the incident you just resolved.\n\nRestarting the API failed previously.",
          source: "Payment API (Just resolved)"
        };
      }
      if (q.includes('failed') || q.includes('bad') || q.includes('avoid')) {
        return {
          text: "Restarting the API failed in INC-1842.\n\nThe team fixed the issue by rotating the Redis credential.",
          source: "INC-1842"
        };
      }
      if (q.includes('why') || q.includes('recommendation')) {
        return {
          text: "This recommendation is based on the fix you just validated 2 minutes ago for this same Redis authentication failure.",
          source: "Payment API (Just resolved)"
        };
      }
      if (q.includes('valid') || q.includes('outdated')) {
        return {
          text: "This fix is fresh and currently verified from the incident you just resolved.",
          source: "Payment API (Just resolved)"
        };
      }
    }

    // Question 1: What happened before?
    if (q.includes('before') || q.includes('happened') || q.includes('past')) {
      return {
        text: "In INC-1842, Payment API experienced the same Redis authentication error. The team fixed the issue by rotating the Redis credential.",
        source: "INC-1842"
      };
    }

    // Question 2: What worked?
    if (q.includes('worked') || q.includes('solution') || q.includes('how to fix')) {
      return {
        text: "Rotating the Redis credential and restarting workers worked in INC-1842.",
        source: "INC-1842"
      };
    }

    // Question 3: What failed?
    if (q.includes('failed') || q.includes('bad') || q.includes('avoid') || q.includes('not do') || q.includes('restart')) {
      return {
        text: "Restarting the API failed in INC-1842.\nThe team fixed the issue by rotating the Redis credential.",
        source: "INC-1842"
      };
    }

    // Question 4: Why this recommendation?
    if (q.includes('why') || q.includes('recommendation') || q.includes('reason')) {
      return {
        text: "2 similar incidents were fixed after checking the credential.\n\nRestarting the API was proven to fail in INC-1842.",
        source: "INC-1842, INC-1911"
      };
    }

    // Question 5: Is the old fix still valid?
    if (q.includes('valid') || q.includes('outdated') || q.includes('still work') || q.includes('change')) {
      return {
        text: "It may be outdated because the Redis setup changed later.\nI recommend verifying the configuration first.",
        source: "INC-1842"
      };
    }

    // Default response strictly focused on incident memory
    return {
      text: "I can help you investigate this incident using what your team learned from past incidents.",
      source: "Hindsight Memory"
    };
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      source: null
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getRecallAnswer(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'recall',
        text: response.text,
        source: response.source
      };
      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
    }, 380);
  };

  return (
    <div className="recall-chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-title-group">
          <div className="chat-header-icon">
            <Brain size={18} />
          </div>
          <div>
            <div className="chat-name">💬 RECALL</div>
            <div className="chat-sub">Ask about this incident.</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages-scroll">
        {messages.map(msg => (
          <div key={msg.id} className={`chat-bubble-wrap ${msg.sender}`}>
            {msg.sender === 'recall' && (
              <div className="chat-avatar recall">
                <Brain size={13} />
              </div>
            )}
            
            <div className={`chat-bubble ${msg.sender}`}>
              <div className="chat-bubble-text">
                {msg.text.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} style={{ marginBottom: pIdx === 0 && msg.text.includes('\n\n') ? '0.45rem' : 0 }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {msg.source && (
                <div 
                  className="chat-source-tag"
                  onClick={() => onSelectIncidentRef && onSelectIncidentRef(msg.source)}
                  title="Click to view reference in Hindsight"
                >
                  <Sparkles size={11} className="text-emerald-700" />
                  <span>Based on: <strong>{msg.source}</strong></span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-bubble-wrap recall">
            <div className="chat-avatar recall">
              <Brain size={13} />
            </div>
            <div className="chat-bubble recall typing-bubble">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Chips */}
      <div className="chat-suggestions-area">
        <span className="suggestions-label">Suggested questions:</span>
        <div className="suggestions-chips-row">
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              className="chat-chip-btn"
              onClick={() => handleSendMessage(q)}
            >
              [ {q} ]
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form 
        className="chat-input-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <input 
          type="text"
          placeholder="Ask RECALL about this incident..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="chat-text-input"
        />
        <button 
          type="submit" 
          className="chat-send-btn"
          disabled={!inputText.trim()}
          title="Send"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
