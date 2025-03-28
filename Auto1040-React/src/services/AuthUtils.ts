import axios from "axios";
import { User } from "../components/Types";
import { jwtDecode } from "jwt-decode";


export function saveAccessToken(token: string) {
    localStorage.setItem("token", token);
    setAuthorizationBearer();
}

export function saveUser(userData: User) {
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthorizationBearer();
}

function setAuthorizationBearer() {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
}

export const withTemporaryAuthHeaderRemoval = async (callback: () => Promise<void>): Promise<void> => {
  const originalAuthorizationHeader = axios.defaults.headers.common["Authorization"];
  delete axios.defaults.headers.common["Authorization"];

  try {
    await callback();
  } finally {
    if (originalAuthorizationHeader) {
      axios.defaults.headers.common["Authorization"] = originalAuthorizationHeader;
    }
  }
};


export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token); 
    const currentTime = Math.floor(Date.now() / 1000); 
    return decoded.exp < currentTime; 
  } catch (error) {
    return true; 
  }
};