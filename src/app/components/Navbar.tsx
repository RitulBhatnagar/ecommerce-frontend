"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { state, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/"); // Redirect to home page after logout
  };

  const handleViewCart = () => {
    router.push("/cart"); // Redirect to cart page
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold">
            My Store
          </Link>
          <div className="flex items-center space-x-4">
            {state.isAuthenticated ? (
              <>
                <Button
                  onClick={handleViewCart}
                  variant="outline"
                  className="flex items-center"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Cart
                </Button>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
