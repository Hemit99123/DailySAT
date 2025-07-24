"use client";

import React, { useEffect } from "react";
import UserCoinDisplay from "@/components/features/Shop/UserCoinDisplay";
import ShopHeader from "@/components/features/Shop/ShopHeader";
import ShopGridTabs from "@/components/features/Shop/ShopGridTabs";
import ItemGrid from "@/components/features/Shop/ItemGrid";
import CheckoutButton from "@/components/features/Shop/CheckoutButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/store/user";
import axios from "axios";
import { User } from "@/types/user";

export default function Shop() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const response = await axios.get("/api/auth/get-user");
        const userData: User | undefined = response?.data?.user;
        setUser?.(userData ?? null);
      } catch (error) {}
    };
    handleGetUser();
  }, []);

  return (
    <div className="px-4">
      {!user ? <></> : <UserCoinDisplay currency={user?.currency ?? 0} />}

      <div className="flex lg:flex-row flex-col items-center lg:space-y-0 space-y-2 lg:space-x-4">
        <ShopHeader />
        <ShopGridTabs />
      </div>

      <div className="text-center mt-4">
        {!user ? (
          <>
            <Skeleton className="h-[40px] mx-auto w-[200px] rounded-3xl bg-black/80" />
            <Skeleton className="h-[30px] mt-2 mx-auto w-[300px] rounded-3xl bg-black/60" />
          </>
        ) : (
          <>
            <h3 className="font-bold text-3xl">DailySAT Shop</h3>
            <p className="font-thin">
              Browse & see what&apos;s interesting to you!
            </p>
          </>
        )}
      </div>

      <ItemGrid />
      <CheckoutButton />
    </div>
  );
}
