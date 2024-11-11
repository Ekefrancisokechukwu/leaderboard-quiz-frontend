"use client";

import Link from "next/link";
import google from "@/public/google.svg";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { usePathname, useRouter } from "next/navigation";
import User from "./User";
import { useUser } from "@/hooks/useUset";
import axios from "axios";

const quizzLinks = [
  {
    label: "Javascript",
    href: "/javascript",
  },
  {
    label: "React",
    href: "/react",
  },
  {
    label: "Css",
    href: "/css",
  },
  {
    label: "Node",
    href: "/node",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));
  const pathname = usePathname();
  const router = useRouter();

  const { user, setuser } = useUser();

  const handlePathname = () => {
    const currentPath = quizzLinks.find((path) => pathname === path.href);
    return currentPath ? currentPath.href.replace(/^\//, "") : "Select Quizz";
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:5000") return; // Ensure this matches your backend URL

      if (event.data.type === "AUTH_SUCCESS") {
        const token = event.data.token;
        localStorage.setItem("authToken", token);
        const fetchUserData = async () => {
          if (!token) {
            return;
          }

          try {
            const response = await axios(
              "http://localhost:5000/api/v1/auth/user",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setuser(response.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
            // Handle token invalid or expired
          }
        };
        fetchUserData();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router, setuser]);

  const handleGoogleLogin = () => {
    // setIsLoading(true);
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      "http://localhost:5000/api/v1/auth/google",
      "GoogleLogin",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    const checkPopup = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopup);
        // setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <header className="py-2 px-5 shadow  z-50 fixed w-full top-0 left-0 bg-white flex justify-between">
      <Link href={"/"} className="italic font-semibold">
        Quizz App
      </Link>
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex gap-x-2 capitalize items-center py-1 px-3 hover:bg-gray-100 rounded-lg"
        >
          {handlePathname()}
          <ChevronDown
            size={16}
            className={`transition-transform duration-150 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
        <div
          className={`w-[25rem] z-50 top-[110%]     bg-white transition-transform transform duration-200 absolute  p-3 rounded-lg h-[9rem] shadow-[0_4px_6px_-1px_#0000001d,0_-2px_2px_-1px_#0000001c] left-1/2 -translate-x-1/2  ${
            isOpen
              ? " opacity-100 visible translate-y-0"
              : " opacity-0 invisible -translate-y-4"
          }  `}
        >
          <div className="grid items-center grid-cols-2 gap-x-5 gap-y-3">
            {quizzLinks.map((link) => (
              <Link
                onClick={() => {
                  setIsOpen(false);
                }}
                key={link.label}
                href={link.href}
                className="inline-flex items-center py-2 px-4 text-sm rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {user ? (
        <User user={user} />
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="flex items-center gap-x-2 py-1 px-3 hover:bg-gray-100 shadow rounded bg-gray-50"
        >
          <Image src={google} alt="google icon" className="size-[1rem]" />
          Login
        </button>
      )}
    </header>
  );
};
export default Header;
