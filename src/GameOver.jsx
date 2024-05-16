import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

function GameOver() {
  const location = useLocation();
  const { roundsCompleted, streak, perfects } = location.state;

  const finalScore = roundsCompleted * 50 + streak * 100 + perfects * 500;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitScore = async () => {
    try {
      await axios.post("/api/score", {
        score: finalScore,
        rounds: roundsCompleted,
        streak: streak,
        perfects: perfects,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  return (
    <section>
      <div className="container full-view-height wrapper center-content-flex">
        <h1 className="fs-primary-heading text-align-center fw-semi-bold">
          Game Over
        </h1>
        <div className="text-align-center padding-block-700">
          <p>Rounds Completed: {roundsCompleted}</p>
          <p>Longest Streak: {streak}</p>
          <p>Perfects: {perfects}</p>
          <div className="padding-block-600">
            <p className="fs-secondary-heading">Total: {finalScore}</p>
          </div>
        </div>

        <div className="game-over-links">
          <button onClick={handleSubmitScore} disabled={submitted}>
            Submit Score
          </button>
          <Link to="/GenerateQuiz" className="button ">
            Try Again
          </Link>
          <Link to="/Scoreboard" className="button">
            Leaderboard
          </Link>
          <Link to="/" className="button">
            Main Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GameOver;
