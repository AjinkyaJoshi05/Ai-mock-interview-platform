# AI Mock Interview Platform

An intelligent AI-powered mock interview platform designed to help users practice technical interviews through structured questions, automated evaluation, and real-time interaction.

---

## 🚀 Features

- 🎯 Role-based interviews (5+ roles)
- 📊 Difficulty levels (Easy, Medium, Hard)
- 🤖 LLM-based question generation (Gemini API)
- 🧠 Context-aware follow-up questions
- 📈 Scoring system (1–10 per question)
- 📝 Detailed performance reports
- 🔁 Retry logic + rate limit handling
- ⚡ Pre-generated question caching

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* REST APIs

### Frontend

* HTML, CSS, JavaScript
* React

### AI Integration

* Gemini API / LLM-based responses

### Tools

* Git, GitHub
* Postman (API testing)

--- 

## 📂 Project Structure




## 📁 Project Structure

```
RESUME-PROJECT/
├── backend/
│   ├── controllers/
│   ├── node_modules/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── app.js
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── interviewChat.jsx
│       ├── main.jsx
│       └── setupScreen.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
├── .gitignore
└── readme.md
```

---

## ⚡ Key Highlights

- Built an evaluation engine for multi-turn interview sessions (8–10 questions/session)
- Implemented retry + throttling to handle API rate limits (HTTP 429/503)
- Designed structured scoring and feedback generation system
- Developed stateful chat UI for seamless interview flow

---

## 🧠 Learnings

- Working with LLM APIs in production scenarios
- Handling rate limits and failures gracefully
- Designing conversational workflows
- Building evaluation systems for AI outputs

---

## ▶️ Setup & Run

```bash
# Clone the repository
git clone <repo-url>
cd ai-mock-interview
```

### 🖥️ Start Backend
```bash
cd backend
npm install
node server.js
```

### 🎨 Start Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📌 Future Improvements

- [ ] Add voice-based interviews
- [ ] Add resume and JD based interviews
- [ ] Integrate more LLM providers
- [ ] Improve evaluation accuracy using fine-tuned models
