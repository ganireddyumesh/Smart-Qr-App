"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/config";

export default function AccountManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch(`${API_BASE_URL}/users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    };

    const handleResetClick = (user) => {
        setSelectedUser(user);
        setNewPassword("");
        setShowModal(true);
    };

    const submitPasswordUpdate = async () => {
        if (!newPassword) return;

        try {
            await fetch(`${API_BASE_URL}/users/${selectedUser._id}/password`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: newPassword })
            });
            setShowModal(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000); // Auto close after 2s
        } catch (error) {
            console.error(error);
            alert("Failed to update password.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans relative">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 pt-10 pb-8 rounded-b-[2rem] shadow-xl text-white mb-6">
                <div className="flex justify-between items-center mb-2">
                    <Link href="/restaurant/admin">
                        <span className="text-2xl cursor-pointer hover:scale-110 transition">←</span>
                    </Link>
                    <h1 className="text-2xl font-bold">Manage Accounts</h1>
                    <div className="w-6"></div> {/* Spacer */}
                </div>
            </div>

            <div className="px-6 max-w-md mx-auto">
                {loading ? (
                    <p className="text-center text-gray-400">Loading accounts...</p>
                ) : (
                    <div className="space-y-4">
                        {users.map(user => (
                            <div key={user._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center transition-transform hover:-translate-y-0.5 hover:shadow-md">
                                <div>
                                    <h3 className="font-bold text-gray-800 capitalize leading-tight">{user.username}</h3>
                                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full inline-block mt-1 ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {user.role}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleResetClick(user)}
                                    className="px-4 py-2 bg-gray-50 text-orange-500 text-xs font-bold rounded-lg border border-gray-100 hover:bg-orange-50 hover:border-orange-200 transition-all active:scale-95"
                                >
                                    Reset Password
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Custom Edit Password Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 animate-scale-in">
                        <div className="bg-orange-500 h-2 w-full"></div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Reset Password</h3>
                            <p className="text-sm text-gray-500 mb-6">Enter a new password for <span className="font-bold text-gray-800">{selectedUser?.username}</span></p>

                            <input
                                type="text"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all font-medium text-gray-700 mb-6"
                                autoFocus
                            />

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={submitPasswordUpdate}
                                    className="flex-1 px-4 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all active:scale-95"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Notification Modal */}
            {showSuccess && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
                    <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-100 p-6 flex flex-col items-center animate-bounce-in pointer-events-auto min-w-[200px]">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Success!</h3>
                        <p className="text-sm text-gray-500">Password updated.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
