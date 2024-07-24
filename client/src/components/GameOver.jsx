import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { getValidAuthToken } from "../javaScript/auth";
import axios from "axios";

function GameOver() {
  const location = useLocation();
  const navigate = useNavigate();
  const [noUserFound, setNoUserFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scoreDetails, setScoreDetails] = useState(
    location.state || JSON.parse(sessionStorage.getItem("scoreDetails")) || {}
  );
  const [authToken] = useState(sessionStorage.getItem("authToken"));

  const { roundsCompleted, streak, perfects } = scoreDetails;

  const finalScore =
    (roundsCompleted || 0) * 50 + (streak || 0) * 100 + (perfects || 0) * 500;

  useEffect(() => {
    const checkForUser = async () => {
      if (authToken) {
        handleSubmitScore();
      } else {
        getValidAuthToken();
        setNoUserFound(true);
        setErrorMessage("Click here to login/signup and save your score");
        sessionStorage.setItem(
          "scoreDetails",
          JSON.stringify({ roundsCompleted, streak, perfects, finalScore }),
          console.log("Score saved to session storage")
        );
        // launch code for not being logged in
      }
    };

    checkForUser();
  }, []);

  const handleNoUserFound = async () => {
    try {
      navigate(
        "/LoginRegister",
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
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      sessionStorage.removeItem("scoreDetails");
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
          <Link to="/Quiz" className="button button-fixed-width">
            Try Again
          </Link>
          <Link to="/" className="button button-fixed-width">
            Quit
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GameOver;
