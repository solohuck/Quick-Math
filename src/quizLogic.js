export function quizLogic() {
  
  useEffect(() => {
    if (score <= 0) {
      setScore(0);
      if (score === 0) {
        handleGameOver();
      }
    } else if (
      (seconds === 0 && !selectedAnswer) ||
      (seconds > 0 && selectedAnswer === correctAnswer) ||
      seconds === "Perfect!"
    ) {
      setRoundsCompleted((currentRound) => {
        return (currentRound += 1);
      });
    }
  }, [selectedAnswer, seconds, correctAnswer, score]);

  return [selectedAnswer, seconds, correctAnswer, score];
}
