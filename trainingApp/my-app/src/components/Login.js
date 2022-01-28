import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Context';

function Login() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  const value = React.useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await value.logUser({
      username,
      password,
    });
  };

  return (
    <form className="login-wrapper" onSubmit={handleSubmit}>
      <div className="login">
        <h3 className="login-text">Login</h3>
        <input
          className="login-input"
          type="text"
          placeholder="Enter login"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="login-buttons">
          <button className="login-buttons-login" type="submit">
            Login
          </button>
          <Link className="login-buttons-register" to="/register">
            Register
          </Link>
        </div>
        <Link className="back" to="/start">
          Back
        </Link>
      </div>
    </form>
  );
}

export default Login;
