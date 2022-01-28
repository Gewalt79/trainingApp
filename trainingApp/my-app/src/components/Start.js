import React from "react";
import { Link } from "react-router-dom";

function Start() {
  return (
    <div className="start">
      <p className="start-text">
        This app made for people who tired of modernity and want to progress
        everyday and push forward
      </p>
      <Link className="start-btn" to="/login">
        Start making progress
      </Link>
      <p className="start-under">no need phone to start</p>
    </div>
  );
}

export default Start;
