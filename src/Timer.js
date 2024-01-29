import { useState, useEffect } from "react";

export function Timer({ initSeconds }) {
  const [seconds, setSeconds] = useState(initSeconds);

  useEffect(() => {
    setSeconds(initSeconds);
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  return [seconds];
}
