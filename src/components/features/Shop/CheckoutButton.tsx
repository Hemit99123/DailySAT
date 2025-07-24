import React from "react";
import { Button } from "@/components/common/Button";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { useShopStore } from "@/hooks/useShop";
import { useUserStore } from "@/store/user";

export default function CheckoutButton() {
  const state = useShopStore((s) => s.state);
  const clear = useShopStore((s) => s.clear);
  const user = useUserStore((s) => s.user);
  if (!user) {
    return (
      <Skeleton className="mt-2 mb-16 flex flex-col bg-[#4D68C3] rounded-2xl items-center justify-center w-full h-[100px]" />
    );
  }

  return (
    <Button
      onClick={async () => {
        const itemsToBuy = Object.entries(state).filter(([_, val]) => val > 0);
        if (itemsToBuy.length === 0) {
          toast.error("Please buy items before you continue.", {
            position: "bottom-right",
            pauseOnHover: false,
          });
          return;
        }

        const query = itemsToBuy.map(([key, val]) => `${key}=${val}`).join("&");
        clear();
        window.location.href = `/checkout?${query}`;
      }}
      className="font-bold mt-2 mb-16 flex flex-col hover:bg-[#6986e3] transition-all duration-300 bg-[#4D68C3] rounded-2xl items-center justify-center w-full h-[100px] text-3xl text-white"
    >
      Checkout
    </Button>
  );
}
