"use client"
import React, { createContext, useContext, useState } from "react";

type User = { id: string; name?: string; email?: string } | null;

type AuthContext = {
  user: User;
  signin: (creds: { email: string; password: string }) => Promise<User>;
  signout: () => Promise<void>;
};

const ctx = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  async function signin(_creds: { email: string; password: string }) {
    // placeholder: integrate real API
    const u: User = { id: "1", email: _creds.email, name: "Demo" };
    setUser(u);
    return u;
  }

  async function signout() {
    setUser(null);
  }

  return <ctx.Provider value={{ user, signin, signout }}>{children}</ctx.Provider>;
}

export function useAuth() {
  const v = useContext(ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
