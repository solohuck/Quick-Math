import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function GameOver() {
  const location = useLocation();
  const navigate = useNavigate();
  const [noUserFound, setNoUserFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scoreDetails, setScoreDetails] = useState(
    location.state || JSON.parse(localStorage.getItem("scoreDetails")) || {}
  );
  const [token] = useState(localStorage.getItem("authToken"));

  const { roundsCompleted, streak, perfects } = scoreDetails;

  const finalScore =
    (roundsCompleted || 0) * 50 + (streak || 0) * 100 + (perfects || 0) * 500;

  useEffect(() => {
    const checkForUser = async () => {
      if (token) {
        console.log("user is logged in");
        handleSubmitScore();
      } else {
        setNoUserFound(true);
        setErrorMessage("Click here to login/signup and save your score");

        localStorage.setItem(
          "scoreDetails",
          JSON.stringify({ roundsCompleted, streak, perfects, finalScore }),
          console.log("Score saved to local storage")
        );
        // launch code for not being logged in
      }
    };

    checkForUser();
  }, []);

  const handleNoUserFound = async () => {
    try {
      navigate(
        "/UserLogIn",
        { state: { from: location } },
        console.log("redirecting to login page")
      );
    } catch (error) {
      console.error("Error redirecting to login page");
    }
  };

  const handleSubmitScore = async () => {
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

      localStorage.removeItem("scoreDetails");
      console.log(res.data.message);
      setErrorMessage(res.data.message);
    } catch (error) {
      console.error("Error submitting score:", error);
      setErrorMessage("Session expired. Please log in again.");
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
          {errorMessage && (
            <p
              className="error-message text-align-center "
              style={{ color: "red" }}
              onClick={noUserFound ? handleNoUserFound : null}
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
