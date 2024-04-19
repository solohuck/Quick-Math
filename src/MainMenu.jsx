import React from "react";
import { Link } from "react-router-dom";

function MainMenu() {
  return (
    <section>
      <div>
        <h1>Welcome to Quick Math!</h1>

        <button>
          <Link to="/GenerateQuiz">Test Your Skills</Link>
        </button>
        <button>
          <Link to="/Scoreboard">View Scoreboard</Link>
        </button>
        <button>
          <Link to="/Account">Log In</Link>
        </button>
      </div>
    </section>
  );
}

export default MainMenu;
