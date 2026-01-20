"use client";
import BottomNav from "@/components/layout/BottomNav";
import { API_BASE_URL } from "@/lib/config";

export default function CallWaiter() {
    const callWaiter = async () => {
        await fetch(`${API_BASE_URL}/waiter/call`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ table: 1, message: "Need assistance" })
        });
        alert("Waiter notified!");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-white space-y-8 pb-24">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">Need Help?</h2>
                <p className="text-gray-500">Tap below to call a waiter to your table.</p>
            </div>

            <button
                onClick={callWaiter}
                className="w-48 h-48 rounded-full bg-red-100 border-4 border-red-200 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.3)] active:scale-95 transition-transform"
            >
                <span className="text-6xl mb-2">🔔</span>
                <span className="font-bold text-red-600 text-lg uppercase tracking-wide">Call Waiter</span>
            </button>

            <BottomNav />
        </div>
    );
}
