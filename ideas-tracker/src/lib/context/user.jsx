import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    try {
      console.log("Attempting to log in...");
      const loggedIn = await account.createEmailPasswordSession(email, password);
      setUser(loggedIn);
      console.log("Login successful:", loggedIn);
      window.location.replace("/"); // you can use different redirect method for your application
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  async function logout() {
    try {
      console.log("Attempting to log out...");
      await account.deleteSession("current");
      setUser(null);
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  async function register(email, password) {
    try {
      console.log("Attempting to register...");
      const registered = await account.create(email, password);
      setUser(registered);
      console.log("Registration successful:", registered);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
}