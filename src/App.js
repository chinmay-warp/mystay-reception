import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import UserStateContext from "./Context/UserContext";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import React from "react";

function App() {
  return (
    <>
      <UserStateContext>
        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </UserStateContext>
    </>
  );
}

export default App;
