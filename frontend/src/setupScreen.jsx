import React from "react";

const setupStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap');

  .setup-root {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 32px 18px;
    background:
      radial-gradient(circle at top left, rgba(242, 103, 34, 0.18), transparent 28%),
      radial-gradient(circle at bottom right, rgba(17, 138, 178, 0.18), transparent 32%),
      linear-gradient(135deg, #f7efe2 0%, #f5f7fb 55%, #eef4ef 100%);
    font-family: 'DM Sans', sans-serif;
  }

  .setup-shell {
    width: min(1120px, 100%);
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
    gap: 24px;
    align-items: stretch;
  }

  .setup-hero,
  .setup-panel {
    border: 1px solid rgba(32, 30, 24, 0.08);
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    box-shadow: 0 24px 60px rgba(24, 24, 19, 0.08);
  }

  .setup-hero {
    border-radius: 32px;
    padding: 36px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 620px;
  }

  .setup-hero::after {
    content: "";
    position: absolute;
    inset: auto -80px -110px auto;
    width: 280px;
    height: 280px;
    border-radius: 999px;
    background: linear-gradient(135deg, rgba(242, 103, 34, 0.2), rgba(17, 138, 178, 0.08));
    filter: blur(8px);
  }

  .setup-kicker {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    border-radius: 999px;
    background: rgba(17, 138, 178, 0.1);
    color: #0f617d;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .setup-kicker-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #0f617d;
    animation: setupPulse 1.6s ease-in-out infinite;
  }

  @keyframes setupPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.45; transform: scale(0.9); }
  }

  .setup-heading {
    max-width: 600px;
    margin-top: 28px;
  }

  .setup-title {
    margin: 0;
    color: #191610;
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.5rem, 5vw, 4.6rem);
    line-height: 0.96;
    letter-spacing: -0.05em;
  }

  .setup-subtitle {
    margin: 18px 0 0;
    max-width: 560px;
    color: #5a564d;
    font-size: 1rem;
    line-height: 1.7;
  }

  .setup-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-top: 34px;
  }

  .setup-stat {
    padding: 16px;
    border-radius: 20px;
    background: rgba(25, 22, 16, 0.04);
    border: 1px solid rgba(25, 22, 16, 0.06);
  }

  .setup-stat-label {
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #777167;
  }

  .setup-stat-value {
    display: block;
    margin-top: 8px;
    color: #191610;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .setup-feature-list {
    display: grid;
    gap: 12px;
    margin-top: 34px;
  }

  .setup-feature {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 14px 16px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(25, 22, 16, 0.06);
  }

  .setup-feature-icon {
    width: 38px;
    height: 38px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: #191610;
    color: #fff;
    flex-shrink: 0;
  }

  .setup-feature-title {
    margin: 0;
    color: #191610;
    font-weight: 700;
    font-size: 0.96rem;
  }

  .setup-feature-copy {
    margin: 4px 0 0;
    color: #605b52;
    line-height: 1.55;
    font-size: 0.94rem;
  }

  .setup-panel {
    border-radius: 28px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .setup-panel-head h2 {
    margin: 0;
    color: #191610;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.8rem;
    letter-spacing: -0.04em;
  }

  .setup-panel-head p {
    margin: 10px 0 0;
    color: #625d54;
    line-height: 1.65;
  }

  .setup-section {
    margin-top: 28px;
  }

  .setup-label {
    display: block;
    margin-bottom: 12px;
    color: #6d685e;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 700;
  }

  .setup-options {
    display: grid;
    gap: 12px;
  }

  .setup-options.roles {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .setup-options.difficulty {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .setup-option {
    text-align: left;
    padding: 16px 14px;
    border-radius: 18px;
    border: 1px solid rgba(25, 22, 16, 0.1);
    background: #fff;
    cursor: pointer;
    transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
  }

  .setup-option:hover {
    transform: translateY(-2px);
    border-color: rgba(25, 22, 16, 0.2);
    box-shadow: 0 14px 28px rgba(25, 22, 16, 0.08);
  }

  .setup-option.is-selected {
    background: linear-gradient(180deg, rgba(17, 138, 178, 0.08), rgba(242, 103, 34, 0.08));
    border-color: rgba(17, 138, 178, 0.35);
    box-shadow: 0 16px 30px rgba(17, 138, 178, 0.12);
  }

  .setup-option-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .setup-option-title {
    color: #191610;
    font-weight: 700;
    font-size: 0.98rem;
  }

  .setup-option-copy {
    margin: 8px 0 0;
    color: #6b655c;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .setup-pill {
    min-width: 30px;
    height: 30px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    background: rgba(25, 22, 16, 0.06);
    color: #191610;
    font-size: 13px;
    font-weight: 700;
  }

  .setup-action {
    margin-top: 28px;
  }

  .setup-button {
    width: 100%;
    border: none;
    border-radius: 18px;
    padding: 16px 20px;
    background: linear-gradient(135deg, #191610 0%, #2d2a23 100%);
    color: #fff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 18px 28px rgba(25, 22, 16, 0.2);
    transition: transform 160ms ease, opacity 160ms ease;
  }

  .setup-button:hover {
    transform: translateY(-2px);
  }

  .setup-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .setup-footnote {
    margin-top: 14px;
    color: #716b61;
    text-align: center;
    font-size: 0.92rem;
  }

  .setup-error {
    margin-top: 14px;
    padding: 12px 14px;
    border-radius: 16px;
    background: rgba(183, 45, 49, 0.08);
    border: 1px solid rgba(183, 45, 49, 0.14);
    color: #9f2c30;
    font-size: 0.92rem;
    line-height: 1.5;
  }

  @media (max-width: 980px) {
    .setup-shell {
      grid-template-columns: 1fr;
    }

    .setup-hero {
      min-height: auto;
    }
  }

  @media (max-width: 640px) {
    .setup-root {
      padding: 18px 12px;
    }

    .setup-hero,
    .setup-panel {
      padding: 22px;
      border-radius: 24px;
    }

    .setup-grid,
    .setup-options.roles,
    .setup-options.difficulty {
      grid-template-columns: 1fr;
    }
  }
`;

const ROLES = [
  {
    value: "backend",
    label: "Backend",
    hint: "APIs, databases, auth, performance",
    short: "BE",
  },
  {
    value: "frontend",
    label: "Frontend",
    hint: "React, UI thinking, state, accessibility",
    short: "FE",
  },
  {
    value: "fullstack",
    label: "Full Stack",
    hint: "System tradeoffs across client and server",
    short: "FS",
  },
  {
    value: "dsa",
    label: "DSA",
    hint: "Problem solving, complexity, patterns",
    short: "DS",
  },
];

const DIFFICULTIES = [
  {
    value: "easy",
    label: "Easy",
    hint: "Warm up with fundamentals",
    short: "01",
  },
  {
    value: "medium",
    label: "Medium",
    hint: "Balanced practical depth",
    short: "02",
  },
  {
    value: "hard",
    label: "Hard",
    hint: "Push on edge cases and tradeoffs",
    short: "03",
  },
];

function SetupScreen({ role, setRole, difficulty, setDifficulty, onStart, loading, error }) {
  return (
    <>
      <style>{setupStyles}</style>
      <section className="setup-root">
        <div className="setup-shell">
          <div className="setup-hero">
            <div>
              <div className="setup-kicker">
                <span className="setup-kicker-dot" />
                AI mock interview workspace
              </div>

              <div className="setup-heading">
                <h1 className="setup-title">Practice like the interview already matters.</h1>
                <p className="setup-subtitle">
                  Build confidence with realistic technical questions, instant feedback,
                  and a session flow that feels closer to a real interview than a plain chat box.
                </p>
              </div>

              <div className="setup-grid">
                <div className="setup-stat">
                  <span className="setup-stat-label">Session mode</span>
                  <span className="setup-stat-value">Adaptive Q and A</span>
                </div>
                <div className="setup-stat">
                  <span className="setup-stat-label">Feedback loop</span>
                  <span className="setup-stat-value">Score plus coaching</span>
                </div>
                <div className="setup-stat">
                  <span className="setup-stat-label">Best for</span>
                  <span className="setup-stat-value">Portfolio prep</span>
                </div>
              </div>
            </div>

            <div className="setup-feature-list">
              <div className="setup-feature">
                <div className="setup-feature-icon">01</div>
                <div>
                  <p className="setup-feature-title">Role-specific prompts</p>
                  <p className="setup-feature-copy">
                    Choose the track you want to practice so the interviewer stays focused on the work you are targeting.
                  </p>
                </div>
              </div>
              <div className="setup-feature">
                <div className="setup-feature-icon">02</div>
                <div>
                  <p className="setup-feature-title">Immediate feedback</p>
                  <p className="setup-feature-copy">
                    Every response comes back with a score, guidance, and the next question to keep momentum high.
                  </p>
                </div>
              </div>
              <div className="setup-feature">
                <div className="setup-feature-icon">03</div>
                <div>
                  <p className="setup-feature-title">Final interview report</p>
                  <p className="setup-feature-copy">
                    End the session with a summary you can actually use to improve your next answer set.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="setup-panel">
            <div>
              <div className="setup-panel-head">
                <h2>Configure your round</h2>
                <p>
                  Pick a role and difficulty, then start the interview. Your backend flow stays exactly as it is.
                </p>
              </div>

              <div className="setup-section">
                <span className="setup-label">Role focus</span>
                <div className="setup-options roles">
                  {ROLES.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className={`setup-option ${role === item.value ? "is-selected" : ""}`}
                      onClick={() => setRole(item.value)}
                    >
                      <div className="setup-option-top">
                        <span className="setup-option-title">{item.label}</span>
                        <span className="setup-pill">{item.short}</span>
                      </div>
                      <p className="setup-option-copy">{item.hint}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="setup-section">
                <span className="setup-label">Difficulty</span>
                <div className="setup-options difficulty">
                  {DIFFICULTIES.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className={`setup-option ${difficulty === item.value ? "is-selected" : ""}`}
                      onClick={() => setDifficulty(item.value)}
                    >
                      <div className="setup-option-top">
                        <span className="setup-option-title">{item.label}</span>
                        <span className="setup-pill">{item.short}</span>
                      </div>
                      <p className="setup-option-copy">{item.hint}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="setup-action">
              <button className="setup-button" type="button" onClick={onStart} disabled={loading}>
                {loading ? "Starting interview..." : "Start interview session"}
              </button>
              {error ? <div className="setup-error">{error}</div> : null}
              <p className="setup-footnote">You can request the final report any time after answering at least one question.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SetupScreen;
