import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import routes from "./routeConfig";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state for initial check

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Validate token on the server side if needed
          // For simplicity, assume it's valid if present
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error checking token:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false); // Once checked, set loading to false
    };

    checkLoggedIn();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const handleLogin = async (email, password) => {
    try {
      // Perform login
      const response = await axios.post(
        "http://3.133.105.39:3000/api/users/login",
        {
          email: email,
          password: password,
        }
      );

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      setIsLoggedIn(true);

      // No need for explicit redirect here; component will re-render
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = () => {
    // Perform logout logic (clear localStorage, reset state)
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (loading) {
    // Show loading indicator or component while checking login status
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.requiresAuth && !isLoggedIn ? (
                <Navigate to="/login" />
              ) : (
                <route.component
                  onLogout={handleLogout}
                  onLogin={handleLogin}
                />
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
