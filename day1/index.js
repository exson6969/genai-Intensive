import dotenv from 'dotenv'
dotenv.config()
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Explain AI to me like I'm a kid.";
// const result = await model.generateContent(prompt);
// console.log(result.response.text());


// const chat = model.startChat([]);
// let response = await chat.sendMessage('Hello! My name is Exson.')
// response = await chat.sendMessage('Can you tell something interesting about India?')
// response =  await chat.sendMessage("What is my Name?")
// console.log(response.response.text())


// const shortModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: {maxOutputTokens: 200}});
// let response = await shortModel.generateContent("Write a 1000 word essay on the importance of olives in modern society.");
// let response = await shortModel.generateContent("Write a short poem on the importance of olives in modern society.");
// console.log(response.response.text());

// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//     generationConfig: {
//       temperature: 0.0,
//     },
//   });
// for (let i = 0; i < 5; i++) {

//     const result = await model.generateContent(
//       "Pick a random colour... (respond in a single word)",
//     );
//     console.log(result.response.text());
//     console.log('-----------------------------------');
// }

// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//     generationConfig: {
//       temperature: 0.0,
//       topK:64,
//       topP:0.95,
//     },
//   });

// const prompt = "You are a creative writer. Write a short story about a cat who goes on an adventure.";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//     generationConfig: {
//       temperature: 0.0,
//       topP:1,
//       maxOutputTokens:5,
//     },
//   });


const zeroShotPrompt = `Classify movie reviews as POSITIVE, NEUTRAL or NEGATIVE.
Review: "Her" is a disturbing study revealing the direction
humanity is headed if AI is allowed to keep evolving,
unchecked. I wish there were more movies like this masterpiece.
Sentiment: `;

// const result = await model.generateContent(zeroShotPrompt);
// console.log(result.response.text());

