import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import { isAuthenticated, logout } from "./utils/auth";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: isAuthenticated(),
      currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    };
  }

  handleLogin = (user) => {
    this.setState({ isAuthenticated: true, currentUser: user });
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  handleLogout = () => {
    logout();
    this.setState({ isAuthenticated: false, currentUser: null });
  };

  render() {
    const { isAuthenticated, currentUser } = this.state;

    return (
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login onLogin={this.handleLogin} />
                )
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Register onRegister={this.handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard
                    onLogout={this.handleLogout}
                    currentUser={currentUser}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
