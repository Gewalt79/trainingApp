import React from 'react';
import useToken from './useToken.js'

export default function useRoute() {
  const { token } = useToken();
  const getDashboardStatus = () => {
    const dashboardStatus = localStorage.getItem('dashboardStatus');
    return dashboardStatus;
  };

  const getWorkoutStatus = () => {
    const workoutStatus = localStorage.getItem('workoutStatus');
    return workoutStatus;
  };

  const [inDashboard, setInDashboard] = React.useState(getDashboardStatus());
  const [inWorkout, setInWorkout] = React.useState(getWorkoutStatus());

  function failed() {
    localStorage.removeItem('workoutStatus');
    localStorage.removeItem('dashboardStatus');
    setInDashboard(false);
    setInWorkout(false);
    console.log("You dont have token")
  }

  const connectedToDashboard = () => {
    if (token) {
      localStorage.removeItem('workoutStatus');
      localStorage.setItem('dashboardStatus', true);
      setInWorkout(false);
      setInDashboard(true);
    } else {
        failed();
    }
  };

  const connectedToWorkout = () => {
    if (token) {
      localStorage.removeItem('dashboardStatus');
      localStorage.setItem('workoutStatus', true);
      setInDashboard(false);
      setInWorkout(true);
    } else {
        failed();
    }
  };

  return {
    inDashboard,
    inWorkout,
    connectedToDashboard,
    connectedToWorkout,
  };
}
