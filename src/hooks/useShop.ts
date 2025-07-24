import { useUserStore } from "@/store/user";
import { create } from "zustand";

// Define the item counts (shop cart state)
const initialState: { [key: string]: number } = {
  coininvestori: 0,
  coininvestorii: 0,
  coininvestoriii: 0,
  coininvestoriv: 0,
  owlicon: 0,
  tigericon: 0,
  sharkicon: 0,
  cheetahicon: 0,
  bronzebanner: 0,
  goldbanner: 0,
  emeraldbanner: 0,
  diamondbanner: 0,
};

type ShopStore = {
  state: typeof initialState;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  clear: () => void;
};

export const useShopStore = create<ShopStore>((set, get) => ({
  state: { ...initialState },

  increment: (key) => {
    key = key.toLowerCase().replace(/\s/g, "");
    set((s) => ({
      state: {
        ...s.state,
        [key]: (s.state[key] ?? 0) + 1,
      },
    }));
  },

  decrement: (key) => {
    key = key.toLowerCase().replace(/\s/g, "");
    const currentCount = get().state[key] ?? 0;

    if (currentCount > 0) {
      set((s) => ({
        state: {
          ...s.state,
          [key]: currentCount - 1,
        },
      }));
    }
  },

  clear: () => {
    set({ state: { ...initialState } });
  },
}));

// Custom hook to combine shop and user store logic
export const useShop = () => {
  const shopStore = useShopStore();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // Map of item IDs to their names and prices
  const namePriceMap: { [key: string]: [string, number, string] } = {
    coininvestori: ["Coin Investor I", 120, "Earn 5 coins daily"],
    coininvestorii: ["Coin Investor II", 230, "Earn 10 coins daily"],
    coininvestoriii: ["Coin Investor III", 350, "Earn 15 coins daily"],
    coininvestoriv: ["Coin Investor IV", 460, "Earn 20 coins daily"],
    owlicon: ["Owl Icon", 300, "Display an owl icon on your profile"],
    tigericon: ["Tiger Icon", 400, "Display a tiger icon on your profile"],
    sharkicon: ["Shark Icon", 350, "Display a shark icon on your profile"],
    cheetahicon: [
      "Cheetah Icon",
      250,
      "Display a cheetah icon on your profile",
    ],
    bronzebanner: [
      "Bronze Banner",
      1000,
      "Display a bronze banner on your profile",
    ],
    goldbanner: ["Gold Banner", 2000, "Display a gold banner on your profile"],
    diamondbanner: [
      "Diamond Banner",
      3000,
      "Display a diamond banner on your profile",
    ],
    emeraldbanner: [
      "Emerald Banner",
      5000,
      "Display an emerald banner on your profile",
    ],
  };

  const incrementItem = (key: string) => {
    const itemKey = key.toLowerCase().replace(/\s/g, "");
    const [name, price, purpose] = namePriceMap[itemKey] || [];

    // If item doesn't exist or user doesn't have enough coins, don't proceed
    if (!name || !user || user.currency < price) {
      return;
    }

    shopStore.increment(itemKey);
    if (setUser && user) {
      setUser({
        ...user,
        currency: user.currency - price,
      });
    }
  };

  const decrementItem = (key: string) => {
    const itemKey = key.toLowerCase().replace(/\s/g, "");
    const [name, price] = namePriceMap[itemKey] || [];

    // If item doesn't exist or no items in cart, don't proceed
    if (!name || !user || shopStore.state[itemKey] <= 0) {
      return;
    }

    shopStore.decrement(itemKey);
    if (setUser && user) {
      setUser({
        ...user,
        currency: user.currency + price,
      });
    }
  };

  return {
    state: shopStore.state,
    increment: incrementItem,
    decrement: decrementItem,
    clear: shopStore.clear,
    user,
    setUser,
  };
};
