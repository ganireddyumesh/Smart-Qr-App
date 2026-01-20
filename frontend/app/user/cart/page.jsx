"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import BottomNav from "@/components/layout/BottomNav";
import { API_BASE_URL } from "@/lib/config";

export default function CartPage() {
    const { cart, addToCart, decreaseQty, totalAmount, clearCart } = useCart();
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [tableNumber, setTableNumber] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [lastOrder, setLastOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    // Check for active order on mount
    useEffect(() => {
        const checkActiveOrder = async () => {
            const savedOrderId = localStorage.getItem("activeOrderId");
            const savedOrderTime = localStorage.getItem("activeOrderTime");

            if (savedOrderId && savedOrderTime) {
                // Check expiry (1 hour)
                const now = new Date().getTime();
                const oneHour = 60 * 60 * 1000;

                if (now - parseInt(savedOrderTime) > oneHour) {
                    localStorage.removeItem("activeOrderId");
                    localStorage.removeItem("activeOrderTime");
                    return;
                }

                try {
                    const res = await fetch(`${API_BASE_URL}/orders/${savedOrderId}`);
                    if (res.ok) {
                        const order = await res.json();
                        // Optional: Clear if completed? User asked for 1h expiry primarily.
                        // We will show it as long as it's active or < 1h.
                        setLastOrder(order);
                        setOrderPlaced(true);
                    } else {
                        // Order not found on backend (maybe removed)
                        localStorage.removeItem("activeOrderId");
                        localStorage.removeItem("activeOrderTime");
                    }
                } catch (err) {
                    console.error("Failed to restore order", err);
                }
            }
        };

        checkActiveOrder();
    }, []);

    const handlePlaceOrder = async () => {
        if (!customerName || !tableNumber) return;
        setLoading(true);

        const orderData = {
            customerName,
            tableNumber,
            items: cart,
            totalAmount,
            status: "Preparing"
        };

        try {
            const res = await fetch(`${API_BASE_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            if (res.ok) {
                const savedOrder = await res.json();
                setLastOrder(savedOrder);
                setOrderPlaced(true);
                clearCart();
                setShowOrderForm(false);

                // Persist
                localStorage.setItem("activeOrderId", savedOrder._id);
                localStorage.setItem("activeOrderTime", new Date().getTime().toString());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStartNewOrder = () => {
        setLastOrder(null);
        setOrderPlaced(false);
        localStorage.removeItem("activeOrderId");
        localStorage.removeItem("activeOrderTime");
    };

    if (orderPlaced && lastOrder) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 animate-fade-in pb-24">
                <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
                    <div className="flex flex-col items-center mb-6">
                        <div className="bg-green-100 p-4 rounded-full mb-3 animate-pulse">
                            <span className="text-4xl">👨‍🍳</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Order Received!</h2>
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold mt-2 border border-orange-200 uppercase tracking-wide">
                            {lastOrder.status}
                        </span>
                    </div>

                    <div className="border-t border-b border-gray-100 py-4 mb-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Your Order Summary</h3>
                        <div className="space-y-3">
                            {lastOrder.items.map((item) => (
                                <div key={item._id} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-gray-900 bg-gray-50 w-6 h-6 flex items-center justify-center rounded-md">{item.qty}x</span>
                                        <span className="text-gray-700 font-medium">{item.name}</span>
                                    </div>
                                    <span className="text-gray-400">Preparing...</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mb-6">
                        <span className="text-gray-500 font-medium">Total Amount</span>
                        <span className="text-xl font-bold text-gray-900">₹{lastOrder.totalAmount}</span>
                    </div>

                    <p className="text-gray-400 text-center text-xs leading-relaxed mb-6">
                        Sit back and relax! Your food is being prepared at <span className="font-bold text-gray-600">Table {lastOrder.tableNumber}</span>.
                    </p>

                    <Link href="/user/menu">
                        <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-colors">
                            Explore Menu
                        </button>
                    </Link>

                    <button
                        onClick={handleStartNewOrder}
                        className="w-full mt-3 bg-white text-gray-400 py-3 rounded-xl font-bold border-2 border-dashed border-gray-100 hover:border-gray-300 hover:text-gray-600 transition-colors text-sm"
                    >
                        Start New Order
                    </button>
                </div>
                <BottomNav />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
                <h1 className="text-xl font-bold">Your Cart</h1>
            </div>

            <div className="flex-1 p-4 pb-48">
                {cart.length === 0 ? (
                    <div className="text-center mt-20 text-gray-500">
                        <div className="text-4xl mb-4">🛒</div>
                        <p>Your cart is empty.</p>
                        <Link href="/user/menu" className="text-emerald-600 font-semibold mt-4 block">Browse Menu</Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cart.map(item => (
                            <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-gray-500">₹{item.price} x {item.qty}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => decreaseQty(item._id)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold">-</button>
                                    <span className="w-4 text-center font-medium">{item.qty}</span>
                                    <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold">+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {cart.length > 0 && (
                <div className="fixed bottom-20 left-4 right-4 bg-white p-6 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border border-gray-100 z-40">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-500 font-medium">Total Amount</span>
                        <span className="text-3xl font-bold text-gray-900">₹{totalAmount}</span>
                    </div>

                    <button
                        onClick={() => setShowOrderForm(true)}
                        className="block w-full text-center bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-[0.98] transition-transform mb-3"
                    >
                        Place Order
                    </button>

                    <p className="text-[10px] text-center text-gray-400 font-medium uppercase tracking-wide">
                        Billing will be handled by our service staff after your meal.
                    </p>
                </div>
            )}

            {/* Order Form Modal */}
            {showOrderForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in p-4">
                    <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Finalize Order</h2>
                            <button onClick={() => setShowOrderForm(false)} className="bg-gray-100 p-2 rounded-full text-gray-500 hover:bg-gray-200">
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="e.g. John Doe"
                                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Table Number</label>
                                <div className="grid grid-cols-5 gap-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                        <button
                                            key={num}
                                            onClick={() => setTableNumber(num)}
                                            className={`py-3 rounded-xl font-bold transition-all ${tableNumber === num ? 'bg-orange-500 text-white shadow-lg scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={!customerName || !tableNumber || loading}
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                >
                                    {loading ? "Placing Order..." : "Confirm Order"}
                                    {!loading && <span>➔</span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <BottomNav />

            <style jsx>{`
                .animate-scale-in {
                    animation: scaleIn 0.2s ease-out;
                }
                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
