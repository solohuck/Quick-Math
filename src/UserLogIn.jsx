import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function UserLogIn() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", { username, password, email });
      console.log("User created successfully");
      setIsRegister(false);
      setErrorMessage("User created successfully");
    } catch (error) {
      if (error.response & (error.response.status === 409)) {
        setErrorMessage("User already exists. Please log in.");
      } else {
        setErrorMessage("Failed to create user. Please try again.");
      }
      console.error("Error registering:", error);
    }
  };

  const enableRegister = () => {
    setIsRegister(true);
  };

  const cancelRegister = () => {
    setIsRegister(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", { username, password });
      localStorage.setItem("authToken", response.data.accessToken); // store the token
      setErrorMessage("Login successful");

      if (from) {
        navigate(from);
      } else {
        navigate("/UserAccount");
      }
      
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <section className="container form-wrapper place-content-center full-view-height">
      {errorMessage && <p className="text-align-center">{errorMessage}</p>}
      <form className="form-display-flex form-border">
        <input
          className="email form-input"
          type="username"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={!isRegister ? "visually-hidden" : "password form-input"}
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={"password form-input"}
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="form-button button"
          onClick={!isRegister ? handleLogin : handleRegister}
        >
          {!isRegister ? "Log in" : "Register"}
        </button>
      </form>

      <div className="account-signup padding-block-600 place-content-center">
        {!isRegister && <p className="f">Don't have an acount yet?</p>}
        <button
          type="submit"
          className="signup-button no-background"
          onClick={!isRegister ? enableRegister : cancelRegister}
        >
          {!isRegister ? "Create User" : "Cancel"}
        </button>
      </div>
    </section>
  );
}

export default UserLogIn;
