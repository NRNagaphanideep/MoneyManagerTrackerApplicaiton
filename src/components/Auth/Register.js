import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../utils/auth";
import "./Register.css";

function Register({ onRegister }) {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === email)) {
      setError("Email already exists");
    } else {
      const newUser = { username, email, password };
      register(newUser);
      onRegister(newUser);
      navigate("/dashboard");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-register">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
