// UI Components and Icons
import { Minus, Plus } from "lucide-react";

// Types
import { DisplayBanner } from "@/types/dashboard/banner";
import Image from "next/image";
import { useShop } from "@/hooks/useShop";
import { ShopItem } from "@/types/shop/shopItem";
import { useUserStore } from "@/store/user";

// Component Props Interface
interface ComponentShopItem {
  name: string;
  purpose: string;
  price: number;
  dispatch?: (_action: { type: string; payload?: string }) => void;
}

/**
 * ShopItemDisplay Component
 * Renders a shop item with purchase controls and visual customizations
 */
const ShopItemDisplay: React.FC<ComponentShopItem> = ({
  name,
  purpose,
  price,
}) => {
  const { state, increment, decrement, user, setUser } = useShop();

  // Banner styles mapping for different banner types
  const bannerMap: { [key: string]: DisplayBanner } = {
    diamondbanner: {
      style:
        "bg-[#00d3f2] p-1 flex items-center justify-center font-bold text-white shadow-lg   border-[4px] text-center border-[#a2f4fd] w-[80px] h-[30px] absolute top-0 right-0 rounded-xl",
      content: `Congratulations on your Diamond Banner`,
    },
    emeraldbanner: {
      style:
        "bg-[#009966] p-1 flex items-center justify-center font-bold text-white shadow-lg   border-[4px] text-center border-[#5ee9b5] w-[80px] h-[30px] absolute top-0 right-0 rounded-xl",
      content: `Congratulations on your Emerald Banner`,
    },
    goldbanner: {
      style:
        "bg-[#FFD700] p-1 flex items-center justify-center font-bold text-white shadow-lg   border-[4px] text-center border-[#fff085] w-[80px] h-[30px] absolute top-0 right-0 rounded-xl",
      content: `Congratulations on your Gold Banner`,
    },
    bronzebanner: {
      style:
        "bg-[#9E5E23] p-1 flex items-center justify-center font-bold text-white shadow-lg   border-[4px] text-center border-[#E0AF7D] w-[80px] h-[30px] absolute top-0 right-0 rounded-xl",
      content: `Congratulations on your Bronze Banner`,
    },
  };

  return (
    <>
      {/* Shop Item Container */}
      <div className="flex flex-col relative z-10   items-center justify-center w-full h-full ">
        {/* Icon Display */}
        {name.includes("Icon") ? (
          <Image
            src={`/icons/rewards/${name.toLowerCase().split(" ").join("-")}.png`}
            alt="Icon"
            width={50}
            height={50}
            className="absolute -right-2 z-10 -top-2"
          />
        ) : (
          <></>
        )}

        {/* Banner Display */}
        {name.includes("Banner") ? (
          <div
            className={bannerMap[name.toLowerCase().replace(/\s/g, "")].style}
          ></div>
        ) : (
          <></>
        )}

        {/* Item Details Card */}
        <div className="w-full bg-white rounded-lg border-gray-300 border ">
          <div className="p-4">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="mt-1 text-lg font-semibold">{price} coins</p>
            <p className="mt-1 text-gray-600">
              {purpose || "We couldn't find a purpose"}
            </p>

            {/* Quantity Controls */}
            <div className="w-full lg:w-1/2 mt-2 flex flex-row items-center justify-start lg:justify-end">
              {/* Decrement Button */}
              <div className="w-1/3 flex justify-center ">
                <button
                  onClick={() => {
                    if (state[name.toLowerCase().replace(/\s/g, "")] === 0)
                      return;
                    decrement(name);
                    window.dispatchEvent(
                      new CustomEvent("user-updated", {
                        detail: {
                          price: price,
                        },
                      })
                    );
                  }}
                  disabled={state[name.toLowerCase().replace(/\s/g, "")] === 0}
                  className={
                    state[name.toLowerCase().replace(/\s/g, "")] != 0
                      ? "hover:scale-125  transition-transform duration-300 hover:bg-transparent hover:text-white shadow-lg flex justify-center items-center text-lg font-semibold bg-transparent rounded-full w-[35px] h-[35px] border-black border"
                      : "hover:bg-transparent hover:text-white shadow-lg flex justify-center items-center text-lg font-semibold bg-transparent rounded-full w-[35px] h-[35px] border-gray-400 border"
                  }
                >
                  <Minus
                    color={
                      state[name.toLowerCase().replace(/\s/g, "")] != 0
                        ? "black"
                        : "gray"
                    }
                    size={18}
                  />
                </button>
              </div>

              {/* Quantity Display */}
              <div className="w-1/3 flex justify-center   items-center my-1 font-bold text-5xl">
                <span>{state[name.toLowerCase().replace(/\s/g, "")]}</span>
              </div>

              {/* Increment Button */}
              <div className="w-1/3 h-full flex justify-center items-center">
                <button
                  onClick={() => {
                    if (
                      !user ||
                      price > user?.currency! ||
                      (!name.toLowerCase().includes("investor") &&
                        user?.itemsBought &&
                        user?.itemsBought.some(
                          (item: ShopItem) => item.name === name
                        )) ||
                      (!name
                        .toLowerCase()
                        .replace(/\s/g, "")
                        .includes("investor") &&
                        state[name.toLowerCase().replace(/\s/g, "")] === 1)
                    )
                      return;

                    increment(name);

                    window.dispatchEvent(
                      new CustomEvent("user-updated", {
                        detail: {
                          price: -price,
                        },
                      })
                    );
                  }}
                  className={
                    !user ||
                    price > user?.currency! ||
                    (!name
                      .toLowerCase()
                      .replace(/\s/g, "")
                      .includes("investor") &&
                      user?.itemsBought &&
                      user?.itemsBought.some(
                        (item: ShopItem) => item.name === name
                      )) ||
                    (!name
                      .toLowerCase()
                      .replace(/\s/g, "")
                      .includes("investor") &&
                      state[name.toLowerCase().replace(/\s/g, "")] === 1)
                      ? "hover:bg-transparent hover:text-white shadow-lg flex justify-center items-center text-lg font-semibold bg-transparent rounded-full w-[35px] h-[35px] border-gray-400 border"
                      : "hover:scale-125 transition-transform duration-300 hover:bg-transparent hover:text-white shadow-lg flex justify-center items-center text-lg font-semibold bg-transparent rounded-full w-[35px] h-[35px] border-black border"
                  }
                >
                  <Plus
                    color={
                      !user ||
                      price > user?.currency! ||
                      (!name
                        .toLowerCase()
                        .replace(/\s/g, "")
                        .includes("investor") &&
                        user?.itemsBought &&
                        user?.itemsBought.some(
                          (item: ShopItem) => item.name === name
                        )) ||
                      (!name
                        .toLowerCase()
                        .replace(/\s/g, "")
                        .includes("investor") &&
                        state[name.toLowerCase().replace(/\s/g, "")] === 1)
                        ? "gray"
                        : "black"
                    }
                    size={18}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopItemDisplay;
