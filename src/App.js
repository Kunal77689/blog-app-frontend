import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Redirect } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Categories from "./components/Categories";
import ProfilePage from "./components/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute
          exact
          path="/categories"
          element={<Categories />}
        ></PrivateRoute>
        <PrivateRoute exact path="/profile" element={<ProfilePage />} />
        <PrivateRoute exact path="/" element={<HomePage />} />{" "}
        {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
