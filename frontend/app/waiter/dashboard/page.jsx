"use client";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";

export default function WaiterDashboard() {
    const [calls, setCalls] = useState([]);

    useEffect(() => {
        fetchCalls();
        const interval = setInterval(fetchCalls, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchCalls = () => {
        fetch(`${API_BASE_URL}/waiter/calls`)
            .then(res => res.json())
            .then(setCalls);
    };

    const resolveCall = async (id) => {
        await fetch(`${API_BASE_URL}/waiter/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });
        fetchCalls();
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6 text-white">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span>🔔</span> Waiter Calls
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {calls.length === 0 && <p className="text-gray-500">No active calls.</p>}
                {calls.map(call => (
                    <div key={call._id} className="bg-red-500 text-white p-6 rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse">
                        <div className="text-4xl font-bold mb-2">Table {call.table}</div>
                        <div className="text-lg opacity-90 mb-6">{call.message}</div>
                        <div className="text-xs opacity-75 mb-4">{new Date(call.createdAt).toLocaleTimeString()}</div>
                        <button
                            onClick={() => resolveCall(call._id)}
                            className="w-full bg-white text-red-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                        >
                            Mark Resolved
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
