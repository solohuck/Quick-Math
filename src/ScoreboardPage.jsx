import { Link } from "react-router-dom";
import "./styles/leaderboard.css";

function ScoreboardPage() {
  return (
    <>
      <section>
        <nav>
          <Link to="/" className="nav__title">
            Quick Math
          </Link>
          <button className="nav__btn btn">Log out</button>
        </nav>

        <div className="container">
          <div className="hero-wrapper">
            <p className="hero__title">Leaderboard</p>
            <Link to="/GenerateQuiz" className="hero__btn btn">
              Back to quiz
            </Link>
          </div>

          <table>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Location</th>
              <th>Rounds</th>
              <th>Streak</th>
              <th>Perfs</th>
              <th>Score</th>
            </tr>

            <tr>
              <td data-cell="place">1</td>
              <td data-cell="name">Josh Smiley</td>
              <td data-cell="location">USA</td>
              <td data-cell="rounds">100</td>
              <td data-cell="streak">15</td>
              <td data-cell="perfects">5</td>
              <td data-cell="score">10,000</td>
            </tr>
            <tr>
              <td data-cell="place">2</td>
              <td data-cell="name">Jake Baker</td>
              <td data-cell="location">CAN</td>
              <td data-cell="rounds">60</td>
              <td data-cell="streak">13</td>
              <td data-cell="perfects">5</td>
              <td data-cell="score">7200</td>
            </tr>
            <tr>
              <td data-cell="place">3</td>
              <td data-cell="name">Madelyn Vetrovs</td>
              <td data-cell="location">AUS</td>
              <td data-cell="rounds">47</td>
              <td data-cell="streak">10</td>
              <td data-cell="perfects">2</td>
              <td data-cell="score">4300</td>
            </tr>
          </table>
        </div>
      </section>
    </>
  );
}

export default ScoreboardPage;
