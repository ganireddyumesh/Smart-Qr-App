"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import BottomNav from "@/components/layout/BottomNav";
import { API_BASE_URL } from "@/lib/config";

export default function MenuPage() {
    const [menu, setMenu] = useState([]);
    const { addToCart, removeFromCart, cart } = useCart();
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        fetch(`${API_BASE_URL}/menu`)
            .then(res => res.json())
            .then(setMenu)
            .catch(err => console.error(err));
    }, []);

    const filteredMenu = menu
        .filter(m => m.available !== false)
        .filter(m => filter === "All" ? true : m.vegType === filter)
        // .filter(m => selectedCategory === "All" ? true : m.category === selectedCategory) // Removed category filtering
        .filter(m => (m.name && m.name.toLowerCase().includes(searchTerm.toLowerCase())) || (m.description && m.description.toLowerCase().includes(searchTerm.toLowerCase())));

    const categories = [
        { name: "Starters", icon: "🍟" },
        { name: "Main Course", icon: "🥘" },
        { name: "Desserts", icon: "🍰" },
        { name: "Beverages", icon: "🥤" }
    ];

    const scrollToCategory = (catName) => {
        setSelectedCategory(catName);
        const element = document.getElementById(catName);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="min-h-screen bg-white pb-24 font-sans text-gray-900">
            {/* Header Section */}
            <div className="relative pb-8 overflow-hidden rounded-b-3xl shadow-xl">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-90 mix-blend-multiply"></div>
                </div>

                <div className="relative z-10 px-6 pt-12">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold leading-tight text-white drop-shadow-md">Gourmet<br />Delights</h1>
                        </div>
                        <Link href="/restaurant/login">
                            <div className="bg-white/20 p-2.5 rounded-full shadow-lg border border-white/30 cursor-pointer active:scale-95 transition-transform group backdrop-blur-md" title="Restaurant Login">
                                <svg className="w-6 h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {/* Outline Crossed Fork and Knife */}
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.5 5L18.5 19M16.5 5L5.5 19M5.5 5h4l1 4-3 3m11-7h-4l-1 4 3 3" style={{ display: 'none' }}></path>
                                    {/* Precise Outline Layout */}
                                    {/* Knife (Bottom-Left to Top-Right) */}
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21l18-18" />
                                    {/* Fork (Bottom-Right to Top-Left) - approximate to allow crossing */}
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M14.5 14.5L12 12M3 3l4.35 4.35M7.5 7.5L10 10" />
                                </svg>
                            </div>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Search for dishes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-full bg-white text-gray-800 shadow-lg border-0 focus:ring-2 focus:ring-orange-300 placeholder-gray-400 outline-none transition"
                        />
                        <span className="absolute left-3.5 top-3.5 text-gray-400 text-lg">🔍</span>
                    </div>

                    {/* AI Suggestions & Offers */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <Link href="/user/smart-selection">
                            <div className="bg-gradient-to-br from-orange-100 to-orange-50 backdrop-blur-sm p-4 rounded-xl shadow-md cursor-pointer active:scale-95 transition hover:shadow-lg border border-orange-100/50">
                                <div className="text-3xl mb-1">✨</div>
                                <h3 className="font-bold text-gray-800 text-sm">Smart Pick</h3>
                                <p className="text-[10px] text-gray-600">AI Recommendations</p>
                            </div>
                        </Link>
                        <Link href="/user/offers">
                            <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 backdrop-blur-sm p-4 rounded-xl shadow-md cursor-pointer active:scale-95 transition hover:shadow-lg border border-yellow-100/50">
                                <div className="text-3xl mb-1">🎉</div>
                                <h3 className="font-bold text-gray-800 text-sm">Special Offers</h3>
                                <p className="text-[10px] text-gray-600">Limited Deals</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Sticky Filters Header */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md shadow-sm">

                {/* Category Pills (Horizontal Scroll) */}
                <div className="flex overflow-x-auto gap-3 px-6 py-3 no-scrollbar scroll-smooth">
                    {categories.map(cat => (
                        <button
                            key={cat.name}
                            onClick={() => scrollToCategory(cat.name)}
                            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${selectedCategory === cat.name
                                ? 'bg-orange-500 text-white border-orange-600 shadow-md transform scale-105'
                                : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'
                                }`}
                        >
                            <span>{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Veg/Non-Veg Filter */}
                <div className="px-6 pb-3">
                    <div className="bg-gray-100 p-1 rounded-full flex justify-between">
                        {["All", "Veg", "Non-Veg"].map(type => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`flex-1 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide transition-all duration-300 ${filter === type
                                    ? 'bg-white text-orange-600 shadow-sm'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-6 pb-2 mt-2">
                <h2 className="font-bold text-gray-800 text-lg mb-2 flex items-center gap-2">
                    Our Menu <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{filteredMenu.length} items</span>
                </h2>
            </div>

            {/* Menu Grid Grouped by Category */}
            <div className="pb-6 space-y-8">
                {categories.map(category => {
                    const categoryItems = filteredMenu.filter(item => item.category === category.name);
                    if (categoryItems.length === 0) return null;

                    return (
                        <div key={category.name} id={category.name} className="scroll-mt-48">
                            {/* Category Header */}
                            <div className="px-6 mb-4 flex items-center gap-2">
                                <span className="text-2xl">{category.icon}</span>
                                <h3 className="font-extrabold text-xl text-gray-800 uppercase tracking-wide">{category.name}</h3>
                                <div className="h-px bg-gray-200 flex-1 ml-4"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-6">
                                {categoryItems.map(item => {
                                    const inCart = cart.find(c => c._id === item._id);
                                    return (
                                        <div key={item._id} className="bg-white rounded-2xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 flex gap-4 transition-transform hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
                                            <div className="w-28 h-28 flex-shrink-0 relative">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl shadow-sm" onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
                                                {inCart && <div className="absolute top-1 right-1 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">{inCart.qty}</div>}
                                            </div>

                                            <div className="flex-1 flex flex-col relative min-h-[7rem]">
                                                <div className="flex justify-between items-start">
                                                    <h2 className="font-bold text-gray-800 leading-tight text-[15px] pr-8">{item.name}</h2>
                                                    <span className="font-bold text-orange-500 text-sm">₹{item.price}</span>
                                                </div>

                                                <div className="flex gap-2 mt-1.5 mb-2">
                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 ${item.vegType === 'Veg' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                                        {item.vegType === 'Veg' ? 'VEG' : 'NON-VEG'}
                                                    </span>
                                                    <span className="text-[10px] font-medium bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded border border-orange-100 uppercase">
                                                        {item.spiceLevel}
                                                    </span>
                                                </div>

                                                <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed mb-auto opacity-0 group-hover:opacity-100 transition-opacity absolute top-12 left-0 right-0 bg-white/90 p-1 rounded backdrop-blur-sm pointer-events-none">
                                                    {item.description}
                                                </p>

                                                <div className="flex justify-between items-end mt-2 pt-2 border-t border-dashed border-gray-100">
                                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-md">Serves {item.capacity}</span>

                                                    <button
                                                        onClick={() => inCart ? removeFromCart(item._id) : addToCart(item)}
                                                        className={`px-5 py-2 rounded-lg text-xs font-bold shadow-sm transition-all active:scale-95 ${inCart ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100' : 'bg-orange-500 text-white shadow-orange-200 hover:bg-orange-600'}`}
                                                    >
                                                        {inCart ? "CANCEL" : "ADD"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
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
