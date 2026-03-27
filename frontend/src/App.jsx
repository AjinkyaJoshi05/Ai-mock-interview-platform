import { useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);

  const startInterview = async () => {
    const res = await axios.post("http://localhost:5000/api/interview/start", {
      role: "backend",
      difficulty: "medium"
    });

    const question = res.data.data.question;

    setMessages([{ sender: "AI", text: question }]);
    setStarted(true);
  };

  const sendAnswer = async () => {
    if (!input) return;

    const userMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const res = await axios.post("http://localhost:5000/api/interview/answer", {
      answer: input
    });

    const { feedback, nextQuestion } = res.data.data;

    const aiMessage = {
      sender: "AI",
      text: `${feedback}\n\nNext: ${nextQuestion}`
    };

    setMessages((prev) => [...prev, aiMessage]);
    setInput("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Mock Interview</h2>

      {!started && (
        <button onClick={startInterview}>Start Interview</button>
      )}

      <div style={{ marginTop: "20px" }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>

      {started && (
        <>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
          />
          <button onClick={sendAnswer}>Send</button>
        </>
      )}
    </div>
  );
}

export default App;