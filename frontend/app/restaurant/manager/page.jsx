"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ManagerDashboard() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/user/menu");
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 pt-10 pb-8 rounded-b-[2rem] shadow-xl text-white">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Manager Dashboard</h1>
                    <button onClick={handleLogout} className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition">
                        Wait.. Logout
                    </button>
                </div>
                <p className="text-orange-100"> oversee operations & orders.</p>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col gap-6 justify-center max-w-md mx-auto w-full">

                <Link href="/restaurant/dashboard">
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 hover:shadow-lg transition active:scale-95 cursor-pointer">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
                            ⏲️
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Active Orders</h2>
                            <p className="text-sm text-gray-500">Kitchen Display System (KDS)</p>
                        </div>
                    </div>
                </Link>

                <Link href="/restaurant/menu">
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 hover:shadow-lg transition active:scale-95 cursor-pointer">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl">
                            📝
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Manage Menu</h2>
                            <p className="text-sm text-gray-500">Update items & special offers</p>
                        </div>
                    </div>
                </Link>

            </div>

            {/* Footer Nav */}
            <div className="p-6 text-center">
                <Link href="/user/menu" className="text-gray-400 hover:text-orange-500 font-medium transition">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
