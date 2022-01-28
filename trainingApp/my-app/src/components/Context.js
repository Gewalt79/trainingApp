import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import useToken from './useToken';
import useRoute from './useRoute';

let AuthContext = React.createContext();

function AuthProvider({ children }) {
  const { token, username, connect, disconnect } = useToken();
  const { inDashboard, inWorkout, connectedToDashboard, connectedToWorkout } = useRoute();

  let navigate = useNavigate();

  let logUser = async (loginInfo) => {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.token && data.user) {
          connect(data.token, data.user);
          connectedToDashboard()
          console.log(data.message);
          navigate('/dashboard', { replace: true });
        } else {
          alert(data.message)
        }
      });
  };

  let regUser = async (regInfo) => {
    return fetch('http://localhost:3000/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(regInfo),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.message);
        navigate('/login', { replace: true });
      });
  };

  let logOut = () => {
    disconnect();
    navigate('/start', { replace: true });
  };

  let enteredWorkout = () => {
    connectedToWorkout();
  }
  let enteredDashboard = () => {
    connectedToDashboard();
  }

  let value = {
    token,
    username,
    logUser,
    regUser,
    logOut,
    inDashboard,
    inWorkout,
    enteredWorkout,
    enteredDashboard
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.username && !auth.token) {
    return <Navigate to="/start" state={{ from: location }} replace />;
  }

  return children;
}

function DontRequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.username && auth.token) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
}

export { RequireAuth, DontRequireAuth, AuthProvider, AuthContext };
