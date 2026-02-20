import React, { createContext, useEffect, useState, ReactNode } from "react";
import {
  getAuthToken,
  saveAuthToken,
  clearAuthToken,
} from "@/services/tokenStorage";

interface AuthContextType {
  authToken: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  authToken: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 LOAD TOKEN ON APP START
  useEffect(() => {
    const loadToken = async () => {
      const token = await getAuthToken();
      console.log("Loaded Token:", token);
      setAuthToken(token);
      setLoading(false);
    };

    loadToken();
  }, []);

  const login = async (token: string) => {
    await saveAuthToken(token);
    setAuthToken(token);
  };

  const logout = async () => {
    await clearAuthToken();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
