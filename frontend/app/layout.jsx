import "./globals.css";
import { CartProvider } from "../lib/CartContext";

export const metadata = {
    title: "Gourmet Delights",
    description: "Smart QR Menu",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
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
