import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./widgets/NavBar";
import Home from "./pages/Home";
import "./index.css";
import Auth from "./pages/Auth";
import { ToastContainer, toast } from "react-toastify";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/Create-post" element={<CreatePost></CreatePost>} />
          {/* Define other routes as needed */}
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
