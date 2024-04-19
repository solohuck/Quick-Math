import { Link } from "react-router-dom";
import "./styles/leaderboard.css";

function ScoreboardPage() {
  return (
    <>
      <main>
        <nav>
          <Link to="/" className="nav__title">
            Quick Math
          </Link>
          <button className="nav__btn btn">Log out</button>
        </nav>

        <div className="section">
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
              <td data-cell="name">Madelyn Vetrovs</td>
              <td data-cell="location">Kazahstan</td>
              <td data-cell="rounds">32</td>
              <td data-cell="streak">10</td>
              <td data-cell="perfects">2</td>
              <td data-cell="score">4300</td>
            </tr>
            <tr>
              <td data-cell="place">1</td>
              <td data-cell="name">Madelyn Vetrovs</td>
              <td data-cell="location">Kazahstan</td>
              <td data-cell="rounds">32</td>
              <td data-cell="streak">10</td>
              <td data-cell="perfects">2</td>
              <td data-cell="score">4300</td>
            </tr>
            <tr>
              <td data-cell="place">1</td>
              <td data-cell="name">Madelyn Vetrovs</td>
              <td data-cell="location">Kazahstan</td>
              <td data-cell="rounds">32</td>
              <td data-cell="streak">10</td>
              <td data-cell="perfects">2</td>
              <td data-cell="score">4300</td>
            </tr>
          </table>
        </div>
      </main>
    </>
  );
}

export default ScoreboardPage;
