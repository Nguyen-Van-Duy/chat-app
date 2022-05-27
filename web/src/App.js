// import React, { useState, useEffect, useRef } from "react";
// import socketIOClient from "socket.io-client";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./login/Login";
import Mesenger from "./messenger/Mesenger";
// const host = "http://localhost:5000";

function App() {
  return (
      <div className="box-chat">
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/messenger" element={<Mesenger />} />
            <Route path="*" element={<Login />} />
        </Routes>

      </div>
  );
}

export default App;
