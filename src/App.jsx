import { useState, useEffect } from "react";
import "./App.css";
import { MultiChoiceButton } from "./MultiChoiceButton";
import { Question } from "./Question";

function App() {
  const [seconds, setSeconds] = useState("");

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  return (
    <>
      <div>
        {seconds > 0 ? <p>Timer: {seconds}</p> : <h1>GAME OVER</h1>}

        <button onClick={() => setSeconds(10)}>Start Button</button>

        <Question />

        <ul style={{ listStyleType: "none" }}>
          <MultiChoiceButton />
        </ul>
      </div>
    </>
  );
}

export default App;
