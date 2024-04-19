import React from "react";
import { useLocation, Link } from "react-router-dom";

function GameOver() {
  const location = useLocation();
  const { roundsCompleted, streak, perfects } = location.state;

  const finalScore = roundsCompleted * 50 + streak * 100 + perfects * 500;

  return (
    <section>
      <h1>Game Over</h1>
      <div>
        <p>Rounds Completed: {roundsCompleted}</p>
        <p>Longest Streak: {streak}</p>
        <p>Perfects: {perfects}</p>
        <div>
          <p>{finalScore}</p>
        </div>
      </div>
      {/* Add any additional content or components for the Game Over screen */}
      <div>
        <Link to="/GenerateQuiz">Back To Quiz</Link>
        <Link to="/Scoreboard">Leaderboard</Link>
        <Link to="/">Main Menu</Link>
      </div>
    </section>
  );
}

export default GameOver;
