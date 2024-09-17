import React from "react";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../utils/auth";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToDashboard: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      login(user);
      this.props.onLogin(user);
      this.setState({ redirectToDashboard: true });
    } else {
      this.setState({ error: "Invalid email or password" });
    }
  };

  render() {
    if (this.state.redirectToDashboard) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          {this.state.error && <p className="error">{this.state.error}</p>}
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    );
  }
}

export default Login;
