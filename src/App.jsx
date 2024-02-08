import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [remove, setRemove] = useState(true);
  const [reset, setReset] = useState(false);
  const [score, setScore] = useState(10);
  const [time, setTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timerText, setTimerText] = useState("Start");
  const [operation, setOperation] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);

  // Start with 10 points
  // IF an answer is picked and its correct then the remaning time will be added to the user score
  // IF the answer is incorrect then that amount of time will be deleted from the score
  // IF no answer is chosen then 5 points will be taken from the score

  useEffect(() => {
    if (time === 0) {
      handleAnswerClicked();
      console.log("time is zero: first");
    }
    if (!time || checkAnswer || gameOver) {
      return;
    }

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

    if (newAnswer % 1 !== 0) {
      generateQuestion();
    } else {
      setNum1(newNum1);
      setNum2(newNum2);
      setOperation(newOperation);
      setCorrectAnswer(newAnswer);
      setCheckAnswer("");
      setSelectedAnswer("reset");
      setTimerText("Next");
    }
  }

  const handleAnswerClicked = (answer) => {
    let theScore;
    if (time > 0 && theScore !== score - 5) {
      setCheckAnswer(true);
    }

    if (answer === correctAnswer) {
      setSelectedAnswer("correct");
      theScore = time + score;
    } else {
      setSelectedAnswer(answer);

      if (time < score && score > 0) {
        theScore = score - time;
      } else {
        theScore = 0;
      }
    }

    if (time === 0) {
      theScore = score - 5;
    }
    return setScore(theScore);
  };

  const handleButtonClick = () => {
    generateQuestion();
    setTime(3);
    setRemove(false);
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
    console.log(`score 2: ${score}`);
    if (score <= 0) {
      setGameOver(true);
      setTimerText("Restart");
    }
  }, [score]);

  return (
    <>
      <div>
        <h1 className={gameOver ? "remove" : ""}>Timer: {time} </h1>
        <h1 className={!gameOver ? "remove" : ""}> Game Over</h1>
        <p>Score: {score} </p>
        <div className={remove ? "remove" : ""}>
          {displayQuestion} = {correctAnswer !== null ? correctAnswer : ""}
        </div>
        <br />
        <button
          onClick={handleButtonClick}
          className={!checkAnswer && !remove ? "remove" : ""}
        >
          {timerText}
        </button>
        <ul className={remove ? "remove" : ""}>
          {allPossibleAnswers.map((answer) => (
            <li key={answer} style={{ listStyle: "none" }}>
              <button
                disabled={checkAnswer}
                onClick={() => handleAnswerClicked(answer)}
                className={
                  selectedAnswer === answer
                    ? answer === correctAnswer
                      ? "correct"
                      : "incorrect"
                    : selectedAnswer === "correct" && answer === correctAnswer
                    ? "correct"
                    : ""
                }
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
