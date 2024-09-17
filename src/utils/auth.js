// This file handles authentication-related functions

export const isAuthenticated = () => {
  const user = localStorage.getItem("currentUser");
  return !!user;
};

export const login = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const register = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  login(user);
};
