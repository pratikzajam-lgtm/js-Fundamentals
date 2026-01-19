"use client"
import React from 'react'
import { AuthContext } from '../context/authContext'
import { useAuth } from '../context/useAuth'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'


const page = () => {

    const { Login, loading } = useAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();


    let handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            toast("All Fields Are Required")
            return
        }

        const res = await Login(email, password);

        if (res) {

            setTimeout(() => { router.push("/dashboard") }, 2000)
        }


    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 px-4 py-12">
            <div className="w-full max-w-md mt-8">

                <div className="bg-white rounded-2xl shadow-2xl p-8">

                    <div className="text-center mb-8">
                        <div className="inline-block text-5xl mb-4">📦</div>
                        <h1 className="text-3xl font-bold text-gray-800">InventoryPro</h1>
                        <p className="text-gray-500 mt-2">Sign in to your account</p>
                    </div>


                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                                placeholder="you@example.com"
                            />
                        </div>


                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                                placeholder="Enter your password"
                            />
                        </div>


                        <div className="flex items-center justify-between">

                            <a href="#" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                                Forgot password?
                            </a>
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Sign In
                        </button>
                    </form>

                </div>


                <p className="text-center text-white text-sm mt-6 opacity-90">
                    © 2024 InventoryPro. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default page