# Day 1 - Prompting

### Api key
* Visit https://aistudio.google.com/ and create API key.

### Get started
* Initialize node
 ```npm init -y```
*  Install google gen ai module 
```npm install @google/generative-ai```
* Install ```npm install dotenv```
* Create .env file, and add
```API_KEY=```

### First prompt
```

import dotenv from 'dotenv'
dotenv.config()
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain AI to me like I'm a kid.";

const result = await model.generateContent(prompt);
console.log(result.response.text());

```

<b>Output: </b>

```

Imagine you have a really smart puppy.  You teach it tricks, like "sit" and "fetch".  The puppy learns by watching you and getting treats when it does things right.

AI is kind of like that super smart puppy, but instead of learning tricks, it learns from lots and lots of information.  We give the computer a huge pile of pictures of cats and dogs, for example, and tell it which is which.  The computer looks at all the pictures and figures out what makes a cat a cat (like pointy ears and whiskers) and what makes a dog a dog (like floppy ears and a tail).

Then, when you show it a new picture, it can guess if it's a cat or a dog!  It's not actually *thinking* like you and me, but it's really good at finding patterns and making predictions based on what it learned.

AI can do lots of other things too, like help your phone understand what you say, recommend movies you might like, or even drive a car (with a grown-up's help, of course!).  It's still learning and getting better all the time, just like your puppy!

```

### Interactive chat

```
import dotenv from 'dotenv'
dotenv.config()
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const chat = model.startChat([]);
let response = await chat.sendMessage('Hello! My name is Exson.')
console.log(response.response.text())

```

<b>Output: </b>
```
Hello Exson! It's nice to meet you.  How can I help you today?
```

#### Continue conversation
```
response = await chat.sendMessage('Can you tell something interesting about India?')
console.log(response.response.text())
```


<b>Output: </b>
```
India has the world's largest postal network, delivering to even the most remote villages.  This is a remarkable feat considering the country's size and diverse terrain.  It's a testament to the importance of communication and connection across such a vast and varied nation.
```

#### Continue conversation
```
const chat = model.startChat([]);
let response = await chat.sendMessage('Hello! My name is Exson.')
response = await chat.sendMessage('Can you tell something interesting about India?')
response =  await chat.sendMessage("What is my Name?")
console.log(response.response.text())
```

<b>Output: </b>
```
Your name is Exson.
```

### Output length

```
import dotenv from 'dotenv'
dotenv.config()
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

const shortModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: {maxOutputTokens: 200}});

let response = await shortModel.generateContent("Write a 1000 word essay on the importance of olives in modern society.");

console.log(response.response.text());
```

<b>Output: </b>
```

## The Enduring Significance of Olives in Modern Society

The olive, a seemingly simple fruit, holds a position of profound significance in modern society, extending far beyond its culinary applications.  Its impact resonates across economic, environmental, cultural, and even health spheres, showcasing a legacy that stretches back millennia. While often overlooked in the global food system’s vastness, the olive’s contribution remains substantial and enduring, demanding a closer examination of its multifaceted importance.

One of the most immediate impacts of olives lies in their economic contribution. Olive cultivation, primarily concentrated in the Mediterranean basin, constitutes a vital part of the agricultural landscape for many countries.  Spain, Italy, Greece, and Tunisia, among others, boast thriving olive oil industries that employ millions of people, from farmers and harvesters to processors, distributors, and retailers.  The economic ripple effect is significant, supporting rural communities, fostering entrepreneurship, and generating substantial export revenues.  The diverse range of products derived from 
olives – olive oil

```

<b>Input</b>
```
const shortModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: {maxOutputTokens: 200}});

let response = await shortModel.generateContent("Write a short poem on the importance of olives in modern society.");

console.log(response.response.text());
```

<b>Output: </b>

```

From ancient groves, a humble fruit,
The olive's reign, a timeless root.
In modern kitchens, small and bright,
A vibrant splash of green and light.

From oil to paste, a versatile friend,
On salads tossed, its flavors blend.
A symbol rich, in history's hold,
A story whispered, ages old.

So raise a glass, of olive's grace,
A taste of sun, in every place.
A simple fruit, yet so refined,
A treasure for the modern mind.

```

### Temperature

Temperature is a parameter in machine learning that controls the balance between exploration and exploitation. It's a numerical value that affects the probability distribution of the model's next word or token prediction. 

```temperature``` controls the randomness of the output. Use higher values for more creative responses, and lower values for more deterministic responses. Values can range from [0.0, 2.0].

```
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 1.0,
    },
  });
  
for (let i = 0; i < 5; i++) {

    const result = await model.generateContent(
      "Pick a random colour... (respond in a single word)",
    );
    console.log(result.response.text());
    console.log('-----------------------------------');
}
```

<b>Output:</b>
```
Aquamarine

-----------------------------------
Marigold

-----------------------------------
Aquamarine

-----------------------------------
Maroon

-----------------------------------
Aquamarine

-----------------------------------
```

#### Reducing temprature
On reducing temprature to 0.0.

<b>Output:</b>
```
Maroon

-----------------------------------
Maroon

-----------------------------------
Maroon

-----------------------------------
Maroon

-----------------------------------
Maroon

-----------------------------------
```

### Top-K and top-P

Top-k and top-p are sampling strategies that control the selection of tokens from a probability distribution to generate outputs.


<b>Top-k</b>

Top-K is a positive integer that defines the number of most probable tokens from which to select the output token. A top-K of 1 selects a single token, performing greedy decoding.

<b>Top-p</b>
Top-P defines the probability threshold that, once cumulatively exceeded, tokens stop being selected as candidates. A top-P of 0 is typically equivalent to greedy decoding, and a top-P of 1 typically selects every token in the model's vocabulary.

When both are supplied, the Gemini API will filter top-K tokens first, then top-P and then finally sample from the candidate tokens using the supplied temperature.

```
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.0,
      topK:64,
      topP:0.95,
    },
  });

const prompt = "You are a creative writer. Write a short story about a cat who goes on an adventure.";

const result = await model.generateContent(prompt);
console.log(result.response.text());
```

<b>Output:</b>  
```
Bartholomew Buttons, a ginger tabby with a perpetually unimpressed expression, 
wasn't your average house cat.  He yearned for more than sunbeams and tuna. He 
yearned for… adventure.  His opportunity arrived in the form of a carelessly left-open window.

The scent of rain-soaked earth and something vaguely fishy wafted in, a siren's call to his adventurous spirit.  He slipped through the gap, a furry orange blur against the twilight sky.  The world outside was a symphony of unfamiliar sounds: the chirping of crickets, the distant rumble of a truck, the frantic squeaking of a particularly plump mouse.

His first adventure involved a daring chase across a neighbour's meticulously manicured lawn, resulting in a tangle with a startled gnome and a muddy paw print on a pristine white rose.  He then discovered a hidden alleyway, a labyrinth 
of overflowing bins and shadowy corners, where he encountered a one-eyed alley 
cat named Patches, a grizzled veteran of countless urban skirmishes.

Patches, initially suspicious of Bartholomew's pristine fur and slightly haughty demeanor, grudgingly accepted him as a temporary companion.  Together, they embarked on a quest for the legendary "King's Tuna," a mythical can of tuna rumored to be hidden somewhere in the vast expanse of the city.

Their journey was fraught with peril.  They narrowly avoided a grumpy bulldog, 
outsmarted a flock of particularly aggressive pigeons, and even braved a perilous crossing of a busy street (Bartholomew, surprisingly, possessed an innate understanding of traffic patterns).

Finally, after days of thrilling escapades, they stumbled upon a discarded shopping cart overflowing with discarded treasures.  And there, nestled amongst crumpled newspapers and empty soda cans, was a single, dented can of tuna – the King's Tuna!

They feasted under the watchful gaze of a flickering streetlight, the taste of 
victory sweeter than any gourmet salmon.  As dawn broke, Bartholomew, his fur matted and his whiskers slightly singed, returned home, a changed cat.  He still enjoyed sunbeams and tuna, but now, he knew the thrill of adventure, a secret 
he would carry in his heart, along with the faint scent of rain and the memory 
of a one-eyed friend.  The window, however, remained firmly closed.
```


### Zero-shot

Zero-shot prompts are prompts that describe the request for the model directly.

```
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.0,
      topP:1,
      maxOutputTokens:5,
    },
  });


const zeroShotPrompt = `Classify movie reviews as POSITIVE, NEUTRAL or NEGATIVE.
Review: "Her" is a disturbing study revealing the direction
humanity is headed if AI is allowed to keep evolving,
unchecked. I wish there were more movies like this masterpiece.
Sentiment: `;

const result = await model.generateContent(zeroShotPrompt);
console.log(result.response.text());

```

<b>Output:</b>
```
Sentiment: POSITIVE
```

### One-shot and few-shot

Providing an example of the expected response is known as a "one-shot" prompt. When you provide multiple examples, it is a "few-shot" prompt.

```
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.1,
    topP:1,
    maxOutputTokens:250,
  },
});

let fewShortPromots = `
Parse a customer's pizza order into valid JSON:

EXAMPLE:
I want a small pizza with cheese, tomato sauce, and pepperoni.
JSON Response:

{
"size": "small",
"type": "normal",
"ingredients": ["cheese", "tomato sauce", "peperoni"]
}


EXAMPLE:
Can I get a large pizza with tomato sauce, basil and mozzarella
JSON Response:

{
"size": "large",
"type": "normal",
"ingredients": ["tomato sauce", "basil", "mozzarella"]
}

ORDER:

`;

let customerOrder = "Give me a large with cheese & pineapple";

const result = await model.generateContent([ fewShortPromots, customerOrder]);
console.log(result.response.text());
```

<b>Output:</b>
```

json
{
  "size": "large",
  "type": "normal",
  "ingredients": ["cheese", "pineapple"]
}

```

### JSON mode

```
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.1,
    responseMimeType: "application/json", // add mime type to get response in json format
    topP:1,
    maxOutputTokens:250,
  },
});
```

<b>Output:</b>
```
{"size": "large", "type": "normal", "ingredients": ["cheese", "pineapple"]}
```

### Chain of Thought (CoT)

Direct prompting on LLMs can return answers quickly and (in terms of output token usage) efficiently, but they can be prone to hallucination. The answer may "look" correct (in terms of language and syntax) but is incorrect in terms of factuality and reasoning.

Chain-of-Thought prompting is a technique where you instruct the model to output intermediate reasoning steps, and it typically gets better results, especially when combined with few-shot examples. It is worth noting that this technique doesn't completely eliminate hallucinations, and that it tends to cost more to run, due to the increased token count.

```
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

const prompt = "When I was 4 years old, my partner was 3 times my age. Now, I am 20 years old. How old is my partner? Return the answer directly.";

const result = await model.generateContent(prompt);
console.log(result.response.text());
```

<b>Output:</b>
```
41
```

Same approach, but indicatding model to think step by step:

```
const prompt = "When I was 4 years old, my partner was 3 times my age. Now, I am 20 years old. How old is my partner? Let's think step by step.";

const result = await model.generateContent(prompt);
console.log(result.response.text());
```

<b>Output:</b>

```

Step 1: Find the partner's age when you were 4.

* When you were 4, your partner was 3 times your age, so they were 4 * 3 = 12 years old.
Step 2: Find the age difference between you and your partner.

* The age difference is 12 - 4 = 8 years.

Step 3: Determine your partner's current age.

* You are now 20 years old.
* Your partner is 8 years older than you, so they are 20 + 8 = 28 years old.

Therefore, your partner is now 28 years old.

```

### ReAct: Reason and act

```

const modelInstruction = `
Solve a question answering task with interleaving Thought, Action, Observation steps. Thought can reason about the current situation,
Observation is understanding relevant information from an Action's output and Action can be one of three types:
 (1) <search>entity</search>, which searches the exact entity on Wikipedia and returns the first paragraph if it exists. If not, it
     will return some similar entities to search and you can try to search the information from those topics.
 (2) <lookup>keyword</lookup>, which returns the next sentence containing keyword in the current context. This only does exact matches,
     so keep your searches short.
 (3) <finish>answer</finish>, which returns the answer and finishes the task.
`;

let example1 = `
Question
Musician and satirist Allie Goertz wrote a song about the "The Simpsons" character Milhouse, who Matt Groening named after who?

Thought 1
The question simplifies to "The Simpsons" character Milhouse is named after who. I only need to search Milhouse and find who it is named after.

Action 1
<search>Milhouse</search>

Observation 1
Milhouse Mussolini Van Houten is a recurring character in the Fox animated television series The Simpsons voiced by Pamela Hayden and created by Matt Groening.

Thought 2
The paragraph does not tell who Milhouse is named after, maybe I can look up "named after".

Action 2
<lookup>named after</lookup>

Observation 2
Milhouse was named after U.S. president Richard Nixon, whose middle name was Milhous.

Thought 3
Milhouse was named after U.S. president Richard Nixon, so the answer is Richard Nixon.

Action 3
<finish>Richard Nixon</finish>
`;

const example2 = `
Question
What is the elevation range for the area that the eastern sector of the Colorado orogeny extends into?

Thought 1
I need to search Colorado orogeny, find the area that the eastern sector of the Colorado orogeny extends into, then find the elevation range of the area.

Action 1
<search>Colorado orogeny</search>

Observation 1
The Colorado orogeny was an episode of mountain building (an orogeny) in Colorado and surrounding areas.

Thought 2
It does not mention the eastern sector. So I need to look up eastern sector.

Action 2
<lookup>eastern sector</lookup>

Observation 2
The eastern sector extends into the High Plains and is called the Central Plains orogeny.

Thought 3
The eastern sector of Colorado orogeny extends into the High Plains. So I need to search High Plains and find its elevation range.

Action 3
<search>High Plains</search>

Observation 3
High Plains refers to one of two distinct land regions

Thought 4
I need to instead search High Plains (United States).

Action 4
<search>High Plains (United States)</search>

Observation 4
The High Plains are a subregion of the Great Plains. From east to west, the High Plains rise in elevation from around 1,800 to 7,000 ft (550 to 2,130m).

Thought 5
High Plains rise in elevation from around 1,800 to 7,000 ft, so the answer is 1,800 to 7,000 ft.

Action 5
<finish>1,800 to 7,000 ft</finish>
`;

const question =  `
Question
Who was the youngest author listed on the transformers NLP paper?
`;

const model = genAI.getGenerativeModel({model:'gemini-1.5-flash-latest', generationConfig: {stopSequences:["\nObservation"]} });

let reactChat = model.startChat();

let result = await reactChat.sendMessage([modelInstruction, example1, example2, question]);
console.log(result.response.text());

```

<b>Output:</b>
```
Thought 1
I need to find the Transformers NLP paper and then find the authors and their ages.  This will require multiple steps.  First, I'll search for the paper.

Action 1
<search>Transformers NLP paper</search>
```

Now you can perform this research yourself and supply it back to the model.

```
const model = genAI.getGenerativeModel({model:'gemini-1.5-flash-latest', generationConfig: {stopSequences:["\nObservation"]} });

let reactChat = model.startChat();

let result = await reactChat.sendMessage([modelInstruction, example1, example2, question]);

const observation = `Observation 1
[1706.03762] Attention Is All You Need
Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin
We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.
`;

result = await reactChat.sendMessage(observation);

console.log(result.response.text());


```

<b>Output:</b>
```

Thought 2
The observation gives the authors of the paper "Attention is All You Need", but not their ages. I cannot directly answer the question with this information.  I need to find a way to determine the authors' ages. This is likely impossible without additional information readily available online.

Action 2
<finish>I cannot answer this question. The provided text lists the authors of the "Attention is All You Need" paper but does not include their ages or birthdates, which are necessary to determine the youngest author.</finish>

```

### Generating code

```
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  generationConfig: { temperature: 1, topP: 1, maxOutputTokens: 1024 },
});

let codePrompt = 'Write a Python function to calculate the factorial of a number. No explanation, provide only the code.';

let result = await model.generateContent(codePrompt);
console.log(result.response.text());

```

<b>Output:</b>
```
python
def factorial(n):
  if n == 0:
    return 1
  else:
    return n * factorial(n-1)
```

### Code execution
Gemini also have tools : FunctionDeclarationsTool , CodeExecutionTool , GoogleSearchRetrievalTool. We can use CodeExecutionTool for code execution.

```
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",tools: [
    {
      codeExecution: {},
    },
  ],
});

let codePrompt = 'Calculate the sum of the first 14 prime numbers. Only consider the odd primes, and make sure you count them all.';

let result = await model.generateContent(codePrompt);
console.log(result.response.text());

```

<b>Output:</b>
```
To calculate the sum of the first 14 odd prime numbers, I need to first identify those numbers.  The first few odd prime numbers are 3, 5, 7, 11, 13, and so on.  I will use Python to generate them and then calculate the sum.


PYTHON

def is_prime(n):
    """Checks if a number is prime."""
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

count = 0
sum_primes = 0
num = 3  # Start with the first odd prime

while count < 14:
    if is_prime(num):
        sum_primes += num
        count += 1
    num += 2

print(f"The sum of the first 14 odd prime numbers is: {sum_primes}")


The sum of the first 14 odd prime numbers is: 326


Therefore, the sum of the first 14 odd prime numbers is 326.

```


### Explaining code

```
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

```

<b>Output:</b>

```
This bash script is a highly customizable Git prompt for your terminal.  It enhances the standard bash prompt to display information about your current Git repository, such as 
branch name, status (ahead/behind, changes, etc.), and even optionally your username and repository URL.

**What it does:**

At a very high level, the script does the following:

1. **Loads a theme:** It selects a color theme for the prompt (allowing for custom themes).
2. **Gets Git status:** It runs a Git command to get the status of the repository (branches, changes, etc.).
3. **Formats the prompt:** It formats the information obtained from Git into a visually 
appealing and informative prompt string.
4. **Updates the prompt:**  It updates your terminal's prompt string to display the formatted Git information.  It does this automatically after each command.
5. **Handles asynchronous operations:** Uses background processes for things like fetching remote updates to avoid blocking the user.


**Why you'd use it:**

You'd use this script to improve your workflow when working with Git repositories.  The 
benefits are:

* **Improved awareness:** You can see at a glance the status of your Git repository (branch, changes, etc.) without having to explicitly run `git status`.
* **Customization:**  A wide range of options are available to tailor the appearance and information displayed in the prompt, including colors, symbols and what information is 
shown.
* **Efficiency:**  Reduces the need for manual Git status checks.


In short, it's a powerful tool for developers who spend a significant amount of time working with Git.  It makes managing multiple Git branches and tracking changes much easier.
```