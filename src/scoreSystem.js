import { useState } from "react";

export function scoreSystem() {
  const [score, setScore] = useState("Score");
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestSteak] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [perfects, setPerfects] = useState(0);

  const updateScore = (answer, usersSelection, timeLeft) => {
    let currentScore = score;
    let currentStreak = streak;
    let currentLongStreak = longestStreak;
    let currentRoundsCompleted = roundsCompleted;
    let currentPerfects = perfects;

    if (timeLeft > 0) {
      if (usersSelection === answer) {
        currentStreak += 1;
        currentRoundsCompleted += 1;
        currentLongStreak =
          streak > 1 && streak > longestStreak ? streak : longestStreak;

        if (currentScore <= 100) {
          if (currentStreak === 5) {
            currentScore += 3;
          } else if (streak >= 8) {
            currentScore += 5;
          } else if (streak >= 10) {
            currentScore += 8;
          } else if (streak >= 15) {
            currentScore += 10;
          } else if (streak >= 20) {
            currentScore += 15;
          }
        }
        if (timeLeft === 10) {
          currentScore += 10;
          currentPerfects += 1;
        }
      } else {
        currentStreak = 0;
        currentScore -= timeLeft;
      }
    } else {
      currentScore -= 10;
      currentStreak = 0;
      currentRoundsCompleted += 1;
    }

    setScore(currentScore);
    setStreak(currentStreak);
    setLongestSteak(currentLongStreak);
    setRoundsCompleted(currentRoundsCompleted);
    setPerfects(currentPerfects);
  };

  return [
    score,
    updateScore,
    setScore,
    longestStreak,
    roundsCompleted,
    perfects,
    streak,
  ];
}
