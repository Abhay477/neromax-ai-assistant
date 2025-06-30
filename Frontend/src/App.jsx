import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser] = useAuth();

  return (
    <Routes>
      {/* Protected Layout with nested routes */}
      <Route
        path="/"
        element={authUser ? <Layout /> : <Navigate to="/login" />}
      >
        {/* Home is nested inside Layout */}
        <Route index element={<Home />} />
      </Route>

      {/* Public Routes */}
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={authUser ? <Navigate to="/" /> : <Signup />}
      />
    </Routes>
  );
}

export default App;
