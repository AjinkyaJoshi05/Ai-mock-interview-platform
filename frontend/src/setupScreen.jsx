const setupStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

  .setup-root {
    min-height: 100vh;
    padding: 32px 18px;
    background: #f3f1ec;
    color: #181714;
    font-family: 'Manrope', sans-serif;
  }

  .setup-shell {
    width: min(1080px, 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
    gap: 20px;
    align-items: start;
  }

  .setup-main,
  .setup-side {
    background: #fcfbf8;
    border: 1px solid #ddd7cd;
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(27, 25, 20, 0.04);
  }

  .setup-main {
    padding: 28px;
  }

  .setup-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: 999px;
    background: #efe9de;
    color: #5f5648;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .setup-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #5f5648;
  }

  .setup-title {
    margin: 18px 0 10px;
    font-size: clamp(2rem, 4vw, 3.2rem);
    line-height: 1.02;
    letter-spacing: -0.05em;
    font-weight: 700;
  }

  .setup-copy {
    margin: 0;
    max-width: 620px;
    color: #5f584c;
    line-height: 1.65;
    font-size: 1rem;
  }

  .setup-section {
    margin-top: 28px;
  }

  .setup-label {
    display: block;
    margin-bottom: 12px;
    color: #70685b;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .setup-grid {
    display: grid;
    gap: 12px;
  }

  .setup-grid.roles {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .setup-grid.difficulty {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .setup-option {
    width: 100%;
    padding: 16px;
    border: 1px solid #ddd7cd;
    border-radius: 16px;
    background: #ffffff;
    text-align: left;
    cursor: pointer;
    transition: border-color 140ms ease, background 140ms ease, transform 140ms ease;
  }

  .setup-option:hover {
    border-color: #b8ae9d;
    transform: translateY(-1px);
  }

  .setup-option.is-selected {
    border-color: #181714;
    background: #f4f0e8;
  }

  .setup-option-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .setup-option-title {
    font-size: 1rem;
    font-weight: 700;
    color: #181714;
  }

  .setup-option-short {
    color: #766d61;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
  }

  .setup-option-copy {
    margin: 8px 0 0;
    color: #615a4f;
    line-height: 1.5;
    font-size: 0.92rem;
  }

  .setup-actions {
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .setup-button {
    border: none;
    border-radius: 16px;
    padding: 15px 18px;
    background: #181714;
    color: #fff;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 140ms ease, transform 140ms ease;
  }

  .setup-button:hover {
    transform: translateY(-1px);
  }

  .setup-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .setup-error {
    padding: 12px 14px;
    border-radius: 14px;
    background: #f7e8e7;
    border: 1px solid #e8c1bf;
    color: #8b3a35;
    font-size: 0.92rem;
    line-height: 1.5;
  }

  .setup-note {
    color: #6b6357;
    font-size: 0.92rem;
    line-height: 1.55;
  }

  .setup-side {
    padding: 22px;
  }

  .setup-side-title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  .setup-list {
    margin-top: 18px;
    display: grid;
    gap: 12px;
  }

  .setup-list-item {
    padding: 14px 0;
    border-top: 1px solid #e5ded3;
  }

  .setup-list-item:first-child {
    border-top: none;
    padding-top: 0;
  }

  .setup-list-label {
    display: block;
    color: #746c5f;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .setup-list-value {
    margin-top: 6px;
    color: #1f1d19;
    line-height: 1.55;
  }

  @media (max-width: 920px) {
    .setup-shell {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .setup-root {
      padding: 14px;
    }

    .setup-main,
    .setup-side {
      padding: 18px;
      border-radius: 18px;
    }

    .setup-grid.roles,
    .setup-grid.difficulty {
      grid-template-columns: 1fr;
    }
  }
`;

const ROLES = [
  {
    value: "backend",
    label: "Backend",
    hint: "APIs, databases, authentication, and server-side design.",
    short: "BE",
  },
  {
    value: "frontend",
    label: "Frontend",
    hint: "React, state, UI structure, performance, and accessibility.",
    short: "FE",
  },
  {
    value: "fullstack",
    label: "Full Stack",
    hint: "Questions that move between client and server tradeoffs.",
    short: "FS",
  },
  {
    value: "dsa",
    label: "DSA",
    hint: "Problem solving, time complexity, and algorithm patterns.",
    short: "DS",
  },
];

const DIFFICULTIES = [
  {
    value: "easy",
    label: "Easy",
    hint: "Foundational questions and lighter follow-ups.",
    short: "01",
  },
  {
    value: "medium",
    label: "Medium",
    hint: "Balanced difficulty with practical depth.",
    short: "02",
  },
  {
    value: "hard",
    label: "Hard",
    hint: "More detailed reasoning and edge-case discussion.",
    short: "03",
  },
];

function SetupScreen({ role, setRole, difficulty, setDifficulty, onStart, loading, error }) {
  return (
    <>
      <style>{setupStyles}</style>
      <section className="setup-root">
        <div className="setup-shell">
          <div className="setup-main">
            <div className="setup-eyebrow">
              <span className="setup-dot" />
              Mock interview
            </div>
            <h1 className="setup-title">Set up your interview round.</h1>
            <p className="setup-copy">
              Choose the role and difficulty you want to practice. The session will start with one question,
              then continue with feedback and follow-up questions based on your answers.
            </p>

            <div className="setup-section">
              <span className="setup-label">Role</span>
              <div className="setup-grid roles">
                {ROLES.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`setup-option ${role === item.value ? "is-selected" : ""}`}
                    onClick={() => setRole(item.value)}
                  >
                    <div className="setup-option-top">
                      <span className="setup-option-title">{item.label}</span>
                      <span className="setup-option-short">{item.short}</span>
                    </div>
                    <p className="setup-option-copy">{item.hint}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="setup-section">
              <span className="setup-label">Difficulty</span>
              <div className="setup-grid difficulty">
                {DIFFICULTIES.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`setup-option ${difficulty === item.value ? "is-selected" : ""}`}
                    onClick={() => setDifficulty(item.value)}
                  >
                    <div className="setup-option-top">
                      <span className="setup-option-title">{item.label}</span>
                      <span className="setup-option-short">{item.short}</span>
                    </div>
                    <p className="setup-option-copy">{item.hint}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="setup-actions">
              <button className="setup-button" type="button" onClick={onStart} disabled={loading}>
                {loading ? "Starting..." : "Start interview"}
              </button>
              {error ? <div className="setup-error">{error}</div> : null}
              <div className="setup-note">You can request the final report once you have answered at least one question.</div>
            </div>
          </div>

          <aside className="setup-side">
            <h2 className="setup-side-title">What this session includes</h2>
            <div className="setup-list">
              <div className="setup-list-item">
                <span className="setup-list-label">Question flow</span>
                <div className="setup-list-value">A role-specific starting question followed by feedback and the next question.</div>
              </div>
              <div className="setup-list-item">
                <span className="setup-list-label">Evaluation</span>
                <div className="setup-list-value">Each answer is scored and reviewed so you can see what to improve immediately.</div>
              </div>
              <div className="setup-list-item">
                <span className="setup-list-label">Final summary</span>
                <div className="setup-list-value">A report with strengths, weaknesses, suggestions, and an overall score.</div>
              </div>
              <div className="setup-list-item">
                <span className="setup-list-label">Best practice</span>
                <div className="setup-list-value">Answer in a clear structure: main point, example, then tradeoff or edge case.</div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default SetupScreen;
