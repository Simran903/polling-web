"use client";
import React, { createContext, useState, useEffect, FC, ReactNode } from "react";

interface User {
  id: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  updateUser: (userData: User) => void;
  clearUser: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Persist user data
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear user data on logout
    localStorage.removeItem("token"); // Ensure token is removed
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;