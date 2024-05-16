import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
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
                  Scoreboard
                </Link>

                <a href="#rules" className="nav-list-link">
                  Rules
                </a>

                <Link to="/Account" className="nav-list-link">
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
    </>
  );
}
