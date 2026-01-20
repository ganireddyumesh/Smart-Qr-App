"use client";
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i._id === item._id);
            if (existing) {
                return prev.map(i => i._id === item._id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { ...item, qty: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(i => i._id !== id));
    };

    const decreaseQty = (id) => {
        setCart(prev => {
            const existing = prev.find(i => i._id === id);
            if (existing.qty === 1) return prev.filter(i => i._id !== id);
            return prev.map(i => i._id === id ? { ...i, qty: i.qty - 1 } : i);
        });
    }

    const clearCart = () => setCart([]);

    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQty, clearCart, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
