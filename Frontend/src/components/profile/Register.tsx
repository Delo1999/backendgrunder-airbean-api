import React, { useState } from "react";
import "./Profile.scss";

interface RegisterProps {
  onRegisterSuccess: (id: string, username: string) => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        onRegisterSuccess(data.userId, username);
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("An error occurred.");
      console.error(error);
    }
  };

  return (
    <div className="profile__wrapper">
      <div className="profile__wrapper__frame">
        <h1 className="profile__wrapper__frame__title">Skapa konto</h1>
        <p className="profile__wrapper__frame__subtitle">Vänligen fyll i dina uppgifter</p>

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
            Registrera
          </button>
        </form>

        {message && <p>{message}</p>}

        <p className="profile__wrapper__frame__register">
          Redan medlem?{" "}
          <button onClick={onSwitchToLogin} style={{ cursor: "pointer", textDecoration: "underline" }}>
            Logga in här
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
