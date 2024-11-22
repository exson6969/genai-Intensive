import dotenv from "dotenv";
dotenv.config();
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

// const zeroShotPrompt = `Classify movie reviews as POSITIVE, NEUTRAL or NEGATIVE.
// Review: "Her" is a disturbing study revealing the direction
// humanity is headed if AI is allowed to keep evolving,
// unchecked. I wish there were more movies like this masterpiece.
// Sentiment: `;

// const result = await model.generateContent(zeroShotPrompt);
// console.log(result.response.text());

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
//   generationConfig: {
//     temperature: 0.1,
//     responseMimeType: "application/json",
//     topP:1,
//     maxOutputTokens:250,
//   },
// });

// let fewShortPromots = `
// Parse a customer's pizza order into valid JSON:

// EXAMPLE:
// I want a small pizza with cheese, tomato sauce, and pepperoni.
// JSON Response:

// {
// "size": "small",
// "type": "normal",
// "ingredients": ["cheese", "tomato sauce", "peperoni"]
// }

// EXAMPLE:
// Can I get a large pizza with tomato sauce, basil and mozzarella
// JSON Response:

// {
// "size": "large",
// "type": "normal",
// "ingredients": ["tomato sauce", "basil", "mozzarella"]
// }

// ORDER:

// `;

// let customerOrder = "Give me a large with cheese & pineapple";

// const result = await model.generateContent([ fewShortPromots, customerOrder]);
// console.log(result.response.text());

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash-latest",
// });

// const prompt = "When I was 4 years old, my partner was 3 times my age. Now, I am 20 years old. How old is my partner? Return the answer directly.";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

// const prompt = "When I was 4 years old, my partner was 3 times my age. Now, I am 20 years old. How old is my partner? Let's think step by step.";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

// const modelInstruction = `
// Solve a question answering task with interleaving Thought, Action, Observation steps. Thought can reason about the current situation,
// Observation is understanding relevant information from an Action's output and Action can be one of three types:
//  (1) <search>entity</search>, which searches the exact entity on Wikipedia and returns the first paragraph if it exists. If not, it
//      will return some similar entities to search and you can try to search the information from those topics.
//  (2) <lookup>keyword</lookup>, which returns the next sentence containing keyword in the current context. This only does exact matches,
//      so keep your searches short.
//  (3) <finish>answer</finish>, which returns the answer and finishes the task.
// `;

// let example1 = `
// Question
// Musician and satirist Allie Goertz wrote a song about the "The Simpsons" character Milhouse, who Matt Groening named after who?

// Thought 1
// The question simplifies to "The Simpsons" character Milhouse is named after who. I only need to search Milhouse and find who it is named after.

// Action 1
// <search>Milhouse</search>

// Observation 1
// Milhouse Mussolini Van Houten is a recurring character in the Fox animated television series The Simpsons voiced by Pamela Hayden and created by Matt Groening.

// Thought 2
// The paragraph does not tell who Milhouse is named after, maybe I can look up "named after".

// Action 2
// <lookup>named after</lookup>

// Observation 2
// Milhouse was named after U.S. president Richard Nixon, whose middle name was Milhous.

// Thought 3
// Milhouse was named after U.S. president Richard Nixon, so the answer is Richard Nixon.

// Action 3
// <finish>Richard Nixon</finish>
// `;

// const example2 = `
// Question
// What is the elevation range for the area that the eastern sector of the Colorado orogeny extends into?

// Thought 1
// I need to search Colorado orogeny, find the area that the eastern sector of the Colorado orogeny extends into, then find the elevation range of the area.

// Action 1
// <search>Colorado orogeny</search>

// Observation 1
// The Colorado orogeny was an episode of mountain building (an orogeny) in Colorado and surrounding areas.

// Thought 2
// It does not mention the eastern sector. So I need to look up eastern sector.

// Action 2
// <lookup>eastern sector</lookup>

// Observation 2
// The eastern sector extends into the High Plains and is called the Central Plains orogeny.

// Thought 3
// The eastern sector of Colorado orogeny extends into the High Plains. So I need to search High Plains and find its elevation range.

// Action 3
// <search>High Plains</search>

// Observation 3
// High Plains refers to one of two distinct land regions

// Thought 4
// I need to instead search High Plains (United States).

// Action 4
// <search>High Plains (United States)</search>

// Observation 4
// The High Plains are a subregion of the Great Plains. From east to west, the High Plains rise in elevation from around 1,800 to 7,000 ft (550 to 2,130m).

// Thought 5
// High Plains rise in elevation from around 1,800 to 7,000 ft, so the answer is 1,800 to 7,000 ft.

// Action 5
// <finish>1,800 to 7,000 ft</finish>
// `;

// const question =  `
// Question
// Who was the youngest author listed on the transformers NLP paper?
// `;

// const model = genAI.getGenerativeModel({model:'gemini-1.5-flash-latest', generationConfig: {stopSequences:["\nObservation"]} });

// let reactChat = model.startChat();

// let result = await reactChat.sendMessage([modelInstruction, example1, example2, question]);

// const observation = `Observation 1
// [1706.03762] Attention Is All You Need
// Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin
// We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.
// `;

// result = await reactChat.sendMessage(observation);

// console.log(result.response.text());

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash-latest",
//   generationConfig: { temperature: 1, topP: 1, maxOutputTokens: 1024 },
// });

// let codePrompt = 'Write a Python function to calculate the factorial of a number. No explanation, provide only the code.';

// let result = await model.generateContent(codePrompt);
// console.log(result.response.text());

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash-latest",tools: [
//     {
//       codeExecution: {},
//     },
//   ],
// });

// let codePrompt = 'Calculate the sum of the first 14 prime numbers. Only consider the odd primes, and make sure you count them all.';

// let result = await model.generateContent(codePrompt);
// console.log(result.response.text());


const url = 'https://raw.githubusercontent.com/magicmonty/bash-git-prompt/refs/heads/master/gitprompt.sh'

const fileContent  = await fetch(url).then(response => response.text());

let explain_prompt = `
Please explain what this file does at a very high level. What is it, and why would I use it?
"""
${fileContent}

"""
`

const model = genAI.getGenerativeModel({model:'gemini-1.5-flash-latest'});

let result = await model.generateContent(explain_prompt);
console.log(result.response.text());