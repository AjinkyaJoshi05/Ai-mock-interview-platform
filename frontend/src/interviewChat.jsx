import { useEffect, useRef } from "react";

const chatStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap');

  .chat-root {
    min-height: 100vh;
    padding: 18px;
    background:
      radial-gradient(circle at top left, rgba(242, 103, 34, 0.14), transparent 25%),
      radial-gradient(circle at right center, rgba(17, 138, 178, 0.16), transparent 30%),
      linear-gradient(180deg, #f5efe5 0%, #f3f6fb 52%, #eff4ee 100%);
    font-family: 'DM Sans', sans-serif;
  }

  .chat-shell {
    width: min(1280px, 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(320px, 0.8fr);
    gap: 18px;
    align-items: start;
  }

  .chat-main,
  .chat-side {
    border: 1px solid rgba(27, 24, 17, 0.08);
    background: rgba(255, 255, 255, 0.82);
    backdrop-filter: blur(12px);
    box-shadow: 0 22px 48px rgba(20, 18, 14, 0.08);
  }

  .chat-main {
    min-height: calc(100vh - 36px);
    border-radius: 28px;
    display: grid;
    grid-template-rows: auto auto minmax(0, 1fr) auto;
    overflow: hidden;
  }

  .chat-topbar {
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 1px solid rgba(27, 24, 17, 0.08);
    background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.86));
  }

  .chat-topbar-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .chat-avatar {
    width: 52px;
    height: 52px;
    border-radius: 18px;
    display: grid;
    place-items: center;
    color: #fff;
    background: linear-gradient(135deg, #191610 0%, #383226 100%);
    box-shadow: 0 14px 24px rgba(25, 22, 16, 0.18);
    flex-shrink: 0;
  }

  .chat-title {
    margin: 0;
    color: #17140f;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.2rem;
    letter-spacing: -0.04em;
  }

  .chat-status {
    margin: 6px 0 0;
    color: #676055;
    font-size: 0.92rem;
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .chat-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: #1f8a57;
    animation: chatPulse 1.6s ease-in-out infinite;
  }

  @keyframes chatPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.88); }
  }

  .chat-tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-content: flex-start;
  }

  .chat-tag {
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .chat-tag.role {
    background: rgba(17, 138, 178, 0.12);
    color: #0f617d;
  }

  .chat-tag.diff {
    background: rgba(242, 103, 34, 0.12);
    color: #9d491d;
  }

  .chat-tag.count {
    background: rgba(25, 22, 16, 0.08);
    color: #312d24;
  }

  .chat-progress-wrap {
    padding: 18px 24px 0;
  }

  .chat-progress-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    color: #5f594f;
    font-size: 0.92rem;
  }

  .chat-progress-track {
    margin-top: 10px;
    height: 10px;
    border-radius: 999px;
    background: rgba(25, 22, 16, 0.08);
    overflow: hidden;
  }

  .chat-progress-fill {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #118ab2 0%, #f26722 100%);
    transition: width 220ms ease;
  }

  .chat-alert {
    margin: 16px 24px 0;
    border-radius: 18px;
    padding: 14px 16px;
    font-size: 0.94rem;
    line-height: 1.5;
  }

  .chat-alert.error {
    background: rgba(183, 45, 49, 0.08);
    border: 1px solid rgba(183, 45, 49, 0.14);
    color: #9f2c30;
  }

  .chat-alert.success {
    background: rgba(31, 138, 87, 0.1);
    border: 1px solid rgba(31, 138, 87, 0.16);
    color: #166844;
  }

  .chat-messages {
    min-height: 0;
    padding: 20px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
  }

  .chat-row {
    display: flex;
    gap: 12px;
    align-items: flex-end;
  }

  .chat-row.user {
    flex-direction: row-reverse;
  }

  .chat-msg-avatar {
    width: 38px;
    height: 38px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .chat-msg-avatar.ai {
    background: #191610;
    color: #fff;
  }

  .chat-msg-avatar.user {
    background: rgba(17, 138, 178, 0.12);
    color: #0f617d;
  }

  .chat-bubble {
    max-width: min(78%, 720px);
    padding: 16px 18px;
    border-radius: 22px;
    line-height: 1.65;
    font-size: 0.98rem;
    white-space: pre-wrap;
  }

  .chat-bubble.ai {
    background: #fff;
    color: #18150f;
    border: 1px solid rgba(27, 24, 17, 0.08);
    border-bottom-left-radius: 8px;
  }

  .chat-bubble.user {
    background: linear-gradient(135deg, #191610 0%, #2e291f 100%);
    color: #fff;
    border-bottom-right-radius: 8px;
    box-shadow: 0 16px 28px rgba(25, 22, 16, 0.18);
  }

  .chat-bubble.system {
    background: linear-gradient(180deg, rgba(31, 138, 87, 0.08), rgba(31, 138, 87, 0.05));
    border: 1px solid rgba(31, 138, 87, 0.14);
  }

  .chat-score {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(31, 138, 87, 0.12);
    color: #166844;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .chat-typing {
    display: inline-flex;
    gap: 6px;
    padding: 16px 18px;
    border-radius: 22px;
    border-bottom-left-radius: 8px;
    background: #fff;
    border: 1px solid rgba(27, 24, 17, 0.08);
  }

  .chat-typing span {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: #b8b0a2;
    animation: chatBounce 1.2s ease-in-out infinite;
  }

  .chat-typing span:nth-child(2) { animation-delay: 0.15s; }
  .chat-typing span:nth-child(3) { animation-delay: 0.3s; }

  @keyframes chatBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.45; }
    30% { transform: translateY(-5px); opacity: 1; }
  }

  .chat-compose {
    padding: 18px 24px 24px;
    border-top: 1px solid rgba(27, 24, 17, 0.08);
    background: rgba(255, 255, 255, 0.88);
  }

  .chat-compose-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    align-items: end;
  }

  .chat-textarea {
    width: 100%;
    min-height: 112px;
    max-height: 240px;
    resize: vertical;
    border: 1px solid rgba(27, 24, 17, 0.12);
    border-radius: 20px;
    background: rgba(247, 243, 236, 0.95);
    padding: 16px 18px;
    color: #17140f;
    font: inherit;
    line-height: 1.6;
    box-sizing: border-box;
    outline: none;
    transition: border-color 160ms ease, background 160ms ease, box-shadow 160ms ease;
  }

  .chat-textarea:focus {
    border-color: rgba(17, 138, 178, 0.4);
    background: #fff;
    box-shadow: 0 0 0 4px rgba(17, 138, 178, 0.08);
  }

  .chat-actions {
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .chat-helper {
    color: #666055;
    font-size: 0.9rem;
  }

  .chat-button-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .chat-button,
  .chat-button-secondary {
    border: none;
    border-radius: 16px;
    padding: 13px 18px;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    transition: transform 160ms ease, opacity 160ms ease, box-shadow 160ms ease;
  }

  .chat-button {
    background: linear-gradient(135deg, #191610 0%, #2d2a23 100%);
    color: #fff;
    box-shadow: 0 14px 24px rgba(25, 22, 16, 0.18);
  }

  .chat-button-secondary {
    background: rgba(25, 22, 16, 0.06);
    color: #17140f;
  }

  .chat-button:hover,
  .chat-button-secondary:hover {
    transform: translateY(-1px);
  }

  .chat-button:disabled,
  .chat-button-secondary:disabled {
    opacity: 0.56;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .chat-side {
    border-radius: 28px;
    padding: 22px;
    position: sticky;
    top: 18px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .chat-side-card {
    padding: 18px;
    border-radius: 22px;
    background: rgba(247, 244, 239, 0.72);
    border: 1px solid rgba(27, 24, 17, 0.08);
  }

  .chat-side-card h3,
  .chat-side-card h4 {
    margin: 0;
    color: #17140f;
    font-family: 'Space Grotesk', sans-serif;
    letter-spacing: -0.03em;
  }

  .chat-side-card p {
    margin: 10px 0 0;
    color: #605a50;
    line-height: 1.65;
  }

  .chat-score-ring {
    width: 112px;
    height: 112px;
    border-radius: 999px;
    margin: 16px auto 0;
    display: grid;
    place-items: center;
    color: #17140f;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    background:
      radial-gradient(circle closest-side, #fff 74%, transparent 75% 100%),
      conic-gradient(#118ab2 calc(var(--score) * 10%), rgba(17, 138, 178, 0.12) 0);
  }

  .chat-list {
    display: grid;
    gap: 12px;
    margin-top: 14px;
  }

  .chat-list-item {
    padding: 14px;
    border-radius: 18px;
    background: #fff;
    border: 1px solid rgba(27, 24, 17, 0.08);
  }

  .chat-list-label {
    display: block;
    margin-bottom: 6px;
    color: #7b7468;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 700;
  }

  .chat-list-value {
    color: #18150f;
    line-height: 1.6;
  }

  @media (max-width: 1080px) {
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
      border-radius: 22px;
    }

    .chat-topbar,
    .chat-progress-wrap,
    .chat-messages,
    .chat-compose,
    .chat-side {
      padding-left: 16px;
      padding-right: 16px;
    }

    .chat-topbar {
      flex-direction: column;
      align-items: flex-start;
    }

    .chat-tags {
      justify-content: flex-start;
    }

    .chat-compose-row {
      grid-template-columns: 1fr;
    }

    .chat-bubble {
      max-width: 100%;
    }
  }
`;

const TOTAL_QUESTIONS = 10;

function formatLabel(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

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
            <div className="chat-topbar">
              <div className="chat-topbar-left">
                <div className="chat-avatar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 4.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z" fill="currentColor" />
                    <path d="M5.5 18c.56-2.83 3.01-4.75 6.5-4.75S17.94 15.17 18.5 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h2 className="chat-title">AI Interview Studio</h2>
                  <p className="chat-status">
                    <span className="chat-status-dot" />
                    Live mock session with structured feedback
                  </p>
                </div>
              </div>

              <div className="chat-tags">
                <span className="chat-tag role">{formatLabel(role)}</span>
                <span className="chat-tag diff">{formatLabel(difficulty)}</span>
                <span className="chat-tag count">Question {Math.min(questionCount, TOTAL_QUESTIONS)} of {TOTAL_QUESTIONS}</span>
              </div>
            </div>

            <div className="chat-progress-wrap">
              <div className="chat-progress-head">
                <span>Interview progress</span>
                <span>{progressValue}/{TOTAL_QUESTIONS} questions</span>
              </div>
              <div className="chat-progress-track">
                <div className="chat-progress-fill" style={{ width: progressWidth }} />
              </div>
            </div>

            {error ? <div className="chat-alert error">{error}</div> : null}
            {interviewComplete ? (
              <div className="chat-alert success">
                The session has ended. You can still generate the final report or reset and start another round.
              </div>
            ) : null}

            <div className="chat-messages">
              {messages.map((message, index) => {
                const isUser = message.sender === "You";
                const bubbleClass = message.type === "system" ? "chat-bubble ai system" : `chat-bubble ${isUser ? "user" : "ai"}`;

                return (
                  <div key={`${message.sender}-${index}`} className={`chat-row ${isUser ? "user" : ""}`}>
                    <div className={`chat-msg-avatar ${isUser ? "user" : "ai"}`}>{isUser ? "You" : "AI"}</div>
                    <div className={bubbleClass}>
                      {typeof message.score === "number" ? (
                        <div className="chat-score">Score {message.score}/10</div>
                      ) : null}
                      {message.text}
                    </div>
                  </div>
                );
              })}

              {loading ? (
                <div className="chat-row">
                  <div className="chat-msg-avatar ai">AI</div>
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
              <div className="chat-compose-row">
                <textarea
                  className="chat-textarea"
                  placeholder="Write your answer here. Use Ctrl + Enter to send."
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading || interviewComplete}
                />
                <button
                  className="chat-button"
                  type="button"
                  onClick={onSend}
                  disabled={loading || interviewComplete || !input.trim()}
                >
                  Send answer
                </button>
              </div>

              <div className="chat-actions">
                <div className="chat-helper">Keep answers clear, structured, and a little conversational. That usually scores better.</div>
                <div className="chat-button-row">
                  <button className="chat-button-secondary" type="button" onClick={onGetReport} disabled={loading}>
                    Get final report
                  </button>
                  <button className="chat-button-secondary" type="button" onClick={onReset} disabled={loading}>
                    New session
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="chat-side">
            <div className="chat-side-card">
              <h3>Session snapshot</h3>
              <div className="chat-list">
                <div className="chat-list-item">
                  <span className="chat-list-label">Current role</span>
                  <div className="chat-list-value">{formatLabel(role)}</div>
                </div>
                <div className="chat-list-item">
                  <span className="chat-list-label">Difficulty</span>
                  <div className="chat-list-value">{formatLabel(difficulty)}</div>
                </div>
                <div className="chat-list-item">
                  <span className="chat-list-label">Messages in session</span>
                  <div className="chat-list-value">{messages.length} conversation entries</div>
                </div>
              </div>
            </div>

            <div className="chat-side-card">
              <h3>How to answer well</h3>
              <p>
                Start with the core idea, add one concrete example, then mention an edge case or tradeoff.
              </p>
            </div>

            <div className="chat-side-card">
              <h3>Final report</h3>
              {report ? (
                <>
                  <div className="chat-score-ring" style={{ "--score": report.overallScore }}>
                    {report.overallScore}
                  </div>
                  <div className="chat-list">
                    <div className="chat-list-item">
                      <span className="chat-list-label">Strengths</span>
                      <div className="chat-list-value">{report.strengths}</div>
                    </div>
                    <div className="chat-list-item">
                      <span className="chat-list-label">Weaknesses</span>
                      <div className="chat-list-value">{report.weaknesses}</div>
                    </div>
                    <div className="chat-list-item">
                      <span className="chat-list-label">Suggestions</span>
                      <div className="chat-list-value">{report.suggestions}</div>
                    </div>
                  </div>
                </>
              ) : (
                <p>
                  Generate the report after you have answered at least one question. It will appear here with your overall score and improvement notes.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default InterviewChat;
