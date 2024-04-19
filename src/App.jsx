import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenerateQuiz from "./GenerateQuiz";
import MainMenu from "./MainMenu";
import ScoreboardPage from "./ScoreboardPage";
import GameOver from "./GameOver";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/GenerateQuiz" element={<GenerateQuiz />} />
        <Route path="/Scoreboard" element={<ScoreboardPage />} />
        <Route path="/GameOver" element={<GameOver />} />
      </Routes>
    </Router>
  );
}

export default App;
