"use client"
import axios from 'axios'
import { api } from "../utils/axiosInstance";
import { resolve } from 'path/win32';


const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
const userId = Number(localStorage.getItem("userId"))

console.log(userId, "userId")
const authHeader = localStorage.getItem("jwtToken")

export const fetchProfileDetails = async () => {
    try {
        let response = await api.get(`api/v1/users/${userId}`);

        console.log(response.data)

        return response.data
    } catch (error) {
        throw error
    }
}

export const getAllUsers = async () => {
    try {
        let response = await api.get("http://localhost:3000/api/v1/users");

        return response.data.data.users
    } catch (error) {
        throw error
    }
}


export const deleteUser = async (userId: number) => {
    try {

        let response = await api.delete(`api/v1/users/${userId}`);

        return response.data

    } catch (error) {
        throw error
    }

}

interface User {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string
}

export const addUser = async (user: User) => {
    try {
        let response = await api.post(`api/v1/users`,
            user
        )

        return response.data

    } catch (error) {
        throw error
    }
}

interface UpdateUser {
    name?: string,
    email?: string,
    role?: string
}export const updateUser = async (userId: number, user: UpdateUser) => {
    try {
        let response = await api.patch(`api/v1/users/${userId}`,
            user
        )

        return response.data    } catch (error) {
        throw error
    }
}
