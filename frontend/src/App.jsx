import { useState } from "react";
import axios from "axios";
import SetupScreen from "./setupScreen";
import InterviewChat from "./interviewChat";


const API_BASE_URL = import.meta.env.VITE_API_URL

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [questionCount, setQuestionCount] = useState(1);
  const [interviewComplete, setInterviewComplete] = useState(false);

  const [role, setRole] = useState("backend");
  const [difficulty, setDifficulty] = useState("medium");

  const resetInterview = () => {
    setMessages([]);
    setInput("");
    setStarted(false);
    setLoading(false);
    setReport(null);
    setError("");
    setQuestionCount(1);
    setInterviewComplete(false);
  };

  const startInterview = async () => {
    setLoading(true);
    setError("");
    setReport(null);
    setInterviewComplete(false);

    try {
      const res = await axios.post(`${API_BASE_URL}/start`, {
        role,
        difficulty,
      });

      setMessages([
        {
          sender: "AI",
          type: "question",
          text: res.data.data.question,
        },
      ]);
      setQuestionCount(1);
      setStarted(true);
      setInput("");
    } catch (requestError) {
      console.error(requestError);
      setError("Could not start the interview. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const sendAnswer = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading || interviewComplete) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      { sender: "You", type: "answer", text: trimmedInput },
    ]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_BASE_URL}/answer`, {
        answer: trimmedInput,
      });

      if (res.data.end) {
        setInterviewComplete(true);
        setMessages((prev) => [
          ...prev,
          {
            sender: "AI",
            type: "system",
            text: "Interview completed. Review your report or start a fresh session.",
          },
        ]);
        return;
      }

      const {
        feedback,
        nextQuestion,
        score,
        questionNumber: nextQuestionNumber,
      } = res.data.data;

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          type: "feedback",
          score,
          feedback,
          nextQuestion,
          text: `${feedback}\n\nNext question: ${nextQuestion}`,
        },
      ]);
      setQuestionCount((prev) => nextQuestionNumber ?? prev + 1);
    } catch (requestError) {
      console.error(requestError);
      setError("Your answer could not be submitted. Please try again.");
      setInput(trimmedInput);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const getReport = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${API_BASE_URL}/report`);
      setReport(res.data.data);
    } catch (requestError) {
      console.error(requestError);
      setError("No report is available yet. Complete at least one answer first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-shell">
      {!started ? (
        <SetupScreen
          role={role}
          setRole={setRole}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onStart={startInterview}
          loading={loading}
          error={error}
        />
      ) : (
        <InterviewChat
          messages={messages}
          input={input}
          setInput={setInput}
          onSend={sendAnswer}
          onGetReport={getReport}
          onReset={resetInterview}
          loading={loading}
          role={role}
          difficulty={difficulty}
          questionCount={questionCount}
          report={report}
          error={error}
          interviewComplete={interviewComplete}
        />
      )}
    </main>
  );
}

export default App;
