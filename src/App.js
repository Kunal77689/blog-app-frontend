import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Categories from "./components/Categories";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/" element={<HomePage />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
