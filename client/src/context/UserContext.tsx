"use client";
import React, { createContext, useState, useEffect, FC, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  totalPollsCreated?: number;
}

interface UserContextType {
  user: User | null;
  updateUser: (userData: User) => void;
  clearUser: () => void;
  // updateUserStats: (key: keyof User, value: number) => void;
  onPollCreateOrDelete: (type: "create") => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  updateUser: () => {},
  clearUser: () => {},
  // updateUserStats: () => {},
  onPollCreateOrDelete: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const updateUser = (userData: User): void => {
    setUser(userData);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const clearUser = (): void => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  const updateUserStats = (key: keyof User, value: number): void => {
    setUser((prev) => {
      if (!prev) return null;
      const updatedUser = { ...prev, [key]: value };
      return updatedUser;
    });
  };

  const onPollCreateOrDelete = (type: "create"): void => {
    const totalPollsCreated = user?.totalPollsCreated || 0
    updateUserStats(
      "totalPollsCreated",
      type === "create"
        ? (user?.totalPollsCreated ?? 0) + 1
        : Math.max(0, (user?.totalPollsCreated ?? 0) - 1)
    );
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, onPollCreateOrDelete }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;