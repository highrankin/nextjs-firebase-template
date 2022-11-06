import React, { createContext } from "react";
import app from "./fbApp.js";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { getFirestore } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  async function signOut() {
    await auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return <div style={{ minHeight: "100vh" }}></div>;
  }

  return <AuthContext.Provider value={{ user, signOut, db }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
