"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Product, ApiResponse } from "./types";
import Navbar from "./components/Navbar";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import ProductList from "./components/ProductList";
import toast from "react-hot-toast";

export default function Home() {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useAuth();
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
        );
        setApiResponse(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const addToCart = async (product: Product) => {
    if (!state.isAuthenticated) {
      throw new Error("Not authenticated");
    }
    const token = Cookies.get("accessToken");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`,
      {
        productId: product.id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMessage(`${response.data.message} to the cart`);
    toast.success(message);
  };
  console.log(message);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
        <ProductList
          products={apiResponse?.products || []}
          isLoading={isLoading}
          error={error}
          addToCart={addToCart}
        />
      </main>
    </div>
  );
}
