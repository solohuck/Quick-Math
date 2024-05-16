import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserLogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", { email, password });
      console.log("User created successfully");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      console.log("Login successful:", response.data);
      localStorage.setItem("authToken", response.data.token); // store the token
      setErrorMessage("Login successful");
      navigate("/UserAccount");
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <section>
      <form>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" onClick={handleRegister}>
          Create User
        </button>
        <button type="submit" onClick={handleLogin}>
          Log in
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </section>
  );
}

export default UserLogIn;
