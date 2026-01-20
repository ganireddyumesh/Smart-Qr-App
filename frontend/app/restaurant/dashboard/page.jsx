"use client";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";

export default function RestaurantDashboard() {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("Pending");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    const fetchOrders = () => {
        fetch(`${API_BASE_URL}/orders`)
            .then(res => res.json())
            .then(setOrders)
            .catch(err => console.error(err));
    };

    const updateStatus = async (id, newStatus) => {
        await fetch(`${API_BASE_URL}/orders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });
        fetchOrders();
    };

    const handleDeleteClick = (id) => {
        setOrderToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!orderToDelete) return;
        await fetch(`${API_BASE_URL}/orders/${orderToDelete}`, { method: "DELETE" });
        setShowDeleteModal(false);
        setOrderToDelete(null);
        fetchOrders();
    };

    const filteredOrders = orders.filter(o => o.status === activeTab);

    // Stats Calculation
    const completedOrders = orders.filter(o => o.status === "Completed");
    const totalRevenue = completedOrders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

    return (
        <div className="min-h-screen bg-gray-50 font-sans relative">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 pt-8 pb-12 shadow-xl text-white mb-8">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={() => window.history.back()} className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition flex items-center gap-2">
                        <span>←</span> Back
                    </button>
                    <h1 className="text-3xl font-bold tracking-tight">Kitchen Display System</h1>
                    <div className="w-20"></div> {/* Spacer */}
                </div>

                {/* Stats Summary */}
                <div className="flex gap-6 justify-center">
                    <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 text-center">
                        <span className="block text-3xl font-bold">{completedOrders.length}</span>
                        <span className="text-xs text-orange-100 uppercase font-bold tracking-wider">Completed Orders</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 text-center">
                        <span className="block text-3xl font-bold">₹{totalRevenue}</span>
                        <span className="text-xs text-orange-100 uppercase font-bold tracking-wider">Total Revenue</span>
                    </div>
                </div>
            </div>

            <div className="px-6 -mt-8">
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2 justify-center">
                    {["Pending", "Preparing", "Completed"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all shadow-lg ${activeTab === tab ?
                                (tab === 'Pending' ? 'bg-orange-500 text-white ring-4 ring-orange-200' :
                                    tab === 'Preparing' ? 'bg-blue-600 text-white ring-4 ring-blue-200' :
                                        'bg-green-600 text-white ring-4 ring-green-200')
                                : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                        >
                            {tab} <span className="ml-2 bg-white/20 px-2 py-0.5 rounded text-sm">{orders.filter(o => o.status === tab).length}</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                    {filteredOrders.length === 0 && <p className="text-gray-400 italic text-center w-full col-span-3 py-10">No orders in this stage.</p>}
                    {filteredOrders.map(order => (
                        <div key={order._id} className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between h-full hover:shadow-lg transition-shadow relative overflow-hidden">
                            {/* Status Indicator Strip */}
                            <div className={`absolute top-0 left-0 w-1.5 h-full ${order.status === 'Pending' ? 'bg-orange-500' :
                                order.status === 'Preparing' ? 'bg-blue-500' : 'bg-green-500'
                                }`}></div>

                            <div>
                                <div className="flex justify-between items-start mb-4 pl-3">
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-800">{order.customerName}</h3>
                                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">Table {order.tableNumber}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs text-gray-400 font-mono mb-1">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        <button
                                            onClick={() => handleDeleteClick(order._id)}
                                            className="text-gray-300 hover:text-red-500 p-1 transition-colors group"
                                            title="Delete Order"
                                        >
                                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6 pl-3">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm border-b border-gray-50 pb-2 border-dashed">
                                            <span className="font-medium text-gray-700 flex items-center gap-2">
                                                <span className="bg-gray-100 text-gray-600 w-5 h-5 flex items-center justify-center rounded text-xs font-bold">{item.quantity}</span>
                                                {item.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto pl-3">
                                {order.status === "Pending" && (
                                    <button onClick={() => updateStatus(order._id, "Preparing")} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-blue-200 hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95">
                                        Start Preparing 👨‍🍳
                                    </button>
                                )}
                                {order.status === "Preparing" && (
                                    <button onClick={() => updateStatus(order._id, "Completed")} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold shadow-green-200 hover:bg-green-700 hover:shadow-lg transition-all active:scale-95">
                                        Mark Ready ✅
                                    </button>
                                )}
                                {order.status === "Completed" && (
                                    <div className="text-center w-full text-green-700 font-bold bg-green-50 py-3 rounded-xl border border-green-100">
                                        Served 🍽️
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 animate-scale-in">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Order?</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Are you sure you want to remove this order from the list? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 px-4 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-red-200 shadow-md transition-all active:scale-95"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
