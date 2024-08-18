"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
type AuthState = {
  isAuthenticated: boolean;
  user: null | { id: string; name: string; email: string };
  loading: boolean;
};

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: { user: AuthState["user"] } }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

const AuthContext = createContext<
  | {
      state: AuthState;
      login: (email: string, password: string, role: string) => Promise<void>;
      logout: () => Promise<void>;
      register: (
        name: string,
        email: string,
        password: string
      ) => Promise<void>;
    }
  | undefined
>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
      };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get("accessToken");

        if (!token) {
          throw new Error("No access token found");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: response.data.user },
        });
      } catch (error) {
        console.error("Auth check failed:", error);
        dispatch({ type: "LOGOUT" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, role: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`,
        { email, password, role },
        { withCredentials: true }
      );
      const { accessToken } = response.data;
      console.log("Login response:", response.data);

      // Set the token in the cookie
      Cookies.set("accessToken", accessToken, { expires: 7, path: "/" });
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: response.data.user },
      });
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      dispatch({ type: "SET_LOADING", payload: false });
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Get the token from the cookie
      const token = Cookies.get("accessToken");

      if (!token) {
        throw new Error("No access token found");
      }

      console.log("token", token);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Cookies.remove("accessToken");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch({ type: "LOGOUT" });
      // Clear the cookie
      document.cookie =
        "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      router.push("/login");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`,
        {
          name,
          email,
          password,
        }
      );
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      dispatch({ type: "SET_LOADING", payload: false });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
