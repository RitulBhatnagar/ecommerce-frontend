"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  const { state, logout } = useAuth();
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold">
            My Store
          </Link>
        </div>
        <div>
          {state.isAuthenticated ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
