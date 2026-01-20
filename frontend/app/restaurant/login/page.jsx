"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/config";

export default function RestaurantLogin() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Login failed");
                return;
            }

            // Save auth data
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            // Redirect based on role
            if (data.role === "admin") {
                router.push("/restaurant/admin");
            } else if (data.role === "manager") {
                router.push("/restaurant/manager");
            } else {
                alert("Unknown role");
            }

        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 font-sans">
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 relative overflow-hidden">

                {/* Decorative Header */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-500"></div>

                <div className="text-center mb-8">
                    <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">
                        🍴
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Restaurant Login</h1>
                    <p className="text-gray-400 text-sm mt-1">Admin & Manager Access</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-800 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium"
                            placeholder="Enter login ID"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-800 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium"
                            placeholder="Enter password"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-transform hover:shadow-orange-300"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/user/menu" className="text-sm text-gray-400 hover:text-gray-600 font-medium">
                        ← Back to Menu
                    </Link>
                </div>
            </div>
        </div>
    );
}
