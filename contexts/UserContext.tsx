"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "publisher";
  interests: string[];
  companyName?: string;
  companyWebsite?: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateInterests: (interests: string[]) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(error.message || "Authentication failed");
      }

      const userData = await response.json();

      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      document.cookie = `user=${JSON.stringify(userData)}; path=/`;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string, userData: Partial<User>) => {
    // Mock signup - in a real app, this would be handled by the backend
    const mockUserData = {
      id: Date.now().toString(),
      email,
      name: userData.name || "",
      role: userData.role || "user",
      interests: [],
      companyName: userData.companyName,
      companyWebsite: userData.companyWebsite,
    };

    setUser(mockUserData);
    localStorage.setItem("currentUser", JSON.stringify(mockUserData));
    document.cookie = `user=${JSON.stringify(mockUserData)}; path=/`;
  };

  const updateInterests = async (interests: string[]) => {
    if (!user) {
      throw new Error("User must be logged in to update interests");
    }

    const updatedUser = {
      ...user,
      interests,
    };

    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, signup, logout, updateInterests }}>
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
