import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "@/context/CartContext"; // ✅ Added this import

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col">
        {/* ✅ Wrap everything in CartProvider */}
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}