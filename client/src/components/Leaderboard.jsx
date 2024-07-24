import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { NavbarDesktop } from "./NavbarDesktop";

function ScoreboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fectchLeaderboard = async () => {
      try {
        const res = await axios.get("/api/leaderboard");
        console.log("fetched scores:", res.data);
        setLeaderboard(res.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setError("Error fetching leaderboard");
      }
    };

    fectchLeaderboard();
  }, []);

  if (error) {
    return <alert>{error}</alert>;
  }
  return (
    <>
      <header className="primary-header ">
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/" alt="Quick Math" className="nav-logo">
              Quick Math
            </Link>
            <NavbarDesktop />
          </div>
        </div>
      </header>
      <section>
        <div className="container">
          <h2>Leaderboard</h2>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Total Score</th>
                <th>Rounds</th>
                <th>Streak</th>
                <th>Perfects</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.highScore.total}</td>
                    <td>{user.highScore.rounds}</td>
                    <td>{user.highScore.streak}</td>
                    <td>{user.highScore.perfects}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* <table>
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
          </table> */}
        </div>
      </section>
    </>
  );
}

export default ScoreboardPage;
