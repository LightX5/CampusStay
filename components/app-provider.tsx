"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = { name: string; email: string } | null;
type AppContextValue = { savedIds: string[]; toggleSaved: (id: string) => void; isSaved: (id: string) => boolean; user: User; signIn: (user: User) => void; signOut: () => void; recentIds: string[]; addRecent: (id: string) => void };
const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [user, setUser] = useState<User>(null);
  useEffect(() => { setSavedIds(JSON.parse(localStorage.getItem("campusstay-saved") || "[]")); setRecentIds(JSON.parse(localStorage.getItem("campusstay-recent") || "[]")); setUser(JSON.parse(localStorage.getItem("campusstay-user") || "null")); }, []);
  const value = useMemo(() => ({ savedIds, toggleSaved: (id: string) => setSavedIds((current) => { const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]; localStorage.setItem("campusstay-saved", JSON.stringify(next)); return next; }), isSaved: (id: string) => savedIds.includes(id), user, signIn: (next: User) => { setUser(next); localStorage.setItem("campusstay-user", JSON.stringify(next)); }, signOut: () => { setUser(null); localStorage.removeItem("campusstay-user"); }, recentIds, addRecent: (id: string) => setRecentIds((current) => { const next = [id, ...current.filter((item) => item !== id)].slice(0, 4); localStorage.setItem("campusstay-recent", JSON.stringify(next)); return next; }) }), [savedIds, recentIds, user]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() { const value = useContext(AppContext); if (!value) throw new Error("useApp must be used inside AppProvider"); return value; }
