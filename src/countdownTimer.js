import { useEffect, useState } from "react";

export function countdownTimer(secondsAmount) {
  const [seconds, setSeconds] = useState(secondsAmount);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (seconds === 0 || seconds === "Timer") {
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(timer);
          setTimer(0);
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    setTimer(interval);

    return () => clearInterval(interval);
  }, [seconds]);

  return [seconds, setSeconds, timer];
}
