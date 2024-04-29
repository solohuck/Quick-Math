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
        question: `${num1} ${operation} ${num2} = ?`,
      };

      setQuestions([newQuestion]);
      setCorrectAnswer(answer);
      setSelectedAnswer(false);
      setSeconds(2000);
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
      <div className="container full-view-height">
        <div className="space-between">
          <p>{score}</p>
          <p>{seconds}</p>
        </div>

        {questions.map((question, index) => (
          <div key={index} className="text-align-center display-grid">
            <h3>{question.question}</h3>

            {question.answersArray.map((answer, index) => (
              <button
                key={index}
                className="button button--mw"
                onClick={() => handleAnsweredClick(answer)}
              >
                {answer}
              </button>
            ))}
          </div>
        ))}

        <button onClick={handleClick} className="button visually-hidden">
          Start
        </button>
        <div className="space-between">
          <p>Round: {roundsCompleted}</p>
          <p>Streak: {streak}</p>
        </div>
      </div>
    </section>
  );
}

export default GenerateQuiz;
