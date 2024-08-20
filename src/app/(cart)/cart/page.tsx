"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Cookies from "js-cookie";
import { CartItem } from "@/app/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCartItems();
  }, []);

  async function fetchCartItems() {
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.cart === null) {
        setCartItems([]);
        return;
      }
      setCartItems(response.data.cart.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to load cart. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCheckout = async () => {
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/checkout`,
        {
          shippingAddress: address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(
        "Order placed successfully An email is sent to your email address, Please check"
      );
      setMessage(response.data.order.message);
      setIsCheckoutOpen(false);
      // Refresh the page after successful checkout
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError("Checkout failed. Please try again.");
    }
  };

  // Calculate total price for each product and the overall total price
  const productTotalPrices = cartItems.map(
    (item) => item.product.price * item.quantity
  );
  const overallTotalPrice = productTotalPrices.reduce(
    (acc, curr) => acc + curr,
    0
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-xl">
            Your cart is empty. Please add products to your cart.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartItems.map((item, index) => (
                <div
                  key={item.product.id}
                  className="bg-white p-4 rounded shadow-md"
                >
                  <h2 className="text-xl font-bold mb-2">
                    {item.product.title}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-gray-700 mb-4">
                    Price: ${item.product.price}
                  </p>
                  <p className="text-gray-700 font-bold">
                    Total: ${productTotalPrices[index].toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="mt-8 p-4 bg-white shadow-md rounded">
              <h2 className="text-2xl font-bold mb-4">Summary</h2>
              {cartItems.map((item, index) => (
                <div
                  key={item.product.id}
                  className="flex justify-between mb-2"
                >
                  <span>
                    {item.product.title} x {item.quantity}
                  </span>
                  <span>${productTotalPrices[index].toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                <span>Total Price</span>
                <span>${overallTotalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogTrigger asChild>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Proceed to Checkout
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Checkout</DialogTitle>
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Shipping Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleCheckout}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Checkout
                      </button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
        {message && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
            {message}
          </div>
        )}
      </main>
    </div>
  );
}
