import  {GoogleGenerativeAI} from '@google/generative-ai';
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
console.log(process.env.GEMINI_API_KEY)

const generateQuestion = async (role) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are a technical interviewer.
        Ask ONE interview question for a ${role} role.
        Keep it concise. start with a moderate/beginner friendly question`;

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

const evaluateAnswer = async (question, answer, history) => {
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

        Current Question: ${question}
        Candidate Answer: ${answer}

        Evaluate the answer fairly (not overly strict).

        Rules:
        - Give balanced evaluation (mention both strengths and weaknesses)
        - Do NOT be overly harsh
        - Provide constructive feedback with hints for improvement
        - If answer is partially correct, reward it appropriately


        Respond ONLY in JSON format:
        {
            "score": number (0-10),
            "feedback": "2-3 lines of feedback",
            "nextQuestion": "next relevant question"
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

export {generateQuestion, evaluateAnswer}