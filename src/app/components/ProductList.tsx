"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types";

interface ProductListProps {
  products: Product[] | null;
  isLoading: boolean;
  error: string | null;
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  error,
  addToCart,
}) => {
  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products available.</div>;
  }
  console.log(products);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
