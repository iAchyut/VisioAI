import OpenAI from "openai";

const ChatGPT = (prompt) => {
  const defaultPrompt = `I have to convert the following text in a graphical way so people can understand the concept I am conveying in a better format.
Here is the text: ${prompt}

Please output the above text into the following format: {header, description, subTopics: [{header, description, icon name, color(hashcode)}]}

Please make sure this output conveys the message written in the text in a Graphical way using the above output schema. Be precise. Dont write unnecessary texts.

Output only schema.`;
  const openai = new OpenAI({
     
    dangerouslyAllowBrowser: true,
  });

  const completion = openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: defaultPrompt}],
  });

  completion.then((result) => console.log(result.choices[0].message));
};

export default ChatGPT;
