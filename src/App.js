import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChatListComponent from "./components/ChatListComponent";
import ChatScreenComponent from "./components/ChatScreenComponent";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatlist" element={<ChatListComponent />} />
        <Route path="/:username" element={<ChatScreenComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
