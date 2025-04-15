import React, { useState } from "react";
import "./registerAccount.scss";
import { Link } from "react-router";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        console.log("User ID:", data.userId); // Handle user ID as needed
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="register__wrapper">
      <section className="register__wrapper__frame">
        <h1 className="register__wrapper__frame__title">Välkommen till AirBean-familjen!</h1>
        <h2 className="register__wrapper__frame__subtitle">Genom att skapa ett konto nedan kan du spara och se din orderhistorik.</h2>
        <form className="register__wrapper__frame__form" onSubmit={handleSubmit}>
          <label className="register__wrapper__frame__form__label">Användarnamn</label>
          <input
            type="text"
            className="register__wrapper__frame__form__input"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="register__wrapper__frame__form__label">Lösenord</label>
          <input
            type="password"
            className="register__wrapper__frame__form__input"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="register__wrapper__frame__form__btn">Skappa konto</button>
        </form>
        {message && <p>{message}</p>}
        <h2 className="register__wrapper__frame__register">
          Redan medlem? Logga in {" "}
          <Link className="link" to="/profile">
            här
          </Link>
        </h2>
      </section>
    </div>
  );
};

export default Register;
