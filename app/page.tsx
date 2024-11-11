"use client";

import GlobalLeaderboard from "@/components/GlobalLeaderboard";
// import { useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useUser } from "@/hooks/useUset";

export default function Home() {
  // const router = useRouter();
  // const { setuser } = useUser();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const token = localStorage.getItem("authToken");
  //     if (!token) {
  //       return;
  //     }

  //     try {
  //       const response = await axios("http://localhost:5000/api/v1/auth/user", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       console.log(response);
  //       setuser(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       // Handle token invalid or expired
  //       localStorage.removeItem("authToken");
  //     }
  //   };

  //   fetchUserData();
  // }, [router, setuser]);

  return (
    <div className="min-h-screen w-[50rem] mx-auto pt-[5rem]">
      <h1 className="text-center text-xl font-semibold">Leaderboards</h1>
      <div className="flex items-center gap-x-2 mt-8">
        <button className="font-medium text-sm inline-block p-2 bg-gray-50 rounded-lg shadow active:shadow-sm">
          GLobal
        </button>
        <button className="font-medium text-sm inline-block p-2 bg-gray-50 rounded-lg shadow active:shadow-sm">
          Javascript
        </button>
        <button className="font-medium text-sm inline-block p-2 bg-gray-50 rounded-lg shadow active:shadow-sm">
          Css
        </button>
        <button className="font-medium text-sm inline-block p-2 bg-gray-50 rounded-lg shadow active:shadow-sm">
          React
        </button>
      </div>
      <div className="  py-4 bg-gray-50 px-7 mt-6">
        <GlobalLeaderboard />
      </div>
    </div>
  );
}
