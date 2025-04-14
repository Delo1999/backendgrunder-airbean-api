import React from "react";
import "./profile.scss";
import { Link } from "react-router";

const Profile: React.FC = () => {
  return (
    <div className="profileWrapper">
      <h1>Välkommen till AirBean-familjen!</h1>
      <h2>Logga in nedan för att se din orderhistorik.</h2>
      <form className="form" method="post" action="/profile">
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
        <button type="submit">submit</button>
      </form>
      <h2>
        Inget konto? Skapa ett{" "}
        <Link className="link" to="/profile">
          här
        </Link>
      </h2>
    </div>
  );
};

export default Profile;
