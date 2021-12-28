import React from "react";
import { Link } from "react-router-dom";

async function loginUser(credentials) {
  return fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then(res => console.log(res.json()))
}

function Login() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser({
      username,
      password,
    });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <input
        type="text"
        placeholder="Enter login"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="login-form__buttons">
        <button className="button" type="submit">
          Login
        </button>
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

export default Login;
