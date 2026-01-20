"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import BottomNav from "@/components/layout/BottomNav";
import { API_BASE_URL } from "@/lib/config";

export default function SmartSelection() {
    const [people, setPeople] = useState("1");
    const [preference, setPreference] = useState("Veg");
    const [menu, setMenu] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const { addToCart, removeFromCart, cart } = useCart();

    useEffect(() => {
        fetch(`${API_BASE_URL}/menu`)
            .then(res => res.json())
            .then(setMenu)
            .catch(err => console.error("Failed to fetch menu:", err));
    }, []);

    const handleRecommend = () => {
        // Logic: 
        // 1. Filter by Veg/Non-Veg (Strict)
        // 2. Filter by Capacity approx (optional, but requested)

        let filtered = menu.filter(item => {
            if (preference === "Veg" && item.vegType !== "Veg") return false;
            if (preference === "Non-Veg" && item.vegType !== "Non-Veg") return false;
            // Mixed shows all
            return true;
        });

        // Simple capacity matching logic
        if (people === "1") {
            filtered = filtered.filter(i => i.capacity.includes("Single"));
        } else {
            filtered = filtered.filter(i => i.capacity.includes("People") || i.capacity.includes("3"));
        }

        setRecommendations(filtered);
        setShowResults(true);
    };

    const handleStartOver = () => {
        setShowResults(false);
        setRecommendations([]);
    };

    return (
        <div className="min-h-screen bg-white pb-24 font-sans text-gray-900">
            {/* Header */}
            <div className="p-6 pt-10">
                <Link href="/user/menu" className="text-sm font-medium text-gray-500 mb-6 inline-flex items-center gap-1 hover:text-orange-500 transition-colors">
                    ← Back to Menu
                </Link>
                <h1 className="text-3xl font-bold mb-2 text-gray-900">Smart Selection</h1>
                <p className="text-gray-500 text-sm leading-relaxed">
                    {!showResults ? "Answer a few questions and we'll curate the perfect meal for you." : "Here are the best matches for your preference."}
                </p>
            </div>

            {!showResults ? (
                /* Selection Form View */
                <div className="px-6 space-y-6">
                    {/* Question 1: People */}
                    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-orange-50 p-2 rounded-lg text-orange-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </div>
                            <h3 className="font-bold text-gray-800">How many people?</h3>
                        </div>

                        <div className="px-2">
                            <input
                                type="range"
                                min="1"
                                max="8"
                                step="1"
                                value={people}
                                onChange={(e) => setPeople(e.target.value)}
                                className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                            />
                            <div className="text-center mt-4 font-bold text-orange-500 text-xl">
                                {people} {people === "1" ? "Person" : "People"}
                            </div>
                        </div>
                    </div>

                    {/* Question 2: Preference */}
                    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-orange-50 p-2 rounded-lg text-orange-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <h3 className="font-bold text-gray-800">Dietary Preference?</h3>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {['Veg', 'Non-Veg', 'Mixed'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setPreference(type)}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${preference === type ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}
                                >
                                    <span className="text-2xl mb-2">
                                        {type === 'Veg' ? '🍃' : type === 'Non-Veg' ? '🍗' : '🍴'}
                                    </span>
                                    <span className="text-xs font-bold">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Find Button */}
                    <button
                        onClick={handleRecommend}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
                    >
                        Find Food
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                    </button>
                </div>
            ) : (
                /* Results View (In-Place Replacement) */
                <div className="px-6 space-y-4 animate-fade-in">
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2 mb-4">
                        <h3 className="font-bold text-gray-900 text-lg">Recommended for you</h3>
                        <button onClick={handleStartOver} className="text-sm font-medium text-gray-500 hover:text-orange-500 underline decoration-dotted">
                            Start Over
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recommendations.length > 0 ? recommendations.map(item => {
                            const inCart = cart.find(c => c._id === item._id);
                            return (
                                <div key={item._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 transition-transform hover:-translate-y-1">
                                    {/* Image Left */}
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <img src={item.image} className="w-full h-full object-cover rounded-xl bg-gray-100" onError={(e) => e.target.src = 'https://via.placeholder.com/100?text=Food'} />
                                    </div>

                                    {/* Content Right */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-gray-800 text-base leading-tight pr-2">{item.name}</h4>
                                                <span className="font-bold text-orange-600 text-sm">₹{item.price}</span>
                                            </div>

                                            <div className="flex gap-2">
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 ${item.vegType === 'Veg' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                                    {item.vegType === 'Veg' ? 'VEG' : 'NON-VEG'}
                                                </span>
                                                <span className="text-[10px] font-medium bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded border border-orange-100 uppercase">
                                                    {item.spiceLevel}
                                                </span>
                                            </div>

                                            <p className="text-[10px] text-gray-400 line-clamp-1 mt-1">{item.description}</p>
                                        </div>

                                        <div className="flex justify-between items-end mt-2">
                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded">Serves {item.capacity}</span>
                                            <button
                                                onClick={() => inCart ? removeFromCart(item._id) : addToCart(item)}
                                                className={`px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-colors ${inCart ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100' : 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200'}`}
                                            >
                                                {inCart ? "CANCEL" : "ADD"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="col-span-full text-center py-10 text-gray-400">
                                <p>No recommendations found for this selection.</p>
                                <button onClick={handleStartOver} className="mt-2 text-orange-500 font-bold">Try different options</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Floating Cart Button */}
            {cart.length > 0 && (
                <div className="fixed bottom-24 right-6 z-40 animate-bounce-short">
                    <Link href="/user/cart">
                        <button className="bg-orange-600 text-white px-5 py-3 rounded-full font-bold shadow-2xl flex items-center gap-4 transition-transform active:scale-95 border-2 border-orange-400 hover:bg-orange-700">
                            <div className="flex flex-col items-start leading-none gap-0.5">
                                <span className="text-[10px] uppercase opacity-90 tracking-wide">{cart.length} Items | ₹{cart.reduce((acc, item) => acc + (item.price * item.qty), 0)}</span>
                                <span className="text-base font-extrabold">Order Now</span>
                            </div>
                            <div className="bg-white/20 p-1.5 rounded-full">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </div>
                        </button>
                    </Link>
                </div>
            )}

            <BottomNav />
        </div>
    );
}
