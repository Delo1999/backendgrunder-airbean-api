import React from "react";
import "./profile.scss";

const Profile: React.FC = () => {
  return (
    <div className="profileWrapper">
      <h1>Välkommen till AirBean-familjen!</h1>
      <h2>Logga in nedan för att se din orderhistorik.</h2>
      <form className="form">
        <label className="name">Namn</label>
        <input
          type="text"
          className="name"
          placeholder="Användarnamn"
          required
        />
        <label className="password"></label>
        <input
          type="password"
          className="password"
          placeholder="Lösenord"
          required
        />
      </form>
      <h2>
        Inget konto? Skapa ett{" "}
        <a className="link" href="/profile">
          här
        </a>
      </h2>
    </div>
  );
};

export default Profile;
