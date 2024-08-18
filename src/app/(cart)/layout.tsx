import React from "react";
import Navbar from ".././components/Navbar"; // Assuming you have a Navbar component

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Your Shopping Cart
        </h1>
        <div className="bg-white shadow sm:rounded-lg p-6">{children}</div>
      </div>
    </div>
  );
}
