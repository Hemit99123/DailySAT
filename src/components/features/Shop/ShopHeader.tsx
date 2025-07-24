import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/store/user"; // Adjust the import path as needed

export default function ShopHeader() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return (
      <Skeleton className="lg:w-3/4 w-full h-[175px] rounded-2xl bg-gradient-to-tr from-[#4D68C3] via-[#4D68C3] to-[#9db2f7]" />
    );
  }

  return (
    <div className="lg:w-3/4 w-full bg-gradient-to-tr from-[#4D68C3] via-[#4D68C3] to-[#9db2f7] relative medium:h-[200px] rounded-2xl px-8 py-12 text-white flex items-center">
      <div className="font-bold text-5xl text-white">
        Welcome,&nbsp;
        <span className="inline-block w-[290px] overflow-hidden text-ellipsis whitespace-nowrap align-bottom">
          {user?.name.split(" ").length === 2
            ? user.name.split(" ")[0]
            : user.name}
          !
        </span>
        <p className="text-xs font-light mt-4">
          Welcome to the shop! Here you can buy items to help you study and
          improve your SAT score.
        </p>
      </div>
      <img
        src="assets/shop-graphic.png"
        className="lg:h-[150px] h-[100px] medium:hidden absolute -bottom-2 right-2"
        alt="Study Graphic"
      />
    </div>
  );
}
