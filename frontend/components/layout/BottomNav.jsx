"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/CartContext';

export default function BottomNav() {
    const pathname = usePathname();
    const { cart } = useCart();
    const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

    const navItems = [
        { name: 'Menu', href: '/user/menu', icon: '🍽️' },
        { name: 'Smart', href: '/user/smart-selection', icon: '✨' },
        { name: 'Waiter', href: '/user/call-waiter', icon: '🔔' },
        { name: 'Cart', href: '/user/cart', icon: '🛒', badge: cartCount },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 pb-safe z-50">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link key={item.name} href={item.href} className="relative flex flex-col items-center w-full">
                        <span className={`text-xl mb-1 ${isActive ? 'scale-110 transition-transform' : ''}`}>
                            {item.icon}
                        </span>
                        <span className={`text-[10px] font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500'}`}>
                            {item.name}
                        </span>
                        {item.badge > 0 && (
                            <span className="absolute top-0 right-6 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full min-w-[1.2rem] text-center border-2 border-white">
                                {item.badge}
                            </span>
                        )}
                    </Link>
                );
            })}
        </div>
    );
}
