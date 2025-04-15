import React, { useState } from "react";
import "./profile.scss";
import { Link } from "react-router";

const Profile: React.FC = () => {
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
    <div className="profile__wrapper">
      <section className="profile__wrapper__frame">
        <h1 className="profile__wrapper__frame__title">Välkommen till AirBean-familjen!</h1>
        <h2 className="profile__wrapper__frame__subtitle">Logga in nedan för att se din orderhistorik.</h2>
        <form className="profile__wrapper__frame__form" onSubmit={handleSubmit}>
          <label className="profile__wrapper__frame__form__label">Användarnamn</label>
          <input
            type="text"
            className="profile__wrapper__frame__form__input"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="profile__wrapper__frame__form__label">Lösenord</label>
          <input
            type="password"
            className="profile__wrapper__frame__form__input"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="profile__wrapper__frame__form__btn">Logga in</button>
        </form>
        {message && <p>{message}</p>}
        <h2 className="profile__wrapper__frame__register">
          Inget konto? Skapa ett{" "}
          <Link className="link" to="/register">
            här
          </Link>
        </h2>
      </section>
    </div>
  );
};

export default Profile;
