"use client";
import { useCart } from "@/lib/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import { API_BASE_URL } from "@/lib/config";

export default function BillPage() {
    const { cart, totalAmount, clearCart } = useCart();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleOrder = async () => {
        if (!name.trim()) return alert("Please enter your name");
        setLoading(true);

        const orderData = {
            customerName: name,
            items: cart.map(i => ({
                menuItem: i._id,
                quantity: i.qty,
                name: i.name,
                price: i.price
            })),
            totalAmount: totalAmount,
            tableNumber: 1 // Hardcoded for demo
        };

        try {
            const res = await fetch(`${API_BASE_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });
            if (res.ok) {
                clearCart();
                alert("Order Placed Successfully!");
                router.push("/user/menu");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        if (typeof window !== 'undefined') router.push('/user/menu');
        return null;
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-emerald-600 text-white p-6 pt-10 rounded-b-[2.5rem] shadow-lg mb-6">
                <h1 className="text-2xl font-bold text-center">Receipt</h1>
                <div className="text-center mt-2 opacity-90">Table #1</div>
            </div>

            <div className="px-6">
                <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                    {cart.map(item => (
                        <div key={item._id} className="flex justify-between py-2 border-b border-gray-200 last:border-0 text-sm">
                            <div className="flex gap-2">
                                <span className="font-bold text-gray-600">{item.qty}x</span>
                                <span className="text-gray-800">{item.name}</span>
                            </div>
                            <span className="font-medium">₹{item.price * item.qty}</span>
                        </div>
                    ))}
                    <div className="border-t border-dashed border-gray-300 my-4"></div>
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Grand Total</span>
                        <span className="text-emerald-600">₹{totalAmount}</span>
                    </div>
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-2">Enter Your Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none mb-6 text-lg"
                    placeholder="John Doe"
                />

                <button
                    onClick={handleOrder}
                    disabled={loading}
                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-xl active:scale-[0.98] transition-transform disabled:opacity-70"
                >
                    {loading ? "Placing Order..." : "Confirm & Pay Later"}
                </button>
            </div>

            <BottomNav />
        </div>
    );
}
