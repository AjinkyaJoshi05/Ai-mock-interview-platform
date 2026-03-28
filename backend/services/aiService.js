// import axios from 'axios';
// import  {GoogleGenerativeAI} from '@google/generative-ai';
// import dotenv from "dotenv";
// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)


// // console.log(process.env.GEMINI_API_KEY)

// // helper function for handling API errors

// const callGemini = async (payload) => {
//   // Small delay to avoid burst rate limit
//   await new Promise(resolve => setTimeout(resolve, 1500));

//   try {
//     console.log("Calling Gemini API...");

//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       payload
//     );

//     return response.data;

//   } catch (error) {
//     console.log("Gemini API failed:", error.response?.status);

//     // Handle rate limit specifically
//     if (error.response?.status === 429) {
//       console.log("Rate limit hit — using fallback");
//       return null;   
//     }

//     // Other errors
//     return null;
//   }
// };

// const generateQuestion = async (role,difficulty) => {
//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//         const prompt = `You are a technical interviewer.
//         Ask ONE interview question for a ${role} role.
//         Keep it concise. start with a ${difficulty} difficulty`;
//          const payload = {
//             contents: [
//                 {
//                 parts: [{ text: prompt }]
//                 }
//             ]
//         };
//         // const result = await model.generateContent(prompt);
//          const response = await callGemini(payload);
//          if (!response) {
//             return "Explain REST API design principles.";
//         }
//         // const response = await result.response;
//         const text = response.candidates[0].content.parts[0].text;

//         return text;
//     } catch (error) {
//         console.error(error);
//         return "Can you explain REST API design principles and why idempotency is important?";
//     }

// //   if (role === "backend") {
// //     return "What is REST API and why is it stateless?";
// //   }

// //   if (role === "dsa") {
// //     return "Explain time complexity of binary search.";
// //   }

// //   return "Tell me about yourself.";
// };

// const evaluateAnswer = async (question, answer, history,difficulty) => {
//   // simple mock logic for now
//     const historyText = history.map((item,index)=>{
//         `
//         Q${index + 1}: ${item.question}
//         A${index + 1}: ${item.answer}
//         `
//     }).join("\n");
//     try {
//         const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});
//         const prompt = `You are a professional technical interviewer.
//         Previous conversation:
//         ${historyText}
//         difficulty = ${difficulty}

//         Current Question: ${question}
//         Candidate Answer: ${answer}

//         Evaluate the answer fairly (not overly strict) based on the difficulty

//         Rules:
//         - Give balanced evaluation (mention both strengths and weaknesses)
//         - Do NOT be overly harsh
//         - Provide constructive feedback with hints for improvement
//         - If answer is partially correct, reward it appropriately


//         Respond ONLY in JSON format:
//         {
//             "score": number (0-10),
//             "feedback": "2-3 lines of feedback",
//             "nextQuestion": "next relevant question based on difficulty"
//         }
//     `;
//         const payload = {
//         contents: [
//             {
//             parts: [{ text: prompt }]
//             }
//         ]
//         };

//         const response = await callGemini(payload);
//         if (!response) {
//         // dynamic fallback
//         const fallbackQuestions = [
//             "Explain REST API principles.",
//             "What is idempotency?",
//             "Difference between PUT and PATCH?",
//             "What are HTTP status codes?"
//         ];

//         return {
//                 score: 5,
//                 feedback:
//                 "Good attempt. Try adding more technical depth and real-world examples.",
//                 nextQuestion:
//                 fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]
//             };
//         }
//         const text = response.text();
        
//         // clean json to required format
//         const cleanText = text.replace(/```json|```/g, "").trim();
//         const parsed = JSON.parse(cleanText);
//         return parsed;
//     } catch (error) {
//         console.error(error);

//         const fallbackQuestions = [
//         "Explain REST API principles.",
//         "What is the difference between PUT and PATCH?",
//         "What is idempotency in REST APIs?",
//         "How does JWT authentication work?",
//         "What are HTTP status codes?"
//         ];

//         const randomQuestion =
//         fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)];

//         return {
//         score: 5,
//         feedback:
//             "Good attempt. You covered the basics, but try to include more technical depth and real-world examples.",
//         nextQuestion: randomQuestion
//         };

//         // return {
//         //     score: 5,
//         //     feedback: "Good atttempt. You covered the basic idea, but try to include more technical depth and real-world examples.  ",
//         //     nextQuestion: "What is the difference between PUT and PATCH in REST APIs?"
//         // };
//     }
// //   let score = 5;

// //   if (answer && answer.length > 10) {
// //     score = 8;
// //   }

// //   return {
// //     score,
// //     feedback: "Good attempt. Try to include more technical depth.",
// //     nextQuestion: "What is JWT and how does it work?"
// //   };
// };

// const generateReport = async(history) =>{
//     try{
//         const historyText = history.map((item, index) => `
//         Q${index + 1}: ${item.question}
//         A${index + 1}: ${item.answer}
//         Score: ${item.score}
//         `).join("\n");

//         const prompt = `
//             You are an expert interviewer.

//             Here is a candidate's interview performance:

//             ${historyText}

//             Analyze overall performance.

//             Respond ONLY in JSON format:
//             {
//             "overallScore": number (0-10),
//             "strengths": "2-3 points",
//             "weaknesses": "2-3 points",
//             "suggestions": "how to improve"
//             }
//         `
//         const payload = {
//             contents: [
//                 {
//                 parts: [{ text: prompt }]
//                 }
//             ]
//         };
//         const response = await callGemini(payload);
//         if (!response) {
//         return {
//             overallScore: Math.floor(
//             history.reduce((sum, h) => sum + (h.score || 5), 0) / history.length
//             ),
//             strengths: "Understands basic backend concepts",
//             weaknesses: "Needs deeper technical explanations",
//             suggestions: "Practice explaining concepts with examples"
//         };
//         }

//         const text = response.candidates[0].content.parts[0].text;
//         const cleanText = text.replace(/```json|```/g, "").trim();
//         let parsed;

//         try {
//             parsed = JSON.parse(cleanText);
//         } catch {
//             console.log("JSON parse failed, using fallback");

//             parsed = {
//                 overallScore: 6,
//                 strengths: "Basic understanding",
//                 weaknesses: "Needs more structured answers",
//                 suggestions: "Practice explaining with examples"
//             };
//         }

// return parsed;
        
//     } catch (error) {
//         console.error(error);
//         return {
//             overallScore: 6,
//             strengths: "Basic understanding",
//             weaknesses: "Needs improvement",
//             suggestions: "Practice more"
//         };
//     }
// };

// export {generateQuestion, evaluateAnswer, generateReport}


import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from "dotenv";
dotenv.config();

// Initialize the SDK once
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use 'gemini-1.5-flash' for maximum stability on Free Tier
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Core Helper: Handles the actual SDK call and catches 429/503 errors.
 * Replaces your manual axios 'callGemini' function.
 */
const getAiResponse = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error Status:", error.status);
        // Returns null so your main functions can trigger their specific fallbacks
        return null;
    }
};

const generateQuestion = async (role, difficulty) => {
    try {
        const prompt = `You are a technical interviewer.
        Ask ONE interview question for a ${role} role.
        Keep it concise. start with a ${difficulty} difficulty`;

        const text = await getAiResponse(prompt);

        if (!text) {
            return "Explain REST API design principles.";
        }

        return text;
    } catch (error) {
        console.error(error);
        return "Can you explain REST API design principles and why idempotency is important?";
    }
};

const evaluateAnswer = async (question, answer, history, difficulty) => {
    const historyText = history.map((item, index) => `
        Q${index + 1}: ${item.question}
        A${index + 1}: ${item.answer}
    `).join("\n");

    try {
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
        }`;

        const text = await getAiResponse(prompt);

        if (!text) {
            const fallbackQuestions = [
                "Explain REST API principles.",
                "What is idempotency?",
                "Difference between PUT and PATCH?",
                "What are HTTP status codes?"
            ];
            return {
                score: 5,
                feedback: "Good attempt. Try adding more technical depth and real-world examples.",
                nextQuestion: fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]
            };
        }

        const cleanText = text.replace(/```json|```/g, "").trim();
        return JSON.parse(cleanText);

    } catch (error) {
        console.error(error);
        const fallbackQuestions = ["Explain REST API principles.", "What is idempotency?", "How does JWT work?"];
        return {
            score: 5,
            feedback: "Good attempt. You covered the basics, but try to include more technical depth.",
            nextQuestion: fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]
        };
    }
};

const generateReport = async (history) => {
    try {
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
        `;

        const text = await getAiResponse(prompt);

        if (!text) {
            return {
                overallScore: Math.floor(history.reduce((sum, h) => sum + (h.score || 5), 0) / history.length),
                strengths: "Understands basic backend concepts",
                weaknesses: "Needs deeper technical explanations",
                suggestions: "Practice explaining concepts with examples"
            };
        }

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

export { generateQuestion, evaluateAnswer, generateReport };