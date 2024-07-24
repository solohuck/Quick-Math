import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quiz from "./Quiz";
import Landing from "./Landing";
import Leaderboard from "./Leaderboard";
import GameOver from "./GameOver";
import LoginRegister from "./LoginRegister";
import Account from "./Account";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} exact={true} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/Leaderboard" element={<Leaderboard />} />
        <Route path="/GameOver" element={<GameOver />} />
        <Route path="/LoginRegister" element={<LoginRegister />} />
        <Route path="/Account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
