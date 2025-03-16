import axios from "axios";
import { User } from "../Types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (userData: User) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    userName: userData.username,
                    email: userData.email,
                    password: userData.password,
                }
            ),
            headers: {
                'content-type': 'application/json',
            }
        })
        if (response.status === 400) { alert('username or email already exist') }
        else if (!response.ok) { throw new Error(response.status + '') }

        const data = await response.json();
        saveAccessToken(data.token);
        return data;
    }
    catch (e) {
        console.log(e);
        alert('Something went wrong. Please try again later.');
        return null;
    }
}

export const login = async (userData: User) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    userNameOrEmail: userData.username,
                    password: userData.password,
                }
            ),
            headers: {
                'content-type': 'application/json',
            }
        });
        if (response.status === 400) { alert('Invalid username or password.') }
        else if (!response.ok) { throw new Error(response.status + '') }

        const data = await response.json();
        saveAccessToken(data.token);
        return data;
    }
    catch (e) {
        console.log(e);
        alert('Something went wrong. Please try again later.');
        return null;
    }
}

function saveAccessToken(token: string) {
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

