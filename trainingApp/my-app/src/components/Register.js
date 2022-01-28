import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Context';

function Register() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [repeatPassword, setRepeatPassword] = React.useState();
  const { regUser } = React.useContext(AuthContext);

  function clear() {
    setPassword('');
    setUsername('');
    setRepeatPassword('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await regUser({
      username,
      password,
      repeatPassword,
    });
    clear();
  };

  return (
    <form className="login-wrapper" onSubmit={handleSubmit}>
      <div className="login">
        <h3 className="login-text">Registration form</h3>
        <input
        className="login-input"
          name="login"
          type="text"
          placeholder="Create login"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <input
        className="login-input"
          name="password"
          type="password"
          placeholder="Create password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <input
        className="login-input"
          name="repeatPassword"
          type="password"
          placeholder="Repeat password"
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required
        />
        <div className="login-buttons">
          <Link className="login-buttons-login" to="/login">
            Login
          </Link>
          <button type="submit" className="login-buttons-login" to="/register">
            Registration
          </button>
        </div>
        <Link className="back" to="/start">
          Back
        </Link>
      </div>
    </form>
  );
}

export default Register;
