"use client";
import Link from 'next/link';
import BottomNav from '@/components/layout/BottomNav';

export default function OffersPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-b-[2rem] shadow-[0_10px_30px_rgba(249,115,22,0.2)] text-white mb-6 animate-fade-in text-center">
                <Link href="/user/menu" className="inline-block bg-white/20 p-2 rounded-full mb-4 hover:bg-white/30 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </Link>
                <div className="mb-2 text-4xl">🎉</div>
                <h1 className="text-3xl font-bold mb-2">Special Offers</h1>
                <p className="opacity-90 font-medium">Exclusive deals for you today!</p>
            </div>

            <div className="px-4 space-y-4">
                {/* Offer Card 1 */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                    <div className="bg-orange-100 w-24 h-24 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                        🍔
                    </div>
                    <div className="flex-1">
                        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide">Limited Time</span>
                        <h3 className="font-bold text-gray-900 text-lg mt-1">Burger Bonanza</h3>
                        <p className="text-gray-500 text-sm mb-2">Get 20% off on all heavy burgers.</p>
                        <button className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-md hover:bg-black transition-colors">Claim Now</button>
                    </div>
                </div>

                {/* Offer Card 2 */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                    <div className="bg-green-100 w-24 h-24 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                        🥗
                    </div>
                    <div className="flex-1">
                        <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide">Healthy Choice</span>
                        <h3 className="font-bold text-gray-900 text-lg mt-1">Green Salad Combo</h3>
                        <p className="text-gray-500 text-sm mb-2">Free drink with any large salad.</p>
                        <button className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-md hover:bg-black transition-colors">Claim Now</button>
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
