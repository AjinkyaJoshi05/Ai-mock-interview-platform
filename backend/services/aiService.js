import axios from 'axios';
import  {GoogleGenerativeAI} from '@google/generative-ai';
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
// console.log(process.env.GEMINI_API_KEY)

const generateQuestion = async (role,difficulty) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are a technical interviewer.
        Ask ONE interview question for a ${role} role.
        Keep it concise. start with a ${difficulty} difficulty`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error(error);
        return "Error generating question";
    }

//   if (role === "backend") {
//     return "What is REST API and why is it stateless?";
//   }

//   if (role === "dsa") {
//     return "Explain time complexity of binary search.";
//   }

//   return "Tell me about yourself.";
};

const evaluateAnswer = async (question, answer, history,difficulty) => {
  // simple mock logic for now
    const historyText = history.map((item,index)=>{
        `
        Q${index + 1}: ${item.question}
        A${index + 1}: ${item.answer}
        `
    }).join("\n");
    try {
        const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});
        const prompt = `You are a professional technical interviewer.
        Previous conversation:
        ${historyText}
        difficulty = ${difficulty}

        Current Question: ${question}
        Candidate Answer: ${answer}

        Evaluate the answer fairly (not overly strict) based on the difficulty

        Rules:
        - Give balanced evaluation (mention both strengths and weaknesses)
        - Do NOT be overly harsh
        - Provide constructive feedback with hints for improvement
        - If answer is partially correct, reward it appropriately


        Respond ONLY in JSON format:
        {
            "score": number (0-10),
            "feedback": "2-3 lines of feedback",
            "nextQuestion": "next relevant question based on difficulty"
        }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // clean json to required format
        const cleanText = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleanText);
        return parsed;
    } catch (error) {
        console.error(error);

        return {
            score: 5,
            feedback: "Error evaluating answer",
            nextQuestion: "Explain REST API."
        };
    }
//   let score = 5;

//   if (answer && answer.length > 10) {
//     score = 8;
//   }

//   return {
//     score,
//     feedback: "Good attempt. Try to include more technical depth.",
//     nextQuestion: "What is JWT and how does it work?"
//   };
};

const generateReport = async(history) =>{
    try{
        const historyText = history.map((item, index) => `
        Q${index + 1}: ${item.question}
        A${index + 1}: ${item.answer}
        Score: ${item.score}
        `).join("\n");

        const prompt = `
            You are an expert interviewer.

            Here is a candidate's interview performance:

            ${historyText}

            Analyze overall performance.

            Respond ONLY in JSON format:
            {
            "overallScore": number (0-10),
            "strengths": "2-3 points",
            "weaknesses": "2-3 points",
            "suggestions": "how to improve"
            }
        `

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents : [
                    {
                        parts: [{text : prompt}]
                    }
                ]
            }
        );

        const text = response.data.candidates[0].content.parts[0].text;
        const cleanText = text.replace(/```json|```/g, "").trim();
        return JSON.parse(cleanText);
        
    } catch (error) {
        console.error(error);
        return {
            overallScore: 6,
            strengths: "Basic understanding",
            weaknesses: "Needs improvement",
            suggestions: "Practice more"
        };
    }
};

export {generateQuestion, evaluateAnswer, generateReport}