import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnswer } from "./getAnswer";
import { getIncorrectAnswers } from "./getIncorrectAnswers";
import { shuffleAllAnswers } from "./shuffleAllAnswers";
import { countdownTimer } from "./countdownTimer";
import { scoreSystem } from "./scoreSystem";
import { questionValidator } from "./questionValidator";

function GenerateQuiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
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
    const incorrectAnswersArray = getIncorrectAnswers(answer);
    const shuffledArray = shuffleAllAnswers([answer, ...incorrectAnswersArray]);
    const isQuestionValid = questionValidator(
      num1,
      num2,
      answer,
      incorrectAnswersArray
    );

    if (isQuestionValid) {
      const newQuestion = {
        answersArray: shuffledArray,
        question: `${num1} ${operation} ${num2}`,
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
    updateScore(answer, correctAnswer, seconds);
    setSelectedAnswer(answer);

    if (answer === correctAnswer) {
      if (seconds === 10) {
        setSeconds("Perfect!");
      }
      clearInterval(timer);
      setIsButtonDisabled(true);
      setTimeout(handleClick, 1000);
    }
  };

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
      <div className="time_score_div">
        <div className={score === "Score" ? "remove" : "show_score"}>
          {score}
        </div>
        <div
          className={
            seconds === "Timer"
              ? "remove"
              : seconds >= 7
              ? "session_timer_green"
              : seconds < 7 && seconds >= 4
              ? "session_timer_yellow"
              : seconds <= 3 && seconds > 0
              ? "session_timer_red"
              : seconds === "Timer" || seconds === 0
              ? "session_timer"
              : seconds === "Perfect!"
              ? "session_timer_gold"
              : ""
          }
        >
          {seconds}
        </div>
      </div>

      {questions.map((question, index) => (
        <div key={index}>
          <div className="question_div">{question.question}</div>
          <ul className="answer_div">
            {question.answersArray.map((answer, index) => (
              <li key={index} className="answer_list">
                <button
                  onClick={() => handleAnsweredClick(answer)}
                  disabled={isButtonDisabled}
                  className={
                    answer === selectedAnswer
                      ? selectedAnswer === correctAnswer
                        ? "correct"
                        : "incorrect"
                      : "button"
                  }
                >
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="next_btn_div">
        <button
          onClick={handleClick}
          className={score !== "Score" ? "remove" : "next_btn"}
        >
          Start
        </button>
        <div className={score === "Score" ? "remove" : "rounds_completed_div"}>
          <div className="rounds">Round: {roundsCompleted}</div>
          <div className="streak">Streak: {streak}</div>
        </div>
      </div>
    </section>
  );
}

export default GenerateQuiz;
