import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, RequireAuth, DontRequireAuth } from './Context';

import Login from './Login';
import Start from './Start';
import Register from './Register';
import Dashboard from './Dashboard';
import Menu from './Menu/Menu';
import Workout from './Workout/Workout';
import './app.css'

export default function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Menu />
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/workout"
            element={
              <RequireAuth>
                <Menu />
                <Workout />
              </RequireAuth>
            }
          />
          <Route
            path="/start"
            element={
              <DontRequireAuth>
                <Start />
              </DontRequireAuth>
            }
          />
          <Route
            path="/login"
            element={
              <DontRequireAuth>
                <Login />
              </DontRequireAuth>
            }
          />
          <Route
            path="/register"
            element={
              <DontRequireAuth>
                <Register />
              </DontRequireAuth>
            }
          />
          <Route
            path="/*"
            element={
              <DontRequireAuth>
                <Navigate to="/start" />
              </DontRequireAuth>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}
