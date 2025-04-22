import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import UserProfile from "./UserProfile";

const Profile: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<"login" | "register">("login");
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      setUsername(storedUsername || "");
    }
  }, []);

  const handleLoginSuccess = (id: string, username: string) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
    setUserId(id);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUserId(null);
    setUsername("");
    setCurrentView("login");
  };

  if (isLoggedIn && userId) {
    return (
      <UserProfile
        userId={userId}
        username={username}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="auth-container">
      {currentView === "login" ? (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setCurrentView("register")}
        />
      ) : (
        <Register
          onRegisterSuccess={handleLoginSuccess}
          onSwitchToLogin={() => setCurrentView("login")}
        />
      )}
    </div>
  );
};

export default Profile;