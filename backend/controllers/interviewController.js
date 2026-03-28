import { generateQuestion } from "../services/aiService.js";
import { evaluateAnswer } from "../services/aiService.js";
import {generateReport} from "../services/aiService.js";


let interviewState = {};

const startInterview = async (req, res) => {
  try {
    const { role,difficulty } = req.body;

    const question = await generateQuestion(role,difficulty);
    console.log(question)

    interviewState = {
      role,
      difficulty,
      history: [],
      currentQuestion : question,
      questionNumber: 1
    };

    res.json({
    success: true,
    data: {
      question
    }
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const submitAnswer = async (req, res) => {
  try {
    if (!interviewState.currentQuestion) {
      return res.status(400).json({
        error: "Interview not started"
      });
    }

    if (interviewState.history.length >= 10) {
      return res.json({
        success: true,
        end: true,
        message: "Interview completed"
      });
    }

    const { answer } = req.body;
    const question = interviewState.currentQuestion;

    const result = await evaluateAnswer(question, answer,interviewState.history,interviewState.difficulty);
    console.log(result.score)
    
    interviewState.history.push({
      question,
      answer,
      score: result.score,
      feedback: result.feedback
    })

    interviewState.currentQuestion = result.nextQuestion;
    interviewState.questionNumber += 1;

    // res.json(result);
    res.json({
      success: true,
      data: {
        ...result,
        questionNumber: interviewState.questionNumber
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getReport = async(req,res) => {
  try{
    const history = interviewState.history;
    if (!history || history.length===0){
      return res.status(400).json({error: "No interview data found"});
    }

    const report = await generateReport(history);
    console.log("report generated")
    res.json({
      "success" : true,
      "data" : report
    })
  } catch (error){
    console.error(error);
    res.status(500).json({error: "Something went wrong"});
  }
};

export {startInterview, submitAnswer, getReport}