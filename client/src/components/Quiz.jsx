import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnswer } from "../javaScript/getAnswer";
import { getChoices } from "../javaScript/getChoices";
import { shuffleAnswers } from "../javaScript/shuffleAnswers";
import { countdownTimer } from "../javaScript/countdownTimer";
import { scoreSystem } from "../javaScript/scoreSystem";
import { questionValidator } from "../javaScript/questionValidator";

function Quiz() {
  const navigate = useNavigate();
  const [previousAnswer, setPreviousAnswer] = useState();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [seconds, setSeconds, timer] = countdownTimer("Timer");
  const [
    score,
    updateScore,
    setScore,
    longestStreak,
    roundsCompleted,
    perfects,
    streak,
  ] = scoreSystem();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = () => {
    if (score === "Score") {
      setScore(100);
    }

    const [num1, operation, num2, answer] = getAnswer();
    const incorrectAnswersArray = getChoices(answer);
    const shuffledArray = shuffleAnswers([answer, ...incorrectAnswersArray]);
    const isQuestionValid = questionValidator(
      num1,
      num2,
      answer,
      incorrectAnswersArray
    );

    if (isQuestionValid) {
      let newQuestion = {
        num1,
        operation,
        num2,
        answersArray: shuffledArray,
        correctAnswer: answer,
      };

      setQuestions([newQuestion]);
      setCorrectAnswer(answer);
      setSelectedAnswer(false);
      setSeconds(10);
      setIsButtonDisabled(false);
    } else {
      handleClick();
    }
  };

  const handleGameOver = () => {
    navigate("/GameOver", {
      state: {
        roundsCompleted: roundsCompleted,
        streak: longestStreak,
        perfects: perfects,
      },
    });
  };

  const handleAnsweredClick = (answer) => {
    // Update the score based on the answer and correct answer
    updateScore(answer, correctAnswer, seconds);

    setSelectedAnswer(answer); // Set the actual answer

    if (answer === correctAnswer) {
      if (seconds === 10) {
        setSeconds("Perfect!");
      }

      clearInterval(timer);
      setIsButtonDisabled(true);
      // Move to the next question after a delay
      setTimeout(handleClick, 1000);
    }
  };

  useEffect(() => {
    setPreviousAnswer("?");
    if (selectedAnswer !== false) {
      setPreviousAnswer(selectedAnswer);
    }
  }, [selectedAnswer]);

  useEffect(() => {
    if (seconds <= 0) {
      updateScore(seconds);
      clearInterval(timer);
      setIsButtonDisabled(true);
      setTimeout(handleClick, 1000);
    }
  }, [seconds]);

  useEffect(() => {
    if (score <= 0) {
      setScore(0);
      if (score === 0) {
        handleGameOver();
      }
    }
  }, [score]);

  // if an answer has been selected then it can not be selected again

  return (
    <section>
      <div
        className={
          seconds === "Timer"
            ? "container full-view-height wrapper center--button"
            : "container full-view-height wrapper padding-block-600"
        }
      >
        <div className="timer">
          <div
            className={seconds === "Timer" ? "visually-hidden" : "timer-bar"}
            style={{ width: `${(seconds / 10) * 100}%` }}
          ></div>
        </div>
        <div className={seconds === "Timer" ? "visually-hidden" : "info"}>
          <div className="score">{score}</div>
          <div className="score middle">{roundsCompleted}</div>
          <div className="score last">{streak}</div>
        </div>

        <button
          onClick={handleClick}
          className={
            seconds !== "Timer" ? "visually-hidden" : "button button--center"
          }
        >
          Start
        </button>

        {questions.map((question, index) => (
          <div
            key={index}
            className="text-align-center display-grid grid-wrapper"
          >
            <h2
              className={
                selectedAnswer === correctAnswer
                  ? "right-answer fs-secondary-heading padding-block-700"
                  : selectedAnswer !== correctAnswer &&
                    selectedAnswer !== false &&
                    selectedAnswer === previousAnswer
                  ? "wrong-answer fs-secondary-heading padding-block-700"
                  : " fs-secondary-heading padding-block-700"
              }
            >
              {question.num1} {question.operation} {question.num2} ={" "}
              {previousAnswer || "?"}
            </h2>

            {question.answersArray.map((answer, index) => (
              <button
                key={index}
                disabled={isButtonDisabled}
                className={"button button--thicc"}
                onClick={() => handleAnsweredClick(answer)}
              >
                {answer}
              </button>
            ))}
          </div>
        ))}
      </div>
      {/* <button
        onClick={handleClick}
        className={
          seconds !== "Timer" ? "button button--center" : "visually-hidden"
        }
      >
        Start
      </button> */}
    </section>
  );
}

export default Quiz;
