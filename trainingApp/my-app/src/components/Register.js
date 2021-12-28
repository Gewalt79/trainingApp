import React from "react";
import { Link } from "react-router-dom";

async function registerUser(credentials) {
  return fetch("http://localhost:3000/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then();
}

function Register() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [repeatPassword, setRepeatPassword] = React.useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser({
      username,
      password,
      repeatPassword,
    });
    //setToken(token);
    //console.log(token)
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3>Registration form</h3>
      <input
        name="login"
        type="text"
        placeholder="Create login"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Create password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      <input
        name="repeatPassword"
        type="password"
        placeholder="Repeat password"
        onChange={(e) => setRepeatPassword(e.target.value)}
        value={repeatPassword}
        required
      />
      <button type="submit">End registration</button>
      <div className="login-form__buttons">
        <Link className="button" to="/login">
          Login
        </Link>
        <Link className="button" to="/register">
          Register
        </Link>
      </div>
      <Link className="login-form__back" to="/start">
        Back
      </Link>
    </form>
  );
}

export default Register;
