import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center relative overflow-hidden font-sans text-gray-900">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-2/5 bg-gradient-to-b from-orange-50 to-white -z-10 rounded-b-[3rem]"></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="absolute top-40 -left-20 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50 -z-10"></div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-8 text-center mt-10">
                {/* Logo/Icon */}
                <div className="bg-white p-6 rounded-full shadow-[0_10px_30px_rgba(249,115,22,0.15)] mb-8 animate-fade-in">
                    <span className="text-6xl">🍕</span>
                </div>

                {/* Restaurant Name */}
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                    Gourmet<br />Delights
                </h1>

                {/* Welcome Message */}
                <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-xs">
                    Welcome! Sit back, relax, and let us serve you the finest flavors.
                </p>

                {/* CTA Button */}
                <Link href="/user/menu" className="w-full mb-8">
                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold py-5 rounded-2xl shadow-xl shadow-orange-200 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group">
                        Explore Our Menu
                        <span className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </span>
                    </button>
                </Link>

                <div className="mt-8 flex gap-2 justify-center">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                </div>
            </div>

            {/* Footer */}
            <div className="pb-8 text-gray-400 text-xs font-medium">
                © 2024 Smart QR Dining
            </div>
        </div>
    );
}
