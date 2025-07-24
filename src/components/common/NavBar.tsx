"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { menuItems } from "@/data/navbar";
import { determineAuthStatus } from "@/lib/auth/authStatus";
import { useEffect, useState } from "react";
import { signIn, signOut } from "@/lib/auth/authClient";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -50]);
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const [auth, setAuth] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleAuthStatus = async () => {
      const auth = await determineAuthStatus();
      setAuth(auth);
    };
    handleAuthStatus();
  }, []);

  const handleAuthClick = async () => {
    setMenuOpen(false);

    if (auth) {
      await signOut();
      router.push("/auth/success");
    } else {
      await signIn.social({
        provider: "google",
      });
    }
  };

  return (
    <motion.div
      style={{ y, opacity }}
      className={cn("mx-auto max-w-7xl py-4 mt-2")}
    >
      <nav className="w-full flex items-center justify-between">
        <Link href="/" className="text-xl ml-2 font-bold text-blue-600">
          DailySAT
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-gray-600 hover:text-blue-600"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          {auth == null ? (
            <Skeleton className="bg-blue-600 w-[82px] h-[35px] rounded-full" />
          ) : (
            <button
              onClick={handleAuthClick}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              {auth ? "Log out" : "Sign in"}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col space-y-4 mt-4 p-4 bg-white shadow-md rounded-lg">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleAuthClick}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            {auth ? "Log out" : "Sign in"}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default NavBar;
