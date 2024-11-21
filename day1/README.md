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

