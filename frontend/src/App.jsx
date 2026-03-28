import { useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const startInterview = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/interview/start",
        {
          role: "backend",
          difficulty: "medium"
        }
      );

      const question = res.data.data.question;

      setMessages([{ sender: "AI", text: question }]);
      setStarted(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const sendAnswer = async () => {
    if (!input) return;

    const userMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/interview/answer",
        {
          answer: input
        }
      );

      // Handle interview end
      if (res.data.end) {
        setMessages((prev) => [
          ...prev,
          { sender: "AI", text: "Interview completed 🎉" }
        ]);
        return;
      }

      const { feedback, nextQuestion, score } = res.data.data;

      const aiMessage = {
        sender: "AI",
        text: `Score: ${score}/10\n\n${feedback}\n\nNext: ${nextQuestion}`
      };

      setMessages((prev) => [...prev, aiMessage]);
      setInput("");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getReport = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/interview/report"
      );

      setReport(res.data.data);
    } catch (error) {
        console.error(error);
    }
    setLoading(false);
  };
  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>AI Mock Interview</h2>

      {/* Start Screen */}
      {!started && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <button onClick={startInterview} style={{ padding: "15px 25px" }}>
            Start Interview
          </button>
        </div>
      )}

      {/* Chat Messages */}
      <div style={{ marginTop: "20px" }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "You" ? "flex-end" : "flex-start",
              marginBottom: "10px"
            }}
          >
            <div
              style={{
                padding: "10px",
                borderRadius: "10px",
                maxWidth: "70%",
                backgroundColor:
                  msg.sender === "You" ? "#4CAF50" : "#e0e0e0",
                color: msg.sender === "You" ? "white" : "black"
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#e0e0e0",
                fontStyle: "italic"
              }}
            >
              AI is typing...
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      {started && (
        <div style={{ display: "flex", marginTop: "20px", gap: "10px" }}>
          <input
            style={{ flex: 1, padding: "10px" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
          />
          <button onClick={sendAnswer} disabled={loading} style={{ padding: "10px 15px" }}>
            Send
          </button>
        </div>
      )}

      {/* Report Button */}
      {started && (
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <button onClick={getReport} style={{ padding: "10px 20px" }}>
            Get Final Report
          </button>
        </div>
      )}

      {/* Report Section */}
      {report && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#f0f8ff",
            border: "1px solid #4CAF50"
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
            Interview Report
          </h3>

          <p><b>Overall Score:</b> {report.overallScore}</p>
          <p><b>Strengths:</b> {report.strengths}</p>
          <p><b>Weaknesses:</b> {report.weaknesses}</p>
          <p><b>Suggestions:</b> {report.suggestions}</p>
        </div>
      )}
    </div>
  </div>
  );
}

export default App;