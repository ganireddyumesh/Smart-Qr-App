import "./globals.css";
import { CartProvider } from "../lib/CartContext";

export const metadata = {
    title: "Gourmet Delights",
    description: "Smart QR Menu",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-100 text-gray-900 min-h-screen pb-20">
                <CartProvider>
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
