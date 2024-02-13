import { useState, useEffect } from "react";

import "./App.css";
import { Container } from "postcss";

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [mainClock, setMainClock] = useState(10);
  const [remove, setRemove] = useState(true);
  const [score, setScore] = useState(10);
  const [time, setTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [timerText, setTimerText] = useState("Start");
  const [operation, setOperation] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);

  // Display question layout
  const displayQuestion = `${num1} ${operation} ${num2}`;

  // Function to get random operation
  function getRandomOperation() {
    // arrray of operations
    const operationArray = ["+", "-", "/", "*"];
    // Logic to select a random operation
    return operationArray[Math.floor(Math.random() * operationArray.length)];
  }

  // Function to get random number 1- 100
  const getLargeRandomNumber = () => Math.floor(Math.random() * 100) + 1;

  // Function to get the incorrect answers based off the correct answer
  function getIncorrectAnswers() {
    // array of operations
    const addOrSubArray = ["+", "-"];

    // new Set() only takes in unique values so dups will be discarded before being added to an array
    const newIncorrectAnswersSet = new Set();

    // For loop to run three times to get 3 number
    for (let i = 0; i < 3; i++) {
      // random picks between the two operations in the addOrSubArray[]
      const optionOperation = addOrSubArray[i % addOrSubArray.length];
      // picks a random number 1 - 10
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      // switch statement to explain what each operations string means
      switch (optionOperation) {
        case "+":
          // adds the new incorrect number to the set()
          newIncorrectAnswersSet.add(correctAnswer + randomNumber);
          break;
        case "-":
          // adds the new incorrect number to the set()
          newIncorrectAnswersSet.add(correctAnswer - randomNumber);
          break;
        default:
          break;
      }
    }

    // makes an array from the new set()
    const newIncorrectAnswers = Array.from(newIncorrectAnswersSet);

    // if the set is less than 3 then fun the funciton again else set the incorrect answers
    if (newIncorrectAnswers.length < 3) {
      getIncorrectAnswers();
    } else {
      setIncorrectAnswers(newIncorrectAnswers);
    }
  }

  // function to display all answers
  function displayAnswers() {
    // puts the correct answer and all the incorrect answers in an array together
    const possibleAnswers = [correctAnswer, ...incorrectAnswers];

    // sets all the answers and mixing up the index order
    setAllPossibleAnswers(possibleAnswers.sort((a, b) => 0.5 - Math.random()));
  }

  // Function to generate a new question
  function generateQuestion() {
    // gets a random number 1-100 from the function being called
    const newNum1 = getLargeRandomNumber();
    // gets a random number 1-100 from the function being called
    const newNum2 = getLargeRandomNumber();
    // gets a random operation from the function being called
    const newOperation = getRandomOperation();

    let newAnswer;

    // switch statement explaing what to do when a opertion string is seleted
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

    // if the answer is not a whole number then run the function again
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

  // Function is called when an possible answer is selected
  const handleAnswerClicked = (answer) => {
    let theScore;

    // If the user selected an answer then set checkAnswer to true
    if (time > 0 && theScore !== score - 5) {
      setCheckAnswer(true);
    }
    // IF the users selected answer is equal to the correct answer
    if (answer === correctAnswer) {
      // setSelectedAnswer to correct and the score quals the remaining time plus the current score
      setSelectedAnswer("correct");
      theScore = time + score;
    } else {
      // IF the user selected the wrong answer then setSelectedAnswer to the chosen answer
      setSelectedAnswer(answer);

      // IF the time remaining time is less than the score and the score is greater than 0
      if (time < score && score > 0) {
        // THEN the score equals the score minus the remaining time
        theScore = score - time;
      } else {
        // IF the time would cause the score to hit less than 0 then the score is equal to 0
        theScore = 0;
      }
    }

    // IF the timer has run out and the score greater than or equal to 5
    if (time === 0 && score >= 5) {
      // the score equals the score - 5
      theScore = score - 5;
      setSelectedAnswer("correct");
      setTimerText("Next");
      // IF the timer has run out and he score is less than 5
    } else if (time === 0 && score < 5) {
      // the score equals 0 instead of being a negative number
      theScore = 0;
      setSelectedAnswer("correct");
    }
    return setScore(theScore);
  };

  const handleButtonClick = () => {
    generateQuestion();
    setTime(3);
    setRemove(false);

    if (score <= 0 || mainClock === 0) {
      setScore(10);
      setGameOver(false);
      setTime(10);
      setMainClock(60);
    }
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
    if (score <= 0) {
      setGameOver(true);
      setTimerText("Restart");
    }
  }, [score]);

  useEffect(() => {
    if (mainClock <= 0 || score === 0) {
      setMainClock(0);
    } else if (timerText === "Next") {
      const mainTimer = setInterval(() => {
        // setMainClock(mainClock - 1);
      }, 1000);

      return () => clearInterval(mainTimer);
    }
  }, [mainClock, timerText]);

  useEffect(() => {
    if (mainClock === 0) {
      setScore(score);
      setGameOver(true);
      setTime(0);
      setTimerText("Restart");
    }
  }, [gameOver, mainClock]);

  useEffect(() => {
    if (time === 0) {
      handleAnswerClicked();
    }
    if (!time || checkAnswer || gameOver) {
      return;
    }

    const timer = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, checkAnswer]);

  return (
    <>
      <div>
        <div className={gameOver || remove ? "remove" : "time_score_div"}>
          <p>Score: {score} </p>
          <p>{time}s </p>
        </div>

        <div className={remove || gameOver ? "remove" : "question_div"}>
          {displayQuestion} = ?
        </div>

        <div>
          <div className={!gameOver || score > 0 ? "remove" : ""}>
            <h1>Game Over</h1>
          </div>
          <div className={!gameOver || score <= 0 ? "remove" : ""}>
            <h1>Finished</h1>
            <h2>score: {score}</h2>
          </div>
        </div>

        <div className={gameOver ? "remove" : ""}>
          <ul className={remove ? "remove" : "answer_div"}>
            {allPossibleAnswers.map((answer) => (
              <li key={answer} className="answer_list">
                <button
                  disabled={checkAnswer || selectedAnswer === "correct"}
                  onClick={() => handleAnswerClicked(answer)}
                  className={
                    selectedAnswer === answer
                      ? answer === correctAnswer
                        ? "correct"
                        : "incorrect"
                      : selectedAnswer === "correct" &&
                        answer === correctAnswer &&
                        time <= 0
                      ? "show_correct_answer"
                      : selectedAnswer === "correct" &&
                        answer === correctAnswer &&
                        time > 0
                      ? "correct"
                      : "answer_button_no_background"
                  }
                >
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="next_btn_div">
          <button
            onClick={handleButtonClick}
            className={
              (!checkAnswer && !remove && time > 0) ||
              timerText === "Start" ||
              timerText === "Restart"
                ? "remove"
                : "next_btn"
            }
          >
            {timerText}
          </button>
        </div>
        <div className="start_restart_btn_div">
          <button
            onClick={handleButtonClick}
            className={
              timerText !== "Start" && timerText !== "Restart"
                ? "remove"
                : "start_restart_btn"
            }
          >
            {timerText}
          </button>
        </div>
        <br />
        <div
          className={gameOver || timerText === "Start" ? "remove" : ""}
        >{`Time left: ${mainClock}`}</div>
      </div>
    </>
  );
}

export default App;
