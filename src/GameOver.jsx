import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function GameOver() {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [scoreDetails, setScoreDetails] = useState(
    location.state || JSON.parse(localStorage.getItem("scoreDetails")) || {}
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { roundsCompleted, streak, perfects } = scoreDetails;

  const finalScore =
    (roundsCompleted || 0) * 50 + (streak || 0) * 100 + (perfects || 0) * 500;

  const handleSubmitScore = async (token) => {
    try {
      const res = await axios.post(
        "/api/score",
        {
          total: finalScore,
          rounds: roundsCompleted,
          streak: streak,
          perfects: perfects,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data.message);
      setSubmitted(true);
      localStorage.removeItem("scoreDetails");
      setErrorMessage(`Score submitted successfully!`);
    } catch (error) {
      console.error("Error submitting score:", error);
      setErrorMessage("Failed to submit score. Please try again.");
    }
  };

  useEffect(() => {
    const getUserNameAndSubmitScore = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const res = await axios.get("/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsLoggedIn(true);
          if (!submitted) {
            await handleSubmitScore(token);
            console.log(`Currently logged in as ${res.data.username}`);
          }
        } else {
          setIsLoggedIn(false);
          setErrorMessage("You must be logged in to save your score.");
          localStorage.setItem(
            "scoreDetails",
            JSON.stringify({ roundsCompleted, streak, perfects, finalScore })
          );
          navigate("/UserLogIn", { state: { from: location } });
        }
      } catch (error) {
        console.error("Please login", error);
        setErrorMessage("Error fetching user data. Please login.");
      }
    };

    getUserNameAndSubmitScore();
  }, [
    submitted,
    roundsCompleted,
    streak,
    perfects,
    finalScore,
    location,
    navigate,
  ]);

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
          {errorMessage && (
            <p
              className="error-message text-align-center "
              style={{ color: "red" }}
            >
              {errorMessage}
            </p>
          )}
        </div>

        <div className="game-over-links">
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
