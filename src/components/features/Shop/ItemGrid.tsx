import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Items, Notes } from "@/data/shop";
import ShopItemDisplay from "@/components/features/Shop/ShopItem";
import { ShopItem } from "@/types/shop/shopItem";
import { useGridStore } from "@/store/grid";
import { useUserStore } from "@/store/user";

export default function ItemGrid() {
  const user = useUserStore((state) => state.user);
  const grid = useGridStore((state) => state.grid);
  if (!user || user.currency === -1) {
    return (
      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton
            key={idx}
            className="flex flex-col items-center justify-center w-full h-[200px]"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <p className="text-gray-500 text-center mt-2">{Notes[grid]}</p>
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
        {Items[grid].map((item: ShopItem, index: number) => (
          <ShopItemDisplay
            key={index}
            name={item.name}
            purpose={item.purpose}
            price={item.price}
          />
        ))}
      </div>
    </>
  );
}
