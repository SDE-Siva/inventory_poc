import React, { useState, useEffect } from "react";
import "./LoginForm.css";

const LoginForm = ({ setIsLoggedIn }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type === "email" ? "email" : e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("All fields are required!");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoggedIn(true);
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        setIsLoggedIn(true);
      } else {
        setError(" No user found or invalid credentials!");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="bg-body">{isSignup ? "Sign Up" : "Login"}</h2>

        <form className="bg-body" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group bg-body">
              <label className="bg-body">Name</label>
              <input
                name="name"
                className="bg-body"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group bg-body">
            <label className="bg-body">Email</label>
            <input
              name="email"
              className="bg-body"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group bg-body">
            <label className="bg-body">Password</label>
            <input
              name="password"
              className="bg-body"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {isSignup && (
            <div className="form-group bg-body">
              <label className="bg-body">Confirm Password</label>
              <input
                name="confirmPassword"
                className="bg-body"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}

          {error && <p className="error-text bg-body">{error}</p>}

          <button type="submit" className="btn-submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <p className="toggle-text bg-body">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              className="toggle-link bg-body"
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
