import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const sessionUser = sessionStorage.getItem('user');
    return sessionUser ? JSON.parse(sessionUser) : null;
  });

  // Fetch users from localStorage
  const getUsers = () => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  };

  // Save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const signup = (username, password) => {
    const users = getUsers();
    const exists = users.find((u) => u.username === username);
    if (exists) {
      return { success: false, message: 'User already exists' };
    }
    const newUser = { username, password, favorites: [] }; // Add favorites array
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    return { success: true, message: 'Signup successful' };
  };

  const login = (username, password) => {
    const users = getUsers();
    const found = users.find((u) => u.username === username && u.password === password);
    if (found) {
      sessionStorage.setItem('user', JSON.stringify(found));
      setUser(found);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  // Add a favorite
  const addFavorite = (code) => {
    const updatedUser = {
      ...user,
      favorites: [...(user?.favorites || []), code],
    };
    updateUser(updatedUser);
  };

  // Remove a favorite
  const removeFavorite = (code) => {
    const updatedUser = {
      ...user,
      favorites: user?.favorites?.filter((fav) => fav !== code),
    };
    updateUser(updatedUser);
  };

  // Helper to sync changes to session and local storage
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    sessionStorage.setItem('user', JSON.stringify(updatedUser));

    const users = getUsers();
    const updatedUsers = users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    );
    saveUsers(updatedUsers);
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, addFavorite, removeFavorite }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
