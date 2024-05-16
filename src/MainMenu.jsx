import React from "react";
import { Link } from "react-router-dom";

function MainMenu() {
  return (
    <>
      <header className="primary-header ">
        <div className="container">
          <div className="nav-wrapper">
            <a href="#" alt="Quick Math" className="nav-logo">
              Quick Math
            </a>
            <nav className="primary-navigation" id="primary-navigation">
              <ul aria-label="Primary" role="list" className="nav-list">
                <Link to="/Scoreboard" className="nav-list-link">
                  Leaderboard
                </Link>

                <a href="#rules" className="nav-list-link">
                  Rules
                </a>

                <Link to="/UserLogIn" className="nav-list-link">
                  Log In
                </Link>

                <Link to="/GenerateQuiz" className="nav-list-link">
                  Play
                </Link>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="padding-block-900">
          <div className="container text-align-center">
            <div className="even-columns ">
              <div className="flow extra-padding">
                <h1 className="fs-primary-heading fw-bold">
                  Sharpen Your Math Skills in Minutes!
                </h1>
                <p>
                  Engage in fun, timed math challenges to test and improve your
                  mental arithmetic skills.
                </p>

                <button className="remove-button-border">
                  <Link to="/GenerateQuiz" className="button">
                    Start Practicing
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="padding-block-900">
          <div className="contianer">
            <div id="rules" className="flow bg-clr-accent extra-padding bg-clr">
              <h2 className="fs-secondary-heading fw-bold text-align-center margin-bottom">
                Rules
              </h2>
              <ul className="grid">
                <li>
                  <strong>Time Limit</strong>
                  <br /> Each question must be answered within 10 seconds.
                </li>
                <li>
                  <strong>Progression</strong>
                  <br /> You must correctly answer the current question to
                  advance to the next one.
                </li>
                <li>
                  <strong>Incorrect Answers</strong>
                  <br /> Points lost are based on the time left (1 point per
                  remaining second).
                </li>
                <li>
                  <strong>Timeout</strong> <br />
                  Failing to answer within 10 seconds results in a 10-point
                  deduction and the next question loads.
                </li>

                <li>
                  <strong>Streak Bonus</strong> <br />
                  Earn bonus points by answering correctly consecutively
                  (minimum streak of 5 required).
                </li>
                <li>
                  <strong>Perfect Answer Bonus</strong> <br />
                  Answering within 1 second grants an additional 10 points.
                </li>

                <li>
                  <strong>Game End</strong> <br />
                  The game concludes when you run out of points.
                </li>
                <li>
                  <strong>Final Score</strong> <br />
                  Calculated based on your longest streak, number of perfect
                  answers, and total rounds completed.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer></footer>
      {/* <div className="container full-view-height place-content-center">
        <div className="display-grid">
          <h1 className="text-align-center fw-bold fs-primary-heading grid-row-span2">
            Welcome to Quick Math!
          </h1>

          <Link to="/GenerateQuiz" className="button button--mw">
            Test Your Skills
          </Link>

          <Link to="/Scoreboard" className="button button--mw">
            View Scoreboard
          </Link>

          <Link to="/Account" className="button button--mw">
            Log In
          </Link>
        </div>
      </div> */}
    </>
  );
}

export default MainMenu;
