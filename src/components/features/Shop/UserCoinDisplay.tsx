import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/store/user";

export default function UserCoinDisplay({ currency }: { currency: number }) {
  const user = useUserStore((state) => state.user);
  const [coins, setCoins] = useState(currency);
  useEffect(() => {
    // Set initial coins when user changes
    // Event handler function
    const handleUserUpdate = (e: Event) => {
      const price = (e as CustomEvent<{ price: number }>).detail.price;
      setCoins((prev) => prev + price);
    };

    // Add event listener
    window.addEventListener("user-updated", handleUserUpdate);

    // Cleanup with the same function reference
    return () => {
      window.removeEventListener("user-updated", handleUserUpdate);
    };
  }, [user]); // Only depend on user changes

  return (
    <div className="fixed bg-blue-700 rounded-3xl bottom-2 right-2 z-50">
      {coins !== -1 ? (
        <div className="text-white bg-transparent px-2 py-2">{coins} coins</div>
      ) : (
        <Skeleton className="h-[40px] bg-transparent w-[80px] z-10" />
      )}
    </div>
  );
}
