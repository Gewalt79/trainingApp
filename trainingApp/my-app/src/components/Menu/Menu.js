import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context';

function Menu() {
  const value = React.useContext(AuthContext);
  console.log(value.inDashboard, value.inWorkout);

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <p className="sidebar-top-avatar"></p>
        <p className="sidebar-top-username">{value.username}</p>
      </div>
      <ul className="sidebar-options">
        <li className={value.inDashboard ? 'sidebar-options-li active' : 'sidebar-options-li'}>
          <Link to="/dashboard" onClick={value.enteredDashboard}>
            Dashboard
          </Link>
        </li>
        <li className={value.inWorkout ? 'sidebar-options-li active' : 'sidebar-options-li'}>
          <Link to="/workout" onClick={value.enteredWorkout}>
            Add workout
          </Link>
        </li>
      </ul>

      <button onClick={value.logOut} className="sidebar-exit">
        Exit
      </button>
    </div>
  );
}

export default Menu;
