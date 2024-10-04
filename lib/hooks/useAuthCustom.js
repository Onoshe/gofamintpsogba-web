'use client'
import { useState, useEffect } from "react";
import { postRequest } from "../apiRequest/postRequest";
import { getRequest } from "../apiRequest/getRequest";


export function useAuthCustom() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('unauthenticated');

  useEffect(() => {
    const checkUserSession = async () => {
      setStatus("loading");
      try {
        const response = await getRequest("/api/auth/session");
        if (response.ok) {
          setUser(response.user);
          setStatus("authenticated");
        } else {
          setUser(null);
          setStatus("unauthenticated");
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setUser(null);
        setStatus("unauthenticated");
      }
      setLoading(false);
    };
    checkUserSession();
  }, []);

  const signIn = async (userName, password) => {
    setLoading(true);
    setStatus("unauthenticated");
    try {
      const response = await postRequest("/api/auth/login", {userName, password});
      
      if(response.ok) {
        setUser(response.user);
        setStatus("authenticated");
        return { success: true };
      } else {
        setStatus("unauthenticated");
        return { success: false, msg:response.msg};
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setStatus("unauthenticated");
      return { success: false, msg: "Authentication failed" };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setStatus("unauthenticated");
    try {
      await postRequest("/api/auth/logout", {email:''});
      setUser(null);
    } catch (error) {
      console.error("Error during sign-out:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    status,
    signIn,
    signOut,
  };
}
