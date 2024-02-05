import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [time, setTime] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [timerText, setTimerText] = useState("Start Timer");
  const [operation, setOperation] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);

  const startTimer = () => {
    setTimerText("Start Timer");
    setTime(10);
    setIsRunning(true);

    const settingInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime !== "" && prevTime > 0) {
          return prevTime - 1;
        } else {
          setIsRunning(false);
          clearInterval(settingInterval);
          setTimerText("Restart");
          return "Game Over";
        }
      });
    }, 1000);
  };

  const displayQuestion = `${num1} ${operation} ${num2}`;

  function getRandomOperation() {
    const operationArray = ["+", "-", "/", "*"];
    return operationArray[Math.floor(Math.random() * operationArray.length)];
  }

  const getLargeRandomNumber = () => Math.floor(Math.random() * 100) + 1;

  function getIncorrectAnswers() {
    const addOrSubArray = ["+", "-"];

    // new Set() only takes in unique values so dups will be discarded before being added to an array
    const newIncorrectAnswersSet = new Set();

    for (let i = 0; i < 3; i++) {
      const optionOperation = addOrSubArray[i % addOrSubArray.length];
      const randomNumber = Math.floor(Math.random() * 10) + 1;

      switch (optionOperation) {
        case "+":
          newIncorrectAnswersSet.add(correctAnswer + randomNumber);
          break;
        case "-":
          newIncorrectAnswersSet.add(correctAnswer - randomNumber);
          break;
        default:
          break;
      }
    }

    const newIncorrectAnswers = Array.from(newIncorrectAnswersSet);

    if (newIncorrectAnswers.length < 3) {
      getIncorrectAnswers();
    } else {
      setIncorrectAnswers(newIncorrectAnswers);
    }
  }

  function displayAnswers() {
    const possibleAnswers = [correctAnswer, ...incorrectAnswers];

    setAllPossibleAnswers(possibleAnswers.sort((a, b) => 0.5 - Math.random()));
  }

  function generateQuestion() {
    const newNum1 = getLargeRandomNumber();
    const newNum2 = getLargeRandomNumber();
    const newOperation = getRandomOperation();

    let newAnswer;

    switch (newOperation) {
      case "+":
        newAnswer = newNum1 + newNum2;
        break;
      case "-":
        newAnswer = newNum1 - newNum2;
        break;
      case "*":
        newAnswer = newNum1 * newNum2;
        break;
      case "/":
        newAnswer = newNum1 / newNum2;
        break;
      default:
        newAnswer = 0;
        break;
    }

    if (newAnswer % 1 !== 0) {
      generateQuestion();
    } else {
      setNum1(newNum1);
      setNum2(newNum2);
      setOperation(newOperation);
      setCorrectAnswer(newAnswer);
    }
  }

  const handleButtonClick = () => {
    generateQuestion();
    startTimer();
  };

  // useEffect(() => {
  //   generateQuestion();
  // }, []);

  useEffect(() => {
    if (correctAnswer !== null) {
      getIncorrectAnswers();
    }
  }, [correctAnswer]);

  useEffect(() => {
    displayAnswers();
  }, [incorrectAnswers, correctAnswer]);

  return (
    <>
      <div>
        <h1>Timer: {time} </h1>
        <p>This is the question: </p>
        {displayQuestion} = {correctAnswer !== null ? correctAnswer : ""}
        <p>Incorrect answer: {allPossibleAnswers.join(",")}</p>
        <button onClick={handleButtonClick} disabled={isRunning}>
          {timerText}
        </button>
      </div>
    </>
  );
}

export default App;
