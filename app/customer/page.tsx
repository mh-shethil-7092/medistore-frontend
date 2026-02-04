"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CustomerDashboard() {
  const { cart, clearCart, removeFromCart } = useCart();
  const router = useRouter();

  const handleFakePayment = () => {
    const user = localStorage.getItem("user");
    if (!user) return alert("Please login first");

    alert("Processing payment via MediPay Gateway...");
    
    // Simulate a delay
    setTimeout(() => {
      alert("Payment Successful! Your order has been placed.");
      clearCart(); // Empty the cart after success
      router.push("/shop");
    }, 2000);
  };

  return (
    <div className="p-10 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="bg-zinc-900 p-10 rounded-xl border border-zinc-800 text-center">
          <p className="text-zinc-400 text-lg">Your cart is currently empty.</p>
          <button 
            onClick={() => router.push("/shop")}
            className="mt-4 text-blue-500 hover:underline"
          >
            Go to Shop
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center bg-zinc-900 p-5 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-4">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                )}
                <div>
                  <h2 className="font-bold text-lg">{item.name}</h2>
                  <p className="text-zinc-400">${item.price} × {item.quantity}</p>
                </div>
              </div>
              
              <button 
                // ✅ FIX: Added check to ensure item._id exists before calling function
                onClick={() => item._id && removeFromCart(item._id)} 
                className="text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-lg transition"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-8 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl text-zinc-400">Total Amount:</span>
              <span className="text-3xl font-bold text-blue-500">
                ${cart.reduce((acc, i) => acc + (i.price * i.quantity), 0)}
              </span>
            </div>
            
            <button 
              onClick={handleFakePayment}
              className="w-full bg-blue-600 p-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-900/20"
            >
              Checkout with MediPay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}