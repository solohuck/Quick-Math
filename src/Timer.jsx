import { useState } from "react";

export function Timer() {
  const [time, setTime] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [timerText, setTimerText] = useState("Start Timer");

  const startTimer = () => {
    setTimerText("Start Timer");
    setIsRunning(true);
    setTime(10);

    const settingInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(settingInterval);
          setIsRunning(false);
          setTimerText("Restart");
          return "Game Over";
        }
      });
    }, 1000);
  };
  return (
    <div>
      <h1>Timer: {time} </h1>
      <button onClick={startTimer} disabled={isRunning}>
        {timerText}
      </button>
    </div>
  );
}
