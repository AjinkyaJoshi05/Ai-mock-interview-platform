import { generateQuestion } from "../services/aiService.js";
import { evaluateAnswer } from "../services/aiService.js";


let interviewState = {};

const startInterview = async (req, res) => {
  try {
    const { role } = req.body;

    const question = await generateQuestion(role);
    console.log(question)

    interviewState = {
      role,
      history: [],
      currentQuestion : question
    };

    res.json({ question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const submitAnswer = async (req, res) => {
  try {
    const { answer } = req.body;
    const question = interviewState.currentQuestion;

    const result = await evaluateAnswer(question, answer,interviewState.history);
    console.log(result.score)
    
    interviewState.history.push({
      question,
      answer,
      score: result.score,
      feedback: result.feedback
    })

    interviewState.currentQuestion = result.nextQuestion;
    
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export {startInterview, submitAnswer}