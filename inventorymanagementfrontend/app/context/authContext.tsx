"use client"
import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import {assignId} from '../utils/jwt'


interface data {
    token: string
}


interface LoginResponse {
    message: string,
    data: data
}


interface AuthContextType {
    Login: (email: string, password: string) => Promise<LoginResponse>;
    Logout: () => void;
    loading: boolean;
}


export const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState();
    const [isAuthenticated, setAuth] = useState(false)
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;



    async function Login(
        email: string,
        password: string
    ): Promise<LoginResponse> {
        try {
            setLoading(true);
            setError(false);

            const res = await axios.post(
                `${API_ENDPOINT}api/v1/auth/login`,
                { email, password }
            );

            const token = res.data.data.token;

            assignId(token)

            setAuth(true);
            localStorage.setItem("jwtToken", token);
             toast(res.data.message)

            return res.data
        } catch (err: any) {
            setError(true);
            toast(err.response.data.message)
            throw err;

        } finally {
            setLoading(false);
        }
    }

    function Logout() {
        // Clear all authentication data from localStorage
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userId");
        setAuth(false);
        setUser(undefined);
        setToken(undefined);
        toast("Logged out successfully");
    }



    return (<AuthContext.Provider value={{ Login, Logout, loading }}>{children}</AuthContext.Provider>)

}


