import React, { useState } from "react";
import "./Profile.scss";

interface LoginProps {
  onLoginSuccess: (id: string, username: string) => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Login response:", data); // Debug

      if (response.ok && data.userId) {
        setMessage("Login successful!");

        // spara userID i localStorage
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("userId", data.userId);
        } else {
          console.error("localStorage is not available");
        }

        onLoginSuccess(data.userId, username);
      } else {
        setMessage(data.message || "Login failed: Missing user ID");
      }
    } catch (error) {
      setMessage("An error occurred during login.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="profile__wrapper">
      <div className="profile__wrapper__frame">
        <h1 className="profile__wrapper__frame__title">Logga in</h1>
        <p className="profile__wrapper__frame__subtitle">Välkommen tillbaka!</p>

        <form className="profile__wrapper__frame__form" onSubmit={handleSubmit}>
          <label className="profile__wrapper__frame__form__label" htmlFor="username">
            Användarnamn
          </label>
          <input
            className="profile__wrapper__frame__form__input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Användarnamn"
            required
          />

          <label className="profile__wrapper__frame__form__label" htmlFor="password">
            Lösenord
          </label>
          <input
            className="profile__wrapper__frame__form__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Lösenord"
            required
          />

          <button className="profile__wrapper__frame__form__btn" type="submit">
            Logga in
          </button>
        </form>

        {message && <p className="profile__wrapper__frame__message">{message}</p>}

        <p className="profile__wrapper__frame__register">
          Inget konto?{" "}
          <button
            onClick={onSwitchToRegister}
            style={{ cursor: "pointer", textDecoration: "underline", background: "none", border: "none", color: "blue" }}
          >
            Skapa ett här
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
