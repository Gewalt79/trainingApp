import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
//import useToken from "./useToken";

import "./App.css";
import Login from "./Login";
import Start from "./Start";
import Register from "./Register";
import Dashboard from "./Dashboard";

function App() {
  //const { token, setToken } = useToken();
  return (
    <div className="App">
      <p className="logo">Logotype</p>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} /> :
          <Route path="/start" element={<Start />} />
          <Route path="/login" element={<Login /*setToken={setToken}*/ />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/start" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
