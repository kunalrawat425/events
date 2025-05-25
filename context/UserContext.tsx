"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "publisher";
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would be handled by the backend
    if (email === "test@example.com" && password === "password123") {
      const mockUserData = {
        id: "1",
        email: email,
        name: "Test User",
        role: "user" as const
      };
      setUser(mockUserData);
      localStorage.setItem("user", JSON.stringify(mockUserData));
      return;
    }
    throw new Error("Invalid email or password");
  };

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup - in a real app, this would be handled by the backend
    const mockUserData = {
      id: Date.now().toString(),
      email,
      name,
      role: "user" as const
    };
    setUser(mockUserData);
    localStorage.setItem("user", JSON.stringify(mockUserData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
} 