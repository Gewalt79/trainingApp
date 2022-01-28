import React from 'react';
import { AuthContext } from './Context';

function Dashboard() {
  const value = React.useContext(AuthContext);

  return (
      <div className="dashboard">
        <p>Hello, {value.username}</p>
      </div>
  );
}

export default Dashboard;
