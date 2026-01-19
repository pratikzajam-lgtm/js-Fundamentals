"use client"

import axios from "axios";


const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const api = axios.create({
  baseURL: API_ENDPOINT,
});


console.log("api",api)
console.log("api",API_ENDPOINT)

 const token = localStorage.getItem("jwtToken");

 console.log(token,"token")

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
