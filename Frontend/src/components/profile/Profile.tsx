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
    <div className="profileWrapper">
      <h1>Välkommen till AirBean-familjen!</h1>
      <h2>Logga in nedan för att se din orderhistorik.</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="name">Användarnamn</label>
        <input
          type="text"
          className="name"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="password">Lösenord</label>
        <input
          type="password"
          className="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Logga in</button>
      </form>
      {message && <p>{message}</p>}
      <h2>
        Inget konto? Skapa ett{" "}
        <Link className="link" to="/register">
          här
        </Link>
      </h2>
    </div>
  );
};

export default Profile;
