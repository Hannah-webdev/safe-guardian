import { createContext } from "react";

// Create context with default values
export const AuthContext = createContext({
  user: null,
  login: () => Promise.resolve({ success: false }),
  register: () => Promise.resolve({ success: false }),
  logout: () => {},
  loading: false,
  isAuthenticated: false,
});
