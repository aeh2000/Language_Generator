import React, { useState } from "react";
import "./styles.css";
var text;
const HF_API_TOKEN = prompt("What's your HuggingFace API key?");

// here is the key: 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

export default function App() {
  const model = "gpt2";

  const [response, setResponse] = useState("");

  async function onSubmit() {
    text = "UwU_Baka says: " + text + "\nGamerGod88 says:";
    const data = { inputs: text };
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        headers: { Authorization: `Bearer ${HF_API_TOKEN}` },
        method: "POST",
        body: JSON.stringify(data)
      }
    );
    const responsedata = await response.json();
    console.log(responsedata);
    var responseText = responsedata[0].generated_text;

    setResponse(responseText.substr(text.length));
  }
  function onChange(e) {
    text = e.target.value;
    console.log(text);
  }
  return (
    <div>
      <h2>Hey Stinky!</h2>
      <h3>I am here to answer your burning desires.</h3>
      <h4>Ask me anything!</h4>
      <textarea onChange={onChange} />
      <br />
      <button onClick={onSubmit}>Click Me!</button>
      {response ? <div>{response}</div> : ""}
    </div>
  );
}
