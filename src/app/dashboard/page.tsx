"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import StatDisplay from "@/components/features/Dashboard/StatDisplay";
import Option from "@/components/features/Dashboard/Option";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Book, Calendar, EqualApproximately } from "lucide-react";
import { useUserStore } from "@/store/user";
import { User } from "@/types/user";
import { DisplayBanner } from "@/types/dashboard/banner";
import RedeemReferral from "@/components/features/Dashboard/RedeemReferral";

const Home = () => {
  const [icon, setIcon] = useState("");
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [greeting, setGreeting] = useState("");
  const [imageError, setImageError] = useState(false);
  const [userCoins, setUserCoins] = useState<number>(0);
  const [banner, setBanner] = useState<DisplayBanner>({
    style: "",
    content: "",
  });

  const getIcon = (userData?: User) => {
    const icons = userData?.itemsBought?.filter((item) =>
      item.name.includes("Icon")
    );
    if (!icons?.length) return;
    const mostExpensiveIcon = icons.reduce((max, item) =>
      item.price > max.price ? item : max
    );
    setIcon(mostExpensiveIcon.name.split(" ").join("-").toLowerCase());
  };

  const getBanner = (userData?: User) => {
    const banners = userData?.itemsBought?.filter((item) =>
      item.name.includes("Banner")
    );
    if (!banners?.length) return;
    const mostExpensiveBanner = banners.reduce((max, item) =>
      item.price > max.price ? item : max
    );

    const bannerMap: { [key: string]: DisplayBanner } = {
      diamondbanner: {
        style:
          "bg-[#00d3f2] p-4 flex items-center justify-center font-bold text-white shadow-lg text-2xl border-[10px] text-center border-[#a2f4fd] h-[150px] w-full rounded-xl",
        content: `Congratulations on your Diamond Banner`,
      },
      emeraldbanner: {
        style:
          "bg-[#009966] p-4 flex items-center justify-center font-bold text-white shadow-lg text-2xl border-[10px] text-center border-[#5ee9b5] h-[150px] w-full rounded-xl",
        content: `Congratulations on your Emerald Banner`,
      },
      goldbanner: {
        style:
          "bg-[#FFD700] p-4 flex items-center justify-center font-bold text-white shadow-lg text-2xl border-[10px] text-center border-[#fff085] h-[150px] w-full rounded-xl",
        content: `Congratulations on your Gold Banner`,
      },
      bronzebanner: {
        style:
          "bg-[#9E5E23] p-4 flex items-center justify-center font-bold text-white shadow-lg text-2xl border-[10px] text-center border-[#E0AF7D] h-[150px] w-full rounded-xl",
        content: `Congratulations on your Bronze Banner`,
      },
    };

    const bannerKey = mostExpensiveBanner?.name
      ?.toLowerCase()
      ?.replace(/\s/g, "");
    if (bannerKey && bannerMap[bannerKey]) {
      setBanner(bannerMap[bannerKey]);
    }
  };

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const response = await axios.get("/api/auth/get-user");
        const userData: User | undefined = response?.data?.user;

        setUserCoins(userData?.currency ?? 0);

        if (userData?.investors) {
          const result = await axios.post("/api/investor");
          setUserCoins(result?.data?.totalQuantity ?? 0);
        }

        getIcon(userData);
        getBanner(userData);
        setUser?.(userData ?? null);
      } catch (error) {}
    };

    handleGetUser();
  }, []);

  useEffect(() => {
    const getGreeting = () => {
      const hours = new Date().getHours();
      if (hours < 12) return "Good morning";
      if (hours < 18) return "Good afternoon";
      return "Good evening";
    };
    setGreeting(getGreeting());
  }, []);

  const handleCopyReferral = async () => {
    const referralCode = user?._id ?? "";
    await navigator.clipboard.writeText(referralCode);
  };

  const toggleImageError = () => {
    setImageError((prevState) => !prevState);
  };

  return (
    <div className="mb-10">
      <div className="flex flex-col items-center mt-8">
        {user ? (
          <h1 className="text-xl md:text-4xl font-bold text-gray-800">
            {greeting ? `${greeting}!` : "Loading greeting..."}
          </h1>
        ) : (
          <Skeleton className="md:w-[400px] w-[250px] md:h-[40px] h-[28px] rounded-full bg-black/60" />
        )}
        {user ? (
          <p className="text-xs md:text-base text-gray-600 font-light">
            Choose what to study and start practicing...
          </p>
        ) : (
          <Skeleton className="md:w-[313px] h-[16px] w-[225px] md:h-[24px] mt-1 rounded-full bg-gray-400" />
        )}
      </div>

      <div className="lg:px-16 lg:p-6 px-2">
        <div className="grid grids-cols-1 md:grid-cols-3 mx-auto md:w-4/5 gap-2 mt-px">
          {user ? (
            <Option
              icon={<Book />}
              header="English"
              redirect="/practice/english"
            />
          ) : (
            <Skeleton className="w-full h-[64px] bg-gray-700/60" />
          )}
          {user ? (
            <Option
              icon={<EqualApproximately />}
              header="Math"
              redirect="/practice/math"
            />
          ) : (
            <Skeleton className="w-full h-[64px] bg-gray-700/60" />
          )}
          {user ? (
            <Option
              icon={<Calendar />}
              header="Study Plan"
              redirect="/dashboard/study-plan"
            />
          ) : (
            <Skeleton className="w-full h-[64px] bg-gray-700/60" />
          )}
        </div>
      </div>

      <div className="lg:flex lg:space-x-2 mt-1.5 p-3.5">
        <div className="rounded-lg w-full bg-white p-4 flex lg:items-center flex-col lg:flex-row lg:justify-between">
          <div className="flex items-center mb-3">
            <div className="relative">
              {user ? (
                <Image
                  src={
                    (!imageError && user?.image) ||
                    "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg"
                  }
                  alt="userpfpic"
                  width={120}
                  height={120}
                  onError={toggleImageError}
                  className="rounded-2xl"
                />
              ) : (
                <Skeleton className="w-[120px] h-[120px] rounded-2xl bg-gray-400" />
              )}
              {icon && (
                <Image
                  src={`/icons/rewards/${icon}.png`}
                  alt="Icon"
                  width={80}
                  height={80}
                  className="absolute -right-6 -top-6"
                />
              )}
            </div>
            <div className="ml-6">
              {user ? (
                <>
                  <p className="text-3xl font-bold text-blue-600">
                    {user?.name}
                  </p>
                  <p>Email: {user?.email}</p>
                </>
              ) : (
                <>
                  <Skeleton className="w-[200px] h-[35px] rounded-full bg-blue-600" />
                  <Skeleton className="w-[200px] h-[24px] mt-4 rounded-full bg-gray-400" />
                </>
              )}
            </div>
          </div>

          <div className="lg:mr-[10vw] relative">
            {user ? (
              <>
                <p className="text-xl font-semibold text-green-600">
                  Referral Code
                </p>
                <p className="text-gray-700 flex items-center mb-2">
                  <button onClick={handleCopyReferral}>
                    <Image
                      src="/icons/copy.png"
                      className="w-10 h-10"
                      alt="Copy Referral Code"
                      width={100}
                      height={100}
                    />
                  </button>
                  {user?._id || "Unavailable"}
                </p>
              </>
            ) : (
              <>
                <Skeleton className="w-[150px] h-[28px] bg-green-600/80 rounded-full" />
                <Skeleton className="w-[200px] h-[24px] mt-4 rounded-full bg-gray-400" />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-3.5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {user ? (
            <StatDisplay
              type="coins"
              color="black"
              icon="coin"
              header="DailySAT Coins:"
              number={userCoins}
            />
          ) : (
            <Skeleton className="w-full h-[200px] mb-2 bg-gray-600/60" />
          )}
          {user ? (
            <StatDisplay
              type="attempts"
              color="green"
              icon="checked"
              header="Correct Answers:"
              number={user?.correctAnswered ?? 0}
            />
          ) : (
            <Skeleton className="w-full h-[200px] mb-2 bg-gray-600/60" />
          )}
          {user ? (
            <StatDisplay
              type="attempts"
              color="#ff5454"
              icon="cross"
              header="Mistakes:"
              number={user?.wrongAnswered ?? 0}
            />
          ) : (
            <Skeleton className="w-full h-[200px] mb-2 bg-gray-600/60" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!user?.isReferred && (
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center min-h-[200px]">
              <RedeemReferral />
            </div>
          )}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center min-h-[200px]">
            {user ? (
              <Link href="/shop" className="w-full">
                <StatDisplay
                  type="items bought"
                  color="#2563EA"
                  icon="shop"
                  header="Shop:"
                  number={user?.itemsBought?.length ?? 0}
                />
              </Link>
            ) : (
              <Skeleton className="w-full h-[200px] mb-2 bg-gray-600/60" />
            )}
          </div>
        </div>

        {user?.itemsBought?.some((item) => item.name.includes("Banner")) &&
          banner?.style && (
            <div className={banner.style}>
              <p>
                {banner.content}
                {user?.name ? `, ${user.name.split(" ")[0]}!` : "!"}
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Home;
