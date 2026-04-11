import { useEffect, useRef } from "react";

const chatStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

  .chat-root {
    min-height: 100vh;
    padding: 18px;
    background: #f3f1ec;
    color: #181714;
    font-family: 'Manrope', sans-serif;
  }

  .chat-shell {
    width: min(1180px, 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.85fr);
    gap: 18px;
    align-items: start;
  }

  .chat-main,
  .chat-side {
    background: #fcfbf8;
    border: 1px solid #ddd7cd;
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(27, 25, 20, 0.04);
  }

  .chat-main {
    min-height: calc(100vh - 36px);
    display: grid;
    grid-template-rows: auto auto minmax(0, 1fr) auto;
    overflow: hidden;
  }

  .chat-header {
    padding: 22px 24px 18px;
    border-bottom: 1px solid #e6dfd4;
    display: flex;
    justify-content: space-between;
    gap: 18px;
    align-items: flex-start;
  }

  .chat-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  .chat-subtitle {
    margin: 6px 0 0;
    color: #655d51;
    line-height: 1.55;
    font-size: 0.95rem;
  }

  .chat-badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .chat-badge {
    padding: 7px 10px;
    border-radius: 999px;
    background: #f1ece3;
    color: #5f574a;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .chat-progress {
    padding: 16px 24px 0;
  }

  .chat-progress-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    color: #675f53;
    font-size: 0.92rem;
  }

  .chat-progress-track {
    margin-top: 10px;
    height: 8px;
    border-radius: 999px;
    background: #ece5da;
    overflow: hidden;
  }

  .chat-progress-fill {
    height: 100%;
    background: #1f1d19;
    border-radius: inherit;
    transition: width 180ms ease;
  }

  .chat-alert {
    margin: 16px 24px 0;
    padding: 12px 14px;
    border-radius: 14px;
    font-size: 0.92rem;
    line-height: 1.5;
  }

  .chat-alert.error {
    background: #f7e8e7;
    border: 1px solid #e8c1bf;
    color: #8b3a35;
  }

  .chat-alert.success {
    background: #eaf1e8;
    border: 1px solid #cad8c6;
    color: #466042;
  }

  .chat-messages {
    min-height: 0;
    overflow-y: auto;
    padding: 20px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .chat-row {
    display: flex;
    gap: 12px;
    align-items: flex-end;
  }

  .chat-row.user {
    flex-direction: row-reverse;
  }

  .chat-avatar {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    background: #efeadf;
    color: #5f574a;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    flex-shrink: 0;
  }

  .chat-avatar.user {
    background: #181714;
    color: #fff;
  }

  .chat-bubble {
    max-width: min(78%, 720px);
    padding: 15px 16px;
    border-radius: 16px;
    line-height: 1.65;
    font-size: 0.97rem;
    white-space: pre-wrap;
    border: 1px solid #e2dace;
    background: #fff;
  }

  .chat-bubble.user {
    background: #181714;
    color: #fff;
    border-color: #181714;
  }

  .chat-bubble.system {
    background: #f4f0e8;
  }

  .chat-score {
    display: inline-flex;
    margin-bottom: 10px;
    padding: 4px 8px;
    border-radius: 999px;
    background: #efe9de;
    color: #60584b;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .chat-typing {
    display: inline-flex;
    gap: 6px;
    padding: 14px 16px;
    border-radius: 16px;
    border: 1px solid #e2dace;
    background: #fff;
  }

  .chat-typing span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #bdb3a5;
    animation: chatBounce 1.2s ease-in-out infinite;
  }

  .chat-typing span:nth-child(2) { animation-delay: 0.12s; }
  .chat-typing span:nth-child(3) { animation-delay: 0.24s; }

  @keyframes chatBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.45; }
    30% { transform: translateY(-4px); opacity: 1; }
  }

  .chat-compose {
    padding: 18px 24px 24px;
    border-top: 1px solid #e6dfd4;
    background: #faf8f4;
  }

  .chat-textarea {
    width: 100%;
    min-height: 110px;
    max-height: 240px;
    resize: vertical;
    padding: 15px 16px;
    border: 1px solid #d8d1c5;
    border-radius: 16px;
    background: #fff;
    font: inherit;
    color: #181714;
    line-height: 1.6;
    outline: none;
  }

  .chat-textarea:focus {
    border-color: #8f8474;
  }

  .chat-compose-foot {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .chat-hint {
    color: #6c6457;
    font-size: 0.9rem;
  }

  .chat-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .chat-button,
  .chat-button-secondary {
    border: none;
    border-radius: 14px;
    padding: 12px 16px;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  .chat-button {
    background: #181714;
    color: #fff;
  }

  .chat-button-secondary {
    background: #eee8de;
    color: #1f1d19;
  }

  .chat-button:disabled,
  .chat-button-secondary:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .chat-side {
    padding: 22px;
    display: grid;
    gap: 16px;
    position: sticky;
    top: 18px;
  }

  .chat-card {
    padding: 16px;
    border: 1px solid #e4ddd2;
    border-radius: 16px;
    background: #f8f5ef;
  }

  .chat-card-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }

  .chat-card-copy {
    margin: 8px 0 0;
    color: #645d51;
    line-height: 1.6;
  }

  .chat-report-score {
    margin-top: 12px;
    color: #181714;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.05em;
  }

  .chat-metric {
    padding: 12px 0;
    border-top: 1px solid #e4ddd2;
  }

  .chat-metric:first-child {
    border-top: none;
    padding-top: 0;
  }

  .chat-metric-label {
    display: block;
    color: #72695c;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .chat-metric-value {
    margin-top: 6px;
    color: #1e1c17;
    line-height: 1.6;
  }

  @media (max-width: 1024px) {
    .chat-shell {
      grid-template-columns: 1fr;
    }

    .chat-main {
      min-height: auto;
    }

    .chat-side {
      position: static;
    }
  }

  @media (max-width: 640px) {
    .chat-root {
      padding: 10px;
    }

    .chat-main,
    .chat-side {
      border-radius: 18px;
    }

    .chat-header {
      flex-direction: column;
    }

    .chat-badges {
      justify-content: flex-start;
    }

    .chat-bubble {
      max-width: 100%;
    }
  }
`;

const TOTAL_QUESTIONS = 10;

const ROLE_LABELS = {
  backend: "Backend",
  frontend: "Frontend",
  fullstack: "Full Stack",
  dsa: "DSA",
};

const DIFFICULTY_LABELS = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

function InterviewChat({
  messages,
  input,
  setInput,
  onSend,
  onGetReport,
  onReset,
  loading,
  role,
  difficulty,
  questionCount,
  report,
  error,
  interviewComplete,
}) {
  const messagesEndRef = useRef(null);
  const progressValue = Math.min(questionCount, TOTAL_QUESTIONS);
  const progressWidth = `${(progressValue / TOTAL_QUESTIONS) * 100}%`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, report]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <>
      <style>{chatStyles}</style>
      <section className="chat-root">
        <div className="chat-shell">
          <div className="chat-main">
            <div className="chat-header">
              <div>
                <h2 className="chat-title">Interview session</h2>
                <p className="chat-subtitle">Answer the current question, review the feedback, and continue when you are ready.</p>
              </div>
              <div className="chat-badges">
                <span className="chat-badge">{ROLE_LABELS[role] || role}</span>
                <span className="chat-badge">{DIFFICULTY_LABELS[difficulty] || difficulty}</span>
                <span className="chat-badge">Q {Math.min(questionCount, TOTAL_QUESTIONS)} / {TOTAL_QUESTIONS}</span>
              </div>
            </div>

            <div className="chat-progress">
              <div className="chat-progress-head">
                <span>Progress</span>
                <span>{progressValue} of {TOTAL_QUESTIONS} questions</span>
              </div>
              <div className="chat-progress-track">
                <div className="chat-progress-fill" style={{ width: progressWidth }} />
              </div>
            </div>

            {error ? <div className="chat-alert error">{error}</div> : null}
            {interviewComplete ? <div className="chat-alert success">The interview has ended. You can generate the report or start a new session.</div> : null}

            <div className="chat-messages">
              {messages.map((message, index) => {
                const isUser = message.sender === "You";
                const bubbleClass = message.type === "system" ? "chat-bubble system" : `chat-bubble ${isUser ? "user" : ""}`;

                return (
                  <div key={`${message.sender}-${index}`} className={`chat-row ${isUser ? "user" : ""}`}>
                    <div className={`chat-avatar ${isUser ? "user" : ""}`}>{isUser ? "You" : "AI"}</div>
                    <div className={bubbleClass}>
                      {typeof message.score === "number" ? <div className="chat-score">Score {message.score}/10</div> : null}
                      {message.text}
                    </div>
                  </div>
                );
              })}

              {loading ? (
                <div className="chat-row">
                  <div className="chat-avatar">AI</div>
                  <div className="chat-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              ) : null}

              <div ref={messagesEndRef} />
            </div>

            <div className="chat-compose">
              <textarea
                className="chat-textarea"
                placeholder="Write your answer here. Use Ctrl + Enter to send."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading || interviewComplete}
              />

              <div className="chat-compose-foot">
                <div className="chat-hint">A concise, structured answer usually works better than a very long one.</div>
                <div className="chat-actions">
                  <button className="chat-button-secondary" type="button" onClick={onGetReport} disabled={loading}>
                    Get report
                  </button>
                  <button className="chat-button-secondary" type="button" onClick={onReset} disabled={loading}>
                    New session
                  </button>
                  <button className="chat-button" type="button" onClick={onSend} disabled={loading || interviewComplete || !input.trim()}>
                    Send answer
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="chat-side">
            <div className="chat-card">
              <h3 className="chat-card-title">Session summary</h3>
              <div className="chat-metric">
                <span className="chat-metric-label">Role</span>
                <div className="chat-metric-value">{ROLE_LABELS[role] || role}</div>
              </div>
              <div className="chat-metric">
                <span className="chat-metric-label">Difficulty</span>
                <div className="chat-metric-value">{DIFFICULTY_LABELS[difficulty] || difficulty}</div>
              </div>
              <div className="chat-metric">
                <span className="chat-metric-label">Messages</span>
                <div className="chat-metric-value">{messages.length} items in this interview</div>
              </div>
            </div>

            <div className="chat-card">
              <h3 className="chat-card-title">Answering tip</h3>
              <p className="chat-card-copy">Try a simple structure: definition, example, then limitation or tradeoff.</p>
            </div>

            <div className="chat-card">
              <h3 className="chat-card-title">Final report</h3>
              {report ? (
                <>
                  <div className="chat-report-score">{report.overallScore}/10</div>
                  <div className="chat-metric">
                    <span className="chat-metric-label">Strengths</span>
                    <div className="chat-metric-value">{report.strengths}</div>
                  </div>
                  <div className="chat-metric">
                    <span className="chat-metric-label">Weaknesses</span>
                    <div className="chat-metric-value">{report.weaknesses}</div>
                  </div>
                  <div className="chat-metric">
                    <span className="chat-metric-label">Suggestions</span>
                    <div className="chat-metric-value">{report.suggestions}</div>
                  </div>
                </>
              ) : (
                <p className="chat-card-copy">Generate the report after answering at least one question. It will appear here.</p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default InterviewChat;
