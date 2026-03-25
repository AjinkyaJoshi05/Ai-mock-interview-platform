import { generateQuestion } from "../services/aiService.js";
import { evaluateAnswer } from "../services/aiService.js";

const startInterview = async (req, res) => {
  try {
    const { role } = req.body;

    const question = await generateQuestion(role);
    console.log(question)
    res.json({ question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const submitAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const result = await evaluateAnswer(question, answer);
    console.log(result.score)
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export {startInterview, submitAnswer}