import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState("");
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timerText, setTimerText] = useState("Start");
  const [operation, setOperation] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);

  useEffect(() => {
    if (!time || checkAnswer) return;

    const timer = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, checkAnswer]);

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

    // IF the correct answer is clicked THEN the button will turn green
    // WHEN the button is green THEN the Timer will be paused
    // WHEN the timer is paused THEN the next button will be displayed
    // WHEN the next button is clicked THEN a new question wil be generated

    // IF the incorrect answer is clicked THEN the button will turn red

    if (newAnswer % 1 !== 0) {
      generateQuestion();
    } else {
      setNum1(newNum1);
      setNum2(newNum2);
      setOperation(newOperation);
      setCorrectAnswer(newAnswer);
      setCheckAnswer("");
    }
  }

  const handleAnswerButtonClick = (selectedAnswer) => {
    if (selectedAnswer !== correctAnswer) {
    } else {
    }
  };

  const handleAnswerClicked = () => {
    setCheckAnswer(true);
  };

  const handleButtonClick = () => {
    generateQuestion();
    setTime(10);
  };

  useEffect(() => {
    if (correctAnswer !== null) {
      getIncorrectAnswers();
    }
  }, [correctAnswer]);

  useEffect(() => {
    displayAnswers();
  }, [incorrectAnswers, correctAnswer]);

  useEffect(() => {
    handleAnswerButtonClick();
  }, [allPossibleAnswers]);

  return (
    <>
      <div>
        <h1>Timer: {time} </h1>
        <p>This is the question: </p>
        {displayQuestion} = {correctAnswer !== null ? correctAnswer : ""}
        <br />
        <button onClick={handleButtonClick} disabled={isRunning}>
          {timerText}
        </button>
        <ul>
          {allPossibleAnswers.map((answer, index) => (
            <li key={index} style={{ listStyle: "none" }}>
              <button
                onClick={handleAnswerClicked}
                // onClick={() => handleAnswerButtonClick(answer)}
                // className={
                //   checkAnswer && answer === correctAnswer ? "correct" : ""
                // }
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
