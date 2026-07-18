import { useState, useEffect } from "react";
import type { AppData } from "../types";
import { initialData } from "../data/sampleData";

const STORAGE_KEY = "medika_hospital_data";

export function useAppData() {
  const [data, setData] = useState<AppData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialData;
    } catch {
      return initialData;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (partial: Partial<AppData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  return { data, updateData };
}

const AUTH_KEY = "medika_auth";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === "true";
  });

  const login = (email: string, password: string): boolean => {
    if (email === "admin@medikahospital.com" && password === "admin123") {
      localStorage.setItem(AUTH_KEY, "true");
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
}
